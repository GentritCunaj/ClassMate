import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz } from "../../../Redux/data/action";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from '../../Sidebar';
import "../../../assets/css/quiz.css";
import "../../../assets/css/assignmet.css";
import CreateAssignment from './CreateAssignment'; // Assuming the create quiz form is a separate component

import AllAsignments from './AllAsignments';

const Assignment = () => {
  return (
    <>
    <ToastContainer />
    <div className="quiz-scroll-container">
      <Sidebar />
      <div className="content-container">
        <CreateAssignment />
        <div className="quizzes-container">
          <AllAsignments/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Assignment;