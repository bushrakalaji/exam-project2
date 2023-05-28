import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../../images/logo.png";
import Logout from "../../logout";
import { load } from "../../../storage/index.mjs";

function UserNavBar() {
  const profile = load("profile");
  const name = profile.name;
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
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Holidaze
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                  <LinkContainer to="/" className="rounded">
                    <Nav.Link className="text-light ">Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/bookings" className="rounded">
                    <Nav.Link className="text-light ">Bookings</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`/profile/${name}`} className="rounded">
                    <Nav.Link className="text-light ">Profile</Nav.Link>
                  </LinkContainer>
                  <Logout />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default UserNavBar;
