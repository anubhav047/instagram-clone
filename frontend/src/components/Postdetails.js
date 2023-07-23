import React, { useState } from "react";
import "../styles/postdetail.css";

const Postdetails = (props) => {
  const { popupPost, setpopupPost, setshow, show, fetchmyposts, user } = props;
  const [comment, setcomment] = useState("");
  const deletecomment = async (postId, comm) => {
    const res = await fetch("http://localhost:2000/deletecomment", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId, comm }),
    });
    const parsed = await res.json();
    setpopupPost(parsed.newpost);
  };
  const deletepost = async (postId) => {
    const res = await fetch(`http://localhost:2000/deletepost/${postId}`, {
      method: "delete",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ postId }),
    });
    const parsed = await res.json();
    togglecomments();
    if (parsed) fetchmyposts();
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
    //if the comment request is coming from showcomments portion need to re-render that post's data to down the new comment since populatePosts() only rerender posts on home page
    if (popupPost) {
      setpopupPost(parsed.newpost);
    }
  };
  const childClick = (e) => {
    e.stopPropagation();
  };
  const togglecomments = (post) => {
    if (show) {
      setpopupPost(null);
      setshow(false);
      fetchmyposts();
    } else {
      setpopupPost(post);
      setshow(true);
    }
  };
  return (
    <div
      className="show-comment"
      onClick={() => {
        togglecomments(popupPost);
      }}
    >
      <div className="container" onClick={childClick}>
        <div className="sc-image">
          <img src={popupPost.image} alt="" />
          <span
            className="material-symbols-outlined material-symbols-outlined-delete"
            onClick={() => {
              deletepost(popupPost._id);
            }}
          >
            delete
          </span>
        </div>
        <div className="sc-content">
          <div className="card-header">
            <div className="card-pic">
              <img
                src={user.image}
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
          <span
            className="material-symbols-outlined material-symbols-outlined-delete3"
            onClick={() => {
              deletepost(popupPost._id);
            }}
          >
            delete
          </span>
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
                        deletecomment(popupPost._id, comm);
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
  );
};

export default Postdetails;
