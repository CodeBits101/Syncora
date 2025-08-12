import React, { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { Dropdown } from "react-bootstrap";

import EntityFormModal from "../../../components/BaseModal/BaseEntityModal";
import { storyFields } from "../../../FormConfigs/storyFields";

import BacklogTable from "../../../components/BacklogTable/BacklogTable";
import { sprintFields } from "../../../FormConfigs/sprintFields";
import { taskFields } from "../../../FormConfigs/taskFields";
import { bugFields } from "../../../FormConfigs/bugFields";
import {
  addBug,
  addStory,
  addTask,
  createSprint,
  getAllInprogressProjects,
  getEmployeesByProjectId,
  getSprintByProjectId,
  getUnassignedEmpList,
} from "../../../services/manager/manager";
import { ToastContainer, toast } from "react-toastify";
import { formatToLocalDateTime } from "../../../utils/formatToLocalDateTime";
import { getEmployeeByRole } from "../../../services/main/auth";

const DropDown = ({ options, value, handleChange, selectedOption }) => {
  return (
    <Dropdown onSelect={handleChange}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedOption ? `Create ${selectedOption}` : "Select Action"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="sprint">Create sprint</Dropdown.Item>
        <Dropdown.Item eventKey="story">Create story</Dropdown.Item>
        <Dropdown.Item eventKey="task">Create task</Dropdown.Item>
        <Dropdown.Item eventKey="bug">Create bug</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

function MgrBacklog() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [inProgressProject, setInProgressProject] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loadStatus, setLoadStatus] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const userRole = localStorage.getItem("role");

  //fetching in progress projects
  const fetchInProgressProjects = async () => {
    try {
      const response = await getAllInprogressProjects();
      console.log(response);
      setInProgressProject(response);
      console.log(inProgressProject);
    } catch (error) {
      console.error("Error fetching in-progress projects:", error);
      toast.error("Failed to fetch in-progress projects.");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployeesByProjectId(selectedProject);
      console.log(response);
      // Assuming response contains employees data
      setEmployees(response);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees.");
    }
  };

  //to be passed to above prop
  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    console.log("Selected:", eventKey);
    // Open your modal based on selectedOption here
    setOpenModal(true);
  };

  //Create Story logic

  const handleCreateStory = async (data) => {
    console.log("Creating story with data:", data);
    console.log("Selected projectId:", data.projectId);

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
      currentSprint: data.sprintId,
      project: data.projectId,
      createdBy: localStorage.getItem("empId") || Cookies.get("empId"),
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      actualStartDate: startDateFormatted,
      actualEndDate: endDateFormatted,
    };

    console.log(payload);
    const response = await addStory(payload);
    console.log(response);
    if (response) {
      toast.success("Story created successfully!");
      setLoadStatus(!loadStatus);
    }
    console.log("Story Created:", payload);
    // TODO: call your API here
    setOpenModal(false);
  };

  //create TASK api

  const handleCreateTask = async (data) => {
    // Format dates
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
      const response = await addTask(payload);
      if (response) {
        toast.success("Task created successfully!");
        setLoadStatus(!loadStatus);
      }
      setOpenModal(false);
    } catch (error) {
      console.error("Task error:", error);
      toast.error(error.response.data.message || "Task failed occurred");
    }
  };

  const handleCreateBug = async (data) => {
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
      const response = await addBug(payload);
      console.log(response);
      if (response) {
        toast.success("Bug created successfully!");
        setLoadStatus(!loadStatus);
      }
      setOpenModal(false);
    } catch (error) {
      console.error("Task error:", error);
      toast.error(error.response.data.message || "Bug failed occurred");
    }
  };

  const handleCreateSprint = async (data) => {
    console.log("Create Sprint is clicked :: ");
    const payload = {
      ...data,
      managerId: localStorage.getItem("empId") || Cookies.get("empId"),
      projectId: selectedProject,
      startDate: formatToLocalDateTime(data.startDate),
      endDate: formatToLocalDateTime(data.endDate),
    };
    try {
      const createdSprint = await createSprint(payload);
      console.log("Sprint created :", createdSprint);
      setOpenModal(false);
      toast.success("Sprint Created Successfully");
    } catch (error) {
      console.error("Failed to create Sprint", error);
      toast.error("Sprint Creation failed");
    }
  };

  const getModalProps = () => {
    switch (selectedOption) {
      case "story":
        return {
          title: "Create Story",
          fields: storyFields(inProgressProject),
          initialValues: { title: "", description: "", storyPoint: "" },
          onSubmit: handleCreateStory,
        };
      case "sprint":
        return {
          title: "Create Sprint",
          fields: sprintFields,
          initialValues: {
            sprintName: "",
            description: "",
            startDate: "",
            endDate: "",
            status: "BACKLOG",
          },
          onSubmit: handleCreateSprint,
        };

      case "task":
        return {
          title: "Create Task",
          fields: taskFields(inProgressProject, employees),
          initialValues: {
            title: "",
            priority: "",
            projectId: "",
            description: "",
            assignedToId: "",
            start_date: "",
            end_date: "",
            storyPoint: "",
            sprintId: "",
            storyId: "",
            createdById: localStorage.getItem("empId") || Cookies.get("empId"),
          },
          onSubmit: handleCreateTask,
          gridLayout: true, //  want a grid layout for tasks
        };
      case "bug":
        return {
          title: "Create Bug",
          fields: bugFields(inProgressProject, employees),
          initialValues: {
            title: "",
            priority: "",
            projectId: "",
            description: "",
            assignedToId: "",
            start_date: "",
            end_date: "",
            storyPoint: "",
            sprintId: "",
            storyId: "",
            createdById: localStorage.getItem("empId") || Cookies.get("empId"),
          },
          onSubmit: handleCreateBug,
          gridLayout: true, // want a grid layout for bugs
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    fetchInProgressProjects();
    fetchEmployees();
  }, [selectedProject]);

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <DropDown handleChange={handleSelect} selectedOption={selectedOption} />

        {selectedOption && (
          <EntityFormModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            {...getModalProps()}
          />
        )}
      </Box>
      <BacklogTable
        loadStatus={loadStatus}
        selectedOption={selectedProject}
        setSelectedOption={setSelectedProject}
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
  );
}

export default MgrBacklog;
