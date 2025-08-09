import React, { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { Dropdown } from "react-bootstrap";

import EntityFormModal from "../../../components/BaseModal/BaseEntityModal";
import storyFields from "../../../FormConfigs/storyFields";

import BacklogTable from "../../../components/BacklogTable/BacklogTable";
import { sprintFields } from "../../../FormConfigs/sprintFields";
import { taskFields } from "../../../FormConfigs/taskFields";
import { bugFields } from "../../../FormConfigs/bugFields";
import {
  addStory,
  addTask,
  getAllInprogressProjects,
  getSprintByProjectId,
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
      const response = await getEmployeeByRole("ROLE_DEVELOPER");
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
      }
      setOpenModal(false);
    } catch (error) {
      console.error("Task error:", error);
      toast.error(error.response.data.message || "Login failed occurred");
    }

    // TODO: Replace this with your actual API call
    // await api.createTask(payload);
  };

  const handleCreateBug = (data) => {
    console.log("Creating bug with data:", data);
    console.log("Selected projectId:", formData.projectId);
    const payload = {
      ...data,
      sprintId: "",
      projectId: "",
    };
    console.log("Story Created:", payload);
    // TODO: call your API here
    setOpenModal(false);
  };
  const handleCreateSprint = (data) => {
    console.log("Creating bug with data:", data);
    console.log("Selected projectId:", formData.projectId);
    const payload = {
      ...data,
      sprintId: "",
      projectId: "",
    };
    console.log("Story Created:", payload);
    // TODO: call your API here
    setOpenModal(false);
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
          initialValues: { name: "", duration: "" },
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
          initialValues: { title: "", priority: "" },
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
  }, []);

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
      <BacklogTable />
    </div>
  );
}

export default MgrBacklog;
