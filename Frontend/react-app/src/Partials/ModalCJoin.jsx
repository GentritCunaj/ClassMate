import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../assets/css/modal.css";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { joinRoom } from '../Redux/data/action';
import { Link } from 'react-router-dom';
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
const ModalCJoin= ({ onClose }) => {
  
  const dispatch = useDispatch();
  const {user} = useSelector((store)=>store.auth);
  const [formData,setFormData] = useState({
    studyGroupId:'',
    studentId:user.id
  });


  const handleChange = (e) => {
   
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal
    open='true'
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    style={{ backdropFilter: "blur(5px)" }}
  >
    <Box sx={style}>
    <h2 className="text-2xl font-semibold mb-4 text-center">Join Study Room</h2>
            <form id="modalForm" className="flex flex-col gap-4 pt-4 sm:pt-8" >
              <input
                type="text"
                className="modalInput"
                placeholder="Group id"
                name="studyGroupId"
                onChange={handleChange}
              />
              
              <Link to={`/chat/${formData.studyGroupId}`}><button type="button" style={{background:"black",border:"2px solid black"}} className="btn btn-primary mt-4">Join</button></Link>
            </form>
    </Box>
  </Modal>
  );
}

export default ModalCJoin;
