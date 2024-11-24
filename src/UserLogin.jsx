import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const UserLogin = () => {
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`http://localhost:8888/loginUser`, values);
        const token = res.data.token; 
        const userId = res.data.user._id;

        localStorage.setItem("token", token); 
        localStorage.setItem("userId", userId);

        alert("User Login Successfully!");
        navigate("/home"); 
        console.log("userid--------", userId);
        console.log("token-----", token);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message); 
        } else {
          console.log(err.message);
        }
      }
    },
  });

  return (
    <>
      <div className="main-box">
      <form onSubmit={myFormik.handleSubmit} className="Form">
        <p className="log-head">Login</p>
       
        <div className="email-box">
          <input
            type="email"
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            name="email"
            placeholder="Email Id"
            className="email-input"
            autoFocus 
            
          />
        </div>
        <div className="password-box">
          <input
            type="password"
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            name="password"
            placeholder="Password"
            className="password-input"
          />
        </div>
        <div>
          <button className="login-btn" type="submit">
            Login
          </button>
          <p className="signUp-link">Don't have an account? <Link to={'/UserSignup'} style={{textDecoration:'none'}}>Sign Up</Link></p>
        </div>
      </form>
      </div>
    </>
  );
};

export default UserLogin;
