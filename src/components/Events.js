import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tacoTuesday from '../assets/images/tacoTuesday.jpg'
import familyBrunch from '../assets/images/family-brunch.jpg'
import dateNight from '../assets/images/date-night.jpg'
import fishFry from '../assets/images/fish-fry.jpg'
import wineDine from '../assets/images/wine-dine.jpg'
import shrimpFest from '../assets/images/shrimp-fest.jpg'
import seafoodSampler from '../assets/images/seafood-sampler.jpg';


function Events() {
  const [offers, setOffers] = useState([
    { day: 'Monday', title: 'Seafood Sampler Day', description: 'Get a 20% discount on our Seafood Sampler Platter! Includes shrimp, scallops, and grilled fish. Dine-in only.', image: seafoodSampler, date: '2025-06-02' },
    { day: 'Tuesday', title: 'Taco Tuesday', description: 'Enjoy 3 seafood tacos for $9! Choose from shrimp, fish, or crab. Includes a side of mango salsa.', image: tacoTuesday, date: '2025-06-03' },
    { day: 'Wednesday', title: 'Wine & Dine', description: 'Half-price bottles of white wine with any seafood entrée purchase. Perfect pairing for your meal!', image: wineDine, date: '2025-06-04' },
    { day: 'Thursday', title: 'Shrimp Fest', description: 'Free Shrimp Ceviche appetizer with any shrimp entrée order. Available all day!', image: shrimpFest, date: '2025-06-05' },
    { day: 'Friday', title: 'Fish Fry Friday', description: 'All-you-can-eat fish and chips for $15! Includes our signature tartar sauce and fries.', image: fishFry, date: '2025-06-06' },
    { day: 'Saturday', title: 'Date Night Special', description: 'Dinner for two: Choose two seafood entrées and get a free dessert to share for $40. Dine-in only.', image: dateNight, date: '2025-06-07' },
    { day: 'Sunday', title: 'Family Brunch', description: 'Kids eat free with the purchase of an adult entrée! Brunch menu available from 9 AM to 2 PM.', image: familyBrunch, date: '2025-06-08' },
  ]);

  // Get current date and determine the active day
  const currentDate = new Date('2025-06-02T18:00:00Z'); // 09:00 PM EAT (UTC+3) on June 02, 2025
  const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-6 bg-gradient-to-bl from-gray-50 to-gray-200 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">Special Events & Offers</h1>
      <div className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ${currentDay === offer.day ? 'border-4 border-orange-500' : ''}`}
          >
            <img src={offer.image} alt={`${offer.day} Offer`} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 flex-grow-0">{offer.day}: {offer.title}</h2>
              <p className="text-gray-600 text-sm md:text-base flex-grow">{offer.description}</p>
              <Link to={`/reservation?date=${offer.date}`}>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300 text-base md:text-lg">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;