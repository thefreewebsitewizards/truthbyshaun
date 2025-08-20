import React from 'react';
import About from './About';
import Motivational from './Motivational';
import Services from './Services';

interface HomeProps {
  onOpenBooking: (serviceId: string) => void;
}

const Home: React.FC<HomeProps> = ({ onOpenBooking }) => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="hero-video flex flex-col text-white relative min-h-screen overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="metadata"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="Images/shunvid.mov" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
        
        {/* Video Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
        
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 relative z-20 mt-20">
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

      {/* About Section */}
      <About />

      {/* Motivational Section */}
      <Motivational />

      {/* Services Section */}
      <Services onOpenBooking={onOpenBooking} />

    </div>
  );
};

export default Home;