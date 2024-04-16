import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './Pages/Dashboard';
import UserProfile from './Pages/UserProfile';
import Register from './Pages/Register';
import Login from './Pages/Login';

import UnAuthorized from './Pages/UnAuthorized';

import PrivateRoute from './Pages/PrivateRoute';
import Quiz from './Partials/AllPartials/Quizzes/Quiz';
import CreateQuiz from './Partials/AllPartials/Quizzes/CreateQuiz';
import Resource from './Partials/Resource';
import CreateAssignment from './Partials/AllPartials/Assignment/CreateAssignment';
import AllAsignments from './Partials/AllPartials/Assignment/AllAsignments';
import Assignment from './Partials/AllPartials/Assignment/Assignment';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/profile" element={<UserProfile/>}/>

      <Route path="/dashboard" element={
      <PrivateRoute roles={['Teacher','Admin']}><Dashboard/></PrivateRoute>}/>
      
      <Route path="/register" element={<Register/>}/>

   
      <Route path="/quiz" element={
      <PrivateRoute roles={['Teacher']}><Quiz/></PrivateRoute>}/>

      <Route path="/assignment" element={
      <PrivateRoute roles={['Teacher']}><Assignment/></PrivateRoute>}/>


      <Route path="/resource" element={
      <PrivateRoute roles={['Teacher']}><Resource/></PrivateRoute>}/>

      <Route path="/unauthorized" element={<UnAuthorized/>}/>

      <Route path="/createquiz" element={
      <PrivateRoute roles={['Teacher']}><CreateQuiz/></PrivateRoute>}/>
        
       <Route path="/quiz" element={
      <PrivateRoute roles={['Teacher']}><Quiz/></PrivateRoute>}/>
        
     <Route path="/createassignment" element={
      <PrivateRoute roles={['Teacher']}><CreateAssignment/></PrivateRoute>}/>
        
       <Route path="/allassignment" element={
      <PrivateRoute roles={['Teacher']}><AllAsignments/></PrivateRoute>}/>
        
       <Route path="/assignment" element={
      <PrivateRoute roles={['Teacher']}><Assignment/></PrivateRoute>}/>
        
      <Route path="/resource" element={
      <PrivateRoute roles={['Teacher']}><Resource/></PrivateRoute>}/>
     

    </Routes>
   </Router>
  );
}

export default App;
