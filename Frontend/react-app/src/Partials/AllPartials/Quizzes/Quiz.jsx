import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz } from "../../../Redux/data/action";
import { ToastContainer, toast } from "react-toastify";
import "../../../assets/css/quiz.css";
import Sidebar from '../../Sidebar';
import CreateQuiz from './CreateQuiz'; // Assuming the create quiz form is a separate component
import Quizzes from './Quizzes';

const Quiz = () => {
  return (
    <>
    <ToastContainer />
    <div className="quiz-scroll-container">
      <Sidebar />
      <div className="content-container">
        <CreateQuiz />
        <div className="quizzes-container">
          <Quizzes />
        </div>
      </div>
    </div>
    </>
  );
};

export default Quiz;