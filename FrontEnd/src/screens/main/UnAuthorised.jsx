import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import unAuthorised from "../../assets/animations/unauthorised.json";
import { useNavigate } from "react-router-dom";

export default function UnAuthorised() {
  const navigate  = useNavigate();
 
  return (
    <Container className="d-flex justify-content-center  min-vh-100 text-center">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Lottie
            animationData={unAuthorised}
            loop
            style={{ height: "500px", width: "100%" }}
          />
          <div style={{ marginTop: "-50%" }}>
            <h2 className="mt-3 w-100">NOT AUTHORISED</h2>
            <p className="text-muted">
              You do not have permission to access this page
            </p>
          </div>

          <Button className="cursor-pointer" variant="danger" onClick={() => navigate(-1)}>
            Previous Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
