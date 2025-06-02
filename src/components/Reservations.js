import React from 'react';

function Reservations({ reservations }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 text-center">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">Reservations</h1>
      {reservations.length === 0 ? (
        <p className="text-sm md:text-lg text-gray-600">No reservations yet.</p>
      ) : (
        <div className="w-full max-w-sm md:max-w-md">
          {reservations.map((reservation, index) => (
            <div key={index} className="bg-white p-3 md:p-4 mb-3 md:mb-4 rounded-lg shadow-lg text-sm md:text-base text-gray-700 text-left">
              <p><strong>Name:</strong> {reservation.name}</p>
              <p><strong>Date:</strong> {reservation.date}</p>
              <p><strong>Time:</strong> {reservation.time}</p>
              <p><strong>People:</strong> {reservation.people}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations;