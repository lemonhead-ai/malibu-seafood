import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 text-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-80">
      <div className="text-2xl text-gray-800 flex flex-col">
        <span className="font-extrabold">M a l i b u</span> 
        <span className="font-thin">SEAFOOD</span>
      </div>
      <nav className="flex items-center space-x-6">
        <Link to="/" className={`hover:text-gray-800 ${isActive('/') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-gray-600'}`}>Home</Link>
        <Link to="/menu" className={`hover:text-gray-800 ${isActive('/menu') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-gray-600'}`}>Menu</Link>
        <Link to="/events" className={`hover:text-gray-800 ${isActive('/events') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-gray-600'}`}>Events</Link>
        <Link to="/reservations" className={`hover:text-gray-800 ${isActive('/reservations') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-gray-600'}`}>Reservations</Link>
        <Link to="/contact" className={`hover:text-gray-800 ${isActive('/contact') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-gray-600'}`}>Contact</Link>
        <Link to="/reservation" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 shadow">Reserve</Link>
      </nav>
    </header>
  );
}

export default Header;