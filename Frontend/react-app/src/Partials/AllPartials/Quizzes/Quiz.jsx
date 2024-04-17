import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Quizzes from './Quizzes';

const Quiz = () => {
  return (
    <div style={{ display: 'flex', height: '100%',justifyContent:'center'  }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px',marginTop:'100px',marginLeft:'60px'}}>
          <h1 style={{ fontSize: '28px', color: '#333', marginRight: '42rem', marginBottom: '0' }}>Quizzes</h1>
          <Link
            to="/createQuiz"
            style={{
              textDecoration: 'none',
              padding: '10px 70px',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Add Quiz
          </Link>
        </div>

        <div style={{marginLeft:"50px"}}>
          <Quizzes />
        </div>
      </div>
    </div>
  );
};

export default Quiz;
