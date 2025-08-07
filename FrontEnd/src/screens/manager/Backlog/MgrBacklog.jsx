import React from 'react'
import { useState } from 'react';
import {
  Button,
  Box
}from '@mui/material';
import EntityFormModal from '../../../components/BaseModal/BaseEntityModal';
import storyFields from '../../../FormConfigs/storyFields';
import BacklogTable from "../../../components/BacklogTable/BacklogTable";

function MgrBacklog() {


  const [openModal, setOpenModal] = useState(false);
    
      const handleCreateStory = (data) => {
        console.log("Story Created:", data);
        // TODO: call your API here
        setOpenModal(false);
      };
  return (
    <div>
      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" color="success" onClick={() => setOpenModal(true)}>
          + Create Story
        </Button>


        <EntityFormModal
                      open={openModal}
                      handleClose={() => setOpenModal(false)}
                      title="Create Story"
                      fields={storyFields}
                      initialValues={{
                        title: "",
                        description: "",
                        start_date: "",
                        end_date: "",
                        storyPoint:""
                      }}
                      onSubmit={handleCreateStory}
        />
      </Box>
      <BacklogTable/>
    </div>
    
    
  )
}

export default MgrBacklog
