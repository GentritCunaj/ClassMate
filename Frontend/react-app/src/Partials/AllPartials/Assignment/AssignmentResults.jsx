import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import Sidebar from "../../Sidebar";
import "../../../assets/css/quizresults.css";

const AssignmentResults = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:7168/Submission/GetSubmissions/${assignmentId}`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        setSubmissions(response.data.data);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          setError(`Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText || "No message available"}`);
        } else if (error.request) {
          // Request was made but no response received
          setError("Error: No response from the server. Please try again later.");
        } else {
          // Something happened in setting up the request
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  const handleNavigateBack = () => {
    navigate('/assignmentResults');
  };

  return (
    <div className="quiz-results-container">
      <Sidebar className="sidebar" /> {/* Include the Sidebar component */}
      <div className="quiz-results">
        <h2>Assignment Submissions</h2>
        {loading && <CircularProgress />}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {submissions.length === 0 && !loading && <p>No submissions available for this assignment.</p>}
        {submissions.length > 0 && (
          <table className="results-table">
            <thead>
              <tr>
                <th>Submission ID</th>
                <th>Assignment ID</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Submitted On</th>
                <th>File Name</th>
                <th>Is Submitted</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.submissionId} className={submission.isSubmitted ? "" : "failed"}>
                  <td>{submission.submissionId}</td>
                  <td>{submission.assignmentId}</td>
                  <td>{submission.studentId}</td>
                  <td>{submission.studentName}</td>
                  <td>{new Date(submission.submittedOn).toLocaleString()}</td>
                  <td>{submission.fileName}</td>
                  <td>{submission.isSubmitted ? "Yes" : "No"}</td>
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
          Back to Assignments
        </Button>
      </div>
    </div>
  );
};

export default AssignmentResults;
