import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface EventType{
    title : string,
    id : string
}

const RegisteredEvent: React.FC = () => {
  const [event, setEvent] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/registeredEvents`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        await setEvent(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchRegisteredEvents();
  }, []);

  const handleDeleteRegistration = async (eventId:string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/unregisterEvent/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update UI after successful deletion
      setEvent(event.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('An error occurred while deleting registration. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4 text-center">Registered Events</h2>
    <ul className="list-none p-0">
        {event.map((event: EventType) => (
        <li
            key={event.id}
            className="flex justify-between items-center py-2 border-b border-gray-200"
        >
            <span className="text-lg">{event.title}</span>
            <button
            type="button"
            className="text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-300"
            onClick={() => handleDeleteRegistration(event.id)}
            >
            <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
            </svg>
            </button>
        </li>
        ))}
    </ul>
    </div>
  );
};

export default RegisteredEvent;
