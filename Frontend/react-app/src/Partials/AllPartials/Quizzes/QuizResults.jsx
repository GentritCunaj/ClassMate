import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { Button } from "@mui/material"; // Import Button from Material-UI
import Sidebar from "../../Sidebar"; // Adjust the import path as needed
import "../../../assets/css/quizresults.css";

const QuizResults = () => {
  const { quizId } = useParams(); // Extract quizId from URL parameters
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchQuizAttemptDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        console.log("Authorization Token: ", token);
        const response = await axios.get(`https://localhost:7168/Quiz/quizattempt/quiz/${quizId}`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        console.log("Response: ", response.data);
        setAttempts(response.data.data);
      } catch (error) {
        console.error("Error fetching quiz attempts: ", error);
        setError(error.response ? error.response.data.message : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizAttemptDetails();
  }, [quizId]);

  const handleNavigateBack = () => {
    // Navigate back to the quiz results page
    navigate('/quizResults');
  };

  return (
    <div className="quiz-results-container">
      <Sidebar className="sidebar" /> {/* Include the Sidebar component */}
      <div className="quiz-results">
        <h2>Quiz Attempt Details</h2>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {attempts.length === 0 && !loading && <p>No attempts available for this quiz.</p>}
        {attempts.length > 0 && (
          <table className="results-table">
            <thead>
              <tr>
                <th>Attempt ID</th>
                <th>Student ID</th>
                <th>Attempted On</th>
                <th>Score</th>
                <th>Passed</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.quizAttemptId} className={attempt.isPassed ? "" : "failed"}>
                  <td>{attempt.quizAttemptId}</td>
                  <td>{attempt.studentId}</td>
                  <td>{new Date(attempt.attemptedOn).toLocaleString()}</td>
                  <td>{attempt.score}</td>
                  <td>{attempt.isPassed ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
       <Button
    variant="contained"
    color="primary"
    onClick={handleNavigateBack}
    style={{
        marginTop: '20px',
        marginLeft: '30px', // Move the button to the right
    }}
>
    Back to Quiz Results
</Button>
      </div>
    </div>
  );
};

export default QuizResults;
