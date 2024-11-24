import React from 'react';
import './Thumbnail.css';

const Thumbnail = ({ imgSource, videoTitle, videoDescription,videoTimestamp,videoViews }) => {
  return (
    <div className="thumbnail-card">
      <img 
        src={imgSource} 
        alt={videoTitle} 
        className="thumbnail" 
      />
      <h3 style={{fontSize:'20px',fontWeight:"500", marginTop:'10px'}}>{videoTitle}</h3>
     <div >
     <p className='video-Description'>{videoDescription}</p>
     <div className='date-view'>
     <p className='me-2'>{videoViews} views</p>
      <p className="video-timestamp">
      {new Date(videoTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

        </p>
     </div>
     </div>

    </div>
  );
};

export default Thumbnail;
