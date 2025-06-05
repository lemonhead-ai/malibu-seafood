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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get current date and determine the active day
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  // Mobile swipe handling with corrected logic
  const handleMobileDragEnd = (event, info) => {
    if (isAnimating) return;
    
    const threshold = 80;
    const velocity = Math.abs(info.velocity.y);
    
    if (info.offset.y > threshold || velocity > 500) {
      // Swiped down: go to next card
      setIsAnimating(true);
      setCurrentIndex(prev => (prev + 1) % offers.length);
      setTimeout(() => setIsAnimating(false), 400);
    } else if (info.offset.y < -threshold || velocity > 500) {
      // Swiped up: go to previous card (corrected)
      setIsAnimating(true);
      setCurrentIndex(prev => (prev - 1 + offers.length) % offers.length);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  // Get cards for mobile stack
  const getStackedCards = () => {
    const STACK_SIZE = 4;
    const cards = [];
    
    for (let i = 0; i < STACK_SIZE; i++) {
      const cardIndex = (currentIndex + i) % offers.length;
      cards.push({
        offer: offers[cardIndex],
        index: cardIndex,
        stackIndex: i
      });
    }
    
    return cards.reverse(); // Top card should be first
  };

  const renderMobileStack = () => {
    const stackedCards = getStackedCards();
    
    return (
      <div className="flex flex-col items-center mt-32 w-full">
        <div className="relative w-full max-w-sm" style={{ height: '50vh' }}>
          {stackedCards.map(({ offer, index, stackIndex }) => {
            const isTop = stackIndex === 0;
            const scale = 1 - (stackIndex * 0.05);
            const yOffset = stackIndex * -30; // Increased from -12 to -25 for better visibility
            const zIndex = 10 - stackIndex;
            
            return (
              <motion.div
                key={`${offer.day}-${currentIndex}-${stackIndex}`}
                className={`absolute inset-0 w-full h-full flex flex-col justify-end bg-white rounded-3xl shadow-2xl overflow-hidden ${
                  currentDay === offer.day ? 'border-4 border-orange-500' : 'border border-gray-200'
                }`}
                style={{
                  zIndex,
                  filter: isTop ? 'none' : 'brightness(0.95)',
                }}
                initial={{
                  scale: isTop ? 0.9 : scale,
                  y: isTop ? (stackIndex === 0 ? -400 : 400) : yOffset,
                  opacity: isTop ? 0 : 1
                }}
                animate={{
                  scale,
                  y: yOffset,
                  opacity: 1
                }}
                exit={{
                  scale: 0.9,
                  y: stackIndex === 0 ? 400 : -400,
                  opacity: 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4
                }}
                drag={isTop && !isAnimating ? "y" : false}
                dragConstraints={{ top: -100, bottom: 100 }}
                dragElastic={0.2}
                onDragEnd={isTop ? handleMobileDragEnd : undefined}
                whileTap={isTop ? { scale: 0.98 } : {}}
              >
                {/* Active Day Badge */}
                <AnimatePresence>
                  {currentDay === offer.day && (
                    <motion.div
                      className="absolute top-4 right-4 z-20"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                        variants={pulseVariants}
                        initial="initial"
                        animate="pulse"
                      >
                        TODAY
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Background Image */}
                <motion.img
                  src={offer.image}
                  alt={`${offer.day} Offer`}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                
                {/* Blurred Gradient Overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 h-3/4 z-10 pointer-events-none"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
                    maskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
                    filter: 'blur(18px)',
                  }}
                >
                  <img
                    src={offer.image}
                    alt="blurred background"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Dark overlay for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 z-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Card Content */}
                <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-6 pb-8 pt-16">
                  <motion.h2
                    className="text-2xl font-bold text-white mb-2 text-center flex items-center gap-2 drop-shadow-xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {offer.title}
                    {currentDay === offer.day && (
                      <span className="ml-1 text-blue-300" title="Today">✔️</span>
                    )}
                  </motion.h2>
                  
                  <motion.p
                    className="text-gray-100 text-base text-center mb-6 drop-shadow-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {offer.description}
                  </motion.p>
                  
                  {/* Stats Row */}
                  <div className="flex justify-center gap-6 w-full mb-6">
                    <div className="flex flex-col items-center">
                      <span className="text-orange-400 text-lg font-bold drop-shadow">{offer.day.slice(0,3)}</span>
                      <span className="text-xs text-gray-200">Day</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-white text-lg font-bold drop-shadow">{offer.date.slice(5)}</span>
                      <span className="text-xs text-gray-200">Date</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-green-600 text-lg font-bold drop-shadow">★</span>
                      <span className="text-xs text-gray-200">Special</span>
                    </div>
                  </div>
                  
                  {/* Book Now Button */}
                  <Link to={`/reservations?date=${offer.date}`}>
                    <motion.button
                      className="w-52 flex items-center justify-center gap-2 bg-white/90 text-gray-900 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-orange-600 hover:text-white transition-colors duration-300"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>Book Now</span>
                      <motion.span
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                      </motion.span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Swipe Instructions */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
       
          <div className="flex justify-center mt-4 gap-1">
            {offers.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-orange-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div 
      className="flex flex-col items-center mt-24 min-h-screen p-2 md:p-6 bg-gradient-to-bl from-gray-50 to-gray-400"
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

      {/* Mobile Stacked Cards */}
      {isMobile ? renderMobileStack() : (
        /* Desktop Grid Layout */
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
                  className={`relative flex flex-col justify-end bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
                    isCurrentDay ? 'border-4 border-orange-500' : 'border border-gray-200'
                  } min-h-[420px] h-full`}
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
                        className="absolute top-4 right-4 z-20"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
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

                  {/* Background Image */}
                  <motion.img
                    src={offer.image}
                    alt={`${offer.day} Offer`}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    variants={imageVariants}
                    initial="initial"
                    animate={hoveredCard === index ? 'hover' : 'initial'}
                  />
                  
                  {/* Blurred Gradient Overlay */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-3/4 z-10 pointer-events-none"
                    style={{
                      WebkitMaskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
                      maskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
                      filter: 'blur(18px)',
                    }}
                  >
                    <img
                      src={offer.image}
                      alt="blurred background"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Dark overlay for readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 z-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Card Content */}
                  <div className="absolute inset-x-0 bottom-10 z-30 flex flex-col items-center px-6 pb-2 w-full" style={{height: '50%'}}>
                    <motion.h2
                      className="text-2xl font-bold text-white mb-1 text-center flex items-center gap-2 drop-shadow-xl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {offer.title}
                      {isCurrentDay && (
                        <span className="ml-1 text-blue-300" title="Today">✔️</span>
                      )}
                    </motion.h2>
                    
                    <motion.p
                      className="text-gray-100 text-base text-center mb-4 drop-shadow-md"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {offer.description}
                    </motion.p>
                    
                    {/* Stats Row */}
                    <div className="flex justify-center gap-6 w-full mb-6">
                      <div className="flex flex-col items-center">
                        <span className="text-orange-300 text-lg font-bold drop-shadow">{offer.day.slice(0,3)}</span>
                        <span className="text-xs text-gray-200">Day</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-white text-lg font-bold drop-shadow">{offer.date.slice(5)}</span>
                        <span className="text-xs text-gray-200">Date</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-green-300 text-lg font-bold drop-shadow">★</span>
                        <span className="text-xs text-gray-200">Special</span>
                      </div>
                    </div>
                    
                    {/* Book Now Button */}
                    <motion.div
                      className="w-full mt-auto"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Link to={`/reservations?date=${offer.date}`}>
                        <motion.button
                          className="w-full flex items-center justify-center gap-2 bg-white/90 text-gray-900 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-orange-600 hover:text-white transition-colors duration-300"
                          variants={buttonVariants}
                          initial="initial"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <span>Book Now</span>
                          <motion.span
                            animate={{ x: hoveredCard === index ? 5 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                          </motion.span>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                  
                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-orange-500 rounded-3xl opacity-0 pointer-events-none"
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Desktop Hover Hint */}
      {!isMobile && (
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.p
            className="text-gray-600 text-sm mb-24 md:text-base"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Hover over cards to see them come alive!
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Events;