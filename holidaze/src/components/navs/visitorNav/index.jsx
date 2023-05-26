import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../../images/logo.png";
import LoginForm from "../../login";
import RegisterForm from "../../register";

function VisitorNavBar() {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          bg="primary"
          expand={expand}
          className="mb-3 p-0 shadow-sm "
          sticky="top"
        >
          <Container>
            <Navbar.Brand href="/" className="text-light ">
              <Image src={logo} width="130px" alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="text-light "
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Holidaze
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                  <LinkContainer to="/">
                    <Nav.Link className="text-light rounded">Home</Nav.Link>
                  </LinkContainer>{" "}
                  <LoginForm />
                  <RegisterForm />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default VisitorNavBar;
