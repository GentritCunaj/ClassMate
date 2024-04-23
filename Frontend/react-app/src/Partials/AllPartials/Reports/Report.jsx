import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import AllReports from './AllReports'

const Report = () => {
  return (
    <div style={{ display: 'flex', height: '100%',justifyContent:'center'  }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px',marginTop:'100px',marginLeft:'60px'}}>
          <h1 style={{ fontSize: '28px', color: '#333', marginRight: '42rem', marginBottom: '0' }}>Reports</h1>
          

          
        </div>

        <div style={{marginLeft:"70px"}}>
          <AllReports />
        </div>
      </div>
    </div>
  );
};

export default Report;
