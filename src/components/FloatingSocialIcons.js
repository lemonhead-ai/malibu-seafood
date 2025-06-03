import React from 'react';
import { PiFacebookLogoDuotone, PiTwitterLogoDuotone, PiInstagramLogoDuotone } from 'react-icons/pi';

function FloatingSocialIcons() {
  return (
    // Container for floating social media icons
    // Use fixed positioning to keep it in the viewport
    // Adjust bottom and right for desired spacing from the corner
    // Use a high z-index to ensure it floats above other content
    // Changed flex-col to flex-row for horizontal alignment and space-y to space-x
    <div className="fixed bottom-4 right-4 flex flex-row space-x-3 md:space-x-4" style={{ zIndex: 999 }}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <PiFacebookLogoDuotone className="text-cyan-950 hover:text-orange-600 w-6 h-6 md:w-7 md:h-7" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <PiTwitterLogoDuotone className="text-cyan-950 hover:text-orange-600 w-6 h-6 md:w-7 md:h-7" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <PiInstagramLogoDuotone className="text-cyan-950 hover:text-orange-600 w-6 h-6 md:w-7 md:h-7" />
      </a>
    </div>
  );
}

export default FloatingSocialIcons; 