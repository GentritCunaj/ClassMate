import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getQuizzesBySubjectId } from '../Redux/data/action'; // Assuming you have a Redux action to fetch quizzes by subject ID
import '../assets/css/subject.css';

const Quizzes = ({ subjectId }) => {
    const dispatch = useDispatch();
    const { quizs, error, loading } = useSelector((store) => store.data);
    const { user } = useSelector((store) => store.auth);

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

    const handleAttemptQuiz = (quizId) => {
        console.log(`Attempt button clicked for quiz ${quizId}`);
        toast.success('Starting the quiz!');
        // Navigate to the quiz attempt page or perform another action here
    };

    if (loading) return <p>Loading quizzes...</p>;
    if (error) return <p className="error-message">Error: {error}</p>;

    return (
        <>
            <div className="subject-container">
                <h1 className="page-title">Quizzes</h1>
                <div className="subject-wrapper">
                    {quizs && quizs.length > 0 ? (
                        quizs.map((quiz) => (
                            <div className="subject-card" key={quiz.id}>
                                <div className="subject-details">
                                    <h2 className="subject-title">{quiz.title.toUpperCase()}</h2>
                                    <p><strong>Number of Questions:</strong> {quiz.noOfQuestions}</p>
                                    <p><strong>Total Time:</strong> {quiz.totalTimeInMinutes} min</p>
                                    <button 
                                        onClick={() => handleAttemptQuiz(quiz.id)} 
                                        className="attempt-button"
                                    >
                                        Attempt Quiz
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No quizzes found for this subject.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Quizzes;