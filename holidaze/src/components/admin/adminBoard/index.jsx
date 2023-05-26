import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

function AdminBourd() {
  return (
    <div>
      <Container>
        <Nav
          fill
          variant="tabs"
          defaultActiveKey="/home"
          className="bg-primary mb-5 d-flex rounded mt-3"
        >
          <Nav.Item>
            <LinkContainer to="/dashboard/create">
              <Nav.Link className="text-light  fs-5">
                {" "}
                <i className="bi bi-pencil-square"></i> Create Venue
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <LinkContainer to="/dashboard/venues">
            <Nav.Link className="text-light  fs-5">
              <i className="bi bi-houses"></i> My Venues
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/dashboard/booked">
            <Nav.Link eventKey="link-2" className="text-light fs-5">
              <i className="bi bi-house-check"></i> Venues Booked
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/dashboard/bookings">
            <Nav.Link className="text-light fs-5">
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
