import React from 'react';
import { PiFacebookLogoDuotone, PiTwitterLogoDuotone, PiInstagramLogoDuotone } from 'react-icons/pi';

function Footer() {
  return (
    <footer className="relative bg-gray-300 text-gray-900 p-4 md:p-6 text-center text-sm md:text-base sticky bottom-0 z-50 backdrop-filter backdrop-blur-sm bg-opacity-20">
      <div className="container mx-auto">
        <p>Copyright &copy; {new Date().getFullYear()} Lemonlabs. All rights reserved.</p>
      </div>
      {/* Social Media Icons */}
      <div className="absolute bottom-4 right-4 flex space-x-3 md:space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <PiFacebookLogoDuotone className="text-cyan-950 hover:text-orange-600 w-5 h-5 md:w-6 md:h-6" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <PiTwitterLogoDuotone className="text-cyan-950 hover:text-orange-600 w-5 h-5 md:w-6 md:h-6" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <PiInstagramLogoDuotone className="text-cyan-950 hover:text-orange-600 w-5 h-5 md:w-6 md:h-6" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;