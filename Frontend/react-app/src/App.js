import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './Pages/Dashboard';
import UserProfile from './Pages/UserProfile';
import Register from './Pages/Register';
import Login from './Pages/Login';
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
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/createquiz" element={<CreateQuiz/>}/>
      <Route path="/quiz" element={<Quiz/>}/>
      <Route path="/createassignment" element={<CreateAssignment/>}/>
      <Route path="/allassignment" element={<AllAsignments/>}/>
      <Route path="/assignment" element={<Assignment/>}/>
      <Route path="/resource" element={<Resource/>}/>
     

    </Routes>
   </Router>
  );
}

export default App;
