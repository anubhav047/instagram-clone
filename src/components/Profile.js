import React,{useState,useEffect} from 'react'
import Navbar from "./NavBar"
import './Profile.css'

const Profile = () => {
  const [myposts, setmyposts] = useState([])
  useEffect(() => {
    fetchmyposts()
  }, [])
  const fetchmyposts = async ()=>{
    const res = await fetch("http://localhost:2000/myposts",{
      method:"get",
      headers:{
        "auth-token":localStorage.getItem('token')
      }
    })
    const parsed = await res.json();
    setmyposts(parsed);
  }
  return (
    <>
    <Navbar/>
    <div className="profile">
        <div className="profile-top">
            <div className="profile-pic">
                <img src="https://images.pexels.com/photos/15422042/pexels-photo-15422042/free-photo-of-black-and-white-fashion-man-people.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
            </div>
            <div className="profile-data">
            <h2>anubhav_04</h2>
            <h3>Anubhav Goel</h3>
            <p>{myposts.length} Posts</p>
            <p>100 Followers</p>
            <p>100 Following</p>
            </div>


        </div>
        <hr style={{opacity:"0.7",margin:"10px auto"}}></hr>
        <div className="gallery">
          {myposts.map((element)=>{
            return(
              <img src={element.image} alt="" key={element.image}/>
            )
          })}
            
        </div>
    </div>
    </>
  )
}

export default Profile