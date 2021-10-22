import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import CardProfile from "../components/layouts/CardProfile";
import Workspace from "../components/layouts/CardWorkspace";
import NavbarKanban from "../components/layouts/Navbar";
import { fetchWorkspace } from "../redux/slices/workspace";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Profile = () => {
  const auth = useSelector((state: RootState) => state.user);

  localStorage.setItem("history", "/profile");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkspace(auth.user.id));
  }, [dispatch]);

  return (
    <>
      <NavbarKanban />
      <Container fluid>
        <Row style={{ overflowX: "hidden" }}>
          <Col style={{ marginTop: "100px" }} lg={4}>
            <div style={{ position: "fixed" }}>
              <CardProfile />
            </div>
          </Col>
          <Col style={{ marginTop: "90px" }} lg={8}>
            <Workspace />
          </Col>
        </Row>
      </Container>
    </>
  );
};
