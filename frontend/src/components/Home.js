import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState({});
  const [comment, setcomment] = useState("");
  const [popupPost, setpopupPost] = useState(null);
  const [show, setshow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login",{replace: true});
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
    localStorage.setItem("myuser",JSON.stringify(parsed.user));
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
    console.log(parsed)
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
    if (popupPost) setpopupPost(parsed.newpost);
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
    if (popupPost) setpopupPost(parsed.newpost);
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
    if (popupPost) {
      setpopupPost(parsed.newpost);
    }
  };
  const togglecomments = (post) => {
    if (show) {
      setpopupPost(null);
      setshow(false);
      populatePosts();
    } else {
      setpopupPost(post);
      setshow(true);
    }
  };
  const deletecomment = async (postId,comm) => {
    const res = await fetch("http://localhost:2000/deletecomment",{
      method:"delete",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body:JSON.stringify({postId,comm})
    })
    const parsed  = await res.json();
    setpopupPost(parsed.newpost);
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
                    src={element.postedBy.image}
                    alt=""
                  />
                </div>
                <Link to={`/user/${element.postedBy._id}`}>
                <h3>{element.postedBy.name}</h3>
                </Link>
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
              togglecomments(popupPost);
            }}
          >
            <div className="container" onClick={childClick}>
              <div className="sc-image">
                <img src={popupPost.image} alt="" />
              </div>
              <div className="sc-content">
                <div className="card-header">
                  <div className="card-pic">
                    <img
                      src={popupPost.postedBy.image}
                      alt=""
                    />
                  </div>
                  <h3>{popupPost.postedBy.userName}</h3>
                  <span
                    onClick={() => {
                      togglecomments(popupPost);
                    }}
                    className="material-symbols-outlined material-symbols-outlined-close"
                  >
                    close
                  </span>
                </div>
                <div className="sc-comments">
                  {popupPost.comments.map((comm) => {
                    return (
                      <p key={comm._id}>
                        <span style={{ fontWeight: "bold" }}>
                          {comm.postedBy.userName}
                        </span>{" "}
                        : {comm.comment}
                        {(popupPost.postedBy._id === user._id ||
                          comm.postedBy._id === user._id) && (
                          <span
                            onClick={() => {
                              deletecomment(popupPost._id,comm);
                            }}
                            className="material-symbols-outlined material-symbols-outlined-delete1"
                          >
                            delete
                          </span>
                        )}
                      </p>
                    );
                  })}
                </div>
                <div className="card-content">
                  {!popupPost.likes.includes(user._id) ? (
                    <span
                      className="material-symbols-outlined"
                      onClick={() => {
                        likepost(popupPost._id);
                      }}
                    >
                      favorite
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined red"
                      onClick={() => {
                        unlikepost(popupPost._id);
                      }}
                    >
                      favorite
                    </span>
                  )}
                  <p>{popupPost.likes.length} Likes</p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      {popupPost.postedBy.userName}
                    </span>{" "}
                    : {popupPost.body}
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
                        handlecomment(popupPost._id);
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
