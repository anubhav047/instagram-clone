import React,{useState} from "react";
import "./Login.css";
import logo from "../img/logo.png";
import { Link ,useNavigate} from "react-router-dom";
import { toast} from 'react-toastify';


const Login = () => {
  const navigate=useNavigate();

  const notifysuccess = (msg) => toast.success(msg);
  const notifyerror = (error) => toast.error(error);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault();
    const url ="http://192.168.29.163:2000/login";
    const res = await fetch(url,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })
    const parsed =await res.json();
    if(parsed.success)
    {
      notifysuccess(parsed.msg);
      localStorage.setItem("token",parsed.token);
      navigate("/");
    }
    else
    {
      notifyerror(parsed.error);
    }
  };
  return (
    <div className="login">
      <div className="login-form-container">
        <form onSubmit={handlesubmit}>
        <img src={logo} className="login-logo" alt=""></img>
        <div className="input-div">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          ></input>
        </div>
        <div className="input-div">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          ></input>
        </div>
        <input
          type="submit"
          id="submit-btn"
          value="Log In"
        ></input>
        <div className="loginPara">
          New to Instagram?
          <br />
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <span className="loginspan">Sign Up</span>
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
