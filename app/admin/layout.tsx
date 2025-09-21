'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { Menu, X, Bell, Search, Users, Calendar, ImageIcon, Settings, BarChart3, LogOut } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { logout } from '@/redux/features/authSlice';
import { useLogoutMutation } from '@/redux/features/adminApiSlice';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.log('Logout API error:', error);
    } finally {
      // Clear Redux state and redirect regardless of API response
      dispatch(logout());
      router.push('/login');
    }
  };

  const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3, href: '/admin' },
    { id: 'students', label: 'Students', icon: Users, href: '/admin/students' },
    { id: 'events', label: 'Events', icon: Calendar, href: '/admin/events' },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, href: '/admin/gallery' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' }
  ];

  const getPageTitle = (path: string) => {
    if (path === '/admin') return 'Dashboard Overview';
    const segment = path.split('/admin/')[1];
    if (!segment) return 'Dashboard Overview';
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const getPageDescription = (path: string) => {
    if (path === '/admin') return 'Welcome to your admin dashboard';
    const segment = path.split('/admin/')[1];
    if (!segment) return 'Welcome to your admin dashboard';
    return `Manage your ${segment} efficiently`;
  };

  return (
    <ProtectedRoute>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
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
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center ${
                  !sidebarHovered ? 'lg:justify-center lg:px-3' : 'px-4'
                } py-3 text-left rounded-lg transition-all duration-200 ${
                  isActive
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
              </Link>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
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
                    {getPageTitle(pathname)}
                  </h2>
                  <p className="text-sm lg:text-base text-gray-600">
                    {getPageDescription(pathname)}
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
                <button 
                  onClick={handleLogout}
                  className="p-1.5 lg:p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;