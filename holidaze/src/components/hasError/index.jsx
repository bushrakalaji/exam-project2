import React from "react";

function HasError({ error }) {
  return (
    <div>
      <div>
        <h2>Error occurred:</h2>
        <p>{error}</p>
      </div>
    </div>
  );
}

export default HasError;
