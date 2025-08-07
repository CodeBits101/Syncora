import React from 'react'
import {
  Button,
  Box
}from '@mui/material';
import { useState } from 'react';
import EntityFormModal from '../BaseModal/BaseEntityModal';
import { taskFields } from '../../FormConfigs/taskFields';


function Tasks() {

    const [openModal, setOpenModal] = useState(false);
    const userRole = localStorage.getItem("role");
    const handleCreateTask = (data) => {
      const payload = {
        ...data,
        projectId:"",
        sprintId:"",
        storyId:""        
        
      }
      console.log("Task Created:", payload);
      // TODO: call your API here
      setOpenModal(false);
    };

  return (
    <div>
<h1>common template 'Tasks' for manager, developer</h1>
    <Box display="flex" justifyContent="flex-end" mb={2}>
        {(userRole === "ROLE_MANAGER" || userRole === "ROLE_DEVELOPER") && 
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          + Create Task
        </Button>
        }
        
      </Box>
      <EntityFormModal
              open={openModal}
              handleClose={() => setOpenModal(false)}
              title="Create Task"
              fields={taskFields}
              initialValues={{
                title: "",
                description: "",
                startDate: "",
                endDate: "",
                status: "BACKLOG",
                assignedToId: "",
                priority:"",
              }}
              onSubmit={handleCreateTask}
            />
    </div>
  )
}

export default Tasks
