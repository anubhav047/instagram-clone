import React, { useState } from "react";
import Navbar from "./NavBar";
import preview from "../img/preview.png";
import "./styles/Createpost.css";
import { toast } from "react-toastify";
import LoadingBar from 'react-top-loading-bar'

const Createpost = () => {
  const notifysuccess = (msg) => toast.success(msg);
  const notifyerror = (error) => toast.error(error);

  const [progress, setProgress] = useState(0)
  const [imagefile, setimagefile] = useState("");
  const [body, setBody] = useState("");

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  const postdata = async () => {
    setProgress(10);
    try{
      if(imagefile){
        const data = new FormData();
        data.append("file", imagefile);
        data.append("upload_preset", "instagram-clone");
        data.append("cloud_name", "anubhavcloudinary");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/anubhavcloudinary/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        setProgress(30);
        const parsed = await res.json();
        postToMongo(parsed.url);
      }
      else{
        postToMongo("")
      }
    }
    catch(error)
    {
      console.error(error);
    }
  };
  const postToMongo = async (url) => {
    try {
      setProgress(50);
      const res = await fetch("http://localhost:2000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ image: url, body }),
      });
      setProgress(70);
      const parsed = await res.json();
      if (parsed.success) {
        setProgress(100);
        notifysuccess(parsed.msg);
        var output = document.getElementById("output");
        output.src = preview;
        setBody("");
      } else {
        setProgress(100);
        notifyerror(parsed.error);
      }
    } catch (error) {
      setProgress(100);
      console.error(error);
    }
  };
  return (
    <>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="post">
        <div className="post-header">
          <h3>Create Post</h3>
          <div className="post-btn">
            <button id="btn" onClick={postdata}>
              Post
            </button>
          </div>
        </div>
        <div className="post-input">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              loadfile(event);
              setimagefile(event.target.files[0]);
            }}
          />
          <img id="output" src={preview} alt="" />
        </div>
        <div className="details">
          <div className="prof-pic">
            <img
              src={JSON.parse(localStorage.getItem('myuser')).image}
              alt=""
            />
          </div>
          <div style={{ width: "100%" }}>
            <h4>{JSON.parse(localStorage.getItem('myuser')).userName}</h4>
            <textarea
              placeholder="Enter a suitable caption..."
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createpost;
