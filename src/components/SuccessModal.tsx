import React, { useEffect } from 'react';
import { SuccessModalData } from '../types';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SuccessModalData | null;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, data }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={handleBackdropClick}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideInUp">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
            aria-label="Close modal"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
            <i className="fas fa-check text-3xl text-white"></i>
          </div>
          
          <h2 className="text-2xl font-bold mb-2 coterie-font">Payment Successful!</h2>
          <p className="text-green-100">Your booking has been confirmed</p>
        </div>
        
        {/* Success Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank you for your booking!</h3>
            <p className="text-gray-600">You will receive a confirmation email shortly with all the details.</p>
          </div>
          
          {/* Order Details */}
          {data.orderDetails && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <i className="fas fa-receipt mr-2 text-[#19A7CE]"></i>
                Order Details
              </h4>
              
              <div className="space-y-2 text-sm">
                {data.orderDetails.customerName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{data.orderDetails.customerName}</span>
                  </div>
                )}
                
                {data.orderDetails.customerEmail && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{data.orderDetails.customerEmail}</span>
                  </div>
                )}
                
                {data.orderDetails.serviceName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{data.orderDetails.serviceName}</span>
                  </div>
                )}
                
                {data.orderDetails.amount && (
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="text-gray-600 font-medium">Total:</span>
                    <span className="font-bold text-[#19A7CE]">£{data.orderDetails.amount}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fas fa-info-circle mr-2 text-[#19A7CE]"></i>
              What's Next?
            </h4>
            
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5 text-xs"></i>
                You'll receive a confirmation email within 5 minutes
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5 text-xs"></i>
                Shaun will contact you within 24 hours to schedule your session
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mr-2 mt-0.5 text-xs"></i>
                Check your email for session preparation tips
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="text-center text-sm text-gray-600 mb-6">
            <p>Questions? Contact Shaun directly:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="mailto:truthbyshaun@gmail.com" className="text-[#19A7CE] hover:text-[#146C94] transition-colors">
                <i className="fas fa-envelope mr-1"></i>
                Email
              </a>
              <a href="https://wa.me/447123456789" target="_blank" rel="noopener noreferrer" className="text-[#19A7CE] hover:text-[#146C94] transition-colors">
                <i className="fab fa-whatsapp mr-1"></i>
                WhatsApp
              </a>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#19A7CE] to-[#146C94] hover:from-[#146C94] hover:to-[#19A7CE] text-white rounded-lg transition-all duration-200 font-medium"
          >
            <i className="fas fa-check mr-2"></i>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;