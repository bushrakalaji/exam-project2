import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import { Footer } from "../footer";
import { Container } from "react-bootstrap";

export function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1">
        {" "}
        <Outlet className="flex-grow-0" />
      </Container>
      <Footer className="footer mt-auto py-3 bg-body-tertiary" />
    </div>
  );
}
Layout();
