import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import "./header.css"
import { getAllSubjects } from "../../../Redux/data/action";
import "../../../assets/css/dropdown.css";
const Header = ({prop}) => {

  
  let {subjects} = useSelector((store) => store.data);
  const dispatch = useDispatch();

  useEffect(()=> {dispatch(getAllSubjects())},[]);
  const [click, setClick] = useState(false)

  const style = prop ? {backgroundColor:"darkslategray"} : {}
  

  return (
    <>
      <Head prop={prop}/>
      <header>
        <nav style={style} className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
           
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/team'>Team</Link>
            </li>
            <li>
              <Link to='/pricing'>Pricing</Link>
            </li>
            <li>
              <Link to='/journal'>Journal</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>

            <li style={{left:0,position:"relative"}} id="dropdownLi" class="nav-item dropdown dropdown-hover position-static">
                                 <a  class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-mdb-toggle="dropdown" aria-expanded="false">
                                     Subjects
                                 </a>
                                 
                                 <div  class="dropdown-menu" aria-labelledby="navbarDropdown" style={{borderTopLeftRadius: 0,
                                                   borderTopRightRadius: 0,maxWidth:"80vh" }}>
                                                 
                       
                                   <div class="container" >
                                     <div class="row" style={{width:"100%"}}>
                                     
           
                                     {subjects != null && subjects.map((subject) => (
                                         <div class="col-md-6 col-lg-4 mb-3 mb-lg-0" key={subject.categoryId}>
                                               <div class="list-group list-group-flush">
                                         <a href={`/subject/${subject.name}`} id="subjectBackground" class="list-group-item list-group-item-action"><h5>{subject.name}</h5></a>
                                         
                                         
                                         </div>
                                         </div>
                                     ))}
                                         
                                     </div>
                                   </div>
                                 </div>
                               </li>
             
          </ul>
          <div className='start'>
          <Link to='/login' className='button'>LOGIN</Link>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
     
                              
                            
      </header>
    </>
  )
}

export default Header
