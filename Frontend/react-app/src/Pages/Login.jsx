import React from 'react';
import '../assets/css/register.css';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from '../Redux/auth/action';
import { ToastContainer, toast } from "react-toastify";
import { decodeToken } from '../AuthUtils';

function Login() {
  const notify = (text) => toast(text);
  const { user } = useSelector((store) => store.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = form;
    if (!email || !password) {
      notify("Email and password are required.");
      return false;
    }
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notify("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      dispatch(authLogin(form)).then((res) => {
        if (res.success) {
          const decodedToken = decodeToken(localStorage.getItem("token"));
          if (decodedToken && decodedToken.role === 'Student') {
            notify("Login Successful.");
            return navigate("/");
          } else {
            notify("Login Successful.");
            return navigate("/dashboard");
          }
        } else {
          notify("Incorrect email or password.");
        }
      });
    } catch (error) {
      notify("Error occurred, unable to Login.");
    }
  };

  return (
    <div className='container-fluid d-flex align-items-center justify-content-center bg-image' style={{ backgroundColor: '#DCDCDC', height: '100vh' }}>
      <ToastContainer />
      <div className='mask gradient-custom-3'></div>
      <div className='card m-5' style={{ maxWidth: '1000px', borderRadius: '15px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', overflow: 'hidden', padding: '30px', margin: '20px' }}>
        <div id='login form'>
          <div className='card-body px-5'>
            <h2 className="text-uppercase text-center mb-5">Welcome to ClassMate!</h2>
            <form className="form" action="#">
              <div className='mb-4'>
                <input className='form-control form-control-lg'
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                />
              </div>
              <div className='mb-4'>
                <input className='form-control form-control-lg'
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                />
              </div>
              <div className='mb-4' onClick={handleClick}>
                <button type="button" className="btn mb-30 btn-lg btn-primary w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
          <p style={{ textAlign: 'center' }}>New on our platform? <Link to="/register">Create an Account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
