import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EventDetailsProps {
  eventId: string;
  // Add any other event details properties you need
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(`/register/${eventId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
      {/* Display event details here */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        onClick={handleRegisterClick}
      >
        Register
      </button>
    </div>
  );
};

export default EventDetails;