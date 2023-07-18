import React from "react";
import Navbar from "./NavBar";
import './Home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="card">
          <div className="card-header">
            <div className="card-pic">
              <img
                src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-black-and-white-fashion-man-people.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
              />
            </div>
                <h3>Anubhav</h3>
          </div>
          <div className="card-image">
            <img
              src="https://images.pexels.com/photos/17533611/pexels-photo-17533611/free-photo-of-bird-animal-beak-outdoors.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
            />
          </div>
          <div className="card-content">
            <span class="material-symbols-outlined">favorite</span>
            <p>1 Like</p>
            <p><span style={{fontWeight:"bold"}}>anubhav_04 </span> : Such a beutiful view</p>
          </div>
          <div className="card-comment">
            <input type="text" placeholder="Type a comment" />
            <button className="comment-btn">Post</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
