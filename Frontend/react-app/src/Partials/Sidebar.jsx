import React from 'react';
import '../assets/css/sidebar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { authLogout } from '../Redux/auth/action';
const Sidebar = () => {

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={`sidebar ${isOpen ? 'close' : ''}`}>
    <div class="logo-details">
    
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">CodingLab</span>
      <i onClick={toggleSidebar} class='bx bx-menu' ><FontAwesomeIcon icon={faBars} /> </i>
   
 
    </div>
    <ul class="nav-links">
      <li>
        <a href="/dashboard">
          <i class='bx bx-grid-alt' ></i>
          <span class="link_name">Dashboard</span>
        </a>
      </li>
      <li>
        <div class="iocn-link">

          <a href="../../quiz">

            <i class='bx bx-plug' ></i>
            <span class="link_name">Quiz</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
      </li>
      <li>
        <a href="/assignment">
          <i class='bx bx-compass' ></i>
          <span class="link_name">Assignment</span>
        </a>
      </li>
      <li>
        <div class="iocn-link">
          <a href="/resource">
            <i class='bx bx-book-alt' ></i>
            <span class="link_name">Resource</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
      </li>
      <li>
        <a href="/students">
          <i class='bx bx-pie-chart-alt-2' ></i>
          <span class="link_name">Students</span>
        </a>
       
      </li>
      <li>
        <a href="/teachers">
          <i class='bx bx-line-chart' ></i>
          <span class="link_name">Teachers</span>
        </a>
       
      </li>
      <li>
        <div class="iocn-link">
          <a href="/profile">
            <i class='bx bx-plug' ></i>
            <span class="link_name">Profile</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
      </li>
     
      <li>
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
