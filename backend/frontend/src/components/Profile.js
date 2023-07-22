import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import "../styles/Profile.css";
import Postdetails from "./Postdetails";
import ProfilePic from "./ProfilePic";

const Profile = () => {
  const [user, setuser] = useState({
    followers: [],
    following: [],
  });
  const [myposts, setmyposts] = useState([]);
  const [popuppost, setpopuppost] = useState(null);
  const [show, setshow] = useState(false);
  const [prof, setprof] = useState(false);
  useEffect(() => {
    getdetails();
    fetchmyposts();
    window.scrollTo(0, 0);
  }, []);
  const fetchmyposts = async () => {
    const res = await fetch("/myposts", {
      method: "get",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const parsed = await res.json();
    setmyposts(parsed);
  };
  const getdetails = async () => {
    const res = await fetch("/fetchdetails", {
      method: "get",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const parsed = await res.json();
    setuser(parsed.user);
  };
  const toggle = async (element) => {
    if (show) {
      setshow(false);
      setpopuppost(null);
    } else {
      setpopuppost(element);
      setshow(true);
    }
  };
  const toggleprof = () => {
    if (prof) {
      setprof(false);
    } else {
      setprof(true);
    }
  };
  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile-top">
          <div className="profile-picc" >
            <img onClick={toggleprof}
              src={user.image}
              alt=""
            />
          </div>
          <div className="profile-data">
            <h2>{user.userName}</h2>
            <h3>{user.name}</h3>
            <p>{myposts.length} Posts</p>
            <p>{user.followers.length} Followers</p>
            <p>{user.following.length} Following</p>
          </div>
        </div>
        <hr style={{ opacity: "0.7", margin: "10px auto" }}></hr>
        <div className="gallery">
          {myposts.map((element) => {
            return (
              <div
                onClick={() => {
                  toggle(element);
                }}
                key={element._id}
                style={{ position: "relative" }}
              >
                <img src={element.image} alt="" key={element.image} />
              </div>
            );
          })}
        </div>
      </div>
      {show && (
        <Postdetails
          popupPost={popuppost}
          setpopupPost={setpopuppost}
          show={show}
          setshow={setshow}
          fetchmyposts={fetchmyposts}
          user={user}
        />
      )}
      {prof && <ProfilePic toggleprof={toggleprof} setuser={setuser}/>}
    </>
  );
};

export default Profile;
