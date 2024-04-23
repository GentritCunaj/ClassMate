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
import AllAsignments from './Partials/AllPartials/Assignment/AllAsignments';
import AllQuizzes from './Partials/AllPartials/Quizzes/Quizzes';
import Assignment from './Partials/AllPartials/Assignment/Assignment';
import UpdateAssignments from './Partials/AllPartials/Assignment/UpdateAssignments';
import UpdateResource from './Partials/AllPartials/Resource/UpdateResource';
import Students from './Partials/Students';
import Teachers from './Partials/Teachers';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/dashboard" element={
          <PrivateRoute roles={['Teacher', 'Admin']}><Dashboard /></PrivateRoute>} />

        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />


        <Route path="/quiz" element={
          <PrivateRoute roles={['Teacher']}><Quiz /></PrivateRoute>} />

        <Route path="/assignment" element={
          <PrivateRoute roles={['Teacher']}><Assignment /></PrivateRoute>} />


        <Route path="/resource" element={
          <PrivateRoute roles={['Teacher']}><Resource /></PrivateRoute>} />

          <Route path="/report" element={
          <PrivateRoute roles={['Teacher']}><Report /></PrivateRoute>} />

        <Route path="/unauthorized" element={<UnAuthorized />} />

        <Route path="/createquiz" element={
          <PrivateRoute roles={['Teacher']}><CreateQuiz /></PrivateRoute>} />

        <Route path="/quiz" element={
          <PrivateRoute roles={['Teacher']}><Quiz /></PrivateRoute>} />

        <Route path="/editquiz/:quizId" element={
          <PrivateRoute roles={['Teacher']}><EditQuiz /></PrivateRoute>} />

        <Route path="/createassignment" element={
          <PrivateRoute roles={['Teacher']}><CreateAssignment /></PrivateRoute>} />

        <Route path="/createResource" element={
          <PrivateRoute roles={['Teacher']}><CreateResource /></PrivateRoute>} />

          {/* <Route path="/createReport" element={
          <PrivateRoute roles={['Teacher']}><CreateReport /></PrivateRoute>} /> */}

        <Route path="/allassignment" element={
          <PrivateRoute roles={['Teacher']}><AllAsignments /></PrivateRoute>} />

        <Route path="/updateassignments/:assignmentId" element={
          <PrivateRoute roles={['Teacher']}><UpdateAssignments /></PrivateRoute>} />

          <Route path="/updateresource/:resourceId" element={
          <PrivateRoute roles={['Teacher']}><UpdateResource /></PrivateRoute>} />

          <Route path="/reportresource/:resourceId" element={
          <PrivateRoute roles={['Teacher']}><CreateReportResource /></PrivateRoute>} />

          <Route path="/reportassignment/:assignmentId" element={
          <PrivateRoute roles={['Teacher']}><CreateReportAssignment /></PrivateRoute>} />

          <Route path="/reportquiz/:quizId" element={
          <PrivateRoute roles={['Teacher']}><CreateReportQuiz /></PrivateRoute>} />

          <Route path="/reportstudygroup/:studyGroupId" element={
          <PrivateRoute roles={['Teacher']}><CreateReportStudyGroup /></PrivateRoute>} />
          

        <Route path="/allquiz" element={
          <PrivateRoute roles={['Teacher']}><AllQuizzes /></PrivateRoute>} />


        <Route path="/assignment" element={
          <PrivateRoute roles={['Teacher']}><Assignment /></PrivateRoute>} />

        <Route path="/resource" element={
          <PrivateRoute roles={['Teacher']}><Resource /></PrivateRoute>} />

        <Route path="/students" element={
          <PrivateRoute roles={['Teacher', 'Admin']}><Students /></PrivateRoute>} />

        <Route path="/teachers" element={
          <PrivateRoute roles={['Teacher', 'Admin']}><Teachers /></PrivateRoute>} />


      </Routes>
    </Router>
  );
}

export default App;
