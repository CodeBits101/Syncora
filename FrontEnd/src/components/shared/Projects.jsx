import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Divider,
  IconButton,
  Badge,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  ThemeProvider,
  createTheme,
  Tooltip,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FolderZip, InfoOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

import EntityFormModal from "../BaseModal/BaseEntityModal";
import { projectFields } from "../../FormConfigs/projectFields";
import {
  getAllInprogressProjects,
  getProjectsCountByStatus,
  createProject,
} from "../../services/manager/manager";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatToLocalDateTime } from "../../utils/formatToLocalDateTime";

const theme = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": { backgroundColor: "#c0bfbfff" },
          "&:nth-of-type(even)": { backgroundColor: "#929292ff" },
          "&:hover": { backgroundColor: "#f1eaeaff" },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#1976d2",
          color: "#fff",
          fontWeight: "bold",
        },
        body: {
          fontSize: "0.95rem",
        },
      },
    },
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 30,
    top: 25,
    fontSize: 30,
    height: 40,
    minWidth: 40,
    borderRadius: "50%",
    background: "crimson",
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const projectTypes = [
  {
    id: 1,
    title: "In Progress",
    summary: "Projects are under Development phase",
    iconColor: "primary",
    path: "inprogress",
    status: "INPROGRESS",
  },
  {
    id: 2,
    title: "Closed",
    summary: "Projects are closed due to certain reasons",
    iconColor: "warning",
    path: "closed",
    status: "CLOSED",
  },
  {
    id: 3,
    title: "Completed",
    summary: "Projects are completed successfully.",
    iconColor: "success",
    path: "completed",
    status: "COMPLETED",
  },
  {
    id: 4,
    title: "On Hold",
    summary: "Projects are currently paused.",
    iconColor: "error",
    path: "onhold",
    status: "HOLD",
  },
  {
    id: 5,
    title: "ReOpen",
    summary: "Projects which are reopened for development",
    iconColor: "secondary",
    path: "reopen",
    status: "REOPEN",
  },
];

const columns = [
  { id: "title", label: "Title", minWidth: 150 },
  { id: "projectCode", label: "Code", minWidth: 100 },
  { id: "projectStatus", label: "Status", minWidth: 120 },
  { id: "managerId", label: "Manager ID", minWidth: 100, align: "right" },
  { id: "startDate", label: "Start Date", minWidth: 150 },
  { id: "endDate", label: "End Date", minWidth: 150 },
];

function Projects() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectCounts, setProjectCounts] = useState([]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const [projects, counts] = await Promise.all([
        getAllInprogressProjects(),
        getProjectsCountByStatus(),
      ]);
      console.log(projects) ;
      setRows(Array.isArray(projects) ? projects : []);
      setProjectCounts(Array.isArray(counts) ? counts : []);
    } catch (error) {
      console.error("Error fetching project data:", error);
      setRows([]);
      setProjectCounts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getCountForStatus = (status) => {
    const found = projectCounts.find((item) => item.status === status);
    return found ? found.count : 0;
  };

  const handleCreateProject = async (formData) => {
    try {
      const cookies = document.cookie.split(";").reduce((acc, cookieStr) => {
        const [key, value] = cookieStr.trim().split("=");
        acc[key] = value;
        return acc;
      }, {});
      const managerId = cookies.empId;

      if (!managerId) {
        toast.error("Manager ID (empId) not found in cookies.");
        return;
      }

      console.log(formData.startDate, formData.endDate);
       console.log(formData)
      const startDateFormatted = formatToLocalDateTime(formData.startDate);
      const endDateFormatted = formatToLocalDateTime(formData.endDate);

      if (!startDateFormatted || !endDateFormatted) {
        toast.error("Please select valid start and end dates.");
        return;
      }

      const payload = {
        title: formData.pname,
        description: formData.description,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        actualStartDate: startDateFormatted,
        actualEndDate: endDateFormatted,
        projectStatus: "INPROGRESS",
        managerId: Number(managerId),
      };

      await createProject(payload);
      setOpenModal(false);
      toast.success("Project is successfully created");
      fetchProjects();
    } catch (error) {
      toast.error("Error while creating project");
      console.error("Error creating project:", error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" autoClose={1500} />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpenModal(true)}
        >
          + Create Project
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            justifyContent: "space-between",
            gap: 2,
            p: 2,
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: 4,
            },
          }}
        >
          {projectTypes.map((project) => (
            <Card key={project.id} sx={{ minWidth: 200, flexShrink: 0 }}>
              <CardActionArea>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 150,
                  }}
                >
                  <StyledBadge
                    badgeContent={getCountForStatus(project.status)}
                    color="default"
                    showZero
                  >
                    <FolderZip
                      color={project.iconColor}
                      sx={{ fontSize: 140 }}
                    />
                  </StyledBadge>
                </CardMedia>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                    <Tooltip
                      title={`Click to View List of ${project.title} projects`}
                      placement="bottom-end"
                    >
                      <IconButton
                        component={Link}
                        to={project.path}
                        size="medium"
                        color="primary"
                      >
                        <InfoOutlined />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {project.summary}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      <Divider sx={{ mt: 2, mb: 1 }}>
        <Typography sx={{ fontSize: "xx-large" }}>
          In Progress Projects
        </Typography>
      </Divider>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : rows.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No in-progress projects available.
          </Typography>
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="project table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id || rowIndex}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {[
                              "startDate",
                              "endDate",
                              "createdTimeStamp",
                              "updatedTimeStamp",
                            ].includes(column.id)
                              ? formatDate(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ background: "#e7e7e7ff" }}
          />
        </Paper>
      )}

      <EntityFormModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title="Create Project"
        fields={projectFields}
        initialValues={{
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          projectStatus: "INPROGRESS",
          managerId: "",
        }}
        onSubmit={handleCreateProject}
      />
    </ThemeProvider>
  );
}

export default Projects;
