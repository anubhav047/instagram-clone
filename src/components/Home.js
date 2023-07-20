import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState({});
  const [comment, setcomment] = useState("");
  const [item, setitem] = useState(null);
  const [show, setshow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    setposts([]);
    getdetails();
    populatePosts();
    // eslint-disable-next-line
  }, []);

  const getdetails = async () => {
    const res = await fetch("http://localhost:2000/fetchdetails", {
      method: "get",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const parsed = await res.json();
    setuser(parsed.user);
  };

  const populatePosts = async () => {
    const res = await fetch("http://localhost:2000/fetchposts", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const parsed = await res.json();
    setposts(parsed);
  };

  const likepost = async (postId) => {
    const res = await fetch("http://localhost:2000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId }),
    });
    const parsed = await res.json();
    console.log(parsed);
    populatePosts();
    //if the like request is coming from showcomments portion need to re-render that post's data to up the like count since populatePosts() only rerender posts on home page
    if(item)
    setitem(parsed.newpost);
  };
  const unlikepost = async (postId) => {
    const res = await fetch("http://localhost:2000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId }),
    });
    const parsed = await res.json();
    populatePosts();
    //if the unlike request is coming from showcomments portion need to re-render that post's data to down the like count since populatePosts() only rerender posts on home page
    if(item)
    setitem(parsed.newpost);
  };

  const handlecomment = async (postId) => {
    const res = await fetch("http://localhost:2000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ comment, postId }),
    });
    const parsed = await res.json();
    setcomment("");
    populatePosts();
    //if the comment request is coming from showcomments portion need to re-render that post's data to down the new comment since populatePosts() only rerender posts on home page
    if(item){
      setitem(parsed.newpost);
    }
  };
  const togglecomments = (post) => {
    setitem(post);
    if (show) {
      setitem(null);
      setshow(false);
    } else {
      setshow(true);
    }
  };
  const childClick = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      <Navbar populatePosts={populatePosts} />
      <div className="home">
        {posts.map((element) => {
          return (
            <div className="card" key={element.image}>
              <div className="card-header">
                <div className="card-pic">
                  <img
                    src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-black-and-white-fashion-man-people.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt=""
                  />
                </div>
                <h3>{element.postedBy.name}</h3>
              </div>
              <div className="card-image">
                <img src={element.image} alt="" />
              </div>
              <div className="card-content">
                {!element.likes.includes(user._id) ? (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => {
                      likepost(element._id);
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined red"
                    onClick={() => {
                      unlikepost(element._id);
                    }}
                  >
                    favorite
                  </span>
                )}
                <p>{element.likes.length} Likes</p>
                <p>
                  <span style={{ fontWeight: "bold" }}>
                    {element.postedBy.userName}
                  </span>{" "}
                  : {element.body}
                </p>
              </div>
              <div className="card-comment">
                <input
                  type="text"
                  placeholder="Type a comment"
                  value={comment}
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
                <button
                  className="comment-btn"
                  onClick={() => {
                    handlecomment(element._id);
                  }}
                >
                  Post
                </button>
              </div>
              <div className="comment-section">
                <p>{element.comments.length} comments</p>
                <p>
                  <span
                    onClick={() => {
                      togglecomments(element);
                    }}
                  >
                    Click to show comments
                  </span>
                </p>
              </div>
            </div>
          );
        })}
        {show && (
          <div
            className="show-comment"
            onClick={() => {
              togglecomments(item);
            }}
          >
            <div className="container" onClick={childClick}>
              <div className="sc-image">
                <img
                  src={item.image}
                  alt=""
                />
              </div>
              <div className="sc-content">
                <div className="card-header">
                  <div className="card-pic">
                    <img
                      src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-black-and-white-fashion-man-people.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt=""
                    />
                  </div>
                  <h3>{item.postedBy.userName}</h3>
                  <span onClick={()=>{togglecomments(item)} }className="material-symbols-outlined material-symbols-outlined-close">close</span>
                </div>
                <div className="sc-comments">
                  {item.comments.map((comm)=>{
                    return(
                      <p>
                      <span style={{ fontWeight: "bold" }}>{comm.postedBy.userName}</span> :{" "}
                      {comm.comment}
                    </p>
                    );
                  })}
                 
                </div>
                <div className="card-content">
                  {!item.likes.includes(user._id) ? (
                    <span
                      className="material-symbols-outlined"
                      onClick={() => {
                        likepost(item._id);
                      }}
                    >
                      favorite
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined red"
                      onClick={() => {
                        unlikepost(item._id);
                      }}
                    >
                      favorite
                    </span>
                  )}
                  <p>{item.likes.length} Likes</p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      {item.postedBy.userName}
                    </span>{" "}
                    : {item.body}
                  </p>
                  <div className="card-comment">
                    <input
                      type="text"
                      placeholder="Type a comment"
                      value={comment}
                      onChange={(e) => {
                        setcomment(e.target.value);
                      }}
                    />
                    <button
                      className="comment-btn"
                      onClick={() => {
                        handlecomment(item._id);
                      }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
