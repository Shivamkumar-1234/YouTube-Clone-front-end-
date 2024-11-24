

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";
import ytLogo from "./img/you tube logo.png";
import ytuLogo from "./img/youtube-icon.png";
import ytkids from "./img/youtubekids.png";
import ytMusic from "./img/youtubemusic.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo-container">
        <span className="material-symbols-outlined hamburger-icon">menu</span>
        <img src={ytLogo} alt="YouTube Logo" className="yt-logo" />
      </div>

      <div className="main-menu">
        <ul className="side-menu">
          <li className={location.pathname === "/home" ? "active-link" : ""}>
            <NavLink to="/home">
              <span className="material-symbols-outlined">home</span>
              <span className="ms-3 link-txt">Home</span>
            </NavLink>
          </li>
          <li className={location.pathname === "/history" ? "active-link" : ""}>
            <NavLink to="/history">
              <span className="material-symbols-outlined">history</span>
              <span className="ms-3 link-txt">History</span>
            </NavLink>
          </li>
          <li
            className={
              location.pathname === "/watch-later" ? "active-link" : ""
            }
          >
            <NavLink to="/watch-later">
              <span className="material-symbols-outlined">schedule</span>
              <span className="ms-3 link-txt">Watch Later</span>
            </NavLink>
          </li>
          <li
            className={location.pathname === "/myUploads" ? "active-link" : ""}
          >
            <NavLink to="/myUploads">
              <span className="material-symbols-outlined">video_library</span>
              <span className="ms-3 link-txt">Your Videos</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="main-menu">
        
        <ul className="side-menu">
          <li>
            <p style={{fontSize:'16px',color:'#333333',fontWeight:'600'}}>You</p>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">theaters</span>
              <span className="ms-3 link-txt">Shorts</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">thumb_up</span>
              <span className="ms-3 link-txt">Liked Videos</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">playlist_play</span>
              <span className="ms-3 link-txt">Playlist</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="main-menu">
        <ul className="side-menu">
        <li>
            <p style={{fontSize:'16px',color:'#333333',fontWeight:'600'}}>Explore</p>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">
                local_fire_department
              </span>
              <span className="ms-3 link-txt">Trending</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">local_mall</span>
              <span className="ms-3 link-txt">Shoping</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">music_note</span>
              <span className="ms-3 link-txt">Music</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">movie</span>
              <span className="ms-3 link-txt">Movie</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">sensors</span>
              <span className="ms-3 link-txt">Live</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">videogame_asset</span>
              <span className="ms-3 link-txt">Gaming</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">newsmode</span>
              <span className="ms-3 link-txt">News</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">trophy</span>
              <span className="ms-3 link-txt">Sports</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">lightbulb</span>
              <span className="ms-3 link-txt">Courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">styler</span>
              <span className="ms-3 link-txt">Fashion & Beauty</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">podcasts</span>
              <span className="ms-3 link-txt">Podcasts</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="main-menu">
        <ul className="side-menu">
           <li>
           <p style={{fontSize:'16px',color:'#333333',fontWeight:'600'}}>More from YouTube</p>
           </li>
          <li>
            <NavLink>
              <img src={ytuLogo} alt="YouTube Logo" className="ytu-icons" />
              <span className="ms-3 link-txt">YouTube Premium</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <img
                src={ytMusic}
                alt="YouTube Logo"
                className="ytu-icons"
                style={{ width: "24px", height: "24px" }}
              />
              <span className="ms-3 link-txt">YouTube Music</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <img
                src={ytkids}
                alt="YouTube Logo"
                className="ytu-icons"
                style={{ width: "24px", height: "24px" }}
              />
              <span className="ms-3 link-txt">YouTube Kids</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="main-menu">
        <ul className="side-menu">
          <li>
            <NavLink>
              <span class="material-symbols-outlined">settings</span>
              <span className="ms-3 link-txt">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">flag</span>
              <span className="ms-3 link-txt">Report history</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">help</span>
              <span className="ms-3 link-txt">Help</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <span class="material-symbols-outlined">feedback</span>
              <span className="ms-3 link-txt">Send feedback</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
       <div className="bottom-para" style={{marginLeft:'18px'}}>
       <p className="TC-text">AboutPressCopyrightContact usCreatorsAdvertiseDevelopers</p>
        <p className="TC-text">TermsPrivacyPolicy & SafetyHow YouTube worksTest new features</p>
        <p className="TC2-text">© 2024 Google LLC</p>
       </div>
      </div>
    </div>
  );
};

export default Sidebar;
