import React, { useState, useEffect } from "react";
import Collumn, { ICollumn } from "../components/dashboard/Collumn";
import { board } from "../data/data";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import "../css/card/card.css";
import NavbarKanban from "../components/layouts/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumns } from "../redux/slices/collumns";
import { RootState } from "../redux/store";
import AddCollumnsForm from "../components/dashboard/AddCollumnsForm";
import AddCollumnsButton from "../components/dashboard/AddCollumnsButton";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import DND from "../components/dashboard/TestDND";

interface ICard {
  card_id: number;
  title: string;
  description: string;
}

export interface IColumn {
  [key: string]: {
    id: number;
    column_name: string;
    workspaceid: string;
    cards: ICard[];
  };
}

const data: IColumn = {
  [uuid()]: {
    id: 1,
    column_name: "Col5",
    workspaceid: "6176647fa40d4",
    cards: [
      {
        card_id: 1,
        title: "title1",
        description: "description1",
      },
      {
        card_id: 2,
        title: "title2",
        description: "description1",
      },
      {
        card_id: 3,
        title: "title3",
        description: "description1",
      },
      {
        card_id: 4,
        title: "title4",
        description: "description1",
      },
      {
        card_id: 5,
        title: "title5",
        description: "description1",
      },
    ],
  },
  [uuid()]: {
    id: 2,
    column_name: "Col5",
    workspaceid: "6176647fa40d4",
    cards: [],
  },
  [uuid()]: {
    id: 3,
    column_name: "Col5",
    workspaceid: "6176647fa40d4",
    cards: [],
  },
  [uuid()]: {
    id: 4,
    column_name: "Col5",
    workspaceid: "6176647fa40d4",
    cards: [],
  },
  [uuid()]: {
    id: 5,
    column_name: "Col5",
    workspaceid: "6176647fa40d4",
    cards: [],
  },
  [uuid()]: {
    id: 6,
    column_name: "Col5",
    workspaceid: "6176647fa40d4",
    cards: [],
  },
};

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

  const onDragEnd = (result: any, columnsDrag: any, setColumns: any) => {};

  // const [columnsState, setColumnsState] = useState(columns.columns);

  useEffect(() => {
    dispatch(fetchColumns("6176647fa40d4"));
  }, [dispatch]);

  const colState = useSelector((state: RootState) => state.columns);

  if (colState.colLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  return (
    <>
      <NavbarKanban />
      {openAddModal ? <AddCollumnsForm /> : null}

      <Container className="container">
        <Row>
          {/* {columns.columns
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
            : null} */}
          <DND columnsProp={columns.columns} />
        </Row>
        <div onClick={onClickAddCollumn}>
          <AddCollumnsButton />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
