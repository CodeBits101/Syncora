import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Lottie from "lottie-react";

import { animations } from "../../utils/animationData";

export default function SliderCustom() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % animations.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + animations.length) % animations.length);
  };

  //Making slider work every after 3 seconds 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % animations.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", backgroundColor: "#f8f9fa" , overflow: "hidden" , height: "100vh"}}>
      <Container fluid className="py-5">
        <Row className="align-items-center">
          <Col xs={2} className="text-end">
            <IconButton onClick={handlePrev}>
              <ArrowBackIos />
            </IconButton>
          </Col>

          <Col xs={8} className="text-center d-flex">
            <Box
              sx={{
                padding: 2,
                width: "100%",
                height: "100vh",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Lottie
                animationData={animations[current].animationData}
                loop
                autoplay
                style={{
                  height: animations[current].height,
                  width: animations[current].width,
                  marginTop: animations[current].top || "0px",
                }}
              />

              <p
                style={{
                  position: "absolute",
                  bottom: "0.5%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "black", // Change color based on animation bg
                  fontWeight: "500",
                  fontSize: "1.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  
                }}
              >
                {animations[current].title}
              </p>
            </Box>
          </Col>

          <Col xs={2}>
            <IconButton onClick={handleNext}>
              <ArrowForwardIos />
            </IconButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
