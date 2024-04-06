// src/components/CreateEventForm.tsx
import React, { useState } from 'react';

interface EventData {
  title: string;
  date: string;
  location: string;
  description: string;
  // Add any other event properties you need
}

const CreateEventForm: React.FC = () => {
  const [formData, setFormData] = useState<EventData>({
    title: '',
    date: '',
    location: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can make an API call or perform any other necessary actions with the form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      {/* Add more form fields for date, location, description, etc. */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;