import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import axios from 'axios';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string; // Assuming your API uses 'time' instead of 'Time'
  location: string;
  description: string;
  // Add any other event properties you need
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/events`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
        );
        setEvents(response.data); // Update state with fetched events
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures fetching only once on initial render

  const handleEventClick = (eventId: string) => {

    navigate(`/event/${eventId}`);
  };


  return (
    <div className="container mx-auto py-8">
      <h2>Upcoming Events</h2>
      {events.length > 0 ? ( // Check if events are loaded
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              time={event.time}
              date={event.date}
              location={event.location}
              description={event.description.length > 30 ? `${event.description.slice(0, 30)}...` : event.description}
              onEventClick={()=>{
                handleEventClick(event.id)
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading events...</p>
      )}
    </div>
  );
};

export default Dashboard;
