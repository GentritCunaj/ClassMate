import React from 'react';
import Sidebar from '../Partials/Sidebar';
import Cards from '../Partials/Cards';
import Tables from '../Partials/Table';
const Dashboard = () => {
  return (
    <div class="dashboardContainer">
   
   <Sidebar/>
   <div style={{display:"flex",flexDirection:"column",margin:"0 auto"}}>

  
   <Cards/> 
   <Tables/> 
   </div>
   </div>
   
  );
}

export default Dashboard;
