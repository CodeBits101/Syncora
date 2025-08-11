import React from "react";
import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import BugReportIcon from "@mui/icons-material/BugReport";
import TaskIcon from "@mui/icons-material/Task";
import EntityFormModal from "../BaseModal/BaseEntityModal";
import { sprintFields } from "../../FormConfigs/sprintFields";
import { SiPolymerproject } from "react-icons/si";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";
import { formatToLocalDateTime } from "../../utils/formatToLocalDateTime";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { completeSprint, createSprint, deleteSprint, startSprint, updateSprint } from "../../services/manager/manager";
import { toast, ToastContainer } from 'react-toastify';
import { formatDateForInput } from './../../utils/dateFormatForInput';
import { getSprintByProjectId } from "../../services/manager/manager";

const Sprints = () => {
  const userRole = localStorage.getItem("role");
  const managerId = localStorage.getItem("empId");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [editSprint , setEditSprint] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [sprints, setSprints] = useState({
    ACTIVE: [],
    BACKLOG: [],
    COMPLETED: [],
  });

  const navigate = useNavigate();

  const handleCreateSprint = async (data) => {
    const payload = {
      ...data,
      managerId,
      projectId: selectedOption,
      startDate: formatToLocalDateTime(data.startDate),
      endDate: formatToLocalDateTime(data.endDate),
    };
    try{
      const createdSprint = await createSprint(payload);
      console.log("Sprint created :", createdSprint);
      setOpenModal(false);
      toast.success("Sprint Created Successfully");
      fetchSprints(selectedOption);
    }
    catch(error)
    {
      console.error("Failed to create Sprint", error);
      toast.error("Sprint Creation failed")
    }
  };

  const fetchSprints = async (projectId) => {
    try {
      setLoading(true);
      setError("");
      const res = await getSprintByProjectId(projectId)
      console.log("fetch data "+res.data)
      const sprintList = res || [];
      // Group sprints by status
      const grouped = {
        ACTIVE: sprintList.filter((s) => s.sprintStatus === "ACTIVE"),
        BACKLOG: sprintList.filter((s) => s.sprintStatus === "BACKLOG"),
        COMPLETED: sprintList.filter((s) => s.sprintStatus === "COMPLETED"),
      };
      setSprints(grouped);

      // Optional: If your API returns projectName in the response
       if (sprintList.length > 0 && sprintList[0]?.projectName) {
      setProjectName(sprintList[0].projectName);
    }
    } catch (err) {
      console.error("Error fetching sprints:", err);
      setError("Failed to load sprints");
    } finally {
      setLoading(false);
    }
  };

// SetSprint Status to ACTIVE

  const handleStartSprint = async(sprintId, projectId) =>
  {
    try{
      setLoading(true);
      await startSprint(sprintId, projectId);
      await fetchSprints(projectId);
    } 
    catch(ex)
    {
      toast.error("Sprint Start error.")
    }
    finally
    {
      setLoading(false);
    }
  }

  //  set sprint status complete
  const handleCompleteSprint = async(sprintId, projectId) =>
  {
    try{
      console.log(projectId);
      setLoading(true);
      await completeSprint(sprintId);
      await fetchSprints(projectId);
    } 
    catch(ex)
    {
      toast.error("Sprint Complete error.")
    }
    finally
    {
      setLoading(false);
    }
  }

  const handleDeleteSprint = async(sprintId, projectId) =>
    {
    try{
      
      setLoading(true);
      await deleteSprint(sprintId);
      toast.success("Sprint Deleted.");
      await fetchSprints(projectId);
    } 
    catch(ex)
    {
      toast.error("Sprint Cannot be Delete.")
    }
    finally
    {
      setLoading(false);
    }
  }

  const openUpdateSprintModal = (sprint) => {
    setSelectedSprint(sprint);
    setOpenModal(true);
  };

  const handleUpdateSprint = async (values) => {
  try {
    console.log(values.id);
    const projectId = selectedOption;
    await updateSprint(values); 
    toast.success("Sprint updated successfully!");
    await fetchSprints(projectId);
    setOpenModal(false);
    setSelectedSprint(null);
  } catch (ex) {
    toast.error("Sprint could not be updated.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (selectedOption) {
      fetchSprints(selectedOption);
    }
  }, [selectedOption]);

 

  return (
    <>
      <ChooseProjectModal
        showModal={showModal}
        showMainUI={showMainUI}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        setShowModal={setShowModal}
        setShowMainUI={setShowMainUI}
      />

      {showMainUI && (
        <Box p={4} sx={{ backgroundColor: "#f6faffff", minHeight: "100vh" }}>
          <ToastContainer/>
          <Box display="flex" justifyContent="space-between" mb={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Project: <span style={{ color: "#1976d2" }}>{selectedOption?.title}</span> — Sprints
            </Typography>
            <Box display="flex" sx={{ gap: 2 }} justifyContent="flex-end" mb={2}>
              {userRole === "ROLE_MANAGER" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModal(true)}
                >
                  + Create Sprint
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowModal(true)}
              >
                <SiPolymerproject
                  color="white"
                  size={20}
                  style={{ marginRight: "10px" }}
                />
                Choose Project
              </Button>
            </Box>
          </Box>

          {loading && <Typography>Loading sprints...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          {["ACTIVE", "BACKLOG", "COMPLETED"].map((category) => (
            <Box key={category} mb={4}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textTransform: "capitalize", color: "#050505ff" }}
              >
                {category} Sprints
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: "#7baad0ff" }} />

              {sprints[category].length === 0 ? (
                <Typography color="text.secondary">
                  No {category} sprints found.
                </Typography>
              ) : (
                sprints[category].map((sprint) => (
<Accordion key={sprint.id} sx={{ mb: 1, backgroundColor: "#ffffffff" }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
     <Grid container alignItems="center" gap={2}>
      <Grid item xs={9}>
        <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
          {sprint.sprintName}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" color="textSecondary">
          {`${formatDateForInput(sprint.startDate)} – ${formatDateForInput(sprint.endDate)}`}
        </Typography>
      </Grid>
    </Grid>
  </AccordionSummary>

  <AccordionDetails>
    <Grid container spacing={3}>
      <Grid item xs={12}
      sx={{
                boxShadow: 3,
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "white",
              }}>

  
  <TableContainer component={Paper} sx={{ width: '100%', maxHeight: 300 }}>
  <Table stickyHeader size="small"  sx={{ width: '100%', tableLayout: 'fixed' }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {[...sprint.tasks.map(t => ({...t, type: 'task'})), ...sprint.bugs.map(b => ({...b, type: 'bug'}))]
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => (
          <TableRow
            key={`${item.type}-${item.id}`}
            sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
          ><TableCell>
              {item.type === 'task' ? (
                <TaskIcon color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
              ) : (
                <BugReportIcon color="error" sx={{ verticalAlign: 'middle', mr: 1 }} />
              )}
              {item.type === 'task' ? 'Task' : 'Bug'}
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.status}</TableCell> {/* Added status value */}
          </TableRow>
        ))}
    </TableBody>
  </Table>
  <TablePagination
    component="div"
    count={(sprint.tasks?.length || 0) + (sprint.bugs?.length || 0)}
    page={page}
    onPageChange={(e, newPage) => setPage(newPage)}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={(e) => {
      setRowsPerPage(parseInt(e.target.value, 10));
      setPage(0);
    }}
    rowsPerPageOptions={[3]}
  />
</TableContainer>

      </Grid>
    </Grid>


    {/* BUTTONS ROW */}
    {userRole == "ROLE_MANAGER" &&(  
    <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
      {category === "BACKLOG" && (
        <>
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#3daa51ff" }}
            disabled={sprints.ACTIVE.length > 0}
            onClick={() => handleStartSprint(sprint.id, sprint.projectId)}
            startIcon={<PlayArrowIcon />}
          >
            Start Sprint
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteSprint(sprint.id, sprint.projectId)}
            startIcon={<DeleteIcon />}
          >
            Delete Sprint
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => openUpdateSprintModal(sprint)}
            startIcon={<EditNoteRoundedIcon />}
          >
            Update Sprint
          </Button>
        </>
      )}

      {category === "ACTIVE" && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/scrumBoard")}
          >
            <MdOutlineDashboardCustomize
              size={20}
              color="white"
              style={{ marginRight: "10px" }}
            />
            Taskboard
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#802fe3ff" }}
            onClick={() => handleCompleteSprint(sprint.id, sprint.projectId)}
            startIcon={<DoneIcon />}
          >
            Complete Sprint
          </Button>
        </>
      )}
    </Box>
    )}
    {/* Warning */}
    {(category === "BACKLOG" && userRole == "ROLE_MANAGER") && sprints.ACTIVE.length > 0 && (
      <Typography variant="caption" color="error" sx={{ mt: 1, display: "block" }}>
        Cannot start new sprint while another sprint is active
      </Typography>
    )}
  </AccordionDetails>
</Accordion>

                ))
              )}
            </Box>
          ))}

          <EntityFormModal
            open={openModal}
            handleClose={() => {
              setOpenModal(false);
              setSelectedSprint(null);
            }}
            title={selectedSprint ? "Update Sprint" : "Create Sprint"}
            fields={sprintFields}
            initialValues={
              selectedSprint ? {
                  id:selectedSprint.id,
                  sprintName: selectedSprint.sprintName || "",
                  description: selectedSprint.description ||"",
                  startDate: formatDateForInput(selectedSprint.startDate) || "",
                  endDate: formatDateForInput(selectedSprint.endDate) || "",
                  status: "BACKLOG",
            
              }
              :
              {
                sprintName: "",
                description: "",
                startDate: "",
                endDate: "",
                status: "BACKLOG",
              }
            }
            onSubmit={selectedSprint ? handleUpdateSprint: handleCreateSprint}
            submitLabel={selectedSprint ? "Update" : "Create"}
          />
        </Box>
      )}
    </>
  );
};

export default Sprints;
