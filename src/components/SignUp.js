import React, { useState } from "react";
import "./SignUp.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast} from 'react-toastify';

const Signup = () => {
  const navigate=useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const notifysuccess = (msg) => toast.success(msg);
    const notifyerror = (error) => toast.error(error);

  const handlesubmit= async (e)=>{
    e.preventDefault();
    const url="http://localhost:2000/signup";
    const res=await fetch(url,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,userName,email,password
      })
    });
    const parsed=await res.json();
    if(parsed.success)
    {
      notifysuccess(parsed.msg);
      navigate("/login");
    }
    else
    {
      notifyerror(parsed.error);
    }
  }
  return (
    <div className="signup">
      <div className="signup-form-container">
        <form onSubmit={handlesubmit}>
        <img src={logo} className="signup-logo" alt=""></img>
        <div className="input-div">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          ></input>
        </div>
        <div className="input-div">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
          ></input>
        </div>
        <div className="input-div">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          ></input>
        </div>
        <div className="input-div">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          ></input>
        </div>
        <input type="submit" id="submit-btn" value="Sign Up"></input>
        <div className="signupPara">
          Already have an account?
          <br />
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span className="signupspan">Login</span>
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
