import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Registers } from '../Redux/auth/action';
import '../assets/css/register.css';

const Register = () => {
  const notify = (text) => toast(text);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const initData = {
    role: "admin",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    country: "",
    address: "",
    phoneNumber: "",
    birthday: ""
  };
  const [RegisterValue, setRegisterValue] = useState(initData);

  const HandleRegisterChange = (e) => {
    setRegisterValue({ ...RegisterValue, [e.target.name]: e.target.value });
  };

  const HandleRegistersChange = (event) => {
    setRegisterValue({ ...RegisterValue, role: event.target.value });
  };

  const validateForm = () => {
    const { email, phoneNumber, password, userName, firstName, lastName, country, address, city, birthday } = RegisterValue;

    // Check if any field is empty
    if (!email || !password || !userName || !firstName || !lastName || !country || !address || !city || !phoneNumber || !birthday) {
      notify("All fields are required.");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notify("Please enter a valid email address.");
      return false;
    }

    // Validate phone number (basic validation, can be improved)
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phoneNumber)) {
      notify("Please enter a valid phone number.");
      return false;
    }

    // Validate password length
    if (password.length < 6) {
      notify("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const HandleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    dispatch(Registers(RegisterValue)).then((res) => {
      setLoading(false);
      if (res.message === "You're already registered") {
        return notify("You're already registered");
      }
      setRegisterValue(initData);
      notify("You're registered");

      // Redirect to login page after successful registration
      window.location.href = '/';
    }).catch(() => {
      setLoading(false);
      notify("Registration failed. Please try again.");
    });
  };

  return (
    <div className='container-fluid d-flex align-items-center justify-content-center bg-image' style={{ backgroundColor: '#DCDCDC' }}>
      <ToastContainer />
      <div className='mask gradient-custom-3'></div>
      <div className='card m-5' style={{ maxWidth: '1000px', borderRadius: '15px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', overflow: 'hidden', padding: '30px', margin: '20px' }}>
        <div className='card-body px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <form onSubmit={HandleRegisterSubmit} className="form-column">
            <div className='form-group mb-4'>
              <label className='form-label'>Select user type</label>
              <select className='form-select form-select-lg' value={RegisterValue.role} onChange={HandleRegistersChange} required>
                <option value='admin'>Admin</option>
                <option value='student'>Student</option>
                <option value='teacher'>Teacher</option>
              </select>
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>UserName</label>
              <input className='form-control form-control-lg'
                type="text"
                placeholder="Full Name"
                name="userName"
                value={RegisterValue.userName}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>First Name</label>
              <input className='form-control form-control-lg'
                type="text"
                placeholder="First Name"
                name="firstName"
                value={RegisterValue.firstName}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>Last Name</label>
              <input className='form-control form-control-lg'
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={RegisterValue.lastName}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>Email</label>
              <input className='form-control form-control-lg'
                type="email"
                placeholder="Email"
                name="email"
                value={RegisterValue.email}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>Country</label>
              <input className='form-control form-control-lg'
                type="text"
                placeholder="Country"
                name="country"
                value={RegisterValue.country}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>Address</label>
              <input className='form-control form-control-lg'
                type="text"
                placeholder="Address"
                name="address"
                value={RegisterValue.address}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>Password</label>
              <input className='form-control form-control-lg'
                type="password"
                placeholder="Password"
                name="password"
                value={RegisterValue.password}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>City</label>
              <input className='form-control form-control-lg'
                type="text"
                placeholder="City"
                name="city"
                value={RegisterValue.city}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>Phone Number</label>
              <input className='form-control form-control-lg'
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={RegisterValue.phoneNumber}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <div className='form-group mb-4'>
              <label className='form-label'>BirthDate</label>
              <input className='form-control form-control-lg'
                type="date"
                name="birthday"
                value={RegisterValue.birthday}
                onChange={HandleRegisterChange}
                required
              />
            </div>

            <button type="submit" className='btn mb-4 w-100 gradient-custom-4 btn-lg' style={{ color: 'white' }}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
          <p style={{ textAlign: 'center' }}>Have already an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
