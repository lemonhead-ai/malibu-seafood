import { image } from 'framer-motion/m';
import React, { useState, useRef, useEffect } from 'react';
import wineDine from '../assets/images/wine-dine.jpg';

// Mock images for demonstration - replace with your actual imports
const grilledFishSalad = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop';
const searedTunaSteak = 'https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=400&h=400&fit=crop';



function Menu() {
  const [currentItem, setCurrentItem] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');

  const menuItems = [
    { 
      name: 'Grilled Fish Salad', 
      price: '$12', 
      calories: '320 kcal', 
      carbs: '33.9g', 
      protein: '6.3g', 
      fat: '9.2g', 
      img: grilledFishSalad, 
      ingredients: 'badger flame beets, baby carrots, tomatoes, mango salsa, red onions, bacon' 
    },
    { 
      name: 'Seared Tuna Steak', 
      price: '$15', 
      calories: '400 kcal', 
      carbs: '10g', 
      protein: '35g', 
      fat: '12g', 
      img: searedTunaSteak, 
      ingredients: 'tuna, soy glaze, sesame seeds, green beans' 
    },
    { 
      name: 'Shrimp Ceviche', 
      price: '$10', 
      calories: '250 kcal', 
      carbs: '15g', 
      protein: '20g', 
      fat: '5g', 
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
      className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 bg-gradient-to-bl from-gray-50 to-gray-400 font-sans relative overflow-hidden"
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nutrition-item.transitioning {
          transform: translateY(20px) scale(0.8);
          opacity: 0;
        }
        
        .nutrition-item:nth-child(1) { transition-delay: 0.1s; }
        .nutrition-item:nth-child(2) { transition-delay: 0.15s; }
        .nutrition-item:nth-child(3) { transition-delay: 0.2s; }
        .nutrition-item:nth-child(4) { transition-delay: 0.25s; }
        
        .fade-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .fade-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.5s ease-out;
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
        menu-content flex flex-col lg:flex-row items-center justify-center w-full max-w-sm md:max-w-3xl lg:max-w-5xl
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
            <div className="absolute bottom-3 left-3 text-6xl md:text-8xl font-bold text-gray-300 opacity-75 select-none hidden md:block transition-all duration-500">
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
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white rounded-full p-2 md:p-4 shadow-lg flex items-center justify-center text-base md:text-2xl font-bold text-gray-800 border-2 border-orange-500 transition-all duration-300 hover:scale-110">
                {menuItems[currentItem].price}
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

          {/* Nutritional Info */}
          <div className="flex justify-center lg:justify-start space-x-3 md:space-x-8 mb-6 md:mb-12">
            {[
              { value: menuItems[currentItem].calories, label: 'Calories' },
              { value: menuItems[currentItem].carbs, label: 'Carbo' },
              { value: menuItems[currentItem].protein, label: 'Protein' },
              { value: menuItems[currentItem].fat, label: 'Fat' }
            ].map((nutrition, index) => (
              <div key={index} className={`
                nutrition-item flex flex-col items-center
                ${isTransitioning ? 'transitioning' : ''}
              `}>
                <div className="bg-gray-200 rounded-full p-2 md:p-4 text-gray-800 font-bold text-xs md:text-sm w-10 h-10 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 hover:bg-orange-100 hover:scale-110">
                  {nutrition.value}
                </div>
                <span className="text-gray-600 text-xs md:text-sm mt-1 md:mt-2">{nutrition.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls - Desktop */}
      <div className="absolute bottom-24 left-4 flex items-center space-x-4 hidden md:flex z-20">
        <span className="text-base md:text-xl font-semibold text-gray-800">{`0${currentItem + 1}/${menuItems.length}`}</span>
        
        {/* Pagination dots */}
        <div className="flex space-x-2 md:space-x-3">
          {menuItems.map((_, index) => (
            <button
              key={index}
              className={`
                w-2 h-2 md:w-4 md:h-4 rounded-full transition-all duration-300 hover:scale-125
                ${currentItem === index ? 'bg-orange-500 shadow-lg' : 'bg-gray-400 hover:bg-gray-500'}
              `}
              onClick={() => handleDotClick(index)}
              disabled={isTransitioning}
            />
          ))}
        </div>
        
        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="text-gray-600 text-sm md:text-lg cursor-pointer focus:outline-none hover:text-orange-500 transition-colors duration-300 disabled:opacity-50"
        >
          NEXT - {nextItem.name}
        </button>
      </div>

      {/* Controls - Mobile */}
      <div className="absolute bottom-24 left-4 flex items-center justify-center mt-2 md:hidden z-20">
        <span className="text-base md:text-xl font-semibold text-gray-800">{`0${currentItem + 1}/${menuItems.length}`}</span>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 z-30"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 z-30"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default Menu;