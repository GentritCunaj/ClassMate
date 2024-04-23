import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import '../assets/css/cards.css'
import '../assets/css/rooms.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import ModalC from './ModalC';
import ModalCJoin from './ModalCJoin';
import { useDispatch } from 'react-redux';
import { setCreatedModal } from '../Redux/data/action';
import ModalSuccess from './ModalSuccess';
const Cards = () => {
  const { teachers, students, admins, loading, modalCreated } = useSelector((store) => store.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalJoinOpen, setIsModalJoinOpen] = useState(false);

  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalJoin = () => {
    setIsModalJoinOpen(true);
  };

  const closeModalJoin = () => {
    setIsModalJoinOpen(false);
  };


  const closeCreatedModal = () => {
    dispatch(setCreatedModal(false));
  };

  return (

    <div className="roomsDiv">
      {/* left  */}
      <div className="roomsCard">
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
        {isModalOpen && <ModalC onClose={closeModal} />}
        <div className="joinRoom" onClick={openModalJoin}>

          <FontAwesomeIcon class="fontSvg" icon={faArrowRightToBracket} style={{ color: "#ffffff" }} />
          <div class="paraDiv">
            <p className="roomP">Join Room</p>
            <p style={{ fontSize: "0.9em", color: "white" }}>via invitation link</p>
          </div>
        </div>
        {isModalJoinOpen && <ModalCJoin onClose={closeModalJoin} />}
        {modalCreated && <ModalSuccess onClose={closeCreatedModal} />}


      </div>
    </div>


  );
}

export default Cards;
