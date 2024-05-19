import React, { Component,useEffect,useState} from 'react'
import {Routes,Route,useParams} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import '../assets/css/cards.css'
import '../assets/css/rooms.css'
import { faComment, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalC from '../Partials/ModalC';
import "../assets/css/scroll.css"
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Hero from './home/hero/Hero';
import { getAllPrivateRooms, getAllPublicRooms } from '../Redux/data/action';
import ModalCJoin from '../Partials/ModalCJoin';
import { faVideo} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faComments } from '@fortawesome/free-solid-svg-icons';

function StudyGroup() {


    const dispatch = useDispatch();
    const { publicGroups,privateGroups } = useSelector((store) => store.data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [isModalJoinOpen, setIsModalJoinOpen] = useState(false);

  

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(getAllPublicRooms());
        dispatch(getAllPrivateRooms())
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

    const getRandomGreen = () => {
      // Generate a random value between 0 and 255
      const randomValue = () => Math.floor(Math.random() * 100); // Limiting lightness to darker shades
      // Generate a random shade of dark green using HSL color space
      const hue = Math.floor(Math.random() * 60 + 120); // Adjusted hue for green shades
      const saturation = 100; // Full saturation
      const lightness = randomValue(); // Random lightness value
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };
    

    const getRandomBlue = () => {
      // Generate a random value between 0 and 255
      const randomValue = () => Math.floor(Math.random() * 100); // Limiting lightness to darker shades
      // Generate a random shade of dark blue using HSL color space
      const hue = Math.floor(Math.random() * 60 + 200); // Adjusted hue for blue shades
      const saturation = 100; // Full saturation
      const lightness = randomValue(); // Random lightness value
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };
  

    const [searchText, setSearchText] = useState('');
    const [filterBy, setFilterBy] = useState('description');
    const studyGroupsByType = {
      type0: publicGroups.filter(group => group.type === 0),
      type1: publicGroups.filter(group => group.type === 1)
  };
// Default filter by description

    // Filter function based on searchText and filterBy
    const filterStudyGroups = (groups) => {
      
      return groups.filter(group => {
          const { description, groupName, creator } = group;
          const searchValue = searchText.toLowerCase();
          switch (filterBy) {
              case 'description':
                  return !searchText ||  description.toLowerCase().includes(searchValue);
              case 'name':
                  return !searchText || groupName.toLowerCase().includes(searchValue);
              case 'creator':
                  return !searchText || creator.firstName.toLowerCase().includes(searchValue);
              default:
                  return true; // Return true by default to include all groups
          }
      });
  };
  


  return(
    <>
   <Header prop={true}/>
   
   <div style={{marginTop:"10%",marginBottom:"10%"}} class="container">
 
 <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
  <h3>Public Chat Study Groups</h3>
  <div class="search">

            <div class="input-group"  style={{flexWrap:"nowrap"}}>
  <div class="form-outline" data-mdb-input-init>
    <input type="search" id="form1" class="form-control" 
     
                value={searchText}
                placeholder='Search'
                onChange={e => setSearchText(e.target.value)} />
   
  </div>
  <button style={{width:"25%"}} type="button" class="btn btn-primary" data-mdb-ripple-init>
    <i class="fas fa-search"></i>
  </button>
</div>
            <select style={{marginTop:"5%"}} value={filterBy} onChange={e => setFilterBy(e.target.value)}>
                <option value="description">Description</option>
                <option value="name">Name</option>
                <option value="creator">Creator</option>
            </select>
            </div>     
            </div>     
 
  <div class="scrolling-wrapper-flexbox">
  {filterStudyGroups(studyGroupsByType.type1).map((pg) => {

   
      return (
        <div class="card1">
        <div style={{width:'100%',height:"22vh",backgroundColor: getRandomOrange()}} className="joinRoom">
  
        <Link to={`/chat/${pg.studyGroupId}`}><FontAwesomeIcon class="fontSvg" icon={faArrowRightToBracket} style={{ color: "#ffffff" }} /></Link>
          <div class="paraDiv">
            <p className="roomP">{pg.groupName}</p>
            <p style={{ fontSize: "0.8em", color: "white" }}>{pg.description}</p>
            <p style={{ fontSize: "1.2em", color: "white",top:"-10px",position:"relative" }}>{pg.creator.firstName}</p>
          </div>
          </div>
        </div>
      
      )
    }
   
  )}
    </div>




     
  <h3>Public Video Chat Study Groups</h3>
 
 <div class="scrolling-wrapper-flexbox">
 {filterStudyGroups(studyGroupsByType.type0).map((pg) => {

   if (pg.type == 0){
     return (
       <div class="card1">
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

   <h3>Private Study Groups</h3>
   <div class="scrolling-wrapper-flexbox">
  {privateGroups && privateGroups.map((pg) => {
   
      return (
        <div class="card1">
        <div style={{width:'100%',height:"22vh",backgroundColor: getRandomGreen()}} className="joinRoom">
  
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <Link to={`/chat/${pg.studyGroupId}`}><FontAwesomeIcon class="fontSvg" icon={faArrowRightToBracket} style={{ color: "#ffffff" }} /></Link>
        {pg.type == 0 && (
           <FontAwesomeIcon class="fontSvg" style={{ color: "#ffffff",marginRight:"20px" }} icon={faVideo} />
        )}
        {pg.type == 1 && (
           <FontAwesomeIcon size='xl' class="fontSvg" style={{ color: "#ffffff",marginRight:"20px" }} icon={faComments} />
        )}
       
        </div>
          <div class="paraDiv">
        
            <p className="roomP">{pg.groupName}</p>
            <p style={{ fontSize: "0.8em", color: "white" }}>{pg.description}</p>
            <p style={{ fontSize: "1.2em", color: "white",top:"-10px",position:"relative" }}>{pg.creator.firstName}</p>
         
          </div>
          </div>
        </div>
      
      )
    }
   
  )}
    </div>

  <h3>Create or join a private room</h3>
  <div style={{display:"flex",flexDirection:"row"}}>
  <div
    className="createRoom"
    onClick={openModal}
  >
    <FontAwesomeIcon class="fontSvg" icon={faSquarePlus} style={{ color: "#ffffff" }} />
    <div class="paraDiv">
      <p className="roomP">New Room</p>
      <p style={{ fontSize: "0.9em", color: "white" }}>set up new room</p>
    </div>
  </div>
  {isModalOpen && <ModalC onClose={closeModal} visible={true}/>}
  <div style={{backgroundColor:"darkslategray",marginLeft:"50px"}} className="joinRoom" onClick={openModalJoin}>

<FontAwesomeIcon class="fontSvg" icon={faArrowRightToBracket} style={{ color: "#ffffff" }} />
<div class="paraDiv">
  <p className="roomP">Join Room</p>
  <p style={{ fontSize: "0.9em", color: "white" }}>via invitation link</p>
</div>
</div>
{isModalJoinOpen && <ModalCJoin onClose={closeModalJoin} />}

  
   </div>
   </div>
  <Footer/>
   
    </>
  )
}
export default StudyGroup;