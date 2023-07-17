import React from "react";
import "./SignUp.css";
import logo from "../img/logo.png"
import { Link } from "react-router-dom";

const signup = () => {
  return (
    <div className="signup">
      <div className="signup-form-container">
        <img src={logo} className="signup-logo" alt=""></img>
        <div className="input-div">
            <input type="email" name="email" id="email" placeholder="Email"></input>
        </div>
        <div className="input-div">
            <input type="text" name="name" id="name" placeholder="Full Name"></input>
        </div>
        <div className="input-div">
            <input type="text" name="username" id="username" placeholder="Username"></input>
        </div>
        <div className="input-div">
            <input type="password" name="password" id="password" placeholder="Password"></input>
        </div>
        <input type="submit" id="submit-btn" value="Sign Up"></input>
        <div className="signupPara">
            Already have an account?
            <br/>
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="signupspan">
                Login
            </span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default signup;
