import React, { useEffect, useState } from "react";
import { GiTeamIdea } from "react-icons/gi";
import styles from "./AboutDev.module.css";
import Card from "react-bootstrap/Card";
import { getAboutDev } from "../../services/developer/abouDev";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { getLang } from "../../services/developer/lang";
import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import getContentByLanguage from "../../utils/getContentByLang";
import logoDark from "../../assets/logo_dark.png" ;  

function trimToWords(text, wordLimit) {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
}

export default function AboutDev() {
  const [devData, setDevData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const[selectedLanguagekey, setSelectedLanguageKey] = useState("en");
  const [staticData , setStaticData] = useState([]) ;  

  const getAboutDevData = async () => {
    try {
      const response = await getAboutDev(selectedLanguagekey);
      console.log(response);
      setDevData(response.data);
    } catch (error) {
      console.log("Error fetching developer data:", error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await getLang();
      console.log(response)
      setLanguages(response);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const getStaticData = async () => {
    try {
      const staticdata = getContentByLanguage(selectedLanguagekey);
      setStaticData(staticdata);
    } catch (error) {
      console.error("Error fetching static data:", error);
    }
  }



  useEffect(() => {
    getAboutDevData();
    fetchLanguages();
    getStaticData() ;
    
  }, [selectedLanguage , selectedLanguagekey])  ;

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
   
    console.log("Selected:", lang);
    console.log("Selected key:", lang.key);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className={styles.header}>
        {/* <div className={styles.logo}>
          <img src={logoDark} alt="Logo here..." />
        </div> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={styles.team_tag}>
            <GiTeamIdea color="#725CAD" size={20} />
            <p className="mt-3">{staticData.title}</p>
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="fw-bold fs-1">{staticData.heading}</p>
        </div>

        <div className="p-2" style={{ fontWeight: "400" }}>
          <p>
            {staticData.description}
          </p>
        </div>
        <div className={styles.langauge}>
          <DropdownButton
            id="language-dropdown"
            title={selectedLanguage}
            onSelect={handleSelect}
            variant="secondary"
          >
            {languages.map((lang, idx) => (
              <Dropdown.Item eventKey={lang.name} key={idx} onClick={() => {setSelectedLanguageKey(lang.key)} }>
                {lang.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
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
