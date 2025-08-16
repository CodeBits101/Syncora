import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Form, Button } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa";
import {
  Select,
  MenuItem,
  Box,
  IconButton,
  Popover,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BugReportIcon from "@mui/icons-material/BugReport";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";
import { exportPDF } from "../../utils/exportToPdf";
import EntityFormModal from "../BaseModal/BaseEntityModal";
import { updateStoryFields } from "../../FormConfigs/storyFields";
import { updateTaskFields } from "../../FormConfigs/taskFields";
import { updateBugFields } from "../../FormConfigs/bugFields";
import LogoutModal from "../shared/LogoutModal";
import {
  getBacklogItems,
  deleteBug,
  deleteStory,
  deleteTask,
  getBugById,
  getStoryById,
  getTaskById,
} from "./backlogService";
import { toast, ToastContainer } from "react-toastify";
import {
  getEmployeesByProjectId,
  getSprintByProjectId,
  updateBug,
  updateStory,
  updateTask,
} from "../../services/manager/manager";
import { formatToLocalDateTime } from "../../utils/formatToLocalDateTime";
import NoData from '../../screens/main/NoData'

const typeIcons = {
  STORY: <BookmarkBorderOutlinedIcon fontSize="small" color="success" />,
  TASK: <TaskAltIcon fontSize="small" color="primary" />,
  BUG: <BugReportIcon fontSize="small" color="error" />,
  // Keep backward compatibility with old format
  Story: <BookmarkBorderOutlinedIcon fontSize="small" color="success" />,
  Task: <TaskAltIcon fontSize="small" color="primary" />,
  Bug: <BugReportIcon fontSize="small" color="error" />,
};

// const statusOptions = ["To Do", "In Progress", "Done"];

export default function BacklogTable({
  loadStatus,
  selectedOption,
  setSelectedOption,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const [modalInitialValues, setModalInitialValues] = useState({});
  const [modalEntityType, setModalEntityType] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [modalSubmitMethod, setModalSubmitMethod] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sprints, setSprints] = useState([]);

  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'story', 'task', 'bug'
  const [anchorEl, setAnchorEl] = useState(null);
  const [editing, setEditing] = useState({
    rowId: null,
    field: "",
    options: [],
  });

  // New states for API integration
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clickedTypeId, setClickedTypeId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  // Load backlog data when project is selected
  useEffect(() => {
    if (selectedOption && showMainUI) {
      console.log("In useEffect");
      loadBacklogData();
      fetchEmployees();
      fetchSprints();
    }
  }, [selectedOption, showMainUI, loadStatus]);

  console.log(selectedOption);

  const fetchSprints = async () => {
    try {
      const response = await getSprintByProjectId(selectedOption);
      console.log(response)
      setSprints(response);
    } catch (error) {
      console.error("Error fetching sprints:", error);
      toast.error("Failed to fetch sprints.");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployeesByProjectId(selectedOption);
      // Assuming response contains employees data
      setEmployees(response);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees.");
    }
  };

  console.log(employees);

  const loadBacklogData = async () => {
    if (!selectedOption) {
      console.log("LoadBacklogData method issue");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Extract project ID from selectedOption (assuming it's the project ID)
      // const projectId = selectedOption;
      // console.log(`This is what selectedOption is: ${projectId}`);
      const data = await getBacklogItems(selectedOption);
      setRows(data);
    } catch (err) {
      console.error("Failed to load backlog data:", err);
      setError("Failed to load backlog data. Please try again.");
      // Fallback to empty array
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter rows based on selected tab
  const filteredRows =
    filter === "all"
      ? rows
      : rows.filter((row) => {
          const rowType = row.type?.toLowerCase();
          return rowType === filter;
        });

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const handleOpenDropdown = (event, rowId, field, options) => {
    setAnchorEl(event.currentTarget);
    setEditing({ rowId, field, options });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditing({ rowId: null, field: "", options: [] });
  };

  const handleValueChange = (newValue) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === editing.rowId ? { ...row, [editing.field]: newValue } : row
      )
    );
    handleClose();
  };

  const handleDeleteClick = (rowData) => {
    setSelectedRow(rowData); // store the row if needed
    setLogoutModalOpen(true);
  };
  console.log(selectedRow);

  const handleDelete = async () => {
    try {
      setError(null);
      setLoading(true);

      const type = (selectedRow.type || "").toUpperCase();

      if (type === "BUG") {
        await deleteBug(selectedRow.backendId);
        toast.success("Bug deleted");
      } else if (type === "TASK") {
        await deleteTask(selectedRow.backendId);
        toast.success("Task deleted");
      } else if (type === "STORY") {
        await deleteStory(selectedRow.backendId);
        toast.success("Story deleted");
      }

      // refetch all items so UI is in sync with backend
      await loadBacklogData();
    } catch (err) {
      console.error("Failed to delete item:", err);
      setError("Failed to delete item. Please try again.");
      toast.error("Error in deleting...");
    } finally {
      setLoading(false);
      setLogoutModalOpen(false);
    }
  };

  const columns = [
    {
      field: "type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            gap: 1,
          }}
        >
          {typeIcons[params.value]}
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
      filterable: false,
    },
    {
      field: "title",
      headerName: "Title",
      width: 700,
      editable: false,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      renderCell: (params) => {
        const priorityStyles = {
          VERYHIGH: { color: "#cc0000", fontWeight: 400 }, // same deep red
          HIGH: { color: "#ff6666", fontWeight: 400 }, // softer red than before
          MEDIUM: { color: "#ffcc66", fontWeight: 400 }, // softer yellow-orange
          LOW: { color: "#00C851", fontWeight: 400 }, // same green
          // Backward compatibility
          VeryHigh: { color: "#cc0000", fontWeight: 400 },
          High: { color: "#ff6666", fontWeight: 400 },
          Medium: { color: "#ffcc66", fontWeight: 400 },
          Low: { color: "#00C851", fontWeight: 400 },
        };

        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              sx={{ ...priorityStyles[params.value], lineHeight: "normal" }}
            >
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "assignee",
      headerName: "Assigned To",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{ display: "flex", alignItems: "center", height: "100%", gap: 1 }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleUpdate(params.row);
            }}
            color="primary"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(params.row);
            }}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleUpdateStory = async (data) => {
    console.log("Updating story with data:", data);
    const startDateFormatted = formatToLocalDateTime(data.start_date);
    const endDateFormatted = formatToLocalDateTime(data.end_date);

    if (!startDateFormatted || !endDateFormatted) {
      toast.error("Please select valid start and end dates.");
      return;
    }

    const payload = {
      ...data,
      title: data.title,
      description: data.description,
      project: data.projectId,
      currentSprint: data.sprintId || null,
      createdBy: localStorage.getItem("empId") || Cookies.get("empId"),
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      actualStartDate: startDateFormatted,
      actualEndDate: endDateFormatted,
    };

    console.log(payload);
    try {
      const response = await updateStory(data.id, payload);
      console.log(response);
      toast.success("Story updated successfuly...");
    } catch (error) {
      console.error("update story error:", error);
      toast.error(
        error.response.data.message || "Update story failed occurred"
      );
    } finally {
      setModalOpen(false);
      setTimeout(() => {
        loadBacklogData();
      }, 1500);
    }
  };

  const handleUpdateTask = async (data) => {
    const startDateFormatted = formatToLocalDateTime(data.start_date);
    const endDateFormatted = formatToLocalDateTime(data.end_date);

    // Validate dates here (optional — Yup can also handle this)
    if (!startDateFormatted || !endDateFormatted) {
      toast.error("Please select valid start and end dates.");
      return;
    }

    const empId = localStorage.getItem("empId") || Cookies.get("empId");

    const payload = {
      ...data,
      title: data.title.trim(),
      description: data.description.trim(),
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      actualStartDate: startDateFormatted,
      actualEndDate: endDateFormatted,
      priority: data.priority,
      assignedToId: data.assignedToId,
      assignedById: empId,
      createdById: empId,
      projectId: data.projectId,
      sprintId: data.sprintId || null,
      storyId: data.storyId || null,
      storyPoint: Number(data.storyPoint) || 0, // ensure it's a number
    };
    try {
      const response = await updateTask(data.id, payload);
      if (response) {
        toast.success("Task Updated successfully!");
      }
    } catch (error) {
      console.error("Task error:", error);
      toast.error(error.response.data.message || "Task failed occurred");
    } finally {
      setModalOpen(false);
      setTimeout(() => {
        loadBacklogData();
      }, 1500);
    }
  };

  const handleUpdateBug = async (data) => {
    console.log("Creating bug with data:", data);
    console.log("Selected projectId:", data.projectId);

    const startDateFormatted = formatToLocalDateTime(data.start_date);
    const endDateFormatted = formatToLocalDateTime(data.end_date);

    // Validate dates here (optional — Yup can also handle this)
    if (!startDateFormatted || !endDateFormatted) {
      toast.error("Please select valid start and end dates.");
      return;
    }

    const payload = {
      title: data.title.trim(),
      description: data.description.trim(),
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      actualStartDate: startDateFormatted,
      actualEndDate: endDateFormatted,
      priority: data.priority,
      assignedToId: data.assignedToId,
      projectId: data.projectId,
      sprintId: data.sprintId || null,
      storyId: data.storyId || null,
      storyPoint: Number(data.storyPoint) || 0,
    };
    try {
      const response = await updateBug(data.id, payload);
      console.log(response);
      if (response) {
        toast.success("Bug Updated successfully!");
      }
    } catch (error) {
      console.error("Task error:", error);
      toast.error(error.response.data.message || "Bug failed occurred");
    } finally {
      setModalOpen(false);
      setTimeout(() => {
        loadBacklogData();
      }, 1500);
    }
  };

  const handleUpdate = async (row) => {
    console.log(row);
    let fields = [];
    let title = "";
    let initialValues = {};
    let onSubmitHandler = null;

    // Handle both new (STORY, TASK, BUG) and old (Story, Task, Bug) formats

    const rowType = row.type?.toUpperCase();

    //api call here, get type by id and provide the obj returned by the api call to initialValues
    switch (rowType) {
      case "STORY":
        fields = updateStoryFields(sprints);
        title = "Edit Story";
        const storyObj = await getStoryById(row.backendId);
        const storyFrontendData = {
          ...storyObj,
          start_date: storyObj.startDate
            ? storyObj.startDate.split("T")[0]
            : "",
          end_date: storyObj.endDate ? storyObj.endDate.split("T")[0] : "",
        };

        // Remove old keys
        delete storyFrontendData.startDate;
        delete storyFrontendData.endDate;
        initialValues = storyFrontendData;
        onSubmitHandler = (values) => handleUpdateStory(values);

        break;
      case "BUG":
        fields = updateBugFields(employees);
        title = "Edit Bug";
        const bugObj = await getBugById(row.backendId);
        const bugFrontendData = {
          ...bugObj,
          start_date: bugObj.startDate ? bugObj.startDate.split("T")[0] : "",
          end_date: bugObj.endDate ? bugObj.endDate.split("T")[0] : "",
        };

        // Remove old keys
        delete bugFrontendData.startDate;
        delete bugFrontendData.endDate;

        initialValues = bugFrontendData;
        onSubmitHandler = (values) => handleUpdateBug(values);

        break;
      case "TASK":
        fields = updateTaskFields(employees);
        title = "Edit Task";
        const taskObj = await getTaskById(row.backendId);
        const taskFrontendData = {
          ...taskObj,
          start_date: taskObj.startDate ? taskObj.startDate.split("T")[0] : "",
          end_date: taskObj.endDate ? taskObj.endDate.split("T")[0] : "",
        };

        // Remove old keys
        delete taskFrontendData.startDate;
        delete taskFrontendData.endDate;
        initialValues = taskFrontendData;
        onSubmitHandler = (values) => handleUpdateTask(values);
        break;

      default:
        return;
    }

    // Construct initial values from the fields

    // fields.forEach((field) => {
    //   initialValues[field.name] = row[field.name] ?? ""; // Fallback to empty string
    // });

    setModalFields(fields);
    setModalTitle(title);
    setModalInitialValues(initialValues);
    setProjectId(initialValues.projectId);
    setModalEntityType(row.type);
    setClickedTypeId(row.backendId);
    setModalSubmitMethod(() => (values) => onSubmitHandler(values));
    setModalOpen(true);
  };

  console.log(modalSubmitMethod);
  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  console.log(modalInitialValues);
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
        <div>
          <Box
            sx={{
              width: "90%",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              marginTop: -1,
              position: "relative",
            }}
          >
            {/* Error Alert */}
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {/* Filter Tabs */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: -1,
              }}
            >
              <ToggleButtonGroup
                value={filter}
                onChange={handleFilterChange}
                exclusive
                aria-label="work item type"
                sx={{
                  gap: 2,
                  width: "100%",
                  position: "relative",
                  "& .MuiToggleButton-root": {
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.3)",
                    textTransform: "none",
                    borderRadius: "8px !important",
                    border: "1px solid #e0e0e0 !important",
                    padding: "8px 24px",
                    margin: "0 2px",
                    transition: "all 0.3s ease",
                    "&.Mui-selected": {
                      boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
                      backgroundColor: "#000000",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#333333",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  },
                }}
              >
                <ToggleButton value="all" aria-label="all">
                  All Items
                </ToggleButton>
                <ToggleButton value="story" aria-label="stories">
                  Stories
                </ToggleButton>
                <ToggleButton value="task" aria-label="tasks">
                  Tasks
                </ToggleButton>
                <ToggleButton value="bug" aria-label="bugs">
                  Bugs
                </ToggleButton>

                {filteredRows.length !==0 && <FaFilePdf
                  size={25}
                  color="red"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => exportPDF(rows, columns)}
                />}
              </ToggleButtonGroup>
            </Box>

            {/* DataGrid */}
            {filteredRows.length === 0 && <p className="text-center fs-5 fw-bold">No Backlog Data for a moment</p>}
            <Box
              sx={{
                boxShadow: 3,
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "white",
              }}
            >
              
              <DataGrid
                rows={filteredRows}
                columns={columns}
                getRowId={(row) => row.gridId} // tell DataGrid which field to use
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 8,
                    },
                  },
                }}
                pageSizeOptions={[8]}
                autoHeight={true}
                hideFooterSelectedRowCount
                sx={{
                  "& .MuiDataGrid-virtualScroller": {
                    overflow: "hidden !important",
                  },
                  "& .MuiDataGrid-main": {
                    overflow: "hidden !important",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    justifyContent: "center",
                  },
                }}
              />
            </Box>
          </Box>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Box sx={{ p: 1, minWidth: 150 }}>
              {editing.options.map((opt) => (
                <Box
                  key={opt}
                  sx={{
                    p: 1,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#eee" },
                  }}
                  onClick={() => handleValueChange(opt)}
                >
                  {opt}
                </Box>
              ))}
            </Box>
          </Popover>
          <LogoutModal
            open={logoutModalOpen}
            onClose={() => setLogoutModalOpen(false)}
            onConfirm={handleDelete}
            text={"Are you sure you want to delete ?"}
            btnRightText={"Delete"}
          />
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      )}
      <EntityFormModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        title={modalTitle}
        fields={modalFields}
        initialValues={modalInitialValues}
        onSubmit={modalSubmitMethod}
        gridLayout={true}
        id={clickedTypeId}
        fetchSprint={true}
        submitLabel={isUpdating ? "Updating..." : "Update"}
      />
    </>
  );
}
