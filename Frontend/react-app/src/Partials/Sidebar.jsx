import React from 'react';
import '../assets/css/sidebar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../Redux/auth/action';

const Sidebar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={`sidebar ${isOpen ? 'close' : ''}`}>
    <div class="logo-details">
    
      <i id="sideIcon" class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">ClassMate</span>
      <i onClick={toggleSidebar} class='bx bx-menu' ><FontAwesomeIcon icon={faBars} /> </i>
   
 
    </div>
    <ul class="nav-links">
      <li>
        <a href="/dashboard">
          <i id="sideIcon" class='bx bx-grid-alt' ></i>
          <span class="link_name">Dashboard</span>
        </a>
      </li>
      {user && user.fRole === 'Teacher' && (
            <li>
              <div className="iocn-link">
                <a href="../../quiz">
                  <i id="sideIcon" className='bx bx-plug'></i>
                  <span className="link_name">Quiz</span>
                </a>
                <i className='bx bxs-chevron-down arrow'></i>
              </div>
            </li>
          )}
          {user && user.fRole === 'Teacher' && (
            <li>
              <a href="/assignment">
                <i id="sideIcon"  className='bx bx-compass'></i>
                <span className="link_name">Assignment</span>
              </a>
            </li>
          )}
          {user && user.fRole === 'Teacher' && (
            <li>
              <div className="iocn-link">
                <a href="/resource">
                  <i id="sideIcon" className='bx bx-book-alt'></i>
                  <span className="link_name">Resource</span>
                </a>
                <i className='bx bxs-chevron-down arrow'></i>
              </div>
            </li>
          )}
           {user && (user.fRole === 'Teacher' || user.fRole === 'Admin') && (
      <li>
        <div class="iocn-link">
          <a href="/report">
            <i id="sideIcon" class='bx bx-book-alt' ></i>
            <span class="link_name">Reports</span>
          </a>
          <i id="sideIcon" class='bx bxs-chevron-down arrow' ></i>
        </div>
      </li>
      )}
      <li>
        <a href="/students">
          <i id="sideIcon" class='bx bx-pie-chart-alt-2' ></i>
          <span class="link_name">Students</span>
        </a>
       
      </li>
      <li>
        <a href="/teachers">
          <i id="sideIcon" class='bx bx-line-chart' ></i>
          <span class="link_name">Teachers</span>
        </a>
       
      </li>
      <li>
        <div class="iocn-link">
          <a href="/profile">
            <i id="sideIcon" class='bx bx-plug' ></i>
            <span class="link_name">Profile</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
      </li>
     
      <li class="logout">
        
      <a
      style={{flexDirection:"column-reverse"}}
        className="cart-link"
        onClick={() => {
            dispatch(authLogout());
        }}
        href="/"
        >
        LogOut 
        <div className="icon">
            <FiLogOut />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
