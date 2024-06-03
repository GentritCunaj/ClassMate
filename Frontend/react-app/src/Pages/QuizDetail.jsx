import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuizById, submitQuizAttempt } from '../Redux/data/action';
import Header from './common/header/Header'; // Importing Header component

const QuizDetails = () => {
    const dispatch = useDispatch();
    const { quizId } = useParams();
    const { quizs, loading, error } = useSelector(state => state.data);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [attemptSubmitted, setAttemptSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const isSubmittingRef = useRef(false); // Ref to track if submission is in progress

    useEffect(() => {
        dispatch(getQuizById(quizId));
    }, [dispatch, quizId]);

    useEffect(() => {
        if (quizs && quizs.totalTimeInMinutes) {
            setTimeLeft(quizs.totalTimeInMinutes * 60); // convert minutes to seconds
        }
    }, [quizs]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionId]: option,
        });
    };

    const handleSubmit = async (isButtonClicked) => {
        if (isSubmittingRef.current || attemptSubmitted) return;
        isSubmittingRef.current = true;

        const quizAttemptDto = {
            quizId: parseInt(quizId, 10),
            attemptedOn: new Date().toISOString(),
            score: 0,
            isPassed: false,
            questionAttempts: Object.keys(selectedOptions).map(questionId => ({
                questionId: parseInt(questionId, 10),
                selectedOption: selectedOptions[questionId],
            })),
        };

        try {
            const response = await dispatch(submitQuizAttempt(quizAttemptDto));
            if (response && response.data) {
                setAttemptSubmitted(true);
            } else {
                console.error('Error submitting quiz attempt: Response or response data is undefined');
            }
        } catch (error) {
            console.error('Error submitting quiz attempt:', error);
            console.error('Error details:', error.response);
        } finally {
            isSubmittingRef.current = false;
            if (isButtonClicked) {
                const goHome = window.confirm('Quiz attempt submitted successfully! Do you want to go to the home page?');
                if (goHome) {
                    window.location.href = '/'; // Redirect to home page
                }
            }
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>
            <Header prop={true} />
            <style>
                {`
                .quiz-container {
                    max-width: 800px;
                    margin: 15 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    overflow-y: auto; /* Add scrollbar if content exceeds height */
                }
                .questions {
                    padding-right: 20px; /* Add padding to accommodate scrollbar */
                }
                .question {
                    margin-bottom: 20px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    transition: background-color 0.3s ease;
                }
                .question:hover {
                    background-color: #f2f2f2;
                }
                h2 {
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                .options {
                    margin-top: 10px;
                }
                .option {
                    display: block;
                    margin-bottom: 10px;
                }
                label {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                input[type="radio"] {
                    margin-right: 10px;
                }
                button {
                    display: block;
                    margin-top: 20px;
                    padding: 15px 30px;
                    background-color: #4caf50;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #45a049;
                }
                button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
                p {
                    font-size: 16px;
                    margin-top: 20px;
                }
                .timer {
                    font-size: 20px;
                    font-weight: bold;
                    color: red;
                    margin-bottom: 20px;
                }
                `}
            </style>
            <div className="quiz-container">
                <h1>{quizs?.title}</h1>
                <p>Points per Question: {quizs?.pointPerQuestion}</p>
                {quizs?.negativeMarking === 'Yes' && <p>Negative Marking per Question: {quizs?.negativeMarkingPerQuestion}</p>}
                <div className="timer">
                    Time Left: {formatTime(timeLeft)}
                </div>
                <div className="questions">
                    {quizs?.questions && quizs.questions.map((question, index) => (
                        <div key={question.questionID} className="question">
                            <h2>{index + 1}. {question.text}</h2>
                            <div className="options">
                                {question.options.map(option => (
                                    <label key={option} className="option">
                                        <input
                                            type="radio"
                                            name={`question-${question.questionID}`}
                                            value={option}
                                            checked={selectedOptions[question.questionID] === option}
                                            onChange={() => handleOptionChange(question.questionID, option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {!attemptSubmitted && (
                    <button 
                        onClick={() => handleSubmit(true)} 
                        disabled={timeLeft <= 0 || isSubmittingRef.current}>
                        Submit Quiz
                    </button>
                )}
                {attemptSubmitted && <p>Quiz attempt submitted successfully!</p>}
            </div>
        </>
    );
};

export default QuizDetails;
