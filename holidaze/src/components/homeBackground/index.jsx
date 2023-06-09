import React from "react";
import { Button } from "react-bootstrap";

function TopSection() {
  return (
    <div className="bground rounded text-light d-flex justify-content-center align-items-center p-2 gap-2 felx-column">
      <div className="slong m-3 ">
        <h1 className="fs-2">WELCOME TO HOLIDAZE</h1>
        <h2 className="fs-4">
          Make Every Moment Count: Extend Your Stay, Minimize Stress - Holidaze
          Awaits Your Reservation!
        </h2>

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

export default TopSection;
