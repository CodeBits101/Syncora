import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/animations/notFound1.json";

export default function NotFoundPage() {
  return (
    <Container className="d-flex justify-content-center  min-vh-100 text-center">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Lottie
            animationData={notFoundAnimation}
            loop
            style={{ height: "500px", width: "100%" }}
          />
          <div style={{ marginTop: "-30%" }}>
            <h2 className="mt-3 w-100">Oops! Page Not Found</h2>
            <p className="text-muted">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <Button variant="dark" href="/">
            Go Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
