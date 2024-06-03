import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { getAllQuizzes } from "../../../Redux/data/action";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../Sidebar'; // Importing Sidebar component

const QuizCard = ({ quiz, onViewResults }) => (
  <Card style={{ marginBottom: '20px' }}>
    <CardContent>
      <Typography variant="h6">Quiz ID: {quiz.quizID}</Typography>
      <Typography variant="h5">{quiz.title}</Typography>
      <Typography variant="body2">Subject: {quiz.subjectName}</Typography>
      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: '10px' }}
        onClick={() => onViewResults(quiz.quizID)}
      >
        View Results
      </Button>
    </CardContent>
  </Card>
);

const Quizzes = () => {
  const dispatch = useDispatch();
  const { quizs, loading, subjects } = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const creatorId = user.id;
  const [selectedSubjectName, setSelectedSubjectName] = useState('');

  useEffect(() => {
    dispatch(getAllQuizzes());
  }, [dispatch]);

  const handleSubjectChange = (event) => {
    setSelectedSubjectName(event.target.value);
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(subject => subject.subjectId === subjectId);
    return subject ? subject.name : "";
  };

  const getSubjectId = (subjectName) => {
    const subject = subjects.find(subject => subject.name === subjectName);
    return subject ? subject.subjectId : null;
  };

  const filteredQuizzes = quizs.filter(quiz => {
    const subjectId = getSubjectId(selectedSubjectName);
    return selectedSubjectName === '' || quiz.subjectId === subjectId;
  }).map(quiz => ({
    ...quiz,
    subjectName: getSubjectName(quiz.subjectId)
  }));

  const onViewResults = (quizId) => {
    navigate(`/results/${quizId}`);
  };

  const navigateToQuiz = () => {
    navigate('/quiz');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div style={{ marginLeft: '275px', marginRight: '20px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom style={{ marginRight: '10px' }}>
            Filter Quizzes Results by Subject
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
          <Button variant="contained" color="primary" onClick={navigateToQuiz}>
            Back to Quiz
          </Button>
        </div>
        <Typography variant="h4" gutterBottom>
          Quizzes Results
        </Typography>
        <div>
          {filteredQuizzes.map((quiz, index) => (
            <QuizCard key={index} quiz={quiz} onViewResults={onViewResults} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
