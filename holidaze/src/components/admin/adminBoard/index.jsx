import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import CreateVenue from "../createVenue";

function AdminBourd() {
  return (
    <div>
      <Container>
        <Nav
          fill
          variant="tabs"
          defaultActiveKey="/home"
          className=" mb-5 d-flex rounded mt-3"
        >
          <Nav.Item>
            <CreateVenue />
          </Nav.Item>
          <LinkContainer to="/dashboard/venues">
            <Nav.Link className="  fs-5">
              <i className="bi bi-houses"></i> My Venues
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/dashboard/booked">
            <Nav.Link eventKey="link-2" className=" fs-5">
              <i className="bi bi-house-check"></i> Venues Booked
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/dashboard/bookings">
            <Nav.Link className=" fs-5">
              {" "}
              <i className="bi bi-calendar2-check"></i> My Bookings
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </div>
  );
}

export default AdminBourd;
