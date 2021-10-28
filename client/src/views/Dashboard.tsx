import React, { useState, useEffect } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import "../css/card/card.css";
import NavbarKanban from "../components/layouts/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumns } from "../redux/slices/collumns";
import { RootState } from "../redux/store";
import AddCollumnsForm from "../components/dashboard/AddCollumnsForm";
import DND from "../components/dashboard/TestDND";
import { getAllUsersInWorkspace } from "../redux/slices/workspace";
import InviteFormWorkspace from "../components/layouts/InviteFormWorkspace";

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

const Dashboard = () => {
  const columns = useSelector((state: RootState) => state.columns);
  const workspace = useSelector((state: RootState) => state.workspaces);

  const dispatch = useDispatch();

  localStorage.setItem("history", "/dashboard");

  useEffect(() => {
    dispatch(fetchColumns(workspace.wid));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsersInWorkspace(workspace.wid));
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
      <InviteFormWorkspace />
      <Container className="container">
        <Row>
          <DND columnsProp={columns.columns} />
        </Row>
        <AddCollumnsForm />
      </Container>
    </>
  );
};

export default Dashboard;
