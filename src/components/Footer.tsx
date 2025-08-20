import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="brand-font text-2xl font-bold mb-4 text-[#19A7CE]">TRUTH BY SHAUN</h3>
            <p className="text-gray-300 leading-relaxed">
              Transform your life with personalized coaching, expert guidance, and unwavering support on your journey to becoming the best version of yourself.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <div className="space-y-2">
              <a href="#home" className="block text-gray-300 hover:text-[#19A7CE] transition-colors duration-300">Home</a>
              <a href="#about" className="block text-gray-300 hover:text-[#19A7CE] transition-colors duration-300">About</a>
              <a href="#services" className="block text-gray-300 hover:text-[#19A7CE] transition-colors duration-300">Services</a>
              <a href="#contact" className="block text-gray-300 hover:text-[#19A7CE] transition-colors duration-300">Contact</a>
            </div>
          </div>
          
          {/* Social & Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-white">Connect With Me</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a href="https://www.facebook.com/profile.php?id=61577604267763" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                <i className="fab fa-facebook-f text-white text-sm"></i>
              </a>
              <a href="https://www.instagram.com/truthbyshaun" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25">
                <i className="fab fa-instagram text-white text-sm"></i>
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Ready to start your transformation journey?
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Truth by Shaun. All rights reserved. | Empowering lives through personalized coaching.
            </p>
            <a 
              href="/admin/login" 
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-300 opacity-60 hover:opacity-100"
            >
              Admin Access
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;