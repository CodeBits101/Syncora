import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import trimToWords from "../../utils/trimToWords";
import { colors } from "../../utils/color";
import "./ProjectStatus.css";
import {
  deleteProject,
  getCurrentProjectEmpList,
  getProjectsByStatus,
  getUnassignedEmpList,
  updateProject,
} from "../../services/manager/manager";
import ProjectStatusMap from "../../components/shared/ProjectStatusMap";
import EntityFormModal from "./../../components/BaseModal/BaseEntityModal";
import { editProjectFields } from "../../FormConfigs/projectFields";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteProjectModal from "../../components/shared/DeleteProjectModal";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProjectCard = ({ project, bgColor, status, onEdit, onDelete }) => {
  const navigate = useNavigate();
  console.log(status);
  return (
    <Card className="project-card h-100" style={{ backgroundColor: bgColor }}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title className="fw-bold fs-5 text-white">
            {trimToWords(project.title, 3) || "No Project"}
          </Card.Title>
          <Card.Text className="mb-1">
            <div className="d-flex align-items-center">
               <IconButton
                size="medium"
                onClick={() => onEdit(project)}
                color="primary"
              >
                <EditIcon fontSize="medium" />
              </IconButton>
              <IconButton
                size="medium"
                onClick={() => {
                  onDelete(project.id);
                }}
                color="error"
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
              <ProjectStatusMap status={status} />
             
            </div>
          </Card.Text>
        </div>
        <Card.Subtitle className="mb-2 text-white-50">
          {project.projectCode}
        </Card.Subtitle>
        <Card.Text className="mb-1 text-white">
          <span className="fw-semibold">Manager Name:</span>{" "}
          {trimToWords(project.managerName, 1) || "No Manager"}
        </Card.Text>

        <div className="d-flex justify-content-evenly align-items-center mt-2 " style={{marginLeft:'-7%'}}>
          <Card.Link
            className="hyperlink text-white"
            onClick={() => navigate("/scrumBoard")}
          >
            View Task
          </Card.Link>
          <Card.Link
            className="hyperlink text-white"
            onClick={() => navigate("/projectdetails")}
          >
            View Project Details
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default function ProjectStatus() {
  const { status } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [employeesToAdd, setAddEmpList] = useState([]);
  const [employeesToRemove, setRemoveEmpList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getProjectsByStatus(status);
      console.log(data);
      setProjects(data);
    } catch (err) {
      setErrorMsg("Failed to fetch projects. Please try again later.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [status]);

  const toDateInputValue = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 10); // "yyyy-MM-dd"
  };

  const toISOStringWithTime = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toISOString();
  };

  const onEdit = async (project) => {
    try {
      const data1 = await getUnassignedEmpList();
      const data2 = await getCurrentProjectEmpList(project.id);

      setAddEmpList(
        data1.map((emp) => ({
          id: emp.id,
          empName: emp.empName,
          department: emp.department,
          empRole: emp.empRole,
          currentManager: emp.currentManager,
        }))
      );
      setRemoveEmpList(
        data2.map((emp) => ({
          id: emp.id,
          empName: emp.empName,
          department: emp.department,
          empRole: emp.empRole,
          currentManager: emp.currentManager,
        }))
      );
      setSelectedProject(project);
      setOpenEditModal(true);
    } catch (error) {
      console.error("Failed to fetch employee lists:", error);
    }
  };

  const onDelete = (id) => {
    setSelectedProjectId(id);
    setOpenDeleteModal(true);
  };

  const handleUpdateProject = async (formValues, { setSubmitting }) => {
    try {
      const payload = {
        title: formValues.title,
        description: formValues.description,
        startDate: toISOStringWithTime(formValues.startDate),
        endDate: toISOStringWithTime(formValues.endDate),
        projectStatus: formValues.project_status || formValues.projectStatus,
        managerId: formValues.managerId,
        employeesToAdd: formValues.employeesToAdd || [],
        employeesToRemove: formValues.employeesToRemove || [],
      };

      console.log("Updated project data:", payload);

      await updateProject(selectedProject.id, payload);

      await fetchProjects();

      setOpenEditModal(false);
      setSelectedProject(null);
      setAddEmpList(null);
      setRemoveEmpList(null);
      toast.success("Project updated successfully...");
    } catch (error) {
      toast.error("Failed to update project:");
      console.log("Failed to update project", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject(selectedProjectId);
      toast.success("Project is deleted successfully");
      setOpenDeleteModal(false);
      await fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project!");
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-light min-vh-100 cursor-pointer">
      <ToastContainer position="top-right" autoClose={1500} />
      <Container>
        <h2 className="mb-4 text-center text-dark fw-semibold">
          {status.toUpperCase()} PROJECTS
        </h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : errorMsg ? (
          <div className="text-danger text-center fs-5">{errorMsg}</div>
        ) : projects.length === 0 ? (
          <div className="text-muted text-center fs-5">
            No projects found for status: <strong>{status}</strong>
          </div>
        ) : (
          <Row className="g-4">
            {projects.map((project, index) => {
              const bgColor = colors[index % colors.length];
              return (
                <Col key={project.id} xs={12} sm={6} md={4} lg={3}>
                  <ProjectCard
                    project={project}
                    status={status}
                    bgColor={bgColor}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
      <EntityFormModal
        open={openEditModal}
        handleClose={() => {
          setOpenEditModal(false);
          setSelectedProject(null);
        }}
        title="Edit Project"
        fields={editProjectFields(employeesToAdd, employeesToRemove)}
        initialValues={
          selectedProject
            ? {
                title: selectedProject.title || "",
                description: selectedProject.description || "",
                startDate: toDateInputValue(selectedProject.startDate) || "",
                endDate: toDateInputValue(selectedProject.endDate) || "",
                projectStatus: selectedProject.projectStatus || "INPROGRESS",
                managerId: selectedProject.managerId || "",
                employeesToAdd: [],
                employeesToRemove: [],
              }
            : {}
        }
        submitLabel="Update"
        onSubmit={handleUpdateProject}
        gridLayout={true}
      />

      <DeleteProjectModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
