
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Thumbnail from './Cards/Thumbnail';
import "./Home.css"
import Carousel from './Carousel';
const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const displayVideo = async () => {
    await axios.get('http://localhost:8888/random')
      .then(response => {
        const shuffledVideos = response.data.sort(() => 0.5 - Math.random());
        setVideos(shuffledVideos);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }

  useEffect(() => {
    displayVideo();
  }, []);

  const handleVideoClick = (video) => {
    navigate(`/display/${video._id}`);
  };

  return (
  
<>

<Carousel/>

<div className="video-feed-home">
  {videos.length > 0 ? (
    videos.map(video => (
      <div key={video._id} className="video-thumbnail">
        <div className="video-card-home" onClick={() => handleVideoClick(video)}>
          <Thumbnail 
            imgSource={video.thumbnailPath} 
            videoTitle={video.videoTitle} 
            videoDescription={video.videoDescription} 
            videoTimestamp={video.timestamp}
            videoViews={video.view.length}
          />
        </div>
      </div>
    ))
  ) : (
    <p>No videos available</p>
  )}
</div>

</>
  
  );
};

export default Home;
