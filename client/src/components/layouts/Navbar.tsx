import React from "react";
import { Button, Nav, Navbar, FormText } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../../css/layout/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/user";
import { RootState } from "../../redux/store";

const NavbarKanban = () => {
  const authState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      className="navKanban shadow"
      bg="primary"
      expand="lg"
      variant="dark"
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Navbar.Brand
          style={{ marginTop: "-3px", fontWeight: "bold" }}
          href="#"
        >
          Kanban
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            to="/dashboard"
            as={Link}
            className="font-weight-bolder text-white"
          >
            Dashboard
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            to="/Profile"
            as={Link}
            className="font-weight-bolder text-white mt"
          >
            Welcome {authState.user.username}
          </Nav.Link>
          <Button>
            <Nav.Link onClick={onClickLogout}>Logout</Nav.Link>
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarKanban;
