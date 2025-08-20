import React, { useState, useEffect } from 'react';
import { getAllServices } from '../services/serviceService';
import { Service } from '../types';

interface ServicesProps {
  onOpenBooking: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenBooking }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <section id="services" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F6F1F1 30%, #19A7CE 100%, #F6F1F1 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-800 text-xl">Loading services...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F6F1F1 30%, #19A7CE 100%, #F6F1F1 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-800 text-xl">{error}</div>
        </div>
      </section>
    );
  }

  return (
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
      </div>
    </section>
  );
};

export default Services;