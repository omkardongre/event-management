import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">About Us</h2>
        <p className="text-gray-700 mb-4">
          Welcome to our event management website! We are a team of passionate professionals dedicated to creating unforgettable experiences through well-organized and engaging events.
        </p>
        <p className="text-gray-700 mb-4">
          Our mission is to provide a seamless platform for event organizers and attendees alike, where they can discover, register, and participate in a wide range of events across various industries and interests.
        </p>
        <p className="text-gray-700 mb-4">
          With years of experience in event planning and management, we understand the importance of attention to detail, clear communication, and exceptional service. Our team works tirelessly to ensure that every event we organize meets the highest standards of quality and professionalism.
        </p>
        <p className="text-gray-700">
          Whether you're an organizer looking to promote your event or an attendee seeking exciting opportunities, our website is your one-stop destination. Join us on this journey, and let's create memories that last a lifetime.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;