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
import storyFields from "../../FormConfigs/storyFields";
import { taskFields } from "../../FormConfigs/taskFields";
import { bugFields } from "../../FormConfigs/bugFields";
import { getBacklogItems } from "./backlogService";

const typeIcons = {
  STORY: <BookmarkBorderOutlinedIcon fontSize="small" color="success" />,
  TASK: <TaskAltIcon fontSize="small" color="primary" />,
  BUG: <BugReportIcon fontSize="small" color="error" />,
  // Keep backward compatibility with old format
  Story: <BookmarkBorderOutlinedIcon fontSize="small" color="success" />,
  Task: <TaskAltIcon fontSize="small" color="primary" />,
  Bug: <BugReportIcon fontSize="small" color="error" />,
};

const statusOptions = ["To Do", "In Progress", "Done"];

export default function BacklogTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState([]);
  const [modalInitialValues, setModalInitialValues] = useState({});
  const [modalEntityType, setModalEntityType] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
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

  // Load backlog data when project is selected
  useEffect(() => {
    if (selectedOption && showMainUI) {
      loadBacklogData();
    }
  }, [selectedOption, showMainUI]);

  const loadBacklogData = async () => {
    if (!selectedOption) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Extract project ID from selectedOption (assuming it's the project ID)
      const projectId = selectedOption;
      const data = await getBacklogItems(projectId);
      setRows(data);
    } catch (err) {
      console.error('Failed to load backlog data:', err);
      setError('Failed to load backlog data. Please try again.');
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

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
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
          HIGH: { color: "#ff4444", fontWeight: 400 },
          MEDIUM: { color: "#ffbb33", fontWeight: 400 },
          LOW: { color: "#00C851", fontWeight: 400 },
          // Keep backward compatibility
          High: { color: "#ff4444", fontWeight: 400 },
          Medium: { color: "#ffbb33", fontWeight: 400 },
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
              handleDelete(params.row.id);
            }}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleUpdate = (row) => {
    let fields = [];
    let title = "";

    // Handle both new (STORY, TASK, BUG) and old (Story, Task, Bug) formats
    const rowType = row.type?.toUpperCase();
    
    switch (rowType) {
      case "STORY":
        fields = storyFields;
        title = "Edit Story";
        break;
      case "BUG":
        fields = bugFields;
        title = "Edit Bug";
        break;
      case "TASK":
        fields = taskFields;
        title = "Edit Task";
        break;
      default:
        return;
    }

    // Construct initial values from the fields
    const initialValues = {};
    fields.forEach((field) => {
      initialValues[field.name] = row[field.name] ?? ""; // Fallback to empty string
    });

    setModalFields(fields);
    setModalTitle(title);
    setModalInitialValues(initialValues);
    setModalEntityType(row.type);
    setModalOpen(true);
  };

  const handleModalSubmit = (updatedValues) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedValues.id ? { ...row, ...updatedValues } : row
      )
    );
    setModalOpen(false);
  };

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

                <FaFilePdf
                  size={25}
                  color="red"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => exportPDF(rows, columns)}
                />
              </ToggleButtonGroup>
            </Box>

            {/* DataGrid */}
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
        </div>
      )}
      <EntityFormModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        title={modalTitle}
        fields={modalFields}
        initialValues={modalInitialValues}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}
