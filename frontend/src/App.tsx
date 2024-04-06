import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/AboutPage';
import EventDetails from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import RegisteredEvent from './pages/RegisteredEvents';

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/signup'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/registered-event" element={<RegisteredEvent />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;