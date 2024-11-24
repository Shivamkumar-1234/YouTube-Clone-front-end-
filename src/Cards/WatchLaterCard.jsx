import React from 'react';
import './watchLaterCard.css';

const WatchLaterCard = ({ imgSource, videoTitle, videoDescription,videoView}) => {
  return (
    <div className="watchLater-card">
      <img 
        src={imgSource} 
        alt={videoTitle} 
        className="watchLater-thumbnail"
      />
      <div className="watchLater-card-content">
        <h3>{videoTitle}</h3>
        <p>{videoDescription}</p>
        <p>{videoView} <span>views</span> </p>
      
      </div>
      
    </div>
  );
};

export default WatchLaterCard;
