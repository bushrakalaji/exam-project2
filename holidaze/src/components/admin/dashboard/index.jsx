import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Footer } from "../../footer";
import ManagerNavBar from "../../navs/managerNav";
import AdminBourd from "../adminBoard";

function DashboardLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ManagerNavBar />
      <AdminBourd />
      <Container className="flex-grow-1">
        <Outlet className="flex-shrink-0" />
      </Container>

      <Footer className="footer py-3 bg-body-tertiary mt-auto" />
    </div>
  );
}

export default DashboardLayout;
