

import React, { useState } from "react";
import { useFormik } from "formik";
import './videoUpload.css'
// import { useNavigate } from "react-router-dom";
const VideoUploadForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail,setThumbnail]=useState(null);
 
// const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    },
    onSubmit: async (values) => {
        

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to be logged in to upload a video.");
       return; //?
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("userVideo", videoFile);
      formData.append("videoThumbnail",thumbnail)

      try {
        const response = await fetch("http://localhost:8888/upload", {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData
                  });

              

        if (response.status === 200) {
          alert("Video uploaded successfully!");
         
        } else {
          alert("Failed to upload video. Please try again.");
          
        }

        formik.resetForm()
        document.getElementById("thumbnail-file").value=""
        document.getElementById("video-file").value=""
      }catch (err) {
        if (err.response && err.response.status === 401) {
          // Token is invalid, redirect to login
          localStorage.clear();
       
        } else {
          console.error(err.message);
        }
      }
    },
  });

  const videoFileName=document.getElementById('video-file')
  const thumbnailFileName=document.getElementById('thumbnail-file')
  return (
    <>
    <div className="main-box">
      
  
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="video-form">
      <p className="Upload-head">Video Upload </p>
        <div className="title-box">
         
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="title-input"
            id="firtst-input"
            placeholder="Video Title"
            autoFocus
          />
        </div>
        <div className="description-box">
        
          <input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="description-input"
             id="second-input"
            placeholder="Video Description"
          />
        </div>
       

       <div className="files">

       <div>
          <label className="custom-file-upload mt-3" for='video-file'>Upload Video</label>
          <p className="addresses">{videoFileName?videoFileName.value:'video Address'}</p>
          <input
            type="file"
            name="userVideo"
            
            onChange={(e) => setVideoFile(e.target.files[0])}
            id="video-file"
            style={{display:'none'}}
           
          />
        </div>
        <div>
          <label className="custom-file-upload mt-3" for='thumbnail-file'>Upload Thumbnail</label>
          <p className="addresses">{thumbnailFileName?thumbnailFileName.value:'Thumbnail Address'}</p>
          <input
            type="file"
            name="videoThumbnail"
            onChange={(e) => setThumbnail(e.target.files[0])}
            style={{display:'none'}}
            id="thumbnail-file"
          />
        </div>
       </div>
        <button className="videoUpload-btn mt-5" type="submit">Upload</button>
      </form>
    </div>
    </>
  );
};

export default VideoUploadForm;
