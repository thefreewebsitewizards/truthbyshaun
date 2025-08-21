import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiCheck, FiHome, FiShoppingCart, FiClock, FiMail, FiPhone, FiHelpCircle } from 'react-icons/fi';

interface OrderDetails {
  sessionId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceName: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  createdAt: string;
}

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails(sessionId);
    } else {
      setError('No order information found.');
      setLoading(false);
    }
  }, [sessionId]);

  const fetchOrderDetails = async (sessionId: string) => {
    try {
      const response = await fetch(
        `https://us-central1-truthbyshaun-project.cloudfunctions.net/getCheckoutSession?session_id=${sessionId}`
      );
      const data = await response.json();

      if (data.success && data.order) {
        // Create order in Firestore
        try {
          const orderData = {
            customerName: data.order.customerName || 'Customer',
            customerEmail: data.order.customerEmail,
            customerPhone: data.order.customerPhone || '',
            serviceName: data.order.serviceName,
            amount: data.order.amount, // Amount in pence from Stripe
            paymentStatus: 'paid',
            sessionId: sessionId,
            notes: ''
          };

          const createResponse = await fetch(
            'https://us-central1-truthbyshaun-project.cloudfunctions.net/createOrderFromStripe',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(orderData)
            }
          );

          if (createResponse.ok) {
            console.log('Order created successfully in Firestore');
          } else {
            console.error('Failed to create order in Firestore');
          }
        } catch (error) {
          console.error('Error creating order in Firestore:', error);
        }

        // Convert amount from pence to pounds for display
        data.order.amount = data.order.amount / 100;
        setOrderDetails(data.order);
      } else {
        setError('Unable to retrieve order details.');
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError('Unable to retrieve order details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            {(FiHelpCircle as any)({ className: "text-red-500 text-3xl mx-auto mb-2" })}
            <p className="text-red-700">{error}</p>
            <p className="text-red-600 text-sm mt-2">Please contact support if you need assistance.</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {(FiHome as any)({ className: "mr-2" })}
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">TRUTH BY SHAUN</h1>
            <Link to="/" className="text-white hover:text-gray-200 transition-colors">
              {(FiHome as any)({ className: "inline mr-2" })}Home
            </Link>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 animate-bounce">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              {(FiCheck as any)({ className: "text-white text-4xl" })}
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
          </div>

          {/* Order Details Card */}
          {orderDetails && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Service</h3>
                  <p className="text-gray-600">{orderDetails.serviceName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Amount</h3>
                  <p className="text-gray-600">£{orderDetails.amount.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Customer</h3>
                  <p className="text-gray-600">{orderDetails.customerName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                  <p className="text-gray-600">{orderDetails.customerEmail}</p>
                </div>
              </div>
              <div className="mt-6 bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-center">
                  {(FiCheck as any)({ className: "text-green-500 mr-2" })}
                  <span className="font-semibold text-green-800">Payment Confirmed</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {(FiClock as any)({ className: "inline text-blue-500 mr-2" })}
              What's Next?
            </h2>
            <div className="text-left space-y-4 text-gray-700">
              <div className="flex items-start">
                {(FiMail as any)({ className: "text-blue-500 mr-3 mt-1 flex-shrink-0" })}
                <p>You'll receive a confirmation email shortly with your order details.</p>
              </div>
              <div className="flex items-start">
                {(FiPhone as any)({ className: "text-blue-500 mr-3 mt-1 flex-shrink-0" })}
                <p>Shaun will contact you within 24 hours to schedule your session or provide access to your plan.</p>
              </div>
              <div className="flex items-start">
                {(FiHelpCircle as any)({ className: "text-blue-500 mr-3 mt-1 flex-shrink-0" })}
                <p>
                  If you have any questions, please email{' '}
                  <a href="mailto:truthbyshaun10@gmail.com" className="text-blue-600 hover:underline">
                    truthbyshaun10@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all"
            >
              {(FiHome as any)({ className: "mr-2" })}
              Back to Home
            </Link>
            <Link
              to="/#services"
              className="inline-flex items-center px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              {(FiShoppingCart as any)({ className: "mr-2" })}
              Browse More Services
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Truth by Shaun. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Success;