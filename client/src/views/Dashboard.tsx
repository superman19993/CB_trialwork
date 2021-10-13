import React, { useState } from "react";
import Collumn, { ICollumn } from "../components/dashboard/Collumn";
import { board } from "../data/data";
import { Row, Col, Container } from "react-bootstrap";
import "../css/card/card.css";
import AddCollumnsForm from "../components/dashboard/AddCollumnsForm";
import AddCollumnsButton from "../components/dashboard/AddCollumnsButton";
import NavbarKanban from "../components/layouts/Navbar";

const Dashboard = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const onClickAddCollumn = () => {
    setOpenAddModal(!openAddModal);
  };
  const colList = board.columns;
  return (
    <>
      <NavbarKanban />
      <Container className="container">
        {openAddModal ? <AddCollumnsForm /> : null}
        <Row>
          {colList.map((collumn: ICollumn, index) => (
            <Col
              className="collumn"
              style={{ display: "inline-block", float: "none" }}
              key={collumn.id}
              lg={3}
            >
              <Collumn collumn={collumn} />
            </Col>
          ))}
        </Row>
        <div onClick={onClickAddCollumn}>
          <AddCollumnsButton />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
