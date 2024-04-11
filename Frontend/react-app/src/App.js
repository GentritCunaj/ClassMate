import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from './Pages/Dashboard';
import UserProfile from './Pages/UserProfile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Quiz from './Partials/Quiz';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/profile" element={<UserProfile/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/quiz" element={<Quiz/>}/>

    </Routes>
   </Router>
  );
}

export default App;
