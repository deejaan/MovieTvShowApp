import React, { useContext } from "react";
import "../styles/navbar.scss";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function NavBar() {
  const { setActiveTab } = useContext(AppContext);

  return (
    <nav className="navBar">
      <ul>
        <NavLink
          to="/movies"
          className="link nonLinkFont"
          activeClassName="activeLink nonLinkFont"
          onClick={() => {
            setActiveTab("movies");
          }}
        >
          <li>Movies</li>
        </NavLink>
        <NavLink
          to="/tvshows"
          className="link nonLinkFont"
          activeClassName="activeLink nonLinkFont"
          onClick={() => {
            setActiveTab("tvshows");
          }}
        >
          <li>TV Shows</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default NavBar;
