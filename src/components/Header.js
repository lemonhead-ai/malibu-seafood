import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (pathname) => location.pathname === pathname;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4 + (index * 0.1)
      }
    }),
    hover: {
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    initial: { opacity: 0, scale: 0.8, y: -50 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: -50,
      transition: { 
        duration: 0.2
      }
    }
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/events', label: 'Events' },
    { path: '/reservations', label: 'Reservations' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <motion.header 
      className={`flex justify-between items-center p-2 md:p-4 text-gray-950 md:text-base sticky top-0 z-50 backdrop-filter backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'bg-gray-400 bg-opacity-20 shadow-lg' : 'bg-gray-400 bg-opacity-20'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Logo */}
      <motion.div 
        className="text-sky-950 flex flex-col cursor-pointer"
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.span 
          className="text-2xl md:text-3xl font-extrabold"
          whileHover={{ color: "#ea580c" }}
          transition={{ duration: 0.2 }}
        >
          Malibu
        </motion.span> 
        <motion.span 
          className="text-sm font-thin tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          S E A F O O D
        </motion.span>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            custom={index}
          >
            <Link 
              to={item.path} 
              className={`relative px-3 py-2 rounded-md transition-all duration-300 ${
                isActive(item.path) 
                  ? 'bg-gray-700 text-white shadow-lg' 
                  : 'text-sky-950 hover:text-orange-600'
              }`}
            >
              {item.label}
              {/* Animated underline for hover effect */}
              {!isActive(item.path) && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
        
        {/* Reserve Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/reservation" 
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Reserve
          </Link>
        </motion.div>
      </nav>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span 
          className={`w-6 h-0.5 bg-sky-950 transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}
        />
        <motion.span 
          className={`w-6 h-0.5 bg-sky-950 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <motion.span 
          className={`w-6 h-0.5 bg-sky-950 transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}
        />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg md:hidden"
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col p-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link 
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-gray-700 text-white'
                        : 'text-sky-950 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
              >
                <Link 
                  to="/reservation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 text-center"
                >
                  Reserve
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;