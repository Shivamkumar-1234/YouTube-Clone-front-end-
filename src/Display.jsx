import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Display.css";
import { useFormik } from "formik";

const Display = () => {
  const [video, setVideo] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [save, setSave] = useState(false);
  const [toggleSubscribe, setToggleSubscribe] = useState(false);

  const { id } = useParams();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  
  const fetchVideo = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/getVideo/${id}`);
      const videoData = response.data;
      setVideo(videoData);
      console.log("response---", response);
      if (response.data.postedBy.subscribers.includes(userId)) {
        console.log("subscribers----", response.data.postedBy.subscribers);
        setToggleSubscribe(true);
      }
      if (response) {
        checkWatchLater();
      }
      setLiked(videoData.likes.includes(userId));
      setDisliked(videoData.dislikes.includes(userId));
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  
  const handleLikeClick = async () => {
    if (!token) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8888/likeVideo/${video._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedVideo = response.data;
      setVideo(updatedVideo);

      setLiked(updatedVideo.likes.includes(userId));
      setDisliked(updatedVideo.dislikes.includes(userId));

      console.log();
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  
  const handleDislikeClick = async () => {
    if (!token) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8888/dislikeVideo/${video._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedVideo = response.data;

      setVideo(updatedVideo);

      setLiked(updatedVideo.likes.includes(userId));
      setDisliked(updatedVideo.dislikes.includes(userId));
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

 
  const subscribeChannel = async () => {
    if (!token) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8888/subscribe/${video._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setToggleSubscribe(!toggleSubscribe);
    } catch (error) {
      console.error("Error subscribing to channel:", error);
    }
  };

  
  const addWatchLater = async () => {
    if (!token) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8888/watchLater/${video._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      checkWatchLater();
    } catch (error) {
      console.error("Error adding to watch later:", error);
    }
  };

  // -----watch Later saved?--------------------------------------------------------------------

  const checkWatchLater = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/checkWatchLater/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data.message === "Video not found!") {
        setSave(false);
      } else {
        setSave(true);
      }
      console.log(
        "function checkWatchLater has been called and run after useState------response----",
        response
      );
    } catch (err) {
      console.log("video._id---", video?._id);
      console.log(err.message);
    }
  };

  // Record view after threshold
  useEffect(() => {
    if (video) {
      const videoElement = document.getElementById("displayedVideo");
      if (!videoElement) return;

      let viewRecorded = false;

      const handleTimeUpdate = async () => {
        const threshold = 10; // seconds
        if (videoElement.currentTime >= threshold && !viewRecorded) {
          viewRecorded = true;
          addHistory();
          if (!token) {
            console.error("User is not authenticated");
            return;
          }
          try {
            const response = await axios.put(
              `http://localhost:8888/view/${video._id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const updatedVideo = response.data;
            console.log("updatedVideo-Data frontend------", updatedVideo);
            setVideo(updatedVideo);
          } catch (error) {
            console.error("Error recording view:", error);
          }
        }
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);

      // Cleanup event listener on unmount
      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [video, token, userId]);

  // adding video to history

  const addHistory = async () => {
    try {
      await axios.put(
        `http://localhost:8888/addHistory/${video._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  // Fetch video on component mount or when id changes
  useEffect(() => {
    fetchVideo();
  }, [id, toggleSubscribe, save]);

  const myFormik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `http://localhost:8888/userComment/${video._id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVideo(response.data.result);
        alert(`Comment Posted!`);
        resetForm();
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  const deleteCMT = async (videoId, postedBy, userId, commentId) => {
    console.log("userId---", userId);
    console.log("postedBy._id---", postedBy._id);
    console.log("userId !== postedBy._id----", userId !== postedBy._id);

    if (userId !== postedBy._id) {
      alert("You can only delete your comments");
      return; // Exit the function if the user ID does not match
    }

    console.log("videoId in cmt--", videoId);

    try {
      const response = await axios.put(
        `http://localhost:8888/deleteComment/${videoId}/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const videoData = response.data;
      console.log("videoData---", videoData);
      setVideo(videoData);
      fetchVideo();
    } catch (err) {
      console.log("err-message---", err.message);
    }
  };

  return (
    <div className="video-page">
      {video ? (
        <div>
          <div className="video-container">
            <video
              controls
              controlsList="nodownload" 
              src={video.videoPath}
              className="video"
              id="displayedVideo"
              onContextMenu={(e) => e.preventDefault()} 
            />
          </div>

          <div className="video-details">
            <div className="video-info">
              <div>
                <h3 className="video-title">{video.videoTitle}</h3>
                <p className="video-description">{video.videoDescription}</p>
                <p className="video-timestamp" style={{ marginTop: "-12px" }}>
                  {" "}
                  <span className="view-count me-2">{` ${
                    video?.view?.length || 0
                  } Views`}</span>
                  {new Date(video.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              
            </div>
            <div className="video-actions">
              <div className="video-actions-left">
              <div className="subs-btn">
                <button
                  style={{ borderRadius: "100px" }}
                  className={
                    toggleSubscribe
                      ? "btn btn-outline-dark subscribe-btn"
                      : "btn btn-dark"
                  }
                  onClick={subscribeChannel}
                >
                  {toggleSubscribe ? "Subscribed" : "Subscribe"}
                </button>
              </div>
               
                  <div
                    class="btn-group me-2"
                    role="group"
                    aria-label="Basic mixed styles example"
                    style={{borderRadius:'100px'}}
                  >
                   <button style={{height:'40px'}}
                  className={` ${liked ? "btn btn-dark  rounded-start-pill" : "btn btn-outline-dark  rounded-start-pill"}`}
                  onClick={handleLikeClick}
                >
                 <div  className="d-flex">
                 <div>
                    <span class="material-symbols-outlined">thumb_up</span>
                    </div>
                    <div className="ms-2">
                      <span className="like-count me-2">{video.likes.length}</span>
                    </div>
                 </div>
                </button>
                   

                <button
                  className={` ${
                    disliked ? "btn btn-dark rounded-end-circle" : "btn btn-outline-dark rounded-end-circle"
                  }`}
                  onClick={handleDislikeClick}
                  style={{height:'40px'}}
                >
                  <span class="material-symbols-outlined">thumb_down</span>
                </button>
                
                  </div>
              

               
              </div>
              <button
                style={{ borderRadius: "100px", height: "48px", width: "48px" }}
                onClick={addWatchLater}
                className={save ? " btn btn-outline-dark " : "  btn btn-dark"}
              >
                {save ? (
                  <span
                    class="material-symbols-outlined"
                    style={{ paddingTop: "5px" }}
                  >
                    bookmark_added
                  </span>
                ) : (
                  <span
                    class="material-symbols-outlined"
                    style={{ paddingTop: "5px" }}
                  >
                    bookmark_add
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="cmt-section">
            <div>
              <p>{video?.comments?.length} Comments</p>
            </div>
            <form onSubmit={myFormik.handleSubmit}>
              <div>
                <input
                  type="text"
                  id="postComment"
                  onChange={myFormik.handleChange}
                  value={myFormik.values.comment}
                  className="form-control"
                  name="comment"
                  placeholder="Add a comment..."
                  required
                />

                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  style={{ marginBottom: "50px" }}
                >
                  Comment
                </button>
              </div>
            </form>
            <div>
              {video?.comments
                ?.slice()
                .reverse()
                .map((e) => (
                  <div key={e._id} className="comment">
                    <div className="comment-user-time">
                      <span className="comment-user">{e.postedBy?.name}</span>
                      <span className="comment-timestamp ">
                        {new Date(e.timestamp).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div style={{ width: "854px" }}>
                        <p className="comment-text">{e.text}</p>
                      </div>

                      <span
                        className="material-symbols-outlined"
                        style={{ cursor: "pointer", zIndex: "99" }}
                        onClick={() =>
                          deleteCMT(video._id, e.postedBy, userId, e._id)
                        }
                      >
                        close
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default Display;
