

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchCard from "./Cards/SearchCard";
import "./Search.css"
import Carousel from "./Carousel";

const Search = () => {
  const params = useParams();
  const [video, setVideo] = useState([]);
  const navigate = useNavigate();

  const getSearchedVideo = async () => {

    const values = { text: params.text };
    try {
      const token = localStorage.getItem("token");
      console.log("token--", token);
      console.log("searched Text----", params.text);

      const response = await axios.post(
        `http://localhost:8888/searchVideo`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response) {
        setVideo(response?.data.result);
        console.log("response.data.result----", response?.data.result);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleVideoClick = (video) => {
    navigate(`/display/${video._id}`);
  };

  
  useEffect(() => {
    getSearchedVideo();
  }, [params.text]);

  return (
    <>
     <Carousel/>

      <div className="video-feed-search">
        {video?.length > 0 ? (
          video.map((video) => (
            <div key={video._id} className="search-item">
              <div
                className="video-card-search"
                onClick={() => handleVideoClick(video)}
              >
                <SearchCard
                  imgSource={`${video.thumbnailPath}`}
                  videoTitle={`${video.videoTitle}`}
                  videoDescription={`${video.videoDescription}`}
                  videoViews={video.view.length} 
                  videoTimestamp={`${video.timestamp}`}
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

export default Search;
