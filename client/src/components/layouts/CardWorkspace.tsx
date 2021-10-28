import React, { useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../css/layout/workspace.css";
import { RootState } from "../../redux/store";
import SingleCardWorkspace from "./SingleCardWorkspace";
import ModalCreate from "../common/ModalCreate";

const Workspace = () => {
  const workspaces = useSelector((state: RootState) => state.workspaces);

  let content = workspaces.workspaces.map((workspace: any) => (
    <Col lg={4} key={workspace.id}>
      <SingleCardWorkspace workspace={workspace} />
    </Col>
  ));

  const [showCreateModal, setShowCreateModal] = useState(false);

  const onClickCreate = () => {
    setShowCreateModal(!showCreateModal);
  };

  return (
    <>
      <Container fluid>
        <Row className="side" sm={12}>
          <Col lg={4}>
            <ModalCreate category={"workspace"} />
          </Col>
          {content}
        </Row>
      </Container>
    </>
  );
};

export default Workspace;
