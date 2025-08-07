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
          onChange={(e) => {
            setSelectedOption(e.target.value)
            // setProjectId(e.target.value)
          }}
          aria-label="Dropdown select"
        >
          <option value="">-- Select Option --</option>
          <option value="101">Syncora Example Project</option>
          <option value="102">Another Project</option>
          <option value="103">Amazon S3 Bucket</option>
          <option value="two">Option Two</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
          <option value="three">Option Three</option>
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
