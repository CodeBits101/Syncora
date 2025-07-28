import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="border-top  text-center">
      <Container>
        <Row>
          <Col>
            <p className="text-muted mb-0">
              © 2025 Syncora. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
