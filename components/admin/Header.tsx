import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { TabType } from '@/types/admin';

interface HeaderProps {
  activeTab: TabType;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setSidebarOpen }) => {
  const getTitle = (tab: TabType) => {
    return tab === 'overview' ? 'Dashboard Overview' : tab.charAt(0).toUpperCase() + tab.slice(1);
  };

  const getDescription = (tab: TabType) => {
    return tab === 'overview' 
      ? 'Welcome to your admin dashboard' 
      : `Manage your ${tab} efficiently`;
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                {getTitle(activeTab)}
              </h2>
              <p className="text-sm lg:text-base text-gray-600">
                {getDescription(activeTab)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="relative hidden sm:block">
              <Search className="h-4 w-4 lg:h-5 lg:w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 lg:pl-10 pr-4 py-1.5 lg:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent"
              />
            </div>
            <button className="relative p-1.5 lg:p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;