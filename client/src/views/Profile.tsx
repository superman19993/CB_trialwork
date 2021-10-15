import React from "react";
import { Row, Col } from "react-bootstrap";
import CardProfile from "../components/layouts/CardProfile";
import Workspace from "../components/layouts/CardWorkspace";
import Navbar from "../components/layouts/Navbar";

export const Profile = () => {
  return (
    <>
      <Navbar />
      <Row>
        <Col lg={4}>
          <CardProfile />
        </Col>
        <Col lg={8}>
          <Workspace />
        </Col>
      </Row>
    </>
  );
};
