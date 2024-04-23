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
        <div className="logo-details">
          <i className='bx bxl-c-plus-plus'></i>
          <span className="logo_name">ClassMate</span>
          <i onClick={toggleSidebar} className='bx bx-menu' >
            <FontAwesomeIcon icon={faBars} />
          </i>
        </div>
        <ul className="nav-links">
          <li>
            <a href="/dashboard">
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Dashboard</span>
            </a>
          </li>
          {user && user.fRole === 'Teacher' && (
            <li>
              <div className="iocn-link">
                <a href="../../quiz">
                  <i className='bx bx-plug'></i>
                  <span className="link_name">Quiz</span>
                </a>
                <i className='bx bxs-chevron-down arrow'></i>
              </div>
            </li>
          )}
          {user && user.fRole === 'Teacher' && (
            <li>
              <a href="/assignment">
                <i className='bx bx-compass'></i>
                <span className="link_name">Assignment</span>
              </a>
            </li>
          )}
          {user && user.fRole === 'Teacher' && (
            <li>
              <div className="iocn-link">
                <a href="/resource">
                  <i className='bx bx-book-alt'></i>
                  <span className="link_name">Resource</span>
                </a>
                <i className='bx bxs-chevron-down arrow'></i>
              </div>
            </li>
          )}
          <li>
            <a href="/students">
              <i className='bx bx-pie-chart-alt-2'></i>
              <span className="link_name">Students</span>
            </a>
          </li>
          <li>
            <a href="/teachers">
              <i className='bx bx-line-chart'></i>
              <span className="link_name">Teachers</span>
            </a>
          </li>
          <li>
            <div className="iocn-link">
              <a href="/profile">
                <i className='bx bx-plug'></i>
                <span className="link_name">Profile</span>
              </a>
              <i className='bx bxs-chevron-down arrow'></i>
            </div>
          </li>
          <li className="logout">
            <a
              style={{ flexDirection: "column-reverse" }}
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
