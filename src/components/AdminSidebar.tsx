import React from 'react';
import { FiHome, FiSettings, FiUsers, FiLogOut, FiX } from 'react-icons/fi';

type ActiveTab = 'overview' | 'services' | 'orders';

interface MenuItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  onLogout
}) => {
  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'services', label: 'Services', icon: FiSettings },
    { id: 'orders', label: 'Orders', icon: FiUsers },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
            onClick={() => setSidebarOpen(false)}
            onTouchStart={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 sm:w-80 lg:w-80 bg-gradient-to-b from-white to-gray-50 shadow-2xl border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col h-screen`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-[#19A7CE] to-[#146B8C] shadow-lg">
          <h1 className="text-xl font-bold text-white tracking-wide">Truth by Shaun</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex-1 mt-12 flex flex-col">
          <div className="px-6 space-y-3 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-6 py-4 sm:py-5 text-left rounded-xl transition-all duration-200 transform hover:scale-105 touch-manipulation active:scale-95 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-[#19A7CE] to-[#146B8C] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:shadow-md active:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 mr-3 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="p-6 mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-6 py-4 sm:py-5 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-md touch-manipulation active:scale-95 active:bg-red-50"
          >
            <FiLogOut className="h-5 w-5 sm:h-6 sm:w-6 mr-3 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">Logout</span>
          </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;