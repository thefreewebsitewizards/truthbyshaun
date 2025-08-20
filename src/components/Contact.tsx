import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#F6F1F1] to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-[#19A7CE] opacity-10 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-[#146C94] opacity-15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-[#19A7CE] opacity-8 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-[#146C94] opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#146C94] to-[#19A7CE] mb-4 animate-fadeInUp brand-font" style={{ animationDelay: '0.2s' }}>Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#146C94] to-[#19A7CE] mx-auto mb-6 rounded-full animate-fadeInUp" style={{ animationDelay: '0.4s' }}></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            Ready to start your transformation journey? Let's connect and discuss how I can help you achieve your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Email Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#19A7CE] to-[#146C94] opacity-5 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="text-center relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#19A7CE] to-[#146C94] rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-envelope text-xl text-white"></i>
              </div>
              
              <h3 className="coterie-font text-xl font-bold mb-4 text-gray-800">Email</h3>
              <p className="text-gray-600 mb-4">Send me a message anytime</p>
              
              <a href="mailto:truthbyshaun@gmail.com" className="inline-block bg-gradient-to-r from-[#19A7CE] to-[#146C94] hover:from-[#146C94] hover:to-[#19A7CE] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <i className="fas fa-envelope mr-2"></i>Send Email
              </a>
            </div>
          </div>
          
          {/* Instagram Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group animate-fadeInUp" style={{ animationDelay: '1.0s' }}>
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#146C94] to-[#19A7CE] opacity-5 rounded-full transform -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="text-center relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#146C94] to-[#19A7CE] rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fab fa-instagram text-xl text-white"></i>
              </div>
              
              <h3 className="coterie-font text-xl font-bold mb-4 text-gray-800">Instagram</h3>
              <p className="text-gray-600 mb-4">Follow my journey and tips</p>
              
              <a href="https://instagram.com/truthbyshaun" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[#146C94] to-[#19A7CE] hover:from-[#19A7CE] hover:to-[#146C94] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <i className="fab fa-instagram mr-2"></i>Follow Me
              </a>
            </div>
          </div>
          
          {/* WhatsApp Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group animate-fadeInUp md:col-span-2 lg:col-span-1" style={{ animationDelay: '1.2s' }}>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#19A7CE] to-[#146C94] opacity-5 rounded-full transform translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="text-center relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#19A7CE] to-[#146C94] rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fab fa-whatsapp text-xl text-white"></i>
              </div>
              
              <h3 className="coterie-font text-xl font-bold mb-4 text-gray-800">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Quick chat and support</p>
              
              <a href="https://wa.me/447123456789" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-[#19A7CE] to-[#146C94] hover:from-[#146C94] hover:to-[#19A7CE] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <i className="fab fa-whatsapp mr-2"></i>Message Me
              </a>
            </div>
          </div>
        </div>
        
        {/* Enhanced Footer */}
        <footer className="mt-16 pt-16 pb-8 relative overflow-hidden">
          {/* Footer Background with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#19A7CE] via-[#146C94] to-[#19A7CE]"></div>
          <div className="absolute top-6 left-1/4 w-3 h-3 bg-[#19A7CE] opacity-20 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-12 right-1/3 w-2 h-2 bg-[#146C94] opacity-30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 left-1/6 w-1 h-1 bg-[#19A7CE] opacity-40 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand Section */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#19A7CE] to-white mb-4 brand-font">
                  TRUTH BY SHAUN
                </h3>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  Transforming lives through authentic coaching, personalized guidance, and unwavering support on your journey to becoming the best version of yourself.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#19A7CE] to-[#146C94]"></div>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-[#146C94] to-[#19A7CE]"></div>
                  <div className="w-4 h-0.5 bg-[#19A7CE]"></div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
                <nav className="space-y-3">
                  <a href="#home" className="block text-gray-300 hover:text-[#19A7CE] transition-colors duration-300 hover:translate-x-1 transform">
                    <i className="fas fa-home mr-2"></i>Home
                  </a>
                  <a href="#about" className="block text-gray-300 hover:text-[#19A7CE] transition-colors duration-300 hover:translate-x-1 transform">
                    <i className="fas fa-user mr-2"></i>About Shaun
                  </a>
                  <a href="#services" className="block text-gray-300 hover:text-[#19A7CE] transition-colors duration-300 hover:translate-x-1 transform">
                    <i className="fas fa-dumbbell mr-2"></i>Services
                  </a>
                  <a href="#connect" className="block text-gray-300 hover:text-[#19A7CE] transition-colors duration-300 hover:translate-x-1 transform">
                    <i className="fas fa-phone-alt mr-2"></i>Contact
                  </a>
                </nav>
              </div>
              
              {/* Contact Info */}
              <div className="text-center md:text-right">
                <h4 className="text-xl font-semibold text-white mb-6">Get In Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-end text-gray-300">
                    <i className="fas fa-envelope mr-3 text-[#19A7CE]"></i>
                    <a href="mailto:truthbyshaun@gmail.com" className="hover:text-[#19A7CE] transition-colors duration-300">
                      truthbyshaun@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-end text-gray-300">
                    <i className="fab fa-whatsapp mr-3 text-[#19A7CE]"></i>
                    <a href="https://wa.me/447123456789" target="_blank" rel="noopener noreferrer" className="hover:text-[#19A7CE] transition-colors duration-300">
                      WhatsApp Chat
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-end text-gray-300">
                    <i className="fas fa-map-marker-alt mr-3 text-[#19A7CE]"></i>
                    <span>United Kingdom</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links Section */}
            <div className="text-center mb-12">
              <h4 className="text-xl font-semibold text-white mb-6">Follow My Journey</h4>
              <div className="flex justify-center space-x-6">
                <a href="https://instagram.com/truthbyshaun" target="_blank" rel="noopener noreferrer" 
                   className="group relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-pink-500/30">
                    <i className="fab fa-instagram text-white text-2xl"></i>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Instagram
                  </span>
                </a>
                
                <a href="mailto:truthbyshaun@gmail.com" 
                   className="group relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-red-500/30">
                    <i className="fas fa-envelope text-white text-2xl"></i>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Email
                  </span>
                </a>
                
                <a href="https://wa.me/447123456789" target="_blank" rel="noopener noreferrer" 
                   className="group relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-green-500/30">
                    <i className="fab fa-whatsapp text-white text-2xl"></i>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    WhatsApp
                  </span>
                </a>
                
                <a href="https://www.facebook.com/profile.php?id=61577604267763" target="_blank" rel="noopener noreferrer" 
                   className="group relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/30">
                    <i className="fab fa-facebook-f text-white text-2xl"></i>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Facebook
                  </span>
                </a>
              </div>
            </div>
            
            {/* Copyright Section */}
            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm">
                    © 2024 Truth by Shaun. All rights reserved.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Empowering transformation, one truth at a time.
                  </p>
                </div>
                <div className="flex items-center space-x-6 text-gray-400 text-sm">
                  <a href="#privacy" className="hover:text-[#19A7CE] transition-colors duration-300">Privacy Policy</a>
                  <a href="#terms" className="hover:text-[#19A7CE] transition-colors duration-300">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;