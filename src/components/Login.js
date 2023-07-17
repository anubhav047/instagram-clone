import React from "react";
import "./Login.css";
import logo from "../img/logo.png"
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="login-form-container">
        <img src={logo} className="login-logo" alt=""></img>
        <div className="input-div">
            <input type="email" name="email" id="email" placeholder="Email"></input>
        </div>
        <div className="input-div">
            <input type="password" name="password" id="password" placeholder="Password"></input>
        </div>
        <input type="submit" id="submit-btn" value="Log In"></input>
        <div className="loginPara">
            New to Instagram?
            <br/>
            <Link to="/signup" style={{textDecoration:"none"}}>
            <span className="loginspan">
                Sign Up
            </span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
