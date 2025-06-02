import React, { useEffect, useState } from 'react';

function ReservationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    people: '',
  });

  // Get date from URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dateFromUrl = urlParams.get('date');
    if (dateFromUrl) {
      setFormData((prev) => ({ ...prev, date: dateFromUrl }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    e.target.reset(); // Clear the form
    setFormData({ name: '', date: '', time: '', people: '' }); // Reset state
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 text-center">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Make a Reservation</h1>
      <div className="w-full max-w-sm md:max-w-md bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-left text-gray-700 mb-0.5 md:mb-1 text-sm md:text-base" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-1.5 md:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-left text-gray-700 mb-0.5 md:mb-1 text-sm md:text-base" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-1.5 md:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-left text-gray-700 mb-0.5 md:mb-1 text-sm md:text-base" htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-1.5 md:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-left text-gray-700 mb-0.5 md:mb-1 text-sm md:text-base" htmlFor="people">Number of People</label>
            <input
              type="number"
              id="people"
              value={formData.people}
              onChange={handleChange}
              min="1"
              className="w-full p-1.5 md:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
              placeholder="e.g., 2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-1.5 md:p-2 rounded-lg hover:bg-orange-600 transition duration-300 text-base md:text-lg"
          >
            Submit Reservation
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;