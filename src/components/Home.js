import React, { useEffect,useState } from "react";
import Navbar from "./NavBar";
import './Home.css'
import {useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState([])

  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      navigate("/login");
    }
    setposts([]);
      populatePosts();
    // eslint-disable-next-line
  }, [])

  const populatePosts = async()=>{
    const res= await fetch("http://localhost:2000/fetchposts",{
      method:"get",
      headers:{ 
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      }
    })
    const parsed = await res.json();
    setposts(parsed);
  }
  
  return (
    <>
      <Navbar populatePosts={populatePosts}/>
      <div className="home">
        {posts.map((elements)=>{
          return(
            <div className="card" key={elements.image}>
            <div className="card-header">
              <div className="card-pic">
                <img
                  src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-black-and-white-fashion-man-people.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt=""
                />
              </div>
                  <h3>{elements.postedBy.name}</h3>
            </div>
            <div className="card-image">
              <img
                src={elements.image}
                alt=""
              />
            </div>
            <div className="card-content">
              <span className="material-symbols-outlined">favorite</span>
              <p>1 Like</p>
              <p><span style={{fontWeight:"bold"}}>{elements.postedBy.userName}</span> : {elements.body}</p>
            </div>
            <div className="card-comment">
              <input type="text" placeholder="Type a comment" />
              <button className="comment-btn">Post</button>
            </div>
          </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
