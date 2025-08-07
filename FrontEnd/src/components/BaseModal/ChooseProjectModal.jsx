import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function ChooseProjectModal({
  showModal,
  setShowModal,
  showMainUI,
  setShowMainUI,
  selectedOption,
  setSelectedOption,
}) {
  const handleClose = () => {
    setShowModal(false);
    setShowMainUI(true);
  };

  return (
    <Modal show={showModal} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Choose Project First</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          aria-label="Dropdown select"
        >
          <option value="">-- Select Option --</option>
          <option value="one">Option One</option>
          <option value="two">Option Two</option>
          <option value="three">Option Three</option>
          
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
