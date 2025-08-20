import React from 'react';

const Hero: React.FC = () => {
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
    <section id="home" className="hero-video flex flex-col text-white relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/shunvid.mov" type="video/quicktime" />
        <source src="/vid1.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
      </video>
      
      {/* Video Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
      
      {/* Hero Navigation */}
      <div className="w-full pt-6 pb-4 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-center backdrop-blur-sm bg-black/20 rounded-full px-8 py-4 border border-white/10">
            <div className="flex items-center space-x-10">
              <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="relative text-white hover:text-[#19A7CE] px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                <span className="relative z-10">HOME</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#19A7CE]/20 to-[#146C94]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="relative text-white hover:text-[#19A7CE] px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                <span className="relative z-10">ABOUT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#19A7CE]/20 to-[#146C94]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <div className="mx-6">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="brand-font text-3xl font-bold text-white hover:text-[#19A7CE] transition-all duration-300 hover:scale-105 drop-shadow-lg">TRUTH BY SHAUN</a>
              </div>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="relative text-white hover:text-[#19A7CE] px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                <span className="relative z-10">SERVICES</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#19A7CE]/20 to-[#146C94]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="#connect" onClick={(e) => handleSmoothScroll(e, '#connect')} className="relative text-white hover:text-[#19A7CE] px-4 py-2 text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                <span className="relative z-10">CONTACT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#19A7CE]/20 to-[#146C94]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
          
          {/* Mobile Navigation for Hero */}
          <div className="md:hidden flex justify-between items-center backdrop-blur-sm bg-black/20 rounded-full px-6 py-3 border border-white/10">
            <div className="w-8"></div>
            <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="brand-font text-2xl font-bold text-white hover:text-[#19A7CE] transition-all duration-300 drop-shadow-lg">TRUTH BY SHAUN</a>
            <button onClick={toggleMobileMenu} className="text-white hover:text-[#19A7CE] focus:outline-none transition-all duration-300 hover:scale-110">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
        
        {/* Hero Mobile menu backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[55] transition-opacity duration-300 ease-in-out"
            onClick={closeMobileMenu}
          ></div>
        )}
        
        {/* Hero Mobile menu */}
        <div className={`md:hidden fixed top-0 right-0 w-64 max-w-[75vw] h-full bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-md z-[60] transform transition-all duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Close button */}
          <button onClick={closeMobileMenu} className="absolute top-6 right-6 text-white hover:text-[#19A7CE] z-[70] p-2 rounded-full hover:bg-white/10 transition-all duration-300">
            <i className="fas fa-times text-2xl"></i>
          </button>
          
          {/* Mobile Menu Content */}
          <div className="flex flex-col h-full pt-14 pb-4">
            {/* Brand Section */}
            <div className="text-center mb-4 px-3">
              <h2 className="brand-font text-lg font-bold text-white mb-1">TRUTH BY SHAUN</h2>
              <div className="w-10 h-0.5 bg-gradient-to-r from-[#19A7CE] to-[#146C94] mx-auto"></div>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex-1 px-3">
              <div className="space-y-2">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="group flex items-center w-full px-2 py-2 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-home text-white text-xs"></i>
                  </div>
                  <span className="text-sm font-medium">HOME</span>
                </a>
                
                <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="group flex items-center w-full px-2 py-2 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-user text-white text-xs"></i>
                  </div>
                  <span className="text-sm font-medium">ABOUT</span>
                </a>
                
                <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="group flex items-center w-full px-2 py-2 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-dumbbell text-white text-xs"></i>
                  </div>
                  <span className="text-sm font-medium">SERVICES</span>
                </a>
                
                <a href="#connect" onClick={(e) => handleSmoothScroll(e, '#connect')} className="group flex items-center w-full px-2 py-2 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                    <i className="fas fa-phone-alt text-white text-xs"></i>
                  </div>
                  <span className="text-sm font-medium">CONTACT</span>
                </a>
                
                {/* Coming Soon Items */}
                <div className="pt-2 border-t border-white/10">
                  <p className="text-gray-400 text-xs font-medium mb-1 px-2">COMING SOON</p>
                  
                  <div className="group flex items-center w-full px-2 py-1 text-gray-400 cursor-not-allowed rounded-lg">
                    <div className="w-6 h-6 bg-gray-600 rounded-md flex items-center justify-center mr-2">
                      <i className="fas fa-tshirt text-gray-300 text-xs"></i>
                    </div>
                    <span className="text-xs font-medium">CLOTHING</span>
                  </div>
                  
                  <div className="group flex items-center w-full px-2 py-1 text-gray-400 cursor-not-allowed rounded-lg">
                    <div className="w-6 h-6 bg-gray-600 rounded-md flex items-center justify-center mr-2">
                      <i className="fas fa-book text-gray-300 text-xs"></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">MY BOOK</span>
                      <span className="text-xs text-gray-500">Truth by Shaun</span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            
            {/* Social Links */}
            <div className="px-3 pt-3 border-t border-white/10">
              <p className="text-gray-400 text-xs font-medium mb-2 text-center">FOLLOW ME</p>
              <div className="flex justify-center space-x-3">
                <a href="https://www.facebook.com/profile.php?id=61577604267763" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  <i className="fab fa-facebook-f text-white text-xs"></i>
                </a>
                <a href="https://www.instagram.com/truthbyshaun" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25">
                  <i className="fab fa-instagram text-white text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animated-text brand-font drop-shadow-2xl">Searching For a Better You?</h1>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-light mb-8 text-white/90 drop-shadow-lg tracking-wide">Shaun is here to guide you.</h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">Transform your life with personalized coaching, expert guidance, and unwavering support on your journey to becoming the best version of yourself.</p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="bg-gradient-to-r from-[#19A7CE] to-[#146C94] hover:from-[#146C94] hover:to-[#0F4C75] text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 inline-block shadow-2xl hover:shadow-[#19A7CE]/25 hover:scale-105 transform">
              <i className="fas fa-rocket mr-2"></i>GET STARTED
            </a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="border-2 border-white/30 hover:border-[#19A7CE] text-white hover:text-[#19A7CE] font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 inline-block backdrop-blur-sm hover:backdrop-blur-md hover:scale-105 transform">
              <i className="fas fa-user mr-2"></i>LEARN MORE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;