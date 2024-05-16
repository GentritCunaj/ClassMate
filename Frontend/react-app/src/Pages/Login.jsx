import React from 'react';
import '../assets/css/register.css';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from '../Redux/auth/action';
import { ToastContainer, toast } from "react-toastify";
import { decodeToken } from '../AuthUtils';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const notify = (text) => toast(text);
  const {user} = useSelector((store)=>store.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const room = 'yourRoomName'; // Change 'yourRoomName' to your desired room name

  // useEffect(() => {
  //     // Connect to the Socket.IO server
     
  //     // Join the room
  //     socket.emit('joinRoom', room);
      

  //     // Event listener for receiving a message
  //     socket.on('receiveMessage', (data) => {
  //         setMessages([...messages, data.message]);
  //     });

      
  // }, []); // Empty dependency array ensures this effect runs only once

  // const sendMessage = () => {
  //     if (socket && messageInput.trim() !== '') {
  //         const data = {
  //             room,
  //             message: messageInput
  //         };
  //         socket.emit('sendMessage', data);
  //         setMessageInput('');
  //     }
  // };


  
  const dispatch = useDispatch();
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleClick = (e) => {
    try {
      dispatch(authLogin(form)).then((res) => {
        const decodedToken = decodeToken(localStorage.getItem("token"));
        if (decodedToken.role == 'Student') {
          notify("Login Successful.");
          return navigate("/profile");
        }
        else if (res.success == true) {
          notify("Login Successful.");
          return navigate("/dashboard");
        }
        
        else {
          notify(res.message);
        }
        
      });
    } catch (error) {
      return notify("Error occurred, unable to Login.");
    }
  };
  
  return (
    
    <div className='container-fluid d-flex align-items-center justify-content-center bg-image' style={{ backgroundColor: '#DCDCDC', height: '100vh' }}>
      <ToastContainer/>
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
              <Link
                type="button"
                className="btn mb-30 btn-lg btn-primary w-100"
              >  Login
              </Link>
            </div>
          </form>
          </div>
          <p style={{ textAlign: 'center' }}>New on our platform? <a href="/register">Create an Account</a></p>
        </div>
      </div>

      {/* <h1>Chat Room: {room}</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        {msg}
                    </div>
                ))}
            </div>
            <div>
                <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div> */}

    </div>
  );
}

export default Login;
