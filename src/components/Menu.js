import React, { useState } from 'react';

import wineDine from '../assets/images/wine-dine.jpg';


const grilledFishSalad = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop';
const searedTunaSteak = 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=400&h=400&fit=crop';


// Circular Progress Component
const CircularProgress = ({ value, max, label, unit, size = 80 }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const center = size / 2;
  
  // Calculate the end point of the progress arc for the orange dot
  const angle = (percentage / 100) * 2 * Math.PI - Math.PI / 2;
  const dotX = center + radius * Math.cos(angle);
  const dotY = center + radius * Math.sin(angle);
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${label}-${value}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#fb923c', stopOpacity: 1 }} />
              <stop offset="70%" style={{ stopColor: '#fb923c', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#fb923c', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          
          {/* Progress circle with gradient */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${label}-${value})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.8s ease-in-out',
            }}
          />
          
          {/* Orange dot at the end */}
          {percentage > 0 && (
            <circle
              cx={dotX}
              cy={dotY}
              r={3}
              fill="#fb923c"
              style={{
                transition: 'all 0.8s ease-in-out',
              }}
            />
          )}
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xs md:text-sm font-bold text-gray-800 leading-tight text-center">
            {value}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {unit}
          </div>
        </div>
      </div>
      
      {/* Label */}
      <div className="mt-1 text-xs font-medium text-gray-600 text-center">
        {label}
      </div>
    </div>
  );
};

function Menu() {
  const [currentItem, setCurrentItem] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');

  const menuItems = [
    { 
      name: 'Grilled Fish Salad', 
      price: '$12', 
      calories: { value: 320, max: 500, unit: 'kcal' },
      carbs: { value: 33.5, max: 50, unit: 'g' },
      protein: { value: 6.3, max: 30, unit: 'g' },
      fat: { value: 4.2, max: 20, unit: 'g' },
      img: grilledFishSalad, 
      ingredients: 'badger flame beets, baby carrots, tomatoes, mango salsa, red onions, bacon' 
    },
    { 
      name: 'Seared Tuna Steak', 
      price: '$15', 
      calories: { value: 400, max: 500, unit: 'kcal' },
      carbs: { value: 10, max: 50, unit: 'g' },
      protein: { value: 35, max: 40, unit: 'g' },
      fat: { value: 12, max: 20, unit: 'g' },
      img: searedTunaSteak, 
      ingredients: 'tuna, soy glaze, sesame seeds, green beans' 
    },
    { 
      name: 'Shrimp Ceviche', 
      price: '$10', 
      calories: { value: 250, max: 500, unit: 'kcal' },
      carbs: { value: 15, max: 50, unit: 'g' },
      protein: { value: 20, max: 30, unit: 'g' },
      fat: { value: 5, max: 20, unit: 'g' },
      img: wineDine, 
      ingredients: 'shrimp, lime, cilantro, avocado, red onions' 
    },
  ];

  const handleNext = () => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentItem((prev) => (prev + 1) % menuItems.length);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentItem((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentItem) return;
    setDirection(index > currentItem ? 'next' : 'prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentItem(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
      setTouchStartX(null);
    } else if (diff < -50) {
      handlePrev();
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const nextItem = menuItems[(currentItem + 1) % menuItems.length];
  const currentItemNameWords = menuItems[currentItem].name.split(' ');

  return (
    <div 
      className="flex flex-col items-center mt-8 justify-center min-h-screen p-4 md:p-6 bg-gradient-to-bl from-gray-50 to-gray-400 relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style jsx>{`
        .menu-content {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .menu-content.transitioning-next {
          transform: translateX(-100%) scale(0.9);
          opacity: 0;
          filter: blur(4px);
        }
        
        .menu-content.transitioning-prev {
          transform: translateX(100%) scale(0.9);
          opacity: 0;
          filter: blur(4px);
        }
        
        .image-container {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .image-container.transitioning {
          transform: scale(0.8) rotate(5deg);
          opacity: 0.3;
        }
        
        .details-section {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .details-section.transitioning-next {
          transform: translateY(30px);
          opacity: 0;
        }
        
        .details-section.transitioning-prev {
          transform: translateY(-30px);
          opacity: 0;
        }
        
        .nutrition-item {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nutrition-item.transitioning {
          transform: translateY(20px) scale(0.8);
          opacity: 0;
        }
        
        .nutrition-item:nth-child(1) { transition-delay: 0.1s; }
        .nutrition-item:nth-child(2) { transition-delay: 0.2s; }
        .nutrition-item:nth-child(3) { transition-delay: 0.3s; }
        .nutrition-item:nth-child(4) { transition-delay: 0.4s; }
        
        .fade-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .fade-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.5s ease-out;
        }
        
        .pagination-dot {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .pagination-dot.active::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 2px solid #fb923c;
          border-radius: 50%;
          animation: pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulseRing {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(0.8);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .slide-in-right {
          animation: slideInFromRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .slide-in-left {
          animation: slideInFromLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Main Content Area */}
      <div className={`
        menu-content flex flex-col lg:flex-row items-center justify-center w-full max-w-sm md:max-w-3xl lg:max-w-6xl
        ${isTransitioning ? (direction === 'next' ? 'transitioning-next' : 'transitioning-prev') : ''}
        ${!isTransitioning && direction === 'next' ? 'slide-in-right' : ''}
        ${!isTransitioning && direction === 'prev' ? 'slide-in-left' : ''}
      `}>
        {/* Image Section */}
        <div className="relative flex items-center justify-center lg:w-1/2 w-full mb-6 md:mb-8 lg:mb-0">
          <div className={`
            image-container relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-white rounded-full shadow-xl flex items-center justify-center
            ${isTransitioning ? 'transitioning' : ''}
          `}>
            {/* Item Numbering */}
            <div className="absolute bottom-2 left-4 text-6xl md:text-9xl font-bold text-gray-300 opacity-80 select-none hidden md:block transition-all duration-500">
              {`0${currentItem + 1}`}
            </div>
            
            {/* Food Image */}
            <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden shadow-md transform transition-all duration-500 hover:scale-105">
              <img 
                src={menuItems[currentItem].img} 
                alt={menuItems[currentItem].name} 
                className="w-full h-full object-cover transition-all duration-700"
                key={currentItem}
              />
              
              {/* Price Bubble */}
              <div className="absolute bottom-4 right-5 md:bottom-6 md:right-7 bg-orange-100 backdrop-filter backdrop-blur-sm bg-opacity-30 outline-double outline-orange-600 rounded-full w-12 h-12 md:w-16 md:h-16 shadow-6xl flex items-center justify-center text-sm md:text-2xl font-bold text-gray-700 border-3 border-orange-600 transition-all duration-300 hover:scale-110 z-10">
                <span className="leading-none">{menuItems[currentItem].price}</span>
              </div>
            </div>
          </div>
        </div>

        

        {/* Details Section */}
        <div className={`
          details-section lg:w-1/2 w-full lg:pl-12 text-center lg:text-left mt-6 lg:mt-0
          ${isTransitioning ? (direction === 'next' ? 'transitioning-next' : 'transitioning-prev') : ''}
        `}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl text-gray-800 mb-1 md:mb-4 leading-tight">
            <span className="font-bold">{currentItemNameWords[0]}</span>
            {currentItemNameWords.length > 1 && (
              <span className="font-thin ml-1 md:ml-2">{currentItemNameWords[1]}</span>
            )}
          </h2>
          
          {currentItemNameWords.length > 2 && (
            <div className="mt-0.5 md:mt-2 inline-block shadow transform transition-all duration-300 hover:scale-105">
              <span className="px-1 md:px-2 py-0.5 md:py-1 bg-orange-500 text-white text-base md:text-xl font-bold rounded-md inline-block">
                {currentItemNameWords.slice(2).join(' ')}
              </span>
            </div>
          )}
          
          <p className="text-xl md:text-2xl font-bold text-gray-700 mb-1 md:mb-2 mt-4">Ingredients:</p>
          <p className="text-sm md:text-xl text-gray-700 mb-4 md:mb-8 leading-relaxed">{menuItems[currentItem].ingredients}</p>

          {/* Nutritional Info with Circular Progress */}
          <div className="flex justify-center lg:justify-start space-x-4 md:space-x-8 mb-6 md:mb-12">
            <div className={`nutrition-item ${isTransitioning ? 'transitioning' : ''}`}>
              <CircularProgress 
                value={menuItems[currentItem].calories.value}
                max={menuItems[currentItem].calories.max}
                label="Calories"
                unit={menuItems[currentItem].calories.unit}
                size={80}
              />
            </div>
            <div className={`nutrition-item ${isTransitioning ? 'transitioning' : ''}`}>
              <CircularProgress 
                value={menuItems[currentItem].carbs.value}
                max={menuItems[currentItem].carbs.max}
                label="Carbo"
                unit={menuItems[currentItem].carbs.unit}
                size={80}
              />
            </div>
            <div className={`nutrition-item ${isTransitioning ? 'transitioning' : ''}`}>
              <CircularProgress 
                value={menuItems[currentItem].protein.value}
                max={menuItems[currentItem].protein.max}
                label="Protein"
                unit={menuItems[currentItem].protein.unit}
                size={80}
              />
            </div>
            <div className={`nutrition-item ${isTransitioning ? 'transitioning' : ''}`}>
              <CircularProgress 
                value={menuItems[currentItem].fat.value}
                max={menuItems[currentItem].fat.max}
                label="Fat"
                unit={menuItems[currentItem].fat.unit}
                size={80}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Pagination dots with ring effect */}
        <div className="flex space-x-2 md:space-x-2 left-1/4 mb-0  ">
          {menuItems.map((_, index) => (
            <button
              key={index}
              className={`
                pagination-dot w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 hover:scale-125
                ${currentItem === index ? 'active bg-orange-500 shadow-lg' : 'bg-gray-400 hover:bg-gray-600'}
              `}
              onClick={() => handleDotClick(index)}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>

      {/* Controls - Desktop */}
      <div className="absolute bottom-24 left-4 flex items-center space-x-1 hidden md:flex z-20">
        <span className="text-base md:text-3xl font-bold text-gray-700">{`0${currentItem + 1}`}</span>
        <span className='text-base md:text-xl font-semibold text-gray-500'>{`/${menuItems.length}`}</span>
        
        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="text-gray-700 text-sm font-bold md:text-lg cursor-pointer focus:outline-none hover:text-orange-500 transition-colors duration-300 disabled:opacity-50"
        >
          NEXT -
        </button>
        <div
        className='text-orange-500 text-sm md:text-lg'>
        {nextItem.name}
        </div>
      </div>

      {/* Controls - Mobile */}
      <div className="absolute bottom-24 left-4 flex items-center justify-center mt-2 md:hidden z-20">
        <span className="text-base md:text-xl font-semibold text-gray-800 mr-4">{`0${currentItem + 1}/${menuItems.length}`}</span>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        className="absolute left-4 top-2/3 transform -translate-y-1/2 bg-gray-400 opacity-40 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 z-30"
      >
        <svg className="w-4 h-4 text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-4 top-2/3 transform -translate-y-1/2 bg-gray-400 opacity-40 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 z-30"
      >
        <svg className="w-4 h-4 text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default Menu;