import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  time:string;
  description: string;
  onEventClick: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  location,
  description,
  onEventClick,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300"
      onClick={() => onEventClick("1")}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className='flex justify-between'>
         <p className="text-gray-600 mb-2">{date.split('T')[0]}</p>
          <p className="text-gray-600 mb-2">{time}</p>
        </div>
        <p className="text-gray-600 mb-2">{location}</p>
        <p className="text-gray-700 truncate">{description}</p>
      </div>
    </div>
  );
};

export default EventCard;