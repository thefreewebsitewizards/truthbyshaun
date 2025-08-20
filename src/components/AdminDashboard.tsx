import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiDollarSign, FiUsers, FiMenu, FiSettings, FiHome, FiLoader } from 'react-icons/fi';
import ServiceManagement from './ServiceManagement';
import OrdersTable from './OrdersTable';
import AdminSidebar from './AdminSidebar';
import { getOrdersStats } from '../services/orderService';
import { getAllServices } from '../services/serviceService';

type ActiveTab = 'overview' | 'services' | 'orders';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalClients: 0,
    activeServices: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [ordersStats, services, orders] = await Promise.all([
          getOrdersStats(),
          getAllServices(),
          import('../services/orderService').then(m => m.getAllOrders())
        ]);
        
        // Calculate unique clients from orders
        const uniqueClients = new Set(
          orders
            .filter(order => order.status === 'completed')
            .map(order => order.email.toLowerCase())
        ).size;
        
        setStats({
          totalRevenue: ordersStats.totalRevenue,
          totalClients: uniqueClients,
          activeServices: services.length,
          thisMonth: ordersStats.thisMonth
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        if (loading) {
          return (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <FiLoader className="h-8 w-8 animate-spin text-[#19A7CE] mx-auto mb-4" />
                <p className="text-gray-600">Loading dashboard statistics...</p>
              </div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="text-red-600 mr-3">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl p-4 sm:p-6 border border-gray-100 hover:border-[#19A7CE]/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-[#19A7CE] to-[#146B8C] rounded-lg shadow-md">
                    <FiDollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#19A7CE] to-[#146B8C] bg-clip-text text-transparent">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl p-4 sm:p-6 border border-gray-100 hover:border-green-400/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
                    <FiUsers className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Clients</p>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">{stats.totalClients}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl p-4 sm:p-6 border border-gray-100 hover:border-yellow-400/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-md">
                    <FiSettings className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Active Services</p>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">{stats.activeServices}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl p-4 sm:p-6 border border-gray-100 hover:border-purple-400/30 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md">
                    <FiHome className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">{stats.thisMonth}</p>
                  </div>
                </div>
              </div>
            </div>



            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">Recent Activity</h2>
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">No recent activity to display</p>
                <p className="text-gray-400 text-xs mt-1">Activity will appear here as orders are processed</p>
              </div>
            </div>
          </div>
        );
      case 'services':
        return <ServiceManagement />;
      case 'orders':
        return <OrdersTable />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-80 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-white to-gray-50 shadow-lg border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 touch-manipulation"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:block text-sm font-medium bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">Welcome back, Admin</span>
              <span className="sm:hidden text-xs font-medium bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">Admin</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#19A7CE] to-[#146B8C] rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                <span className="text-white text-xs sm:text-sm font-bold">A</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-3 sm:p-4 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;