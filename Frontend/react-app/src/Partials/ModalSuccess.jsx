import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "../assets/css/modal.css";
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
const ModalSuccess= ({onClose}) => {
  const [studyGroupData, setStudyGroupData] = useState({
    studyGroupId: uuidv4(),
    groupName: '',
    description: '',
    creatorId: 'f4a29ab4-e4fb-494a-8c7f-a76c6cf39fba',
    visibility: 0, // Default value
    type: 0,
    reports:0,
  
  });
   

  return (
    <Modal
    open='true'
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    style={{ backdropFilter: "blur(5px)" }}
  >
    <Box sx={style}>
    <h2 style={{color:"green"}} className="text-2xl font-semibold mb-4 text-center">Room Created Successfully</h2>
           
    </Box>
  </Modal>
  );
}

export default ModalSuccess;
