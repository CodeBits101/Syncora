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
import { getAllInprogressProjects } from "../../../services/manager/manager";

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
  const[inProgressProject,setInProgressProject] = useState([]) ;
  
  //fetching in progress projects 
  const fetchInProgressProjects = async () => {
    try {
      const response = await getAllInprogressProjects() ;
      console.log(response)
      setInProgressProject(response) ;  
      console.log(inProgressProject)
    } catch (error) {
      console.error("Error fetching in-progress projects:", error);
      toast.error("Failed to fetch in-progress projects.");
    }
  }

  //to be passed to above prop
  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    console.log("Selected:", eventKey);
    // Open your modal based on selectedOption here
    setOpenModal(true);
  };

  const handleCreateStory = (data) => {
    console.log("Creating story with data:", data);
    console.log("Selected projectId:", data.projectId);

    const startDateFormatted = formatToLocalDateTime(data.startDate);
    const endDateFormatted = formatToLocalDateTime(data.endDate);

    if (!startDateFormatted || !endDateFormatted) {
      toast.error("Please select valid start and end dates.");
      return;
    }

    const payload = {
      ...data,
      title: data.title,
      description: data.description,
      sprintId: data.sprintId,
      projectId: data.projectId,
      createdBy: localStorage.getItem("empId") || Cookies.get("empId"),
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      actualStartDate: startDateFormatted,
      actualEndDate: endDateFormatted,
    };
    console.log("Story Created:", payload);
    // TODO: call your API here
    setOpenModal(false);
  };

  const handleCreateTask = (data) => {
    console.log("Creating task with data:", data);
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
    console.log("Creating sprint with data:", data);
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
          fields: taskFields,
          initialValues: { title: "", priority: "" },
          onSubmit: handleCreateTask,
        };
      case "bug":
        return {
          title: "Create Bug",
          fields: bugFields,
          initialValues: { title: "", priority: "" },
          onSubmit: handleCreateBug,
        };
      default:
        return {};
    }
  };


  useEffect(()=>{
    fetchInProgressProjects() ; 
  } , [])

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
