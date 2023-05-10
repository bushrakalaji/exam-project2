import React from "react";
import { Link } from "react-router-dom";
import CreateVenue from "../createVenue";

function Dashboard() {
  return (
    <div>
      <Link to="/bookings">Bookings</Link>
      <CreateVenue />
    </div>
  );
}

export default Dashboard;
