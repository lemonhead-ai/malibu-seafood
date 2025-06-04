import React from 'react';

function Footer() {
  return (
    <footer className="relative bg-gray-400 text-gray-900 p-1 text-center text-sm bottom-0 z-50 backdrop-filter backdrop-blur-sm bg-opacity-30 flex flex-col md:flex-row items-center justify-center md:justify-between">
      <div className="mb-2 md:mb-0 md:mr-4 text-sky-950">
        <p>Made with ❤️ by lemonlabs.com</p>
      </div>

      <div className="container mx-auto text-sky-950">
        <p>Copyright &copy; {new Date().getFullYear()} malibuseafood.com. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;