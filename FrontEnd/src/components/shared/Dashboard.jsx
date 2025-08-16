import React, { useState } from "react";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";
import ProjectDetails from './ProjectDetails';
import { Box } from "@mui/material";

function Dashboard() {
  const [showModal, setShowModal] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <Box sx={{
          width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f6faff",
        overflow: "hidden",      
      }}
    >
      <ChooseProjectModal
        showModal={showModal}
        showMainUI={showMainUI}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        setShowModal={setShowModal}
        setShowMainUI={setShowMainUI}
      />
      {showMainUI && (
        <Box sx={{
            flex: 1,
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}>
          <ProjectDetails projectId = {selectedOption}/>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
