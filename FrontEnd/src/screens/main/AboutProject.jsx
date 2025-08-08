import React, { useEffect, useState } from "react";
import logo from "../../assets/logo_light.png";
import styles from "./AboutProject.module.css";
import { Container, Row, Col, Button, Fade } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAboutSyncora } from "../../services/main/aboutproject";
import { Card, Spinner } from "react-bootstrap";
import { FaRocket } from "react-icons/fa6";
import Footer from "../../Layout/Footer";
import SliderCustom from "../../components/main/SliderCustom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AiFillWechat } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

const data = [
  {
    head: "To Do",
    title: "Design new landing page",
    activity: "Design",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=123",
  },

  {
    head: "In Progress",
    title: "API integration",
    activity: "Development",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=456",
  },

  {
    head: "Done",
    title: "User research",
    activity: "ReSearch",
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=789",
  },
];

const FadeInSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // how much of the element needs to be visible
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

function Header() {
  const navigate = useNavigate();
  return (
    <div
      id="header"
      className="bg-white border-bottom py-2 w-100"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
    >
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          <Col
            xs="auto"
            className="d-flex align-items-center"
            style={{ marginLeft: "-2%" }}
          >
            <div
              className="d-flex align-items-center"
              style={{ height: "40px" }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: "100%", width: "auto" }}
              />
            </div>
            <span className={styles.head_text}>Syncora</span>
          </Col>

          <Col xs="auto" className="d-flex align-items-center">
            <Button
              variant="link"
              className="text-dark me-2 text-decoration-none"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              variant="dark"
              className="rounded-1 px-4"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function TopComponent({
  head,
  bgColor,
  description,
  btnText,
  marginTop,
  paadingTop,
  btnRedirect,
  pBottom,
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: marginTop,
        backgroundColor: bgColor || "white",
        color: bgColor ? "white" : "black",
      }}
    >
      <Container className="mt-5">
        <Row
          className="justify-content-center text-center"
          style={{
            paddingTop: paadingTop || "0",
            paddingBottom: pBottom || "0",
          }}
        >
          <Col xs={12} md={8} lg={6}>
            <h1 className="mb-3">{head}</h1>
            <p
              className="text mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem" }}
            >
              {description}
            </p>

            <Button
              variant="dark"
              className="px-4"
              onClick={() => navigate(btnRedirect || "/register")}
            >
              {btnText || "Get Started"}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function ChooseSyncora({ title, description }) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-3">{title}</h2>
          <p
            className="text-muted mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.25rem" }}
          >
            {description}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

function AboutCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getAboutSyncora();
      // console.log(response) ;
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center cursor-pointer">
      <Container className="mt-4">
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {data.map((item) => (
            <Col key={item.id}>
              <Card
                className="h-100"
                style={{
                  boxShadow: "0 2px 6px 1px rgba(100, 100, 100, 0.15)",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="w-12 h-12 mt-3 ms-3 bg-light rounded-3 d-flex align-items-center justify-content-center mb-3"
                  style={{ width: "48px", height: "48px" }}
                >
                  <FaRocket />
                </div>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

function SyncoraCard({ head, title, activity, avatar }) {
  return (
    <Col>
      <div className="bg-light p-2 rounded mb-2">
        <span className="text-muted small">{head}</span>
      </div>
      <Card className="border-1 shadow-sm rounded-1">
        <Card.Body>
          <Card.Title className="text-dark mb-2 fs-6">{title}</Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <span className="badge bg-light text-muted">{activity}</span>
            <img
              src={avatar}
              alt="avatar"
              className="rounded-circle"
              style={{ width: 24, height: 24 }}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

function SyncoraInAction() {
  return (
    <div className="bg-light p-4 rounded-4 border border-secondary-subtle">
      <div className="bg-white rounded-3 border border-secondary-subtle overflow-hidden">
        {/* Browser Header */}
        <div className="bg-light border-bottom border-secondary-subtle px-4 py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex gap-2">
              <div
                className="rounded-circle bg-secondary-subtle"
                style={{ width: 12, height: 12 }}
              ></div>
              <div
                className="rounded-circle bg-secondary-subtle"
                style={{ width: 12, height: 12 }}
              ></div>
              <div
                className="rounded-circle bg-secondary-subtle"
                style={{ width: 12, height: 12 }}
              ></div>
            </div>
            <span className="text-muted small">syncora.app/dashboard</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 text-dark">Project Dashboard</h4>
          </div>

          {/* Columns (To Do, In Progress, Done) */}
          <Row xs={1} sm={1} md={2} lg={3} className="g-4">
            {/* To Do Column */}
            {data.map((item, index) => {
              return (
                <SyncoraCard
                  key={index}
                  head={item.head}
                  title={item.title}
                  activity={item.activity}
                  avatar={item.avatar}
                />
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default function AboutProject() {
  return (
    <div className="w-100" style={{ marginBottom: "1%", position: "relative" }}>
      <div className="w-100">
        <Header />
        <SliderCustom />
      </div>

      <FadeInSection>
        <div className="p-2">
          <TopComponent
            head={"Built for Small Teams.Designed to Move Fast."}
            description={
              "Syncora is a lightweight, minimal alternative to Jira — made for startups who want clarity, not complexity. Fast to onboard. Simple to use. Powerful where it matters."
            }
            btnText={"About Developers"}
            btnRedirect={"/dev"}
            marginTop={"2%"}
          />
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="p-2 mt-4 pb-4" style={{ backgroundColor: "#f8f9fa" }}>
          <ChooseSyncora
            title={"Why Choose Syncora?"}
            description={
              "Everything you need to manage projects without the bloat"
            }
          />
          <AboutCard />
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="p-2 mt-4 pb-4">
          <ChooseSyncora
            title={"See Syncora in Action"}
            description={"A clean, focused workspace for your team"}
          />
          <SyncoraInAction />
        </div>
      </FadeInSection>

      <FadeInSection>
        <div style={{ paddingTop: "1rem" }}>
          <TopComponent
            head={"Ready to Move Fast?"}
            description={
              "Join hundreds of startups who've ditched complexity for clarity. Start your free trial today."
            }
            bgColor={"black"}
            marginTop={"-4%"}
            paadingTop={"2%"}
            pBottom={"2%"}
          />
        </div>
      </FadeInSection>

      <div className="mt-2">
        <Footer />
      </div>
      <AiFillWechat
        size={90}
        style={{ position: "fixed", bottom: 25, right: 30, cursor: "pointer" }}
        color="blue"
        onClick={() => toast.warn("Chat window clicked...")}
      />
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
}
