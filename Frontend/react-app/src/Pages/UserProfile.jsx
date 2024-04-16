import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Sidebar from '../Partials/Sidebar';
import { ToastContainer, toast } from "react-toastify";
import { GetInfo, UpdateInfo, changePassword } from '../Redux/auth/action';


const UserProfile = () => {
    const notify = (text) => toast(text);

    const [passwordSection,setPasswordSection ] = useState(false);
    
    const {user} = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    useEffect(()=> {dispatch(GetInfo()).then((res)=>console.log(user))},[]);

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
    
        const { oldPassword, newPassword, confirmNewPassword } = passwordData;

        if (newPassword !== confirmNewPassword) {
           notify("Passwords don't match")
            return;
        }

        dispatch(changePassword({oldPassword,newPassword,confirmNewPassword})).then((res)=>{
            
            notify(res.message);
        })

        setPasswordData({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
      
    };

    const [formData,setFormData] = useState({
        email:'',
        userName:'',
        password:'',
        role:'',
        firstName:'',
        lastName:'',
        city:'',
        country:'',
        address:'',
        phoneNumber:'',
        birthday:''
      })

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });

      const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
          ...passwordData,
          [name]: value,
        });
      };



      useEffect(() => {
        if (user) {
          // Update formData with user properties
       
          setFormData({
            ...formData, // Preserve existing formData fields
            firstName: user.firstName,
            lastName:user.lastName,
            userName: user.userName,
            city: user.city,
            email:user.email,
            password:user.passwordHash,
            country: user.country,
            address: user.address,
            phoneNumber: user.phoneNumber, 
            birthday:user.birthday,
            
          });
        }
      }, [user]); 
    

    const toggleState = () => {
    setPasswordSection(!passwordSection);
    };
  return (
    <div style={{display:"flex",height: "100vh",
    overflowY: "hidden"}}>
      
    <Sidebar/>

<div class="container rounded bg-white mt-5 mb-5">
<ToastContainer/>
    <div class="row" >
        {passwordSection && (

            <>
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">{formData.userName}</span><span class="text-black-50">{formData.email}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                    <button onClick={toggleState} class="btn btn-outline-dark">Info</button>
                </div>
                {user != null && (
                    <>
                     <form onSubmit={handlePasswordSubmit}>
            <div className="row mt-2">
                <div className="col-md-12 py-2">
                    <label className="labels">Old Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="oldPassword"
                        onChange={handlePasswordChange}
                        value={passwordData.oldPassword}
                        required
                    />
                </div>
                <div className="col-md-12 py-2">
                    <label className="labels">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        onChange={handlePasswordChange}
                        value={passwordData.newPassword}
                        required
                    />
                </div>
                <div className="col-md-12 py-2">
                    <label className="labels">Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="confirmNewPassword"
                        onChange={handlePasswordChange}
                        value={passwordData.confirmNewPassword}
                        required
                    />
                </div>
            </div>
            <div className="mt-5 text-center">
                <button
                    style={{ background: 'black', border: '2px solid black' }}
                    className="btn btn-primary profile-button"
                    type="submit"
                >
                    Change Password
                </button>
            </div>
        </form>
                    </>
                )}
    
            </div>
        </div></>
      )}
      {!passwordSection && (
        <>  <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">{formData.userName}</span><span class="text-black-50">{formData.email}</span><span> </span></div>
    </div>
    <div class="col-md-5 border-right">
        <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
                <button onClick={toggleState} class="btn btn-outline-dark">Security</button>
            </div>
            <div class="row mt-2">
            <div class="col-md-12 py-2"><label class="labels">First Name</label><input type="text" class="form-control" name="firstName" onChange={handleInputChange} value={formData.firstName}/></div>
                    <div class="col-md-12 py-2"><label class="labels">Last Name</label><input type="text" class="form-control" placeholder="Last Name"  name="lastName" onChange={handleInputChange} value={formData.lastName}/></div>
            </div>
            <div class="col-md-12 py-2"><label class="labels">Address</label><input type="text" class="form-control" placeholder="Address"  name="address" onChange={handleInputChange} value={formData.address}/></div>
                    <div class="col-md-12 py-2"><label class="labels">Birthday</label><input type="datetime" class="form-control" placeholder="Birthday"  name="birthday" onChange={handleInputChange} value={formData.birthday}/></div>
            <div class="row mt-3">
                <div class="col-md-12 py-2"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" onChange={handleInputChange} name="phoneNumber" value={formData.phoneNumber}/></div>
               


            </div>
 
            <div class="mt-5 text-center"><button style={{background:"black",border:"2px solid black"}} onClick={() => {dispatch(UpdateInfo(formData));  }}  class="btn btn-primary profile-button" type="button">Save Profile</button></div>
        </div>
    </div>
    <div class="col-md-4" style={{position:"relative",top:"100px"}}>
      
    <div class="col-md-12 py-2"><label class="labels">City</label><input type="text" class="form-control" placeholder="City"  name="city" onChange={handleInputChange} value={formData.city}/></div>
                    <div class="col-md-12 py-2"><label class="labels">Country</label><input type="text" class="form-control" placeholder="Country"  name="country" onChange={handleInputChange} value={formData.country}/></div>
        
    </div>
        </>
      )}
    </div>
</div>
</div>
  );
}

export default UserProfile;
