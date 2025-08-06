import React from 'react'
import { useState } from 'react';
import {
  Button,
  Box
}from '@mui/material';
import EntityFormModal from '../../../components/BaseModal/BaseEntityModal';
import storyFields from '../../../FormConfigs/storyFields';
function MgrBacklog() {


  const [openModal, setOpenModal] = useState(false);
    
      const handleCreateStory = (data) => {
        console.log("Story Created:", data);
        // TODO: call your API here
        setOpenModal(false);
      };
  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
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
    </div>
  )
}

export default MgrBacklog
