import React from "react";
import Collumn, { ICollumn } from "../components/dashboard/Collumn";
import { board } from "../data/data";
import { Row, Col, Container } from "react-bootstrap";
import "../css/card/card.css";

const Dashboard = () => {
  console.log(board.columns);
  const colList = board.columns;
  return (
    <Container className="container" fluid>
      <Row>
        {colList.map((collumn: ICollumn, index) => (
          <Col className="collumn" key={collumn.id} lg={3}>
            <Collumn collumn={collumn} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
