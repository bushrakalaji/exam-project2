import React from "react";
import { Link } from "react-router-dom";
import Logout from "../logout";

function Header() {
  const hasToken = localStorage.getItem("token");
  console.log(hasToken);
  if (hasToken) {
    return (
      <div>
        <Link to="/">Home</Link>
        <Logout />
      </div>
    );
  }
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Header;
