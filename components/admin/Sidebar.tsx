import React from 'react';
import { X } from 'lucide-react';
import { SidebarItem, TabType } from '@/types/admin';

interface SidebarProps {
  sidebarItems: SidebarItem[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarHovered: boolean;
  setSidebarHovered: (hovered: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarItems,
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  sidebarHovered,
  setSidebarHovered,
}) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setSidebarOpen(false);
            }
          }}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <nav 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          sidebarHovered ? 'lg:w-64' : 'lg:w-16'
        } fixed lg:relative lg:translate-x-0 w-64 bg-white shadow-lg flex flex-col z-30 transition-all duration-300 ease-in-out lg:z-auto`}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        aria-label="Admin navigation sidebar"
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Logo/Brand */}
        <div className={`p-6 border-b transition-all duration-300 ${!sidebarHovered ? 'lg:p-4' : ''}`}>
          <div className={`flex items-center ${!sidebarHovered ? 'lg:justify-center' : 'gap-3'}`}>
            <div className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] p-2 rounded-xl shadow-md flex-shrink-0">
              <span className={`${!sidebarHovered ? 'lg:text-lg' : 'text-xl'}`}>🐰</span>
            </div>
            <div className={`transition-all duration-300 overflow-hidden ${!sidebarHovered ? 'lg:w-0 lg:opacity-0' : 'w-auto opacity-100'}`}>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] bg-clip-text text-transparent whitespace-nowrap">
                Bunny Babies
              </h1>
              <p className="text-xs text-gray-500 whitespace-nowrap">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 px-4 py-6 space-y-2 ${!sidebarHovered ? 'lg:px-2' : ''}`}>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as TabType);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center ${
                  !sidebarHovered ? 'lg:justify-center lg:px-3' : 'px-4'
                } py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#7CBD1E] to-[#7CBD1E]/80 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#7CBD1E]'
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className={`ml-3 transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  !sidebarHovered ? 'lg:w-0 lg:opacity-0' : 'w-auto opacity-100'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className={`p-4 border-t ${!sidebarHovered ? 'lg:p-2' : ''}`}>
          <div className={`flex items-center ${!sidebarHovered ? 'lg:justify-center' : 'space-x-3'}`}>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-300 overflow-hidden ${
              !sidebarHovered ? 'lg:w-0 lg:opacity-0' : 'w-auto opacity-100'
            }`}>
              <p className="text-sm font-medium text-gray-900 truncate whitespace-nowrap">Admin</p>
              <p className="text-xs text-gray-500 truncate whitespace-nowrap">admin@bunnybabies.com</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;