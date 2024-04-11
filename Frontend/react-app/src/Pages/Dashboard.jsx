import React from 'react';
import Sidebar from '../Partials/Sidebar';
import Cards from '../Partials/Cards';
import Tables from '../Partials/Table';
import PublicGroups from '../Partials/PublicStudyGroups';
import StudyGroupsReports from '../Partials/StudyGroupReports';
import {useNavigate } from "react-router-dom";
const Dashboard = () => {

  const navigate = useNavigate();
  return (
   
    <div class="dashboardContainer">
   
   <Sidebar/>
   <div style={{display:"flex",flexDirection:"column",margin:"0 auto",height:"100vh", gap: "30px"}}>

   <Cards/> 
   <Tables/>
   <PublicGroups/>
   <StudyGroupsReports />
   </div>
   <div className="avatar-container">
      <div onClick={()=>navigate("/profile")} className="avatar">
       G
      </div>
    </div>
   </div>
   
  );
}

export default Dashboard;
