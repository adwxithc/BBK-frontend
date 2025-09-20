"use client";

import React, { useState } from 'react';
import { Users, Calendar, ImageIcon, Settings, BarChart3, Bell, Search, Plus, Edit, Trash2, Eye, Download, Menu, X } from 'lucide-react';
import { Student, Event, StatCard as StatCardType, Activity, SidebarItem, TabType } from '@/types/admin';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarHovered, setSidebarHovered] = useState(false);

    // Sample data - exactly as original
    const stats = {
        totalStudents: 85,
        totalTeachers: 12,
        upcomingEvents: 5,
        galleryPhotos: 156
    };

    const recentActivities: Activity[] = [
        { id: '1', type: 'enrollment', message: "New student enrollment", time: "2 hours ago" },
        { id: '2', type: 'gallery', message: "Photo uploaded to Christmas gallery", time: "4 hours ago" },
        { id: '3', type: 'event', message: "Event scheduled: Art & Creativity Session", time: "1 day ago" },
        { id: '4', type: 'teacher', message: "Teacher added: Ms. Sarah Wilson", time: "2 days ago" }
    ];

    const students: Student[] = [
        { id: '1', name: "Emma Johnson", age: 4, parent: "John Johnson", contact: "(555) 123-4567", status: "active", enrollmentDate: "2024-01-15" },
        { id: '2', name: "Liam Smith", age: 5, parent: "Sarah Smith", contact: "(555) 234-5678", status: "active", enrollmentDate: "2024-02-01" },
        { id: '3', name: "Olivia Brown", age: 3, parent: "Mike Brown", contact: "(555) 345-6789", status: "active", enrollmentDate: "2023-11-20" },
        { id: '4', name: "Noah Davis", age: 4, parent: "Lisa Davis", contact: "(555) 456-7890", status: "inactive", enrollmentDate: "2023-10-05" }
    ];

    const upcomingEvents: Event[] = [
        { id: '1', title: "Christmas Celebration", date: "2024-12-25", time: "10:00 AM", location: "Main Hall", attendees: 50, status: "upcoming" },
        { id: '2', title: "Art & Creativity Workshop", date: "2024-12-20", time: "02:00 PM", location: "Art Studio", attendees: 25, status: "active" },
        { id: '3', title: "Parent-Teacher Conference", date: "2024-12-22", time: "09:00 AM", location: "Classrooms", attendees: 40, status: "upcoming" }
    ];

    const sidebarItems: SidebarItem[] = [
        { id: 'overview', label: 'Dashboard', icon: BarChart3 },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];
            value: '$12,450',
            icon: BarChart3,
            color: '#F1F864',
            change: '+8.2%',
            trend: 'up'
        }
    ];

    const recentActivity: Activity[] = [
        {
            id: '1',
            type: 'enrollment',
            message: 'New student enrolled: Emma Johnson',
            time: '2 hours ago',
            icon: Users
        },
        {
            id: '2',
            type: 'event',
            message: 'Summer Camp 2024 event created',
            time: '4 hours ago',
            icon: Calendar
        },
        {
            id: '3',
            type: 'gallery',
            message: '15 new photos added to gallery',
            time: '6 hours ago',
            icon: Image
        }
    ];

    const students: Student[] = [
        {
            id: '1',
            name: 'Emma Johnson',
            age: 4,
            parent: 'Sarah Johnson',
            contact: '+1 (555) 123-4567',
            status: 'active',
            enrollmentDate: '2024-01-15'
        },
        {
            id: '2',
            name: 'Liam Smith',
            age: 3,
            parent: 'Michael Smith',
            contact: '+1 (555) 234-5678',
            status: 'active',
            enrollmentDate: '2024-02-01'
        },
        {
            id: '3',
            name: 'Olivia Brown',
            age: 5,
            parent: 'Jennifer Brown',
            contact: '+1 (555) 345-6789',
            status: 'inactive',
            enrollmentDate: '2023-11-20'
        }
    ];

    const events: Event[] = [
        {
            id: '1',
            title: 'Summer Camp 2024',
            date: '2024-06-15',
            time: '09:00 AM',
            location: 'Main Campus',
            attendees: 45,
            status: 'upcoming'
        },
        {
            id: '2',
            title: 'Parent-Teacher Meet',
            date: '2024-05-20',
            time: '02:00 PM',
            location: 'Conference Hall',
            attendees: 30,
            status: 'active'
        },
        {
            id: '3',
            title: 'Spring Festival',
            date: '2024-04-10',
            time: '10:00 AM',
            location: 'Outdoor Area',
            attendees: 80,
            status: 'completed'
        }
    ];

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatsCard key={index} stat={stat} />
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {recentActivity.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] rounded-xl flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{activity.message}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{activity.time}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const studentColumns = [
        { key: 'name' as keyof Student, label: 'Student Name' },
        { key: 'age' as keyof Student, label: 'Age' },
        { key: 'parent' as keyof Student, label: 'Parent/Guardian' },
        { key: 'contact' as keyof Student, label: 'Contact' },
        { key: 'status' as keyof Student, label: 'Status' }
    ];

    const renderStudents = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search students..." 
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent"
                        />
                    </div>
                    <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300">
                        <Plus className="w-5 h-5" />
                        Add Student
                    </button>
                </div>
            </div>

            <DataTable
                data={students}
                columns={studentColumns}
                onView={(id) => console.log('View student:', id)}
                onEdit={(id) => console.log('Edit student:', id)}
                onDelete={(id) => console.log('Delete student:', id)}
            />
        </div>
    );

    const eventColumns = [
        { key: 'title' as keyof Event, label: 'Event Title' },
        { key: 'date' as keyof Event, label: 'Date' },
        { key: 'time' as keyof Event, label: 'Time' },
        { key: 'location' as keyof Event, label: 'Location' },
        { key: 'attendees' as keyof Event, label: 'Attendees' },
        { key: 'status' as keyof Event, label: 'Status' }
    ];

    const renderEvents = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Event Management</h2>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search events..." 
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent"
                        />
                    </div>
                    <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300">
                        <Plus className="w-5 h-5" />
                        Create Event
                    </button>
                </div>
            </div>

            <DataTable
                data={events}
                columns={eventColumns}
                onView={(id) => console.log('View event:', id)}
                onEdit={(id) => console.log('Edit event:', id)}
                onDelete={(id) => console.log('Delete event:', id)}
            />
        </div>
    );

    const renderGallery = () => (
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
            <Image className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">Gallery Management</h3>
            <p className="text-gray-600">Gallery management features will be implemented here.</p>
        </div>
    );

    const renderSettings = () => (
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
            <Settings className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Settings panel will be implemented here.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar
                sidebarItems={sidebarItems}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                sidebarHovered={sidebarHovered}
                setSidebarHovered={setSidebarHovered}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    activeTab={activeTab}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Content Area */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'students' && renderStudents()}
                    {activeTab === 'events' && renderEvents()}
                    {activeTab === 'gallery' && renderGallery()}
                    {activeTab === 'settings' && renderSettings()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;