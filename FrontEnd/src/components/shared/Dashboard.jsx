import React, { useState } from "react";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";
import ProjectDetails from './ProjectDetails';

function Dashboard() {
  const [showModal, setShowModal] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <>
      <ChooseProjectModal
        showModal={showModal}
        showMainUI={showMainUI}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        setShowModal={setShowModal}
        setShowMainUI={setShowMainUI}
      />
      {showMainUI && (
        <div>
          <ProjectDetails/>
        </div>
      )}
    </>
  );
}

export default Dashboard;
