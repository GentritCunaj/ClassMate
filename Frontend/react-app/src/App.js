import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './Pages/Dashboard';
import UserProfile from './Pages/UserProfile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Assignment from './Partials/Assignment';
import Resource  from './Partials/Resource';
import UnAuthorized from './Pages/UnAuthorized';
import Quiz from './Partials/AllPartials/Quizzes/Quiz';
import PrivateRoute from './Pages/PrivateRoute';
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
      

    </Routes>
   </Router>
  );
}

export default App;
