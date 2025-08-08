import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RiProgress3Line } from "react-icons/ri";
import trimToWords from "../../utils/trimToWords";
import { colors } from "../../utils/color";
import "./ProjectStatus.css";
import { getProjectsByStatus } from "../../services/manager/manager"; 

const ProjectCard = ({ project, bgColor }) => {
  const navigate = useNavigate();

  return (
    <Card className="project-card h-100" style={{ backgroundColor: bgColor }}>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title className="fw-bold fs-5 text-white">
            {trimToWords(project.title, 3)}
          </Card.Title>
          <Card.Text className="mb-1">
            <RiProgress3Line size={20} color="#FBF5DE" className="mt-1" />
          </Card.Text>
        </div>
        <Card.Subtitle className="mb-2 text-white-50">
          {project.projectCode}
        </Card.Subtitle>
        <Card.Text className="mb-1 text-white">
          <span className="fw-semibold">Manager ID:</span> {project.managerId}
        </Card.Text>

        <div className="d-flex justify-content-between">
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

  const fetchProjects = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getProjectsByStatus(status);
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

  return (
    <div className="p-4 bg-light min-vh-100 cursor-pointer">
      <Container>
        <h2 className="mb-4 text-center text-dark fw-semibold">
          {status} Projects
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
                  <ProjectCard project={project} bgColor={bgColor} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
}
