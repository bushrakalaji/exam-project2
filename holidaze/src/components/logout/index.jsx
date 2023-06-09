import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as storage from "../../storage";

function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    storage.remove("token");
    storage.remove("profile");
    setLoggedOut(true);
  }

  useEffect(() => {
    if (loggedOut) {
      navigate("/");
      window.location.reload();
    }
  }, [loggedOut, navigate]);

  return (
    <div className="nav-link">
      <button onClick={handleLogout} className="text-light btn p-0">
        Logout <i className="bi bi-box-arrow-right "></i>
      </button>
    </div>
  );
}

export default Logout;
