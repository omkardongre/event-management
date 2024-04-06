import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}


const EventDetails: React.FC = () => {

  const { eventId } = useParams(); // Access the route parameter
  const [event, setEvent] = useState<Event>();

  const [isRegistered, setIsRegistered]=useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/event/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/register/${event?.id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 409) {
        // Already registered
        alert('You are already registered for this event.');
        setIsRegistered(true);
      } else {
        // Successful registration
        alert('You have successfully registered for the event!');
        setIsRegistered(false);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };
  

  return (
    <>
      {event ? (
      <div className="container mx-auto py-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-sm mb-12">
        <span className="font-semibold">Date:</span> {event.date} |{' '}
        <span className="font-semibold">Time:</span> {event.time} |{' '}
        <span className="font-semibold">Location:</span> {event.location}
      </p>
      <p className="mb-8 mx-auto max-w-screen-md">{event.description}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        onClick={isRegistered ? () => {} : handleRegister} // Disable click if registered
        disabled={isRegistered} // Alternatively, use a disabled prop      
        >
        Register
      </button>
    </div>
      ) : (
          <div className="container mx-auto py-8 flex flex-col items-center justify-center">
            <p>Loading event details...</p>
          </div>
      )}
    </>
  );
};

export default EventDetails;