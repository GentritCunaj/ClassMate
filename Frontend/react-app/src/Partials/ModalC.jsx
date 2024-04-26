import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../assets/css/modal.css";
import { useDispatch,useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createStudyGroup } from '../Redux/data/action';
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'15px',
  boxShadow: 0,
  p: 4,

};


const notify = (text) => toast(text);
const ModalC= ({ onClose }) => {
  const {user} = useSelector((store) => store.auth);
  var userId = user.id;
  const [error,setError] = useState(false);


  const [studyGroupData, setStudyGroupData] = useState({
    studyGroupId: uuidv4(),
    groupName: '',
    description: '',
    creatorId: userId, 
    visibility: "", // Default value
    type: "",
    reports:0,
    
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
   
    setStudyGroupData({ ...studyGroupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!studyGroupData.groupName || !studyGroupData.description || studyGroupData.visibility === '' || studyGroupData.type === '') {
      // Display error message or handle the error as needed
     setError(true)
    }
  
    const studyGroupDto = {
      studyGroupId: studyGroupData.studyGroupId,
      groupName: studyGroupData.groupName,
      description: studyGroupData.description,
      creatorId: studyGroupData.creatorId,
      visibility: studyGroupData.visibility,
      type: studyGroupData.type,
      reports: studyGroupData.reports
    };
    console.log(studyGroupDto);
    dispatch(createStudyGroup(studyGroupDto));
    notify("Study Group Created");
    onClose();
  };

  return (
    <>
    <ToastContainer/>
    <Modal
    open='true'
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    style={{ backdropFilter: "blur(5px)" }}
  >
    <Box sx={style}>
    <h2 className="text-2xl font-semibold mb-4 text-center">Create Study Room</h2>
            <form onSubmit={handleSubmit} id="modalForm" className="flex flex-col gap-4 pt-4 sm:pt-8" >
              <input
                type="text"
                className="modalInput"
                placeholder="Group name"
                name="groupName" 
                value={studyGroupData.groupName}
                onChange={handleChange} 
              />
              <textarea
                rows={3}
                className="modalInput"
                placeholder="About the group"
                name="description" 
                value={studyGroupData.description} 
                onChange={handleChange}
              />
              <select
                name="visibility"
                onChange={handleChange}
                value={studyGroupData.visibility}
                className="modalInput"
                
              >
                <option value={null}>Select visibility</option>
                <option value={"0"} >Private</option>
                <option value={"1"}>Public</option>
              </select>

              <select
                name="type"
                value={studyGroupData.type}
                className="modalInput"
                onChange={handleChange}
                
              >
                <option value={null}>Select type</option>
                <option value={"0"}>Video</option>
                <option value={"1"}>Message</option>
              </select>
              {error && (
                <p className="text-red-500">Please fill in all required fields</p>
              )}
              <button style={{background:"black",border:"2px solid black"}} className="btn btn-primary mt-4">Create</button>
            </form>
    </Box>
  </Modal>
    </>
    
  );
}

export default ModalC;
