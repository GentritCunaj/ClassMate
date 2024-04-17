import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Sidebar from '../Partials/Sidebar';
import Cards from '../Partials/Cards';
import Tables from '../Partials/Table';
import PublicGroups from '../Partials/PublicStudyGroups';
import StudyGroupsReports from '../Partials/StudyGroupReports';
import {useNavigate } from "react-router-dom";
import {GetInfo} from '../Redux/auth/action';
import { getAllUsers } from '../Redux/data/action';
const Students = () => {
  const dispatch = useDispatch();

  const {user} = useSelector((store) => store.auth);


  const {students} = useSelector((store) => store.data);


  const navigate = useNavigate();
  return (
   
    <div class="dashboardContainer">
   
   <Sidebar/>
   <div style={{display:"flex",flexDirection:"column",margin:"0 auto",height:"100vh", gap: "30px"}}>


{user && user.fRole == 'Teacher' || user.fRole == 'Admin' && (
    <>
       
       <div style={{paddingTop:"100px"}}>
       <Tables  role={students} name="Students"/>
       </div>
       </>
   )}
  

   
   </div>
   <div className="avatar-container">
      <div onClick={()=>navigate("/profile")} className="avatar">
       G
      </div>
    </div>
   </div>
   
  );
}

export default Students;
