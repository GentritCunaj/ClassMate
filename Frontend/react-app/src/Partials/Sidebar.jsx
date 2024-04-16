import React from 'react';
import '../assets/css/sidebar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {

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
          <a href="/quiz">
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
        <a href="#">
          <i class='bx bx-pie-chart-alt-2' ></i>
          <span class="link_name">Analytics</span>
        </a>
       
      </li>
      <li>
        <a href="#">
          <i class='bx bx-line-chart' ></i>
          <span class="link_name">Chart</span>
        </a>
       
      </li>
      <li>
        <div class="iocn-link">
          <a href="#">
            <i class='bx bx-plug' ></i>
            <span class="link_name">Plugins</span>
          </a>
          <i class='bx bxs-chevron-down arrow' ></i>
        </div>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-compass' ></i>
          <span class="link_name">Explore</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-history'></i>
          <span class="link_name">History</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-cog' ></i>
          <span class="link_name">Setting</span>
        </a>
        
      </li>
      <li>
   
  </li>
</ul>
  </div>
 
  </>
  );
}

export default Sidebar;
