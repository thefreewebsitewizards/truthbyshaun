import React from 'react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth'
      });
    }
    closeMobileMenu();
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between py-6">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="relative text-white hover:text-[#19A7CE] px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
              <span className="relative z-10">HOME</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#19A7CE]/20 to-[#146C94]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="relative text-white hover:text-[#19A7CE] px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
              <span className="relative z-10">ABOUT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#19A7CE]/20 to-[#146C94]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            {/* Center Brand Logo */}
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="brand-font text-2xl font-bold text-white hover:text-[#19A7CE] transition-all duration-300 hover:scale-105 px-6 py-3 rounded-lg hover:bg-white/10 backdrop-blur-sm">
              TRUTH BY SHAUN
            </a>
            
            <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="relative text-white hover:text-[#19A7CE] px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
              <span className="relative z-10">SERVICES</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#19A7CE]/20 to-[#146C94]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="relative text-white hover:text-[#19A7CE] px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
              <span className="relative z-10">CONTACT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#19A7CE]/20 to-[#146C94]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between items-center py-3">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="brand-font text-xl font-bold text-white hover:text-[#19A7CE] transition-all duration-300">
              TRUTH BY SHAUN
            </a>
            <button onClick={toggleMobileMenu} className="text-white hover:text-[#19A7CE] focus:outline-none transition-all duration-300 hover:scale-110 p-2">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[55] transition-opacity duration-300 ease-in-out"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-0 right-0 w-64 max-w-[75vw] h-full bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-md z-[60] transform transition-all duration-300 ease-in-out shadow-2xl ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Close button */}
        <button onClick={closeMobileMenu} className="absolute top-6 right-6 text-white hover:text-[#19A7CE] z-[70] p-2 rounded-full hover:bg-white/10 transition-all duration-300">
          <i className="fas fa-times text-xl"></i>
        </button>
        
        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full pt-16 pb-6">
          {/* Brand Section */}
          <div className="text-center mb-6 px-4">
            <h2 className="brand-font text-lg font-bold text-white mb-2">TRUTH BY SHAUN</h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#19A7CE] to-[#146C94] mx-auto"></div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-4">
            <div className="space-y-3">
              <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="group flex items-center w-full px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-home text-white text-sm"></i>
                </div>
                <span className="text-base font-medium">HOME</span>
              </a>
              
              <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="group flex items-center w-full px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
                <span className="text-base font-medium">ABOUT</span>
              </a>
              
              <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="group flex items-center w-full px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-cogs text-white text-sm"></i>
                </div>
                <span className="text-base font-medium">SERVICES</span>
              </a>
              
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="group flex items-center w-full px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-envelope text-white text-sm"></i>
                </div>
                <span className="text-base font-medium">CONTACT</span>
              </a>
            </div>
          </nav>
          
          {/* Coming Soon Items */}
          <div className="pt-4 border-t border-white/10 px-4">
            <p className="text-gray-400 text-xs font-medium mb-3">COMING SOON</p>
            
            <div className="group flex items-center w-full px-4 py-2 text-gray-400 cursor-not-allowed rounded-xl">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-tshirt text-gray-300 text-sm"></i>
              </div>
              <span className="text-sm font-medium">CLOTHING</span>
            </div>
            
            <div className="group flex items-center w-full px-4 py-2 text-gray-400 cursor-not-allowed rounded-xl">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-book text-gray-300 text-sm"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">MY BOOK</span>
                <span className="text-xs text-gray-500">Truth by Shaun</span>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="px-4 pt-4 border-t border-white/10">
            <p className="text-gray-400 text-xs font-medium mb-3 text-center">FOLLOW ME</p>
            <div className="flex justify-center space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61577604267763" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                <i className="fab fa-facebook-f text-white text-sm"></i>
              </a>
              <a href="https://www.instagram.com/truthbyshaun" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25">
                <i className="fab fa-instagram text-white text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;