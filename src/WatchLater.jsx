import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WatchLaterCard from "./Cards/WatchLaterCard";
import './WatchLater.css'; 

const WatchLater = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please Login !");
  }

  const watchLaterVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/watchLaterVideos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideos(response.data.result);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.clear();
      } else {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    watchLaterVideos();
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/display/${video._id}`);
  };

  const handleCrossClick = async(videoId) => {
    console.log(`Cross button clicked for video ID: ${videoId}`);
    try{
         const response=await axios.delete(`http://localhost:8888/deleteWatchLater/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
          alert(response.data.message)
    }catch(err){
      console.log(err.message)
    }
  };

  return (
    <>
      <div>
        <p className="watchLater-Head">Watch Later</p>
      </div>

      <div className="video-feed-watchLater">
        {videos?.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="watchLater-item">
              <div
                className="video-card-watchLater"
                onClick={() => handleVideoClick(video)}
              >
                <WatchLaterCard
                  imgSource={`${video.thumbnailPath}`}
                  videoTitle={`${video.videoTitle}`}
                  videoDescription={`${video.videoDescription}`}
                  videoView={video.view.length} 
                  
                />
              </div>
              <button
                className="cross-button"
                onClick={() => handleCrossClick(video._id)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </>
  );
};

export default WatchLater;
