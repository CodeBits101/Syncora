import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Lottie from "lottie-react";
import noDataAnimation from "../../assets/animations/NoData.json";

export default function NoData({ isShown = true , data="No data Available" , marginTop="-50%" }) {
  return (
    <Container className="d-flex justify-content-center  min-vh-100 text-center">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Lottie
            animationData={noDataAnimation}
            loop
            style={{ height: "600px", width: "100%" }}
          />
          {isShown && (
            <div style={{ marginTop: marginTop }}>
              <h3 className="mt-3">{data}</h3>
              <p className="text-muted">
                There's currently no information to display. Please check back
                later.
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
