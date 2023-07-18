import React from "react";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ login }) {
  return (
    <div className="navbar">
      <img src={logo} alt="" />
      <ul className="nav-menu">
        <Link to="/"> <li>
            Home
        </li></Link>
        <Link to="/profile"> <li>
            Profile
        </li></Link>
        <Link to="/createPost"> <li>
            Create Post
        </li></Link>
        <Link to="/"> <li>
            Logout
        </li></Link>
      </ul>
    </div>
  );
}