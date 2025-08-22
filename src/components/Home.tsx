import React, { useState, useEffect } from 'react';
import { getAllServices } from '../services/serviceService';
import { Service } from '../types';

interface HomeProps {
  onOpenBooking: (serviceId: string) => void;
}

const Home: React.FC<HomeProps> = ({ onOpenBooking }) => {
  // Hero component state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Services component state
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hero component functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Services component functions
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const fetchedServices = await getAllServices();
        setServices(fetchedServices);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (name: string) => {
    if (name.toLowerCase().includes('phone')) return 'fas fa-phone';
    if (name.toLowerCase().includes('facetime')) return 'fas fa-video';
    if (name.toLowerCase().includes('plan')) return 'fas fa-calendar-alt';
    return 'fas fa-star';
  };

  const getServiceId = (service: Service) => {
    if (service.name.toLowerCase().includes('phone')) return 'phone-call';
    if (service.name.toLowerCase().includes('facetime')) return 'facetime';
    if (service.name.toLowerCase().includes('4 week')) return 'my-turn-plan-4';
    if (service.name.toLowerCase().includes('8 week')) return 'my-turn-plan-8';
    return service.id || 'service';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src="/shunvid.mov" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
          {/* Animated overlay effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#19A7CE]/30 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
            <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-white/10 rounded-full animate-ping" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-30 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center space-x-12">
              <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="text-white hover:text-[#19A7CE] transition-all duration-300 font-semibold text-lg tracking-wide hover:scale-105 transform">
                HOME
              </a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="text-white hover:text-[#19A7CE] transition-all duration-300 font-semibold text-lg tracking-wide hover:scale-105 transform">
                ABOUT
              </a>
              <div className="text-3xl font-bold text-white brand-font mx-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19A7CE] via-white to-[#19A7CE] drop-shadow-lg">TRUTH BY SHAUN</span>
              </div>
              <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="text-white hover:text-[#19A7CE] transition-all duration-300 font-semibold text-lg tracking-wide hover:scale-105 transform">
                SERVICES
              </a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="text-white hover:text-[#19A7CE] transition-all duration-300 font-semibold text-lg tracking-wide hover:scale-105 transform">
                CONTACT
              </a>
            </div>
            
            {/* Mobile Navigation */}
            <div className="lg:hidden flex justify-between items-center">
              <div className="text-xl font-bold text-white brand-font">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19A7CE] to-white">TRUTH BY SHAUN</span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-white p-3 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 transform"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
          <div className={`absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-[#0F4C75] via-[#146C94] to-[#19A7CE] transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="text-lg font-bold text-white brand-font">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#19A7CE]">TRUTH BY SHAUN</span>
                </div>
                <button onClick={toggleMobileMenu} className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              
              <nav className="flex-1">
                <div className="space-y-4">
                  <a href="#hero" onClick={(e) => handleSmoothScroll(e, '#hero')} className="block w-full px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg text-center font-semibold text-lg tracking-wide">
                    HOME
                  </a>
                  
                  <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="block w-full px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg text-center font-semibold text-lg tracking-wide">
                    ABOUT
                  </a>
                  
                  <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="block w-full px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg text-center font-semibold text-lg tracking-wide">
                    SERVICES
                  </a>
                  
                  <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className="block w-full px-4 py-3 text-white hover:bg-gradient-to-r hover:from-[#19A7CE]/20 hover:to-[#146C94]/20 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg text-center font-semibold text-lg tracking-wide">
                    CONTACT
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
                GET STARTED
              </a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className="border-2 border-white/30 hover:border-[#19A7CE] text-white hover:text-[#19A7CE] font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 inline-block backdrop-blur-sm hover:backdrop-blur-md hover:scale-105 transform">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F6F1F1 0%, #E8F4F8 50%, #F6F1F1 100%)' }}>
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-brand-blue opacity-10 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute top-40 right-1/3 w-2 h-2 bg-brand-blue opacity-15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-brand-blue opacity-8 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Photo */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/imagess.jpg" 
                  alt="Shaun Jones - Fitness Coach and Motivational Speaker" 
                  className="w-full h-[500px] object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Decorative elements around photo */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-blue/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-dark-blue/10 rounded-full blur-lg"></div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-dark-blue to-brand-blue mb-4 brand-font">
                  Meet Shaun Jones
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-dark-blue rounded-full mb-8"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-brand-blue rounded-full mt-2"></div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    With over a decade of experience in fitness training and motivational coaching, 
                    Shaun has dedicated his life to helping others break through their limits and 
                    achieve their full potential.
                  </p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-brand-blue rounded-full mt-2"></div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    His unique approach combines physical training with mental resilience 
                    techniques, creating a holistic path to success that transforms not just bodies, 
                    but lives.
                  </p>
                </div>
              </div>

              {/* Quote Section */}
              <div className="bg-gradient-to-r from-brand-blue to-brand-dark-blue p-8 rounded-2xl shadow-lg transform hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <svg className="w-8 h-8 text-white/80 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                  <blockquote className="text-xl lg:text-2xl font-medium text-white mb-4 italic">
                    "Your only limit is the one you set for yourself"
                  </blockquote>
                  <cite className="text-white/90 font-medium">- Shaun Jones</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #19A7CE 0%, #146C94 50%, #0F4C75 100%)' }}>
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-white opacity-10 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute top-40 right-1/3 w-2 h-2 bg-white opacity-15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-white opacity-8 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-white opacity-25 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute top-60 left-1/6 w-1 h-1 bg-white opacity-30 rounded-full animate-ping" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
          <div className="absolute bottom-40 right-1/6 w-3 h-3 bg-white opacity-15 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#19A7CE] to-[#146C94] rounded-3xl p-12 shadow-2xl backdrop-blur-sm border border-white/10">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5 2C13.81 2 15.04 2.53 15.95 3.46L20.54 8.05C21.47 8.96 22 10.19 22 11.5V20.5C22 21.33 21.33 22 20.5 22H3.5C2.67 22 2 21.33 2 20.5V11.5C2 10.19 2.53 8.96 3.46 8.05L8.05 3.46C8.96 2.53 10.19 2 11.5 2H12.5M12 7L17 12H14V16H10V12H7L12 7Z"/>
                </svg>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 brand-font">
                It's time to stop trying to find the answers alone.
              </h2>
              
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                Let's sit down together and I will build you a 1-2-1 tailored plan that is easily manageable, time effective and yes, I'll maintain it with you every step of the way until you're living a life you can only dream of right now.
              </p>
              
              <p className="text-xl text-white/90 mb-6">
                Whether it's for your body or your mind.
              </p>
              
              <p className="text-xl text-white/90 mb-8">
                I'm with you all the way.
              </p>
              
              <div className="text-2xl font-bold text-yellow-300 mb-8">
                ACCEPT NO LIMITS... LET'S GO!!*
              </div>
              
              <a href="#services" onClick={(e) => handleSmoothScroll(e, '#services')} className="bg-white text-[#146C94] hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 inline-block shadow-lg hover:shadow-xl transform hover:scale-105">
                <i className="fas fa-arrow-right mr-2"></i>START YOUR JOURNEY
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F6F1F1 30%, #19A7CE 100%, #F6F1F1 100%)' }}>
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-white opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute top-40 right-1/3 w-2 h-2 bg-white opacity-15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-white opacity-10 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-white opacity-25 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute top-60 left-1/6 w-1 h-1 bg-white opacity-30 rounded-full animate-ping" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
          <div className="absolute bottom-40 right-1/6 w-3 h-3 bg-white opacity-15 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#146C94] to-[black] mb-2 animate-fadeInUp brand-font" style={{ animationDelay: '0.2s' }}>1-2-1 Coaching with Shaun</h2>
          <p className="md:text-lg text-sm text-center mb-12 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            Whether you're looking to level up physically, mentally, or just need help with setting and reaching your goals — Shaun offers personalised 1-on-1 sessions designed to create real progress.
          </p>
          
          {loading ? (
            <div className="text-center">
              <div className="text-gray-800 text-xl">Loading services...</div>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="text-gray-800 text-xl">{error}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const serviceId = getServiceId(service);
                const iconClass = getServiceIcon(service.name);
                const animationDelay = `${0.6 + (index * 0.2)}s`;
                
                return (
                  <div key={service.id} className="service-card bg-gradient-to-br from-white to-[#F6F1F1] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white border-opacity-50 relative overflow-hidden group animate-fadeInUp flex flex-col" style={{ animationDelay }}>
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#19A7CE] to-[#146C94] opacity-5 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#146C94] to-[#19A7CE] opacity-5 rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>
                    
                    <div className="text-center relative z-10 flex-grow flex flex-col">
                      {/* Icon Container */}
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#19A7CE] to-[#146C94] rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <i className={`${iconClass} text-2xl text-white`}></i>
                      </div>
                      
                      <h3 className="coterie-font text-xl font-bold mb-2 text-gray-800">{service.name}</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#19A7CE] to-[#146C94] mx-auto mb-6 rounded-full"></div>
                      
                      {/* Pricing Section */}
                      <div className="bg-white bg-opacity-70 rounded-xl p-4 mb-6 backdrop-blur-sm">
                        {service.pricing && service.pricing.length > 1 ? (
                          <div className="space-y-3">
                            {service.pricing.map((price, priceIndex) => (
                              <div key={priceIndex} className={`flex items-center justify-between p-3 bg-gradient-to-r ${priceIndex % 2 === 0 ? 'from-[#19A7CE] to-[#146C94]' : 'from-[#146C94] to-[#19A7CE]'} rounded-lg text-white`}>
                                <span className="font-semibold">{price.duration}</span>
                                <span className="text-lg font-bold">£{price.price}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 bg-gradient-to-r from-[#19A7CE] to-[#146C94] rounded-lg text-white text-center">
                            <span className="text-2xl font-bold">£{service.pricing?.[0]?.price || service.price}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Description */}
                      <div className="flex-grow">
                        <p className="text-gray-600 mb-6 leading-relaxed text-sm">{service.description}</p>
                      </div>
                      
                      {/* Button at bottom */}
                      <div className="mt-auto">
                        {service.pricing && service.pricing.length > 1 ? (
                          <div className="space-y-2">
                            {service.pricing.map((price, priceIndex) => {
                              const duration = price.duration.toLowerCase().includes('30') ? '30' : '60';
                              const buttonServiceId = `${serviceId}-${duration}`;
                              return (
                                <button 
                                  key={priceIndex}
                                  onClick={() => onOpenBooking(buttonServiceId)} 
                                  className={`bg-gradient-to-r ${priceIndex % 2 === 0 ? 'from-[#19A7CE] to-[#146C94] hover:from-[#146C94] hover:to-[#19A7CE]' : 'from-[#146C94] to-[#19A7CE] hover:from-[#19A7CE] hover:to-[#146C94]'} text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-sm w-full`}
                                >
                                  <i className={`${iconClass} mr-2`}></i>BOOK {price.duration.toUpperCase()}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <button onClick={() => onOpenBooking(serviceId)} className="bg-gradient-to-r from-[#19A7CE] to-[#146C94] hover:from-[#146C94] hover:to-[#19A7CE] text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-sm w-full">
                            <i className={`${iconClass} mr-2`}></i>BUY NOW
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #19A7CE 0%, #146C94 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 brand-font">
              What People <span className="underline decoration-white/50 decoration-4 underline-offset-8">Say</span>
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Real stories from real people who've transformed their lives with Shaun's guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 - Simon */}
            <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#19A7CE] to-[#146C94] rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white text-lg"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Simon</h3>
                  <p className="text-gray-600 text-sm flex items-center">
                    <i className="fas fa-map-marker-alt mr-1 text-[#19A7CE]"></i>
                    Northampton
                  </p>
                </div>
              </div>
              
              <div className="relative mb-6">
                <div className="text-6xl text-[#19A7CE]/20 absolute -top-4 -left-2">"
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed pl-8">
                  "Shaun your motivation really has changed my life. Forever grateful."
                </p>
                <div className="text-6xl text-[#19A7CE]/20 absolute -bottom-8 -right-2 rotate-180">"
                </div>
              </div>
              
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 - Heather */}
            <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#19A7CE] to-[#146C94] rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-white text-lg"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Heather</h3>
                  <p className="text-gray-600 text-sm flex items-center">
                    <i className="fas fa-map-marker-alt mr-1 text-[#19A7CE]"></i>
                    Hackney, London
                  </p>
                </div>
              </div>
              
              <div className="relative mb-6">
                <div className="text-6xl text-[#19A7CE]/20 absolute -top-4 -left-2">"
                </div>
                <p className="text-gray-700 italic text-lg leading-relaxed pl-8">
                  "You really see things differently and I'm now believing I can be something more." <span className="text-red-500">❤️</span>
                </p>
                <div className="text-6xl text-[#19A7CE]/20 absolute -bottom-8 -right-2 rotate-180">"
                </div>
              </div>
              
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400 text-lg"></i>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <section id="contact" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8F4F8 0%, #F0F8FF 50%, #E8F4F8 100%)' }}>
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-[#19A7CE] opacity-10 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute top-40 right-1/3 w-3 h-3 bg-[#19A7CE] opacity-15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-[#19A7CE] opacity-8 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute top-60 right-1/4 w-2 h-2 bg-[#19A7CE] opacity-20 rounded-full animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-40 left-1/6 w-3 h-3 bg-[#19A7CE] opacity-12 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#19A7CE] mb-6 brand-font">
              Stay Connected
            </h2>
            
            {/* Decorative Line */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-1 bg-[#19A7CE] rounded-full"></div>
            </div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Follow Shaun's journey and get daily motivation, fitness tips, and life insights
            </p>
            
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-8">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/profile.php?id=61577604267763" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                <i className="fab fa-facebook-f text-2xl md:text-3xl text-[#1877F2] group-hover:scale-110 transition-transform duration-300"></i>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/truthbyshaun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                <i className="fab fa-instagram text-2xl md:text-3xl text-[#E4405F] group-hover:scale-110 transition-transform duration-300"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;