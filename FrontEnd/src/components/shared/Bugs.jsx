import React from 'react'
import {
  Button,
  Box
}from '@mui/material';
import { useState } from 'react';
import EntityFormModal from '../BaseModal/BaseEntityModal';
import { bugFields } from './../../FormConfigs/bugFields';

function Bugs() {

   const [openModal, setOpenModal] = useState(false);
    const userRole = localStorage.getItem("role");
      const handleCreateBug = (data) => {
        const payload = {
          ...data,
          projectId:"",
          storyId:"",
          reportedById:""

        }
        console.log("Bug Created:", payload);
        // TODO: call your API here
        setOpenModal(false);
      };
  

  return (
    <div>
      <h1>common template 'Bugs' page for Manager, developer, tester</h1>

      {
        userRole === "ROLE_TESTER" && 
              <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                + Create Bug
              </Button>
      }
      <Box display="flex" justifyContent="flex-end" mb={2}>
            </Box>
      
      
      
            <EntityFormModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    title="Create Bug"
                    fields={bugFields}
                    initialValues={{
                      title: "",
                      description: "",
                      status: "BACKLOG",
                      priority:"",
                      assignedToId: "",
                    }}
                    onSubmit={handleCreateBug}
                  />


    </div>
  )
}

export default Bugs
