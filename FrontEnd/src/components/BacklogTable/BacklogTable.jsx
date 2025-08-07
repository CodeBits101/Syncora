import React, { useState } from "react";
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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BugReportIcon from "@mui/icons-material/BugReport";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";
import { exportPDF } from "../../utils/exportToPdf";

const typeIcons = {
  Task: <TaskAltIcon fontSize="small" color="primary" />,
  Bug: <BugReportIcon fontSize="small" color="error" />,
  Story: <BookmarkBorderOutlinedIcon fontSize="small" color="success" />,
};

const statusOptions = ["To Do", "In Progress", "Done"];

const initialRows = [
  {
    id: 1,
    title: "Create user login/signup",
    type: "Story",
    priority: "High",
    assignee: "Alice",
    child: [
      {
        id: 101,
        title: "Design login/signup UI",
        type: "Task",
        priority: "Medium",
        assignee: "Bob",
      },
      {
        id: 102,
        title: "Fix error on signup form submission",
        type: "Bug",
        priority: "High",
        assignee: "Charlie",
      },
    ],
  },
  {
    id: 2,
    title: "Create project dashboard",
    type: "Story",
    priority: "Medium",
    assignee: "YRC",
    child: [
      {
        id: 103,
        title: "Implement dashboard layout",
        type: "Task",
        priority: "High",
        assignee: "Diana",
      },
    ],
  },
  {
    id: 3,
    title: "Add backlog UI",
    type: "Story",
    priority: "High",
    assignee: "Ethan",
    child: [
      {
        id: 104,
        title: "Bug: UI flickers on scroll",
        type: "Bug",
        priority: "Medium",
        assignee: "Fiona",
      },
    ],
  },
  {
    id: 4,
    title: "Implement notifications system",
    type: "Story",
    priority: "High",
    assignee: "Grace",
    child: [
      {
        id: 105,
        title: "Create real-time push module",
        type: "Task",
        priority: "High",
        assignee: "Henry",
      },
      {
        id: 106,
        title: "Bug: Notifications show duplicate entries",
        type: "Bug",
        priority: "Medium",
        assignee: "Ivy",
      },
    ],
  },
  {
    id: 5,
    title: "Design API documentation portal",
    type: "Story",
    priority: "Medium",
    assignee: "Jack",
    child: [],
  },
  {
    id: 6,
    title: "Fix login redirect bug",
    type: "Bug",
    priority: "High",
    assignee: "YRC",
  },
  {
    id: 7,
    title: "Optimize DB queries for analytics",
    type: "Task",
    priority: "Low",
    assignee: "Karen",
  },
  {
    id: 8,
    title: "Refactor auth middleware",
    type: "Task",
    priority: "Medium",
    assignee: "Liam",
  },
  {
    id: 9,
    title: "Fix XSS vulnerability in contact form",
    type: "Bug",
    priority: "High",
    assignee: "Mona",
  },
  {
    id: 10,
    title: "Mobile layout bug on dashboard",
    type: "Bug",
    priority: "Medium",
    assignee: "Nina",
  },
  {
    id: 11,
    title: "Create onboarding tutorial",
    type: "Story",
    priority: "Medium",
    assignee: "Oscar",
    child: [
      {
        id: 107,
        title: "Bug: Tutorial steps freeze on step 3",
        type: "Bug",
        priority: "High",
        assignee: "Paul",
      },
    ],
  },
  {
    id: 12,
    title: "Setup internationalization",
    type: "Task",
    priority: "Low",
    assignee: "Quinn",
  },
  {
    id: 13,
    title: "Performance regression in search",
    type: "Bug",
    priority: "High",
    assignee: "Rachel",
  },
  {
    id: 14,
    title: "Redesign settings panel",
    type: "Story",
    priority: "Medium",
    assignee: "Steve",
    child: [
      {
        id: 108,
        title: "Build privacy control section",
        type: "Task",
        priority: "High",
        assignee: "Tina",
      },
    ],
  },
  {
    id: 15,
    title: "File export bug in Safari (iOS 15+)",
    type: "Bug",
    priority: "High",
    assignee: "Uma",
  },
];

export default function BacklogTable() {
  const [showModal, setShowModal] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [rows, setRows] = React.useState(initialRows);
  const [filter, setFilter] = React.useState("all"); // 'all', 'story', 'task', 'bug'
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editing, setEditing] = React.useState({
    rowId: null,
    field: "",
    options: [],
  });

  // Filter rows based on selected tab
  const filteredRows =
    filter === "all"
      ? rows
      : rows.filter((row) => row.type.toLowerCase() === filter);

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
            alignItems: "center", // This vertically centers content
            height: "100%", // Takes full row height
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
            {/* Filter Tabs */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: -1, // Added space below the tabs
              }}
            >
              <ToggleButtonGroup
                value={filter}
                onChange={handleFilterChange}
                exclusive
                aria-label="work item type"
                sx={{
                  gap: 2, // Space between buttons
                  width: "100%",
                  position: "relative",
                  "& .MuiToggleButton-root": {
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.3)",
                    textTransform: "none",
                    borderRadius: "8px !important",
                    border: "1px solid #e0e0e0 !important",
                    padding: "8px 24px", // Increased horizontal padding
                    margin: "0 2px", // Additional spacing
                    transition: "all 0.3s ease",
                    "&.Mui-selected": {
                      boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
                      backgroundColor: "#000000", // Black when selected
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#333333", // Darker black on hover
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
                    justifyContent: "center", // Center the pagination
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
    </>
  );
}
