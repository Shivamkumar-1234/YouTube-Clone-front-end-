

import React from 'react';
import './HistoryCard.css';

const HistoryCard = ({ imgSource, videoTitle, videoDescription ,videoView}) => {
  return (
    <div className="history-card">
      <img 
        src={imgSource} 
        alt={videoTitle} 
        className="history-thumbnail"
      />
      <div className="history-card-content">
        <h3>{videoTitle}</h3>
        <p>{videoDescription}</p>
        <p>{videoView} <span>views</span> </p>
       
      </div>
    </div>
  );
};

export default HistoryCard;
