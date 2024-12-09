import React, { useEffect } from 'react';
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

import Home from './pages/Home';
import AllTasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  // Define image URLs for each route
  const backgroundImages = {
    '/': 'https://img.freepik.com/premium-vector/creatively-designed-flat-illustration-task-scheduling_203633-7630.jpg?uid=R177720255&ga=GA1.1.201495196.1729574706&semt=ais_hybrid', // Replace with the URL for AllTasks
    '/importanttasks': 'https://img.freepik.com/free-vector/schedule-concept-illustration_114360-1531.jpg?uid=R177720255&ga=GA1.1.201495196.1729574706&semt=ais_hybrid', // Replace with the URL for ImportantTasks
    '/completedtasks': 'https://img.freepik.com/free-vector/teacher-explaining-task-student-passing-test-drawing-ticks-matrix-flat-vector-illustration-education-class-lesson_74855-8599.jpg?uid=R177720255&ga=GA1.1.201495196.1729574706&semt=ais_hybrid', // Replace with the URL for CompletedTasks
    '/incompletedtasks': 'https://img.freepik.com/free-vector/hand-drawn-man-checking-giant-check-list-background_23-2148093614.jpg?uid=R177720255&ga=GA1.1.201495196.1729574706&semt=ais_hybrid', // Replace with the URL for IncompletedTasks
  };

  // Get the current background image based on the route
  const backgroundImage = backgroundImages[location.pathname] || 'default-image-url';

  useEffect(() => {
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
      dispatch(authActions.login());
    } else if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/signup') {
      navigate('/signup');
    }
  }, [dispatch, isLoggedIn, navigate, location.pathname]);

  return (
    <div
      className="text-white h-screen p-2 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'fit',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTasks />} />
          <Route exact path="/importanttasks" element={<ImportantTasks />} />
          <Route exact path="/completedtasks" element={<CompletedTasks />} />
          <Route exact path="/incompletedtasks" element={<IncompletedTasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
