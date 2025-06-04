import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, ChefHat, Star, Sparkles, Heart, Award } from 'lucide-react';

function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    people: '2',
    requests: '',
    occasion: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Floating particles animation
  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y <= -10 ? 110 : particle.y - particle.speed,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Testimonial rotation
  const testimonials = [
    { text: "Absolutely incredible dining experience!", author: "Martin M.", rating: 5 },
    { text: "Perfect atmosphere for our anniversary", author: "Martin & Gina", rating: 5 },
    { text: "The chef's special was unforgettable", author: "Mumo R.", rating: 5 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setFormData({
        name: '',
        contact: '',
        date: '',
        time: '',
        people: '2',
        requests: '',
        occasion: '',
      });
      setShowSuccess(false);
    }, 4000);
  };

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const occasions = [
    'Regular Dining',
    'Birthday Celebration',
    'Anniversary',
    'Business Meeting',
    'Date Night',
    'Family Gathering',
    'Other'
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated confetti effect */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full border border-orange-100 transform animate-pulse">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin" style={{ animationDuration: '3s' }}>
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">Reservation Confirmed!</h2>
          <p className="text-gray-600 mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Thank you for choosing our restaurant. We've received your reservation request and will contact you shortly to confirm the details.
          </p>
          <div className="flex justify-center space-x-1 animate-fade-in" style={{ animationDelay: '1s' }}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-6 h-6 text-orange-400 fill-current animate-bounce" 
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <div className="mt-6">
            <Heart className="w-8 h-8 text-red-500 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 relative overflow-hidden">
      {/* Floating particles background */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-orange-300 rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            transform: `scale(${particle.size})`,
            transition: 'all 0.05s linear',
          }}
        />
      ))}

      {/* Interactive mouse follower */}
      <div
        className="fixed w-6 h-6 bg-orange-400 rounded-full pointer-events-none z-50 opacity-20"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: 'all 0.1s ease-out',
        }}
      />

      {/* Header Section with animated elements */}
      <div className="relative overflow-hidden bg-gradient-to-r to-gray-950 via-gray-600 from-orange-600">
        <div className="absolute inset-0 bg-sky-200 opacity-25"></div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-400 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-300 rounded-full opacity-15 animate-ping" style={{ animationDuration: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 hover:rotate-12">
                <ChefHat className="w-10 h-10 text-white animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
              Reserve Your Table
            </h1>
            <p className="text-xl text-orange-200 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Experience culinary excellence in an intimate atmosphere. Book your perfect dining moment with us.
            </p>
            
            {/* Animated stats */}
            <div className="flex justify-center space-x-8 text-orange-300">
              {[
                { value: '4.9', label: 'Rating', icon: Star },
                { value: '500+', label: 'Reviews', icon: Heart },
                { value: '15+', label: 'Years', icon: Award }
              ].map((stat, i) => (
                <div key={i} className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                  </div>
                  <div className="text-2xl font-bold animate-fade-in" style={{ animationDelay: `${0.5 + i * 0.2}s` }}>{stat.value}</div>
                  <div className="text-sm animate-fade-in" style={{ animationDelay: `${0.7 + i * 0.2}s` }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Information Panel with animations */}
          <div className="space-y-8">
            {/* Animated testimonial card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-orange-500 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
                <h2 className="text-xl font-bold text-gray-800">What Our Guests Say</h2>
              </div>
              <div className="relative h-20 overflow-hidden">
                {testimonials.map((testimonial, i) => (
                  <div
                    key={i}
                    className={`absolute w-full transition-all duration-500 ${
                      i === currentTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <p className="text-gray-600 italic mb-2">"{testimonial.text}"</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">- {testimonial.author}</span>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 text-orange-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100 transform hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Dine With Us?</h2>
              <div className="space-y-4">
                {[
                  { title: "Farm-to-Table Freshness", desc: "Locally sourced ingredients prepared with passion" },
                  { title: "Award-Winning Chef", desc: "Michelin-trained culinary expertise" },
                  { title: "Intimate Atmosphere", desc: "Perfect for special occasions and romantic evenings" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 group hover:bg-orange-50 p-3 rounded-lg transition-all duration-200">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-200"></div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 text-white transform hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-orange-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 animate-pulse" />
                Reservation Policy
              </h3>
              <ul className="space-y-2 text-orange-100">
                {[
                  "Reservations recommended for dinner service",
                  "Large parties (8+) require 24-hour notice",
                  "Cancellations accepted up to 2 hours prior",
                  "Special dietary needs accommodated"
                ].map((policy, i) => (
                  <li key={i} className="transform hover:translate-x-2 transition-transform duration-200">• {policy}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enhanced Reservation Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-orange-100 transform hover:scale-105 transition-all duration-300">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center">
                  <Calendar className="w-6 h-6 mr-2 text-orange-500 animate-bounce" />
                  Make Your Reservation
                </h2>
                <p className="text-gray-600">Fill out the details below and we'll confirm your booking</p>
              </div>

              {/* Enhanced form fields with animations */}
              {[
                { name: 'name', label: 'Full Name', icon: Users, type: 'text', placeholder: 'Enter your full name' },
                { name: 'contact', label: 'Contact Information', icon: Phone, type: 'text', placeholder: 'Email or phone number' }
              ].map((field, i) => (
                <div key={field.name} className="space-y-2">
                  <label 
                    htmlFor={field.name} 
                    className={`flex items-center text-sm font-semibold transition-colors duration-200 ${
                      focusedField === field.name ? 'text-orange-600' : 'text-gray-700'
                    }`}
                  >
                    <field.icon className={`w-4 h-4 mr-2 transition-all duration-200 ${
                      focusedField === field.name ? 'text-orange-500 scale-110' : 'text-orange-500'
                    }`} />
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 transform ${
                      focusedField === field.name 
                        ? 'border-orange-500 ring-2 ring-orange-200 bg-white scale-105 shadow-lg' 
                        : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-orange-300'
                    }`}
                    placeholder={field.placeholder}
                    required
                  />
                </div>
              ))}

              {/* Date and Time Row with enhanced animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="date" 
                    className={`flex items-center text-sm font-semibold transition-colors duration-200 ${
                      focusedField === 'date' ? 'text-orange-600' : 'text-gray-700'
                    }`}
                  >
                    <Calendar className={`w-4 h-4 mr-2 transition-all duration-200 ${
                      focusedField === 'date' ? 'text-orange-500 scale-110 animate-pulse' : 'text-orange-500'
                    }`} />
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField('')}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 transform ${
                      focusedField === 'date'
                        ? 'border-orange-500 ring-2 ring-orange-200 bg-white scale-105 shadow-lg'
                        : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-orange-300'
                    }`}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label 
                    htmlFor="time" 
                    className={`flex items-center text-sm font-semibold transition-colors duration-200 ${
                      focusedField === 'time' ? 'text-orange-600' : 'text-gray-700'
                    }`}
                  >
                    <Clock className={`w-4 h-4 mr-2 transition-all duration-200 ${
                      focusedField === 'time' ? 'text-orange-500 scale-110 animate-pulse' : 'text-orange-500'
                    }`} />
                    Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('time')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 transform ${
                      focusedField === 'time'
                        ? 'border-orange-500 ring-2 ring-orange-200 bg-white scale-105 shadow-lg'
                        : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-orange-300'
                    }`}
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Party Size and Occasion with animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label 
                    htmlFor="people" 
                    className={`flex items-center text-sm font-semibold transition-colors duration-200 ${
                      focusedField === 'people' ? 'text-orange-600' : 'text-gray-700'
                    }`}
                  >
                    <Users className={`w-4 h-4 mr-2 transition-all duration-200 ${
                      focusedField === 'people' ? 'text-orange-500 scale-110' : 'text-orange-500'
                    }`} />
                    Party Size
                  </label>
                  <select
                    id="people"
                    name="people"
                    value={formData.people}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('people')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 transform ${
                      focusedField === 'people'
                        ? 'border-orange-500 ring-2 ring-orange-200 bg-white scale-105 shadow-lg'
                        : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-orange-300'
                    }`}
                    required
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label 
                    htmlFor="occasion" 
                    className={`flex items-center text-sm font-semibold transition-colors duration-200 ${
                      focusedField === 'occasion' ? 'text-orange-600' : 'text-gray-700'
                    }`}
                  >
                    <Star className={`w-4 h-4 mr-2 transition-all duration-200 ${
                      focusedField === 'occasion' ? 'text-orange-500 scale-110 animate-spin' : 'text-orange-500'
                    }`} style={{ animationDuration: '2s' }} />
                    Occasion
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('occasion')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 transform ${
                      focusedField === 'occasion'
                        ? 'border-orange-500 ring-2 ring-orange-200 bg-white scale-105 shadow-lg'
                        : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-orange-300'
                    }`}
                  >
                    <option value="">Select occasion</option>
                    {occasions.map(occasion => (
                      <option key={occasion} value={occasion}>{occasion}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests with enhanced animation */}
              <div className="space-y-2">
                <label 
                  htmlFor="requests" 
                  className={`flex items-center text-sm font-semibold transition-colors duration-200 ${
                    focusedField === 'requests' ? 'text-orange-600' : 'text-gray-700'
                  }`}
                >
                  <MessageSquare className={`w-4 h-4 mr-2 transition-all duration-200 ${
                    focusedField === 'requests' ? 'text-orange-500 scale-110 animate-pulse' : 'text-orange-500'
                  }`} />
                  Special Requests
                </label>
                <textarea
                  id="requests"
                  name="requests"
                  value={formData.requests}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('requests')}
                  onBlur={() => setFocusedField('')}
                  rows="4"
                  className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 transform resize-none ${
                    focusedField === 'requests'
                      ? 'border-orange-500 ring-2 ring-orange-200 bg-white scale-105 shadow-lg'
                      : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-orange-300'
                  }`}
                  placeholder="Dietary restrictions, seating preferences, celebration details..."
                ></textarea>
              </div>

              {/* Enhanced Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                {isSubmitting ? (
                  <div className="flex items-center justify-center relative z-10">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    <span className="animate-pulse">Processing your reservation...</span>
                  </div>
                ) : (
                  <span className="relative z-10 flex items-center justify-center">
                    <ChefHat className="w-5 h-5 mr-2 animate-bounce" />
                    Reserve Your Table
                    <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
                  </span>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4 animate-fade-in">
                We'll confirm your reservation within 2 hours ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ReservationPage;