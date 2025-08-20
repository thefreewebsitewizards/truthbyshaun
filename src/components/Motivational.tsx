import React from 'react';

const Motivational: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F6F1F1 0%, #E8F4F8 50%, #F6F1F1 100%)' }}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-blue-500 opacity-10 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-blue-500 opacity-15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-blue-500 opacity-8 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-400 opacity-12 rounded-full animate-pulse" style={{ animationDelay: '3s', animationDuration: '6s' }}></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          
          {/* Main content */}
          <div className="mt-8">
            <p className="text-lg md:text-xl font-light italic mb-8 leading-relaxed">
              "It's time to stop trying to find the answers alone.
            </p>
            
            <p className="text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              Let's sit down together and I will build you a 1-2-1 tailored plan that is easily manageable, time effective and yes, I'll maintain it with you every step of the way until you're living a life you can only dream of right now.
            </p>
            
            <p className="text-lg md:text-xl font-light italic mb-8">
              Whether it's for your body or your mind.
            </p>
            
            <p className="text-lg md:text-xl font-light italic mb-12">
              I'm with you all the way.
            </p>
            
            <div className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full inline-block font-bold text-lg md:text-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
              ACCEPT NO LIMITS... LET'S GO!!!
            </div>
          </div>
          
          {/* Background decorative dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
            <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
            <div className="w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Motivational;