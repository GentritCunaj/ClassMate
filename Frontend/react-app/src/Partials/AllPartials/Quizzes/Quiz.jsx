import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Quizzes from './Quizzes';

const Quiz = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div style={{ marginLeft: '250px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '100px', marginLeft: '60px' }}>
          <h1 style={{ fontSize: '28px', color: '#333', marginRight: '20px', marginBottom: '0' }}>Quizzes</h1>
          <Link
            to="/createQuiz"
            style={{
              textDecoration: 'none',
              padding: '10px 20px', /* Adjust padding */
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              marginLeft: 'auto' /* Move button to the right */
            }}
          >
            Add Quiz
          </Link>
          <Link
            to="/quizResults" // Update this with the correct path to quiz results
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
            Quiz Results
          </Link>
        </div>

        <div style={{ marginLeft: "50px" }}>
          <Quizzes />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
