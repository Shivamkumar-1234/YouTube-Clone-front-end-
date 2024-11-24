import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyUploadCard from "./Cards/MyUploadCard";
import './MyUpload.css'; 

const MyUploads = () => {
  const [videos, setVideos] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/myUploads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos(response.data); 
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/display/${video._id}`);
  };

  const deleteUploadedVideo = async(videoId) => {
    try{
      await axios.delete(`http://localhost:8888/deleteUploadedVideo/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
      alert('Video Deleted!')
    }catch(err){
      console.log(err.message)
    }
   
    
  };

  return (
    <>
      <div>
        <p className="myUploads-Head">Your Videos</p>
      </div>

      <div className="video-feed-myUploads">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="myUploads-item">
              <div
                className="video-card-myUploads"
                onClick={() => handleVideoClick(video)}
              >
                <MyUploadCard
                  imgSource={`${video.thumbnailPath}`}
                  videoTitle={`${video.videoTitle}`}
                  videoDescription={`${video.videoDescription}`}
                  videoTimestamp={`${video.timestamp}`}
                  videoView={video.view.length}
                />
              </div>
              <button
                className="cross-button"
                onClick={() => deleteUploadedVideo(video._id)}
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

export default MyUploads;
