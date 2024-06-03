import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import AllAsignments from './AllAsignments';

const Assignment = () => {
  return (
    
    <div style={{ display:'flex', height: '100%',justifyContent:'center' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px',marginTop:'100px',marginLeft:'60px'}}>
          <h1 style={{ fontSize: '28px', color: '#333', marginRight: '42rem', marginBottom: '0' }}>Assignments</h1>
          <Link
            to="/createAssignment"
            style={{
              textDecoration: 'none',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Add Assignment
          </Link>
          <Link
            to="/assignmentResults" // Update this with the correct path to assignment results
            style={{
              textDecoration: 'none',
              padding: '10px 20px', /* Adjust padding */
              backgroundColor: '#28a745', // Change color to green (or any desired color)
              color: '#fff',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginLeft: '20px' /* Add margin to separate buttons */
            }}
          >
          Submissions
          </Link>
        </div>

        <div style={{marginLeft:"70px"}}>
          <AllAsignments />
        </div>
      </div>
    </div>
  );
};

export default Assignment;
