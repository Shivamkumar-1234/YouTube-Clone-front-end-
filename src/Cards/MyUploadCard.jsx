import React from 'react';
import './MyUploadCard.css'; 

const MyUploadCard = ({ imgSource, videoTitle, videoDescription,videoTimestamp,videoView }) => {
  return (
    <div className="myUpload-card">
      <img 
        src={imgSource} 
        alt={videoTitle} 
        className="myUpload-thumbnail"
      />
      <div className="myUpload-card-content">
        <h3>{videoTitle}</h3>
        <p>{videoDescription}</p>
        <p className="video-timestamp">
        {new Date(videoTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
               </p>
               <p>{videoView} <span>views</span> </p>
      </div>
    </div>
  );
};

export default MyUploadCard;
