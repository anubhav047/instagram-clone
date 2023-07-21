import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import "./userprofile.css";
import UserPostdetails from "./UserPostdetails";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
const {userId} = useParams();
  const [user, setuser] = useState({});
  const [posts, setposts] = useState([]);
  const [popuppost, setpopuppost] = useState(null);
  const [show, setshow] = useState(false);
  useEffect(() => {
    fetchuser();
    console.log(JSON.parse(localStorage.getItem('myuser')));
    if(userId==JSON.parse(localStorage.getItem('myuser'))._id)
    {
      navigate("/profile",{replace: true});
    }
  }, []);
  const fetchuser = async () => {
    const res = await fetch(`http://localhost:2000/user/${userId}`, {
      method: "get"
    });
    const parsed = await res.json();
    setposts(parsed.posts);
    setuser(parsed.user);
}
  const toggle = async (element) => {
    if (show) {
      setshow(false);
      setpopuppost(null);
    } else {
      setpopuppost(element);
      setshow(true);
    }
  };
  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile-top">
          <div className="profile-pic">
            <img
              src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-black-and-white-fashion-man-people.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
            />
          </div>
          <div className="profile-data">
            <h2>{user.userName}</h2>
            <h3>{user.name}</h3>
            <p>{posts.length} Posts</p>
            <p>100 Followers</p>
            <p>100 Following</p>
          </div>
        </div>
        <hr style={{ opacity: "0.7", margin: "10px auto" }}></hr>
        <div className="gallery">
          {posts.map((element) => {
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
        <UserPostdetails
          popupPost={popuppost}
          setpopupPost={setpopuppost}
          show={show}
          setshow={setshow}
          user={user}
        />
      )}
    </>
  );
};

export default UserProfile;
