import React from 'react';
import { Link } from 'react-router-dom';
import heroMalibu from '../assets/images/hero-malibu.jpg';
import { motion } from 'framer-motion';

// Create a motion-enabled Link component
const MotionLink = motion(Link);

function Home() {
  return (
    <motion.div
      className="flex flex-col md:flex-row h-screen text-teal-300 bg-sky-950 overflow-hidden"
    >
      {/* Left Section: Text and Button */}
      <div className="flex-1 flex flex-col items-start justify-center p-8 md:p-16 h-full overflow-y-auto">

        {/* Main Title */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Malibu  <br className="font-extrabold hidden md:block" /> Seafood
        </motion.h2>

        {/* Introduction Text */}
        <motion.p
          className="text-lg md:text-xl text-stone-300 font-bold leading-relaxed mb-8 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ...where the ocean's bounty meets culinary excellence.
          Join us for an unforgettable dining experience by the sea!
        </motion.p>

        {/* Call to Action Button */}
        <MotionLink
          to="/reservations"
          className="bg-stone-400 text-sky-950 px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300 text-lg font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          Book a Table
        </MotionLink>

      </div>

      {/* Right Section: Hero Image */}
      <div className="flex-1 overflow-hidden">
        <img
          src={heroMalibu}
          alt="Malibu Seafood Hero"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export default Home;
