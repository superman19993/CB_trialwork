import React from "react";
import { Row, Col } from "react-bootstrap";
import CardProfile from "../components/layouts/CardProfile";
import Workspace from "../components/layouts/CardWorkspace";
import NavbarKanban from "../components/layouts/Navbar";

export const Profile = () => {
  return (
    <>
      <NavbarKanban />
      <Row>
        <Col style={{ marginTop: "100px" }} lg={4}>
          <CardProfile />
        </Col>
        <Col style={{ marginTop: "90px" }} lg={8}>
          <Workspace />
        </Col>
      </Row>
    </>
  );
};
