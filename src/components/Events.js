import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  const [hoveredCard, setHoveredCard] = useState(null);
  const [inView, setInView] = useState(false);

  // Get current date and determine the active day
  const currentDate = new Date('2025-06-02T18:00:00Z');
  const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1, x: 0 },
    hover: {
      scale: 1.05,
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const activeCardVariants = {
    initial: { 
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      borderColor: "transparent"
    },
    active: {
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      borderColor: "#ea580c",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center min-h-screen p-4 md:p-6 bg-gradient-to-bl from-gray-50 to-gray-200 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-200 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center"
        variants={titleVariants}
      >
        <motion.span
          className="inline-block"
          whileHover={{ 
            scale: 1.1,
            color: "#ea580c",
            transition: { duration: 0.2 }
          }}
        >
          Special Events
        </motion.span>
        <motion.span
          className="inline-block mx-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          &
        </motion.span>
        <motion.span
          className="inline-block"
          whileHover={{ 
            scale: 1.1,
            color: "#ea580c",
            transition: { duration: 0.2 }
          }}
        >
          Offers
        </motion.span>
      </motion.h1>

      <motion.div 
        className="w-full max-w-sm md:max-w-2xl lg:max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
      >
        <AnimatePresence>
          {offers.map((offer, index) => {
            const isCurrentDay = currentDay === offer.day;
            
            return (
              <motion.div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col relative cursor-pointer ${
                  isCurrentDay ? 'border-4 border-orange-500' : 'border border-gray-200'
                }`}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                layout
              >
                {/* Active Day Badge */}
                <AnimatePresence>
                  {isCurrentDay && (
                    <motion.div
                      className="absolute top-4 right-4 z-10"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <motion.div
                        className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                        variants={pulseVariants}
                        initial="initial"
                        animate="pulse"
                      >
                        TODAY
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image Container */}
                <div className="relative overflow-hidden h-48">
                  <motion.img 
                    src={offer.image} 
                    alt={`${offer.day} Offer`} 
                    className="w-full h-full object-cover"
                    variants={imageVariants}
                    initial="initial"
                    animate={hoveredCard === index ? "hover" : "initial"}
                  />
                  
                  {/* Overlay gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0"
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Day Badge */}
                  <motion.div
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <span className="text-sm font-bold text-gray-800">{offer.day}</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <motion.h2 
                    className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 flex-grow-0"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {offer.title}
                  </motion.h2>
                  
                  <motion.p 
                    className="text-gray-600 text-sm md:text-base flex-grow mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {offer.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Link to={`/reservation?date=${offer.date}`}>
                      <motion.button 
                        className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 text-base md:text-lg font-medium w-full shadow-md"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <motion.span className="flex items-center justify-center">
                          Book Now
                          <motion.span
                            className="ml-2"
                            animate={{ x: hoveredCard === index ? 5 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-orange-500 rounded-lg opacity-0 pointer-events-none"
                  animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Floating Action Hint */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.p
          className="text-gray-600 text-sm md:text-base"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Hover over cards to see them come alive! ✨
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Events;