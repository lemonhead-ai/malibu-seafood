import React, { useState } from 'react';

function ReservationsForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    people: '',
    requests: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Reservation request submitted!'); // Placeholder for submission
    // Clear form or redirect
    setFormData({
      name: '',
      contact: '',
      date: '',
      time: '',
      people: '',
      requests: '',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 text-center">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Make a Reservation</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm md:max-w-md bg-white p-6 rounded-lg shadow-lg text-left">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Email or Phone:</label>
          <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
          <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="people" className="block text-gray-700 text-sm font-bold mb-2">Number of People:</label>
          <input type="number" id="people" name="people" value={formData.people} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" min="1" required />
        </div>
        <div className="mb-4">
          <label htmlFor="requests" className="block text-gray-700 text-sm font-bold mb-2">Special Requests:</label>
          <textarea id="requests" name="requests" value={formData.requests} onChange={handleChange} rows="4" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit Reservation
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationsForm;