import React, { useEffect, useState } from "react";
import { GiTeamIdea } from "react-icons/gi";
import styles from "./AboutDev.module.css";
import Card from "react-bootstrap/Card";
import { getAboutDev } from "../../services/developer/abouDev";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function trimToWords(text, wordLimit) {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
}

export default function AboutDev() {
  const [devData, setDevData] = useState([]);

  const getAboutDevData = async () => {
    try {
      const response = await getAboutDev();
      console.log(response);

      setDevData(response.data);
    } catch (error) {
      console.log("Error fetching developer data:", error);
    }
  };

  useEffect(() => {
    getAboutDevData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div className={styles.header}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={styles.team_tag}>
            <GiTeamIdea color="#725CAD" size={20} />
            <p className="mt-3">Our team</p>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="fw-bold fs-1">Meet Our Team Members</p>
        </div>

        <div className="p-2" style={{ fontWeight: "400" }}>
          <p>
            This task management application is designed specifically for IT
            organizations, aligning with industry workflows and the Software
            Development Life Cycle (SDLC). Built on the AGILE methodology, it
            enables teams to efficiently manage tasks, track progress, and
            collaborate seamlessly. The application ensures streamlined task
            handling, fostering adaptability and iterative development, making
            it an essential tool for IT project management.
          </p>
        </div>
      </div>

      {devData.length == 0 ? (
        <p>There is no data for now...</p>
      ) : (
        <Container>
          <Row>
            {devData.map((card, idx) => (
              <Col
                key={idx}
                lg={4}
                md={6}
                sm={6}
                className="mb-4"
                style={{ cursor: "pointer" }}
              >
                <Card style={{ width: "100%" }}>
                  <Card.Img
                    src={
                      card.profilePic || "https://via.placeholder.com/300x180"
                    }
                    style={{
                      height: "250px",
                      objectFit: "contain",
                      backgroundColor: "#F1E7E7",
                    }}
                  />
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                      <Card.Title>{card.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {new Date(card.dob).toISOString().split("T")[0]}
                      </Card.Subtitle>
                    </div>
                    <Card.Subtitle
                      className="mb-2 text-muted"
                      style={{ fontWeight: 500 }}
                    >
                      {card.role}
                    </Card.Subtitle>
                    <Card.Text>{trimToWords(card.bio, 30)}</Card.Text>
                    <div className="d-flex justify-content-end gap-3">
                      <a
                        href={card.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin size={30} color="#3674B5" />
                      </a>
                      <a
                        href={card.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub size={30} color="black" />
                      </a>
                      <a
                        href={card.instagaram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram size={30} color="#B33791" />
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}
