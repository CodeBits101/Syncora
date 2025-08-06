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
  
    const handleCreateTask = (data) => {
      console.log("Task Created:", data);
      // TODO: call your API here
      setOpenModal(false);
    };

  return (
    <div>
<h1>common template 'Tasks' for manager, developer</h1>
    <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          + Create Task
        </Button>
      </Box>
      <EntityFormModal
              open={openModal}
              handleClose={() => setOpenModal(false)}
              title="Create Task"
              fields={taskFields}
              initialValues={{
                title: "",
                description: "",
                start_date: "",
                end_date: "",
                status: "",
                assigned_to: "",
                priority:"",
                project_id:"",
                sprint_id:"",
                story_id:""
              }}
              onSubmit={handleCreateTask}
            />
    </div>
  )
}

export default Tasks
