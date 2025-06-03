import React from 'react';
import { PiFacebookLogoDuotone, PiTwitterLogoDuotone, PiInstagramLogoDuotone } from 'react-icons/pi';

function FloatingSocialIcons() {
  return (
   
    <div className="fixed bottom-14 right-4 flex flex-row space-x-3 md:space-x-4" style={{ zIndex: 999 }}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
         className="transition-all duration-300 hover:scale-110"
      >
        <PiFacebookLogoDuotone className="text-cyan-950 hover:text-orange-600 w-6 h-6 md:w-7 md:h-7" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
         className="transition-all duration-300 hover:scale-110"
      >
        <PiInstagramLogoDuotone className="text-cyan-950 hover:text-orange-600 w-6 h-6 md:w-7 md:h-7" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
         className="transition-all duration-300 hover:scale-110"
      >
        <PiTwitterLogoDuotone className="text-cyan-950 hover:text-orange-600 w-6 h-6 md:w-7 md:h-7" />
      </a>
      
    </div>
  );
}

export default FloatingSocialIcons; 