import React, { useState } from "react";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";

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
          <h1>
            common template 'Dashboard' page for manager,developer, tester
          </h1>
        </div>
      )}
    </>
  );
}

export default Dashboard;
