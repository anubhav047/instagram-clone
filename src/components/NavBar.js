import React from "react";
import logo from "../img/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar(props) {
  const notifysuccess = (msg) => toast.success(msg);

  const handleLogout = () => {
    localStorage.removeItem("token");
    notifysuccess("Logged out successfully");
  };
  return (
    <div className="navbar">
      <img src={logo} alt="" />
      <ul className="nav-menu">
        <Link to="/">
          {" "}
          <li>Home</li>
        </Link>
        <Link to="/profile">
          {" "}
          <li>Profile</li>
        </Link>
        <Link to="/createPost">
          {" "}
          <li>Create Post</li>
        </Link>
        <Link to="/login" onClick={handleLogout}>
          {" "}
          <li className="logout">Logout</li>
        </Link>
      </ul>
    </div>
  );
}
