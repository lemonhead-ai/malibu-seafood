import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ReservationForm from './components/ReservationForm';
import Reservations from './components/Reservations';
import Events from './components/Events';
import Contact from './components/Contact';
import Menu from './components/Menu';

function App() {
  const [reservations, setReservations] = useState([]);

  const handleReservationSubmit = (formData) => {
    setReservations([...reservations, formData]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-50 to-gray-200 font-sans flex flex-col">
      <Header className="fixed top-0 z-50 w-full"/>
      <main className="flex-grow mt-16">
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
            path="/reservation" 
            element={<ReservationForm onSubmit={handleReservationSubmit} />} 
          />
          <Route 
            path="/reservations" 
            element={<Reservations reservations={reservations} />} 
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
      <Footer className="sticky bottom-0 z-50"/>
    </div>
  );
}

export default App;