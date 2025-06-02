import React from 'react';
import { Link } from 'react-router-dom';
import heroMalibu from '../assets/images/hero-malibu.jpg';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 md:p-6 text-center">
      {/* Hero Section with Overlay */}
      <div className="relative w-full max-w-sm md:max-w-4xl h-40 md:h-64 mb-4 md:mb-8">
        <img 
          src= {heroMalibu}
          alt="Malibu Seafood Hero" 
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
          <h1 className="text-2xl md:text-5xl text-white font-bold px-2 md:px-4">Welcome to Malibu Seafood</h1>
        </div>
      </div>

      {/* Introduction Text */}
      <div className="max-w-xl md:max-w-2xl mb-4 md:mb-8 px-2 md:px-4">
        <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
          Indulge in the freshest seafood delights at Malibu Seafood, where the ocean's bounty meets culinary excellence. 
          From grilled fish salads to succulent shrimp ceviche, our menu offers a taste of the coast crafted with love and skill. 
          Join us for an unforgettable dining experience by the sea!
        </p>
      </div>

      {/* Call to Action Button */}
      <Link to="/menu">
        <button className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-orange-600 transition duration-300 text-sm md:text-lg">
          Explore Our Menu
        </button>
      </Link>
    </div>
  );
}

export default Home;