import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <div className="app">
      <Sidebar/>
      <div className="main-content">
        <Header />
        <div className="content" style={{backgroundColor:'#ffffff',height:'100%'}}>
       
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
