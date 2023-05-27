import React from "react";
import { Button } from "react-bootstrap";

function DashboardIntro() {
  return (
    <div
      className=" rounded flex-column  d-flex m-auto gap-1"
      style={{ maxWidth: "700px" }}
    >
      <h1>Welcome to holidaze Dashboard</h1>
      <p className="fs-5">
        Dear Admin, In the dashboard, you have the ability to perform various
        tasks. You can create a new venue, update existing venues, and view your
        bookings. Additionally, you have access to the bookings made on your
        venue, allowing you to stay updated on all reservations. Furthermore,
        you can easily access and manage your venues. Lastly, if necessary, you
        also have the option to delete any of your venues. Enjoy the full range
        of administrative capabilities in the dashboard!
      </p>
      <div className="d-flex flex-column gap-1">
        <span className="fs-5 f-elza"> Best regards,</span>
        <span className="fs-5"> HOLIDAZE</span>
      </div>
      <div>
        {" "}
        <Button className="btn-danger " style={{ textDecoration: "none" }}>
          <a href="#explore" className="text-light ">
            {" "}
            Explore Venues{" "}
          </a>
        </Button>
      </div>
    </div>
  );
}

export default DashboardIntro;
