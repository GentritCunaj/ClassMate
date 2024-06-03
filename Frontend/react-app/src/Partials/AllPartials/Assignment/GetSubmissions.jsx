import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllAssignment } from "../../../Redux/data/action";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar"; // Importing Sidebar component

const AssignmentSubmission = ({ assignment, onViewSubmission }) => (
  <Card style={{ marginBottom: "20px" }}>
    <CardContent>
      <Typography variant="h6">Assignment ID: {assignment.assignmentId}</Typography>
      <Typography variant="h5">{assignment.title}</Typography>
      <Typography variant="body2">Due Date: {assignment.dueDate}</Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        onClick={() => onViewSubmission(assignment.assignmentId)}
      >
        View Submission
      </Button>
    </CardContent>
  </Card>
);

const Assignments = () => {
  const dispatch = useDispatch();
  const { assignments, loading, subjects } = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const creatorId = user.id;

  useEffect(() => {
    dispatch(getAllAssignment());
  }, [dispatch]);

  const onViewSubmission = (assignmentId) => {
    navigate(`/resultsAssignment/${assignmentId}`);
  };

  const navigateToAssignment = () => {
    navigate("/assignment");
  };

  const [selectedSubjectName, setSelectedSubjectName] = useState(""); // State for selected subject

  const handleSubjectChange = (event) => {
    setSelectedSubjectName(event.target.value); // Update selected subject
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(subject => subject.subjectId === subjectId);
    return subject ? subject.name : "";
  };

  const getSubjectId = (subjectName) => {
    const subject = subjects.find(subject => subject.name === subjectName);
    return subject ? subject.subjectId : null;
  };

  const filteredAssignments = assignments.filter(assignment => {
    const subjectId = getSubjectId(selectedSubjectName);
    return selectedSubjectName === '' || assignment.subjectId === subjectId;
  }).map(assignment => ({
    ...assignment,
    subjectName: getSubjectName(assignment.subjectId)
  }));

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar />
      <div style={{ marginLeft: "275px", marginRight: "20px", width: "100%" }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom style={{ marginRight: '10px' }}>
            Filter by Subject
          </Typography>
          <Select
            value={selectedSubjectName}
            onChange={handleSubjectChange}
            displayEmpty
            style={{ marginRight: '10px' }}
          >
            <MenuItem value="">
              <em>All Subjects</em>
            </MenuItem>
            {subjects.map(subject => (
              <MenuItem key={subject.subjectId} value={subject.name}>
                {subject.name}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="primary" onClick={navigateToAssignment}>
            Back to Assignments
          </Button>
        </div>
        <Typography variant="h4" gutterBottom>
          Assignment Submissions
        </Typography>
        <div>
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              {filteredAssignments.length === 0 && <p>No submissions available.</p>}
              {filteredAssignments.map((assignment, index) => (
                <AssignmentSubmission
                  key={index}
                  assignment={assignment}
                  onViewSubmission={onViewSubmission}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
