import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Partials/Sidebar';
import Cards from '../Partials/Cards';
import Tables from '../Partials/Table';
import PublicGroups from '../Partials/PublicStudyGroups';
import StudyGroupsReports from '../Partials/StudyGroupReports';
import { GetInfo } from '../Redux/auth/action';
import { getAllUsers } from '../Redux/data/action';
import Containers from '../Partials/Containers';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  
  const { user } = useSelector((store) => store.auth);
  const { teachers, students, admins, loading } = useSelector((store) => store.data);

  
  useEffect(() => {
    const fetchUserInfo = async () => {
      // Ensure that the authentication token is set and ready before fetching user info
      const userToken = localStorage.getItem('token'); 
      if (userToken) {
        try {
       
          await dispatch(GetInfo()); // Dispatch action to fetch user info
          dispatch(getAllUsers('Teacher'));
          dispatch(getAllUsers('Admin'));
          dispatch(getAllUsers('Student'));
        } catch (error) {
          console.error('Error fetching user info:', error);
          // Handle error (e.g., token expired or invalid)
          // Redirect to login page or display error message
        }
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  // Render based on user role
  return (
    <div className="dashboardContainer">
      <Sidebar />
      <div className='contentContainer'>
        {user && (
          <>

            {user.fRole==='Admin' && <Containers/> }
            {user.fRole === 'Teacher' && <Cards />}
            {user.fRole === 'Admin' && <Tables role={admins} name="Admins" /> }
            {user.fRole === 'Teacher' && <Tables role={students} name="Students" />}
            {user.fRole === 'Teacher' && <PublicGroups />}
            {user.fRole === 'Admin' && <PublicGroups />}
            {user.fRole === 'Admin' && <StudyGroupsReports />}
          </>
        )}
      </div>
      <div className="avatar-container">
        <div onClick={() => navigate('/profile')} className="avatar">
         <h3> {user && user.firstName && user.firstName.charAt(0)} </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;