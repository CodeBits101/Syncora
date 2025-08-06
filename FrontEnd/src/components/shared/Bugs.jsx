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
    
      const handleCreateBug = (data) => {
        console.log("Bug Created:", data);
        // TODO: call your API here
        setOpenModal(false);
      };
  

  return (
    <div>
      <h1>common template 'Bugs' page for Manager, developer, tester</h1>


      <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                + Create Bug
              </Button>
            </Box>
      
      
      
            <EntityFormModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    title="Create Bug"
                    fields={bugFields}
                    initialValues={{
                      title: "",
                      description: "",
                      status: "",
                      priority:"",
                      start_date: "",
                      end_date: "",
                      assigned_to: "",
                      task_id:"",
                      reported_by:""
                    }}
                    onSubmit={handleCreateBug}
                  />


    </div>
  )
}

export default Bugs
