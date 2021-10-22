import React, { useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../../css/layout/workspace.css";
import { RootState } from "../../redux/store";
import SingleCardWorkspace from "./SingleCardWorkspace";

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
            <Card className="cardw-side-2">
              <Card.Body className="create">
                <Card.Link onClick={onClickCreate}>
                  Create new workspace
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          {content}
        </Row>
      </Container>
    </>
  );
};

export default Workspace;
