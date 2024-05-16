import React, { Component,useEffect,useState} from 'react'
import {Routes,Route,useParams} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import '../assets/css/cards.css'
import '../assets/css/rooms.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/scroll.css"
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Hero from './home/hero/Hero';
import { getAllPublicRooms } from '../Redux/data/action';
import ModalCJoin from '../Partials/ModalCJoin';

function StudyGroup() {


    const dispatch = useDispatch();
    const { publicGroups } = useSelector((store) => store.data);
    const [isModalJoinOpen, setIsModalJoinOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllPublicRooms());
    }, [dispatch]);


    const openModalJoin = () => {
      setIsModalJoinOpen(true);
    };
  
    const closeModalJoin = () => {
      setIsModalJoinOpen(false);
    };
  


    const getRandomOrange = () => {
      // Generate a random value between 0 and 255
      const randomValue = () => Math.floor(Math.random() * 70) + 10; // Limiting lightness to darker shades
      // Generate a random shade of dark orange using HSL color space
      const hue = Math.floor(Math.random() * 30 + 10); // Adjusted hue for dark orange shades
      const saturation = 100; // Full saturation
      const lightness = randomValue(); // Random lightness value
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    const getRandomBlue = () => {
      // Generate a random value between 0 and 255
      const randomValue = () => Math.floor(Math.random() * 100); // Limiting lightness to darker shades
      // Generate a random shade of dark blue using HSL color space
      const hue = Math.floor(Math.random() * 60 + 200); // Adjusted hue for blue shades
      const saturation = 100; // Full saturation
      const lightness = randomValue(); // Random lightness value
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };
  

  


  return(
    <>
   <Header prop={true}/>
   
   <div style={{marginTop:"10%",marginBottom:"10%"}} class="container">
 
  <h3>Public Chat Study Groups</h3>
 
  <div class="scrolling-wrapper-flexbox">
  {publicGroups != null && publicGroups.map((pg) => {

    if (pg.type == 1){
      return (
        <div class="card">
        <div style={{width:'100%',height:"22vh",backgroundColor: getRandomOrange()}} className="joinRoom">
  
          <FontAwesomeIcon class="fontSvg" icon={faArrowRightToBracket} style={{ color: "#ffffff" }} />
          <div class="paraDiv">
            <p className="roomP">{pg.name}</p>
            <p style={{ fontSize: "0.8em", color: "white" }}>{pg.description}</p>
            <p style={{ fontSize: "1.2em", color: "white",top:"-10px",position:"relative" }}>{pg.creator.firstName}</p>
          </div>
          </div>
        </div>
      
      )
    }
   

      
  })}
    </div>

     
  <h3>Public Video Chat Study Groups</h3>
 
 <div class="scrolling-wrapper-flexbox">
 {publicGroups != null && publicGroups.map((pg) => {

   if (pg.type == 0){
     return (
       <div class="card">
       <div style={{width:'100%',height:"22vh",backgroundColor: getRandomBlue()}} className="joinRoom">
 
         <FontAwesomeIcon class="fontSvg" icon={faArrowRightToBracket} style={{ color: "#ffffff" }} />
         <div class="paraDiv">
           <p className="roomP">{pg.name}</p>
           <p style={{ fontSize: "0.8em", color: "white" }}>{pg.description}</p>
           <p style={{ fontSize: "1.2em", color: "white",top:"-10px",position:"relative" }}>{pg.creator.firstName}</p>
         </div>
         </div>
       </div>
     
     )
   }
     
 })}
   </div>

  <h3>Join a private room</h3>
  <div style={{backgroundColor:"darkslategray"}} className="joinRoom" onClick={openModalJoin}>

<FontAwesomeIcon class="fontSvg" icon={faArrowRightToBracket} style={{ color: "#ffffff" }} />
<div class="paraDiv">
  <p className="roomP">Join Room</p>
  <p style={{ fontSize: "0.9em", color: "white" }}>via invitation link</p>
</div>
</div>
{isModalJoinOpen && <ModalCJoin onClose={closeModalJoin} />}

  
   </div>
  <Footer/>
   
    </>
  )
}
export default StudyGroup;