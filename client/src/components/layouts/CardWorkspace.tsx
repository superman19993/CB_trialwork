import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/layout/workspace.css";

const Workspace = () => {
  return (
    <>
      <Row className="side">
        <Col lg={3}>
          <Card className="cardw-side">
            <Card.Body className="card-position">
              <Card.Text>Workspace</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="cardw-side">
            <Card.Body to="/dashboard" as={Link} className="card-position">
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
