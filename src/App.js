import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ReservationsForm from './components/Reservations';
import Events from './components/Events';
import Contact from './components/Contact';
import Menu from './components/Menu';
import FloatingSocialIcons from './components/FloatingSocialIcons';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-50 to-gray-400 font-sans flex flex-col">
      <Header className="fixed top-0 z-50 w-full"/>
      <main className="flex-grow -mt-20 -mb-14">
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/menu" 
            element={<Menu />} 
          />
          <Route 
            path="/reservations" 
            element={<ReservationsForm />} 
          />
          <Route 
            path="/events" 
            element={<Events />} 
          />
          <Route 
            path="/contact" 
            element={<Contact />} 
          />
        </Routes>
      </main>
      <FloatingSocialIcons />
      <Footer className="sticky bottom-0 z-50"/>
    </div>
  );
}

export default App;