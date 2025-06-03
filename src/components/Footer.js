import React from 'react';

function Footer() {
  return (
    <footer className="relative bg-gray-400 text-gray-900 p-2 md:p-3 text-center text-sm sticky bottom-0 z-50 backdrop-filter backdrop-blur-sm bg-opacity-0">
      <div className="container mx-auto bottom-4 text-orange-600">
        <p>Copyright &copy; {new Date().getFullYear()} malibuseafood.com. All rights reserved.</p>
      </div>

      <div className="absolute bottom-4 left-4 flex space-x-3 md:space-x-4  text-orange-600">
        <p>Made with ❤️ by lemonlabs.com</p>
      </div>
    </footer>
  );
}

export default Footer;