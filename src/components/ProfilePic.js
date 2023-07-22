import React, { useState, useEffect, useRef } from "react";
import "../styles/profilepic.css";

const ProfilePic = ({ toggleprof, setuser }) => {
  const hiddenFileInput = useRef();
  const [imagefile, setimagefile] = useState(null);
  useEffect(() => {
   postdata();
   //eslint-disable-next-line
  }, [imagefile])
  
  const postdata = async () => {
    try {
      if (imagefile) {
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
        const parsed = await res.json();
        postToMongo(parsed.url);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleclick = () => {
    hiddenFileInput.current.click();
  };
  const postToMongo = async (url) => {
    try {
      const res = await fetch("http://localhost:2000/postprofpic", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ image: url }),
      })
      const parsed = await res.json();
      setuser(parsed.user);
      toggleprof();
    } catch (error) {
      console.error(error);
    }
  };
  const removeprofilepic = async () => {
    try {
      const res = await fetch("http://localhost:2000/removeprofpic", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        }
      })
      const parsed = await res.json();
      setuser(parsed.user);
      toggleprof();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="profilepic">
      <div className="prof-container">
        <h3>Change Profile Photo</h3>
        <div className="upload-photo">
          <button
            className="btn"
            onClick={() => {
              handleclick();
            }}
          >
            Upload Photo
          </button>
        </div>
        <input
          type="file"
          ref={hiddenFileInput}
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            setimagefile(e.target.files[0]);
          }}
        />
        <div className="remove-photo">
          <button onClick={removeprofilepic}className="btn">Remove Current Photo</button>
        </div>
        <div onClick={toggleprof}>
          <button className="btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
