import React from "react";

import Spinner from "react-bootstrap/Spinner";

function IsLoading() {
  return (
    <div className="d-flex justify-content-center align-items-center  m-5">
      <Spinner
        animation="grow"
        role="status"
        variant="danger"
        style={{ width: "100px", height: "100px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>{" "}
      <Spinner
        animation="grow"
        role="status"
        variant="primary"
        style={{ width: "50px", height: "50px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default IsLoading;
