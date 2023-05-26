import React from "react";
import { load } from "../../storage/index.mjs";
import ManagerNavBar from "../navs/managerNav";
import UserNavBar from "../navs/userNav/index.jsx";
import VisitorNavBar from "../navs/visitorNav/index.jsx";

function Header() {
  const profile = load("profile");
  const manager = profile && profile.venueManager;

  if (manager === true) {
    return <ManagerNavBar />;
  }

  if (manager === false) {
    return <UserNavBar />;
  }

  return <VisitorNavBar />;
}

export default Header;
