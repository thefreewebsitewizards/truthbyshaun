import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import SuccessModal from './components/SuccessModal';
import Success from './components/Success';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/index.css';

// Main landing page component
function LandingPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Check for success modal on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isSuccess = urlParams.get('success');
    const sessionIdParam = urlParams.get('session_id');
    
    if (isSuccess === 'true' && sessionIdParam) {
      setSessionId(sessionIdParam);
      setIsSuccessModalOpen(true);
      // Clean URL without refreshing
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const openBookingModal = (serviceId: string) => {
    setCurrentServiceId(serviceId);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setCurrentServiceId(null);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSessionId(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <Home onOpenBooking={openBookingModal} />
      <Footer />
      
      {/* Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        serviceId={currentServiceId || ''}
      />
      
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        data={sessionId ? {
          orderDetails: {
            serviceName: 'Service',
            amount: 0,
            customerEmail: 'customer@example.com'
          }
        } : null}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;