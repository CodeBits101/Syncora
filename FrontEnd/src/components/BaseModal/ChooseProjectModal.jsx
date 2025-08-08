import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

export default function ChooseProjectModal({
  showModal,
  setShowModal,
  showMainUI,
  setShowMainUI,
  selectedOption,
  setSelectedOption,
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const managerId = localStorage.getItem("empId");

  const handleClose = () => {
    setShowModal(false);
    setShowMainUI(true);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching projects for manager:", managerId);

      const res = await axios.get(
        `http://localhost:8080/projects/manager/${managerId}`
      );

      console.log("Projects API response:", res.data);
      setProjects(res.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModal && managerId) {
      fetchProjects();
      
    }
  }, [showModal, managerId]);

  if (!showModal) return null;

  return (
    <Modal show={showModal} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Choose Project First</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" />
            <div>Loading projects...</div>
          </div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : (
          <Form.Select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            aria-label="Dropdown select"
          >
            <option value="">-- Select Option --</option>
  {projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.projectTitle}
    </option>
            ))}
          </Form.Select>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleClose}
          disabled={!selectedOption}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}