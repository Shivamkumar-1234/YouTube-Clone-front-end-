import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpForm.css";

const UserSignUp = () => {
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
     
        await axios.post(`http://localhost:8888/SignUp`, values);

       
        alert("User Created!");
        navigate(`/UserLogin`);
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
          <p className="Sign-head">Sign Up </p>

       
          <div className="name-box">
           
            <input
              type="text"
              value={myFormik.values.name}
              onChange={myFormik.handleChange}
              name="name"
              className="name-input"
              autoFocus
              placeholder="User Name"
            />
          </div>
          <div className="email-box">
           
            <input
              type="text"
              value={myFormik.values.email}
              onChange={myFormik.handleChange}
              name="email"
              className="email-input"
              placeholder="Email Id"
            />
          </div >
          <div className="password-box">
          
            <input
              type="text"
              value={myFormik.values.password}
              onChange={myFormik.handleChange}
              name="password"
              className="password-input"
              placeholder="Password"
            />
          </div>

          <div>
            <button className="signUp-btn" type="submit">
              Submit
            </button>
            <p className="Login-link">Already have an account? <Link to={'/UserLogin'} style={{textDecoration:'none'}}>Login</Link></p>
          </div>
        </form>
     
       </div>
    </>
  );
};

export default UserSignUp;
