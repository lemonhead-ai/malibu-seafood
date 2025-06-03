import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <header className="flex justify-between items-center p-2 bg-gray-400 text-gray-950 md:text-base sticky top-0 z-50 backdrop-filter backdrop-blur-sm bg-opacity-20">
      <div className="text-sky-950 flex flex-col">
        <span className="text-2xl font-extrabold">Malibu</span> 
        <span className="text-sm font-thin">S E A F O O D</span>
      </div>
      <nav className="flex items-center space-x-6">
        <Link to="/" className={`hover:text-orange-600 ${isActive('/') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-gray-600'}`}>Home</Link>
        <Link to="/menu" className={`hover:text-orange-600 ${isActive('/menu') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-sky-950'}`}>Menu</Link>
        <Link to="/events" className={`hover:text-orange-600 ${isActive('/events') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-sky-950'}`}>Events</Link>
        <Link to="/reservations" className={`hover:text-orange-600 ${isActive('/reservations') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-sky-950'}`}>Reservations</Link>
        <Link to="/contact" className={`hover:text-orange-600 ${isActive('/contact') ? 'bg-gray-700 text-white rounded px-2 py-1 shadow' : 'text-sky-950'}`}>Contact</Link>
        <Link to="/reservation" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 shadow">Reserve</Link>
      </nav>
    </header>
  );
}

export default Header;