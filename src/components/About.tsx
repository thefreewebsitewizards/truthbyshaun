import React from 'react';

const About: React.FC = () => {
  return (
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

            {/* Stats or Achievements */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-blue mb-2">10+</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-blue mb-2">500+</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-blue mb-2">100%</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Commitment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;