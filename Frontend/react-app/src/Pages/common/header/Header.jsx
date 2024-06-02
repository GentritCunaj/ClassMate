import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { getAllSubjects } from "../../../Redux/data/action";
import { GetInfo } from "../../../Redux/auth/action";
import "../../../assets/css/dropdown.css";

const Header = ({ prop }) => {
  const { subjects } = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.auth); // Access the user object
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubjects());
    dispatch(GetInfo());
  }, [dispatch]);

  const [click, setClick] = useState(false);

  const style = prop ? { backgroundColor: "darkslategray" } : {};

  return (
    <>
      <Head prop={prop} />
      <header>
        <nav style={style} className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {user && user.fRole === "Student" && (
              <>
                <li>
                  <Link to="/studyGroups">Study Groups</Link>
                </li>
                <li
                  style={{ left: 0, position: "relative" }}
                  id="dropdownLi"
                  className="nav-item dropdown dropdown-hover position-static"
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Subjects
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                    style={{
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      maxWidth: "80vh",
                    }}
                  >
                    <div className="container">
                      <div className="row" style={{ width: "100%" }}>
                        {subjects != null &&
                          subjects.map((subject) => (
                            <div className="col-md-6 col-lg-4 mb-3 mb-lg-0" key={subject.subjectId}>
                              <div className="list-group list-group-flush">
                                <Link
                                  to={`/subject/${subject.subjectId}`}
                                  id="subjectBackground"
                                  className="list-group-item list-group-item-action"
                                >
                                  <h5>{subject.name}</h5>
                                </Link>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
          <div className="start">
            {!user && <Link to="/login" className="button">LOGIN</Link>}
            {user && user.fRole === "Student" && <Link to="/profile" className="button">PROFILE</Link>}
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"> </i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
