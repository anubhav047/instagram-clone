import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import "../styles/userprofile.css";
import UserPostdetails from "./UserPostdetails";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const {userId} = useParams();
  const [user, setuser] = useState({
    followers:0,
    following:0
  });
  const [isfollow, setisfollow] = useState(false);
  const [posts, setposts] = useState([]);
  const [popuppost, setpopuppost] = useState(null);
  const [show, setshow] = useState(false);
   useEffect(() => {
    fetchuser()
    if(userId===JSON.parse(localStorage.getItem('myuser'))._id)
    {
      navigate("/profile",{replace: true});
    }
    window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [isfollow]);
  const fetchuser = async () => {
    const res = await fetch(`http://localhost:2000/getuser/${userId}`, {
      method: "get"
    });
    const parsed = await res.json();
    setposts(parsed.posts);
    setuser(parsed.user);
    if(parsed.user.followers.includes(JSON.parse(localStorage.getItem("myuser"))._id)){
      setisfollow(true);
    }
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

  const follow = async()=>{
    const res = await fetch("http://localhost:2000/follow",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      },
      body:JSON.stringify({followId:userId})
    })
    if(res){
      setisfollow(true)
    }
  }
  const unfollow = async()=>{
    const res = await fetch("http://localhost:2000/unfollow",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      },
      body:JSON.stringify({followId:userId})
    })
    if(res){
      setisfollow(false)
    }
  }
  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile-top">
          <div className="profile-pic">
            <img
              src={user.image}
              alt=""
            />
          </div>
          <div className="profile-data">
            <div className="top">
              <div className="data">
            <h2>{user.userName}</h2>
            <h3>{user.name}</h3>
              </div>
            <button onClick={()=>{
              if(isfollow)
              {
                unfollow();
              }
              else{
                follow();
              }
            }}>{isfollow?"Unfollow":"Follow"}</button>
            </div>
            <p>{posts.length} Posts</p>
            <p>{user.followers.length} Followers</p>
            <p>{user.following.length} Following</p>
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
          user={user}
          setshow={setshow}
        />
      )}
    </>
  );
};

export default UserProfile;
