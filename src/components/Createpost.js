import React from "react";
import Navbar from "./NavBar";
import preview from "../img/preview.png";
import "./Createpost.css";

const Createpost = () => {
  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <>
      <Navbar />
      <div className="post">
        <div className="post-header">
          <h3>Create Post</h3>
          <div className="post-btn">
            <button id="btn">Post</button>
          </div>
        </div>
        <div className="post-input">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              loadfile(event);
            }}
          />
          <img id="output" src={preview} />
        </div>
        <div className="details">
          <div className="prof-pic">
            <img
              src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-black-and-white-fashion-man-people.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
            />
          </div>
          <div style={{width:"100%"}}>
          <h4>anubhav_04</h4>
          <textarea placeholder="Enter a suitable caption..."></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createpost;
