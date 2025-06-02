import React, { useState } from 'react';
import { PiFacebookLogoDuotone, PiTwitterLogoDuotone, PiInstagramLogoDuotone } from 'react-icons/pi'; // Import icons

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submission:', formData);
    alert('Message sent successfully!');
    e.target.reset();
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6 bg-gradient-to-bl from-gray-50 to-gray-200 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">Contact Us</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full max-w-4xl">
        {/* Contact Information */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
          <p className="text-lg md:text-xl text-gray-700 mb-4">Have questions or want to make a reservation?</p>
          <p className="text-md md:text-lg text-gray-600 mb-2">Call us at: <span className="font-semibold">(123) 456-7890</span></p>
          <p className="text-md md:text-lg text-gray-600 mb-6">Email us at: <span className="font-semibold">info@malibuseafood.com</span></p>
          <p className="text-md md:text-lg text-gray-600 mb-2">Visit us at:</p>
          <p className="text-md md:text-lg text-gray-700 font-semibold">123 Ocean Drive, Malibu, CA 90265</p>
        </div>

        {/* Map Embedding */}
        <div className="w-full md:w-1/2 h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.42410580s086!2d-118.68942468478436!3d34.038507180609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e81ee3334d01c7:0x9e77a6c822213118!2sMalibu%20Seafood%20Fresh%20Fish%20Market%20and%20Patio%20Cafe!5e0!3m2!1sen!2sus!4v1647475730711!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Location of Malibu Seafood on Google Maps"
          ></iframe>
        </div>
      </div>

      <div className="w-full max-w-md md:max-w-2xl mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">Send Us a Message</h2>
          <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-left text-gray-700 mb-0.5 md:mb-1 text-sm md:text-base" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-1.5 md:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 mb-0.5 md:mb-1 text-sm md:text-base" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-1.5 md:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-left text-gray-700 mb-0.5 md:mb-1 text-sm md:text-base" htmlFor="message">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-1.5 md:p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                rows="4"
                placeholder="Enter your message"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-1.5 md:p-2 rounded-lg hover:bg-orange-600 transition duration-300 text-base md:text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="w-full max-w-md md:max-w-2xl">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">Follow Us</h2>
          <div className="flex justify-center space-x-3 md:space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <PiFacebookLogoDuotone className="text-gray-600 hover:text-gray-800 w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <PiTwitterLogoDuotone className="text-gray-600 hover:text-gray-800 w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <PiInstagramLogoDuotone className="text-gray-600 hover:text-gray-800 w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;