import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import "../../css/layout/navbar.css";

const NavbarKanban = () => {
  return (
    <Navbar
      className="navKanban shadow"
      bg="primary"
      expand="lg"
      variant="dark"
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Navbar.Brand href="#">Logo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="font-weight-bolder text-white">
            Dashboard
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome Loc
          </Nav.Link>
          <Button>Logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarKanban;
