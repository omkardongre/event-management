import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ContactPage from './pages/ContactPage';
// import EventsPage from './pages/EventDetail';
import RegisterPage from './pages/RegistrationForm';
import AboutPage from './pages/AboutPage';
import EventDetails from './pages/EventDetail';
import RegistrationForm from './pages/RegistrationForm';
import CreateEvent from './pages/CreateEvent';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/event/:eventId" element={<EventDetails eventId={''} />} />
        <Route path="/register/:eventId" element={<RegistrationForm />} />
        <Route path="/create-event" element={<CreateEvent />} />


        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;