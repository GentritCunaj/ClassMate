import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './Pages/Dashboard';
import UserProfile from './Pages/UserProfile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Contact from './Pages/Contact';
import UnAuthorized from './Pages/UnAuthorized';
import PrivateRoute from './Pages/PrivateRoute';
import Quiz from './Partials/AllPartials/Quizzes/Quiz';
import CreateQuiz from './Partials/AllPartials/Quizzes/CreateQuiz';
import EditQuiz from './Partials/AllPartials/Quizzes/EditQuiz';
import Resource from './Partials/AllPartials/Resource/Resource';
import Report from './Partials/AllPartials/Reports/Report';
import CreateAssignment from './Partials/AllPartials/Assignment/CreateAssignment';
import CreateResource from './Partials/AllPartials/Resource/CreateResource';
import CreateReportResource from './Partials/AllPartials/Resource/CreateReport';
import CreateReportAssignment from './Partials/AllPartials/Assignment/CreateReport';
import CreateReportQuiz from './Partials/AllPartials/Quizzes/CreateReport';
import CreateReportStudyGroup from './Partials/CreateReportStudyGroup';
import CreateReportChat from './Partials/CreateReportChat';
import AllAsignments from './Partials/AllPartials/Assignment/AllAsignments';
import AllQuizzes from './Partials/AllPartials/Quizzes/Quizzes';
import Assignment from './Partials/AllPartials/Assignment/Assignment';
import UpdateAssignments from './Partials/AllPartials/Assignment/UpdateAssignments';
import UpdateResource from './Partials/AllPartials/Resource/UpdateResource';
import Students from './Partials/Students';
import Teachers from './Partials/Teachers';
import Home from "./Pages/home/Home"
import About from "./Pages/about/About"
import Team from "./Pages/team/Team"
import Subject from './Pages/Subject';
import StudyGroup from './Pages/StudyGroup';
import Chat from './Pages/Chat';
import Assignments from './Pages/Assignments';
import Quizs from './Pages/Quizs';
import VideoChat from './Pages/VideoChat';
import QuizDetails from './Pages/QuizDetail';
import { RoomProvider } from './Context/RoomContext';
import GetQuizResults from './Partials/AllPartials/Quizzes/GetQuizResults';
import QuizResults from './Partials/AllPartials/Quizzes/QuizResults';
import AssignmentResults from './Partials/AllPartials/Assignment/AssignmentResults';
import GetSubmissions from './Partials/AllPartials/Assignment/GetSubmissions'
function App() {
  return (
    <Router>
      
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/studyGroups" element={<StudyGroup/>}/>
      <Route path="/chat/:groupId" element={<Chat/>}/>
      <Route path="/subject/:subjectId" element={<Subject/>} />
      <Route path="/quizz/:quizId" element={<QuizDetails/>} /> 
      <Route path="/resultsAssignment/:assignmentId" element={<AssignmentResults/>} /> 
      <Route path="/results/:quizId" element={<QuizResults/>} /> 
      <Route path="/video/:id" element={
        <RoomProvider>
      <VideoChat/></RoomProvider>}/>

      <Route path="/assignments" element={<Assignments/>} />
      <Route path="/quizs" element={<Quizs/>} />

      <Route path="/dashboard" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><Dashboard /></PrivateRoute>} />

      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />


      <Route path="/quiz" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><Quiz /></PrivateRoute>} />

      <Route path="/assignment" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><Assignment /></PrivateRoute>} />

     <Route path="/quizResults" element={
     <PrivateRoute roles={['Teacher']}><GetQuizResults /></PrivateRoute>} />

     <Route path="/assignmentResults" element={
     <PrivateRoute roles={['Teacher']}><GetSubmissions /></PrivateRoute>} />

      <Route path="/resource" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><Resource /></PrivateRoute>} />

        <Route path="/report" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><Report /></PrivateRoute>} />

      <Route path="/unauthorized" element={<UnAuthorized />} />

      <Route path="/createquiz" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><CreateQuiz /></PrivateRoute>} />

      <Route path="/quiz" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><Quiz /></PrivateRoute>} />

      <Route path="/editquiz/:quizId" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><EditQuiz /></PrivateRoute>} />

      <Route path="/createassignment" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><CreateAssignment /></PrivateRoute>} />

      <Route path="/createResource" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><CreateResource /></PrivateRoute>} />

        {/* <Route path="/createReport" element={
        <PrivateRoute roles={['Teacher']}><CreateReport /></PrivateRoute>} /> */}

      <Route path="/allassignment" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><AllAsignments /></PrivateRoute>} />

      <Route path="/updateassignments/:assignmentId" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><UpdateAssignments /></PrivateRoute>} />

        <Route path="/updateresource/:resourceId" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><UpdateResource /></PrivateRoute>} />

        <Route path="/reportresource/:resourceId" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><CreateReportResource /></PrivateRoute>} />

        <Route path="/reportassignment/:assignmentId" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><CreateReportAssignment /></PrivateRoute>} />

        <Route path="/reportquiz/:quizId" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><CreateReportQuiz /></PrivateRoute>} />

        <Route path="/reportstudygroup/:studyGroupId" element={
        <PrivateRoute roles={['Teacher', 'Admin']}><CreateReportStudyGroup /></PrivateRoute>} />
        

        <Route path="/reportmessage/:messageId" element={
        <PrivateRoute roles={['Teacher', 'Admin','Student']}><CreateReportChat /></PrivateRoute>} />

        
        <Route path="/allquiz" element={
          <PrivateRoute roles={['Teacher', 'Admin']}><AllQuizzes /></PrivateRoute>} />


        <Route path="/assignment" element={
          <PrivateRoute roles={['Teacher', 'Admin']}><Assignment /></PrivateRoute>} />

        <Route path="/resource" element={
          <PrivateRoute roles={['Teacher', 'Admin']}><Resource /></PrivateRoute>} />

        <Route path="/students" element={
          <PrivateRoute roles={['Teacher', 'Admin']}><Students /></PrivateRoute>} />

        <Route path="/teachers" element={
          <PrivateRoute roles={['Teacher', 'Admin']}><Teachers /></PrivateRoute>} />


      </Routes>
     
    </Router>
  );
}

export default App;
