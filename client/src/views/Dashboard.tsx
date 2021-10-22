import React, { useState, useEffect } from "react";
import Collumn, { ICollumn } from "../components/dashboard/Collumn";
import { board } from "../data/data";
import { Row, Col, Container } from "react-bootstrap";
import "../css/card/card.css";
import NavbarKanban from "../components/layouts/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumns } from "../redux/slices/collumns";
import { RootState } from "../redux/store";
import AddCollumnsForm from "../components/dashboard/AddCollumnsForm";
import AddCollumnsButton from "../components/dashboard/AddCollumnsButton";

const Dashboard = () => {
  const columns = useSelector((state: RootState) => state.columns);
  const workspace = useSelector((state: RootState) => state.workspaces);

  const dispatch = useDispatch();

  localStorage.setItem("history", "/dashboard");

  useEffect(() => {
    console.log(workspace.wid);
    dispatch(fetchColumns(workspace.wid));
  }, [dispatch]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const onClickAddCollumn = () => {
    setOpenAddModal(!openAddModal);
  };

  return (
    <>
      <NavbarKanban />
      {openAddModal ? <AddCollumnsForm /> : null}

      <Container className="container">
        <Row>
          {columns.columns
            ? columns.columns.map((collumn: ICollumn) => (
                <Col
                  className="collumn"
                  style={{ display: "inline-block", float: "none" }}
                  key={collumn.id}
                  lg={3}
                >
                  <Collumn collumn={collumn} />
                </Col>
              ))
            : null}
        </Row>
        <div onClick={onClickAddCollumn}>
          <AddCollumnsButton />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
