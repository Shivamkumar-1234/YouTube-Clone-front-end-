import React from 'react';
import './SearchCard.css';


const SearchCard = ({ imgSource, videoTitle, videoDescription, videoViews, channelName, videoTimestamp }) => {
  return (
   <>
    <div className="search-card">
      <img
        src={imgSource}
        alt={videoTitle}
        className="search-thumbnail"
      />
      <div className="search-card-content">
        <h3 className="video-title">{videoTitle}</h3>
        <p className="channel-name">{channelName}</p>
        <p className="video-info">
          {videoViews} <span>views</span> • 
          <span className="video-timestamp">
            {new Date(videoTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </p>
        <p className="video-description">{videoDescription}</p>
      </div>
    </div>
   </>
  );
}

export default SearchCard;
