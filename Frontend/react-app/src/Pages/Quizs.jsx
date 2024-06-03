import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizzesBySubjectId } from '../Redux/data/action';
import ReportQuiz from './reportModals/Quiz'; // Assuming you have a Redux action to fetch quizzes by subject ID
import '../assets/css/subject.css';

const Quizzes = () => {
    const dispatch = useDispatch();
    const { subjectId } = useParams(); // Get subjectId from URL params
    const navigate = useNavigate(); // Hook for navigation

    const { quizs, error, loading } = useSelector((store) => store.data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentQuizId, setCurrentQuizId] = useState(null); 


    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                await dispatch(getQuizzesBySubjectId(subjectId));
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                toast.error('Error fetching quizzes. Please try again.');
            }
        };

        if (subjectId) {
            fetchQuizzes();
        }
    }, [dispatch, subjectId]);

    const navigateToQuiz = (quizId) => {
        
        navigate(`/quizz/${quizId}`);
    };

    const openModal = (quizId) => {
        setCurrentQuizId(quizId); 
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    

    return (
        <>
        
        <div className="subject-container">
            {loading && <p>Loading quizes...</p>}
                {error && <p className="error-message">Error: {error}</p>}
            <h1 className="page-title">Quizzes</h1>
            <div className="subject-wrapper">
                {quizs && quizs.length > 0 ? (
                    quizs.map((quiz) => (
                        <div className="subject-card" key={quiz.quizID}>
                            <div className="subject-details">
                                <h2 className="subject-title"> {quiz.title.toUpperCase()}</h2>
                                <p><strong>Number of Questions:</strong> {quiz.noOfQuestions}</p>
                                <p><strong>Total Time:</strong> {quiz.totalTimeInMinutes} min</p>
                                <button 
                                    onClick={() => navigateToQuiz(quiz.quizID)}
                                    className="attempt-button"
                                >
                                    Attempt Quiz
                                </button>
                                <div>
                                        <button 
                                            onClick={() => openModal(quiz.quizID)} 
                                            className="btn btn-primary"
                                        >
                                            Report
                                        </button>
                                    </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No quizzes found for this subject.</p>
                )}
            </div>
        </div>
        <ReportQuiz
                isOpen={isModalOpen} 
                onClose={closeModal} 
                quizId={currentQuizId}  
            />
            
        </>
    );
};

export default Quizzes;

