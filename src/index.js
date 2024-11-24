import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import History from "./History";
import WatchLater from "./WatchLater";
import VideoUpload from "./VideoUpload";
import UserSignUp from "./UserSignUp";
import UserLogin from "./UserLogin";
import Display from "./Display";
import MyUploads from "./MyUploads";
import Search from "./Search";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="watch-later" element={<WatchLater />} />
        <Route path="uploadVideo" element={<VideoUpload/>} />
        <Route path="UserSignup" element={<UserSignUp/>} />
        <Route path="UserLogin" element={<UserLogin/>} />
       
        <Route path="/display/:id" element={<Display />} />
        <Route path="myUploads" element={<MyUploads/>}/>
        <Route path="/search/:text" element={<Search/>}/>


     
      </Route>
      {/* <Route path="UserSignup" element={<UserSignUp/>} />
      <Route path="UserLogin" element={<UserLogin/>} /> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
