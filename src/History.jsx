

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HistoryCard from "./Cards/HistoryCard";
import "./History.css";

const History = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please Login!");
  }

  const watchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/watchHistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.clear();
      } else {
        console.error(err.message);
      }
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:8888/deleteHistoryVideo/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
    
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
  
      alert('Video Deleted!');
    } catch (err) {
      console.log("videoId---", videoId);
      console.error("Error removing video", err.message);
    }
  };
  


  const deleteAllHistoryVideos=async()=>{
    try{
      await axios.delete(`http://localhost:8888/deleteAllHistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      alert('All Videos Deleted !')
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    watchHistory();
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/display/${video._id}`);
  };

  return (
    <>
      <div className="history-header">
        <p className="history-Head">Watch History</p>
        <button className="clear-history-btn">
          
        <div  onClick={() => deleteAllHistoryVideos()} style={{display:'flex',justifyContent:'center', textAlign:'center'}}>
        <p>
            <span class="material-symbols-outlined">delete</span>
          </p>
         <p>
         Clear All Watch History
         </p>
        </div>
        </button>
      </div>

      <div className="video-feed-history">
        {videos?.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="history-item">
              <div
                className="video-card-history"
                onClick={() => handleVideoClick(video)}
              >
                <HistoryCard
                  imgSource={`${video.thumbnailPath}`}
                  videoTitle={`${video.videoTitle}`}
                  videoDescription={`${video.videoDescription}`}
                  videoView={video.view.length} 
                 
                />
              </div>
              <button
                className="cross-button"
                onClick={() => deleteVideo(video._id)}
              >
                <span class="material-symbols-outlined">close</span>
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

export default History;
