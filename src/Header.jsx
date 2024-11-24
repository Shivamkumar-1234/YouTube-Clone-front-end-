import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); 
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [text, setText] = useState("");
 
 
 
 
 
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const getUser = async () => {
    if (!token) {
      navigate("/UserLogin");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8888/myAccount/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setData(response.data);
     
      
       
       
    } catch (err) {
      console.log(err);
      alert("Failed to fetch user data.");
      console.log("user id---------", userId);
    }
  };

  const handleLogout = () => {
    if(!data){
      navigate('/UserLogin')
      return;
    }
    localStorage.clear(); // will clear the stroage means it will remove the token and userId
    alert("You have been logged out.");
    setData(null)
  
    console.log("localstorage data after clear-----", localStorage);
    // redirect the user to the login page
    navigate("/UserLogin");
  };

  const searchText = (event) => {
    console.log("Type of text before setting state:", typeof text);
    console.log("type of text in search bar--", typeof text);
    setText(event.target.value);
  };

  useEffect(() => {
    getUser();
   navigate("/home")
  }, []);

  return (
    <>
      <div className="header">
        <div className="search-bar">
          <input
            type="search"
            name="text"
            className="search-box"
            value={text}
            onChange={searchText}
            placeholder="Search"
            style={{ backgroundColor: "#ffffff" }}
          />
          <button className="search-button">
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={() => {
                if (text) {
                  navigate(`/search/${text}`);
                }
              }}
            ></i>
          </button>
          <div className="mic-icon">
            <span class="material-symbols-outlined">mic</span>
          </div>
        </div>

        

        <div className="header-icons">
          <Link to={`/uploadVideo`}>
            <div>
              <span className="material-symbols-outlined">video_call</span>
            </div>
          </Link>
          <div>
            <span class="material-symbols-outlined">notifications</span>
          </div>
          <div className="account-icon" onClick={toggleDropdown}>
            
            <i
              className="fa-regular fa-user"
              style={{
                color: "#ffffff",
                padding: "6px 5px 5px 7px",
                fontSize: "20px",
              }}
            ></i>
          </div>
          

          {/* Dropdown */}
          {showDropdown && (
            <div className="dropdown" ref={dropdownRef}>
              <div className="user-details">
                <p>{data?.result.name}</p>
                <p>{data?.result.email}</p>
                <p>Subscribers: {data?.result.subscribers.length}</p>
                <p>Subscribed: {data?.result.subscribed.length}</p>
              </div>
              <button className="logout-button" onClick={handleLogout}>
              {data?'Logout':'Login'}
              </button>
            </div>
          )}


        
        </div>
      </div>
    </>
  );
};

export default Header;
