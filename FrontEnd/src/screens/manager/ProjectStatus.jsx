import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import trimToWords from "../../utils/trimToWords";
import "./ProjectStatus.css"; // Custom styles
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../utils/color";
import { RiProgress3Line } from "react-icons/ri";

const ProjectCard = ({ project, bgColor }) => {
  const {status} = useParams();
 
  return (
    <Card className="project-card h-100" style={{ backgroundColor: bgColor }}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title className="fw-bold fs-5 text-primary text-white">
            {trimToWords(project.projectName, 3)}
          </Card.Title>
          <Card.Text className="mb-1">
            <RiProgress3Line size={20} color="#FBF5DE" className="mt-1" />
          </Card.Text>
        </div>
        <Card.Subtitle className="mb-2 text-muted">
          {project.projectCode}
        </Card.Subtitle>
        <Card.Text className="mb-1">
          <span className="fw-semibold">Manager:</span> {project.managerName}
        </Card.Text>

        <div className="d-flex justify-content-between">
          <HyperLink />
        </div>
      </Card.Body>
    </Card>
  );
};

const HyperLink = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card.Link className="hyperlink" onClick={() => navigate("/scrumBoard")}>
        View Task{" "}
      </Card.Link>
      <Card.Link
        className="hyperlink"
        onClick={() => navigate("/projectdetails")}
      >
        View Project Details
      </Card.Link>
    </>
  );
};

export default function ProjectStatus() {
  const projects = [
    {
      id: 1,
      projectCode: "PRJ001",
      projectName: "Inventory Management System",
      managerName: "Alice Johnson",
    },
    {
      id: 2,
      projectCode: "PRJ002",
      projectName: "Customer Relationship Portal",
      managerName: "Brian Matthews",
    },
    {
      id: 3,
      projectCode: "PRJ003",
      projectName: "Healthcare Analytics Platform",
      managerName: "Carla Singh",
    },
    {
      id: 4,
      projectCode: "PRJ004",
      projectName: "E-commerce Backend Revamp",
      managerName: "David Lee",
    },
    {
      id: 5,
      projectCode: "PRJ005",
      projectName: "Real-time Chat Application",
      managerName: "Emily Zhao",
    },
    {
      id: 3,
      projectCode: "PRJ003",
      projectName: "Healthcare Analytics Platform",
      managerName: "Carla Singh",
    },
    {
      id: 4,
      projectCode: "PRJ004",
      projectName: "E-commerce Backend Revamp",
      managerName: "David Lee",
    },
    {
      id: 5,
      projectCode: "PRJ005",
      projectName: "Real-time Chat Application",
      managerName: "Emily Zhao",
    },
    {
      id: 3,
      projectCode: "PRJ003",
      projectName: "Healthcare Analytics Platform",
      managerName: "Carla Singh",
    },
    {
      id: 4,
      projectCode: "PRJ004",
      projectName: "E-commerce Backend Revamp",
      managerName: "David Lee",
    },
    {
      id: 5,
      projectCode: "PRJ005",
      projectName: "Real-time Chat Application",
      managerName: "Emily Zhao",
    },
    {
      id: 3,
      projectCode: "PRJ003",
      projectName: "Healthcare Analytics Platform",
      managerName: "Carla Singh",
    },
    {
      id: 4,
      projectCode: "PRJ004",
      projectName: "E-commerce Backend Revamp",
      managerName: "David Lee",
    },
    {
      id: 5,
      projectCode: "PRJ005",
      projectName: "Real-time Chat Application",
      managerName: "Emily Zhao",
    },
  ];

  return (
    <div className="p-4 bg-light min-vh-100 cursor-pointer">
      <Container>
        <h2 className="mb-4 text-center text-dark fw-semibold">
          Project Status
        </h2>
        <Row className="g-4">
          {projects.map((project, index) => {
            const bgColor = colors[index % colors.length];
            return (
              <Col key={project.id} xs={12} sm={6} md={4} lg={3}>
                <ProjectCard
                  key={project.id}
                  project={project}
                  bgColor={bgColor}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
