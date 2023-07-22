import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import "./styles/search.css";
import { Link } from "react-router-dom";

const Search = () => {
  useEffect(() => {
    fetchusers();
    // eslint-disable-next-line
  }, []);

  const [users, setusers] = useState([]);
  const [query, setquery] = useState("");
  const fetchusers = async () => {
    const res = await fetch("http://localhost:2000/fetchallusers", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const parsed = await res.json();
    setusers(parsed.users);
  };
  return (
    <>
      <Navbar />
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a user"
            value={query}
            onChange={(e) => {
              setquery(e.target.value);
            }}
          />
          <button>Search</button>
        </div>
         <div className="search-content">
          {users.filter((user) => {
            if (query === "") {
              return false;
            } else if (user.name.toLowerCase().includes(query.toLowerCase())||user.userName.toLowerCase().includes(query.toLowerCase())) {
              return user;
            }
            return false;
          }).map((user) => (
            <Link to={`/user/${user._id}`}>
            <p>{user.name} "{user.userName}"</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
