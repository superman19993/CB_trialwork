import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "../../css/layout/workspace.css";

const Workspace = () => {
  return (
    <>
      <Row>
        <Col lg={3}>
          <Card className="cardw-side">
            <Card.Body className="card-position">
              <Card.Text>Workspace</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="cardw-side">
            <Card.Body className="card-position">
              <Card.Text>Workspace</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="cardw-side">
            <Card.Body className="card-position">
              <Card.Text>Workspace</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={3}>
          <Card className="cardw-side">
            <Card.Body className="card-position">
              <Card.Text>Workspace</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="cardw-side">
            <Card.Body className="card-position">
              <Card.Text>Workspace</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="cardw-side">
            <Card.Body className="card-position">
              <Card.Text>Workspace</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Workspace;
