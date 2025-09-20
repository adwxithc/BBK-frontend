"use client";

import React, { useState } from 'react';
import { Users, Calendar, ImageIcon, Settings, BarChart3, Bell, Search, Plus, Edit, Trash2, Eye, Download } from 'lucide-react';
import { Student, Event, StatCard as StatCardType, Activity, SidebarItem, TabType } from '@/types/admin';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import StatsCard from '@/components/admin/StatsCard';
import DataTable from '@/components/admin/DataTable';
import Card from '@/components/ui/Card';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarHovered, setSidebarHovered] = useState(false);

    // Sample data
    const stats = {
        totalStudents: 85,
        totalTeachers: 12,
        upcomingEvents: 5,
        galleryPhotos: 156
    };

    const statsCards: StatCardType[] = [
        {
            title: "Total Students",
            value: stats.totalStudents,
            icon: Users,
            color: "#7CBD1E",
            bgColor: "#7CBD1E10"
        },
        {
            title: "Teachers",
            value: stats.totalTeachers,
            icon: Users,
            color: "#F1F864",
            bgColor: "#F1F86410"
        },
        {
            title: "Upcoming Events",
            value: stats.upcomingEvents,
            icon: Calendar,
            color: "#3B82F6",
            bgColor: "#3B82F610"
        },
        {
            title: "Gallery Photos",
            value: stats.galleryPhotos,
            icon: ImageIcon,
            color: "#8B5CF6",
            bgColor: "#8B5CF610"
        }
    ];

    const recentActivities: Activity[] = [
        { id: 1, action: "New student enrollment", student: "Emma Johnson", time: "2 hours ago" },
        { id: 2, action: "Photo uploaded to Christmas gallery", count: "12 photos", time: "4 hours ago" },
        { id: 3, action: "Event scheduled", event: "Art & Creativity Session", time: "1 day ago" },
        { id: 4, action: "Teacher added", teacher: "Ms. Sarah Wilson", time: "2 days ago" }
    ];

    const students: Student[] = [
        { id: 1, name: "Emma Johnson", age: 4, parent: "John Johnson", phone: "(555) 123-4567", status: "Active" },
        { id: 2, name: "Liam Smith", age: 5, parent: "Sarah Smith", phone: "(555) 234-5678", status: "Active" },
        { id: 3, name: "Olivia Brown", age: 3, parent: "Mike Brown", phone: "(555) 345-6789", status: "Active" },
        { id: 4, name: "Noah Davis", age: 4, parent: "Lisa Davis", phone: "(555) 456-7890", status: "Inactive" }
    ];

    const upcomingEvents: Event[] = [
        { id: 1, title: "Christmas Celebration", date: "2024-12-25", location: "Main Hall", participants: "All Age Groups" },
        { id: 2, title: "Art & Creativity Workshop", date: "2024-12-20", location: "Art Studio", participants: "Ages 3-6" },
        { id: 3, title: "Parent-Teacher Conference", date: "2024-12-22", location: "Classrooms", participants: "All Parents" }
    ];

    const sidebarItems: SidebarItem[] = [
        { id: 'overview', label: 'Dashboard', icon: BarChart3 },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <StatsCard key={index} stat={stat} />
                ))}
            </div>

            {/* Recent Activities */}
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h3>
                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-800">{activity.action}</p>
                                <p className="text-sm text-gray-600">
                                    {activity.student && `Student: ${activity.student}`}
                                    {activity.teacher && `Teacher: ${activity.teacher}`}
                                    {activity.event && `Event: ${activity.event}`}
                                    {activity.count && activity.count}
                                </p>
                            </div>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );

    const renderStudents = () => {
        const columns = [
            { key: 'name', label: 'Name' },
            { key: 'age', label: 'Age' },
            { key: 'parent', label: 'Parent' },
            { key: 'phone', label: 'Phone' },
            { 
                key: 'status', 
                label: 'Status',
                render: (value: string) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        value === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {value}
                    </span>
                )
            }
        ];

        return (
            <DataTable
                data={students}
                columns={columns}
                title="Students Management"
                onAdd={() => console.log('Add student')}
                onEdit={(student) => console.log('Edit student:', student)}
                onDelete={(student) => console.log('Delete student:', student)}
                onView={(student) => console.log('View student:', student)}
            />
        );
    };

    const renderEvents = () => {
        const columns = [
            { key: 'title', label: 'Event Title' },
            { key: 'date', label: 'Date' },
            { key: 'location', label: 'Location' },
            { key: 'participants', label: 'Participants' }
        ];

        return (
            <DataTable
                data={upcomingEvents}
                columns={columns}
                title="Events Management"
                onAdd={() => console.log('Add event')}
                onEdit={(event) => console.log('Edit event:', event)}
                onDelete={(event) => console.log('Delete event:', event)}
            />
        );
    };

    const renderGallery = () => (
        <Card className="text-center">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gallery</h3>
            <p className="text-gray-600">Gallery management will be implemented here.</p>
        </Card>
    );

    const renderSettings = () => (
        <Card className="text-center">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Settings</h3>
            <p className="text-gray-600">Settings panel will be implemented here.</p>
        </Card>
    );
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Total Students</p>
                            <p className="text-3xl font-bold text-[#7CBD1E] mt-1">{stats.totalStudents}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#7CBD1E]/10 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-[#7CBD1E]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Teachers</p>
                            <p className="text-3xl font-bold text-[#F1F864] mt-1">{stats.totalTeachers}</p>
                        </div>
                        <div className="w-12 h-12 bg-[#F1F864]/10 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-[#F1F864]" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Upcoming Events</p>
                            <p className="text-3xl font-bold text-blue-500 mt-1">{stats.upcomingEvents}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-blue-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Gallery Photos</p>
                            <p className="text-3xl font-bold text-purple-500 mt-1">{stats.galleryPhotos}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-purple-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#7CBD1E] rounded-full"></div>
                                <div>
                                    <p className="font-medium text-gray-800">{activity.action}</p>
                                    <p className="text-sm text-gray-600">
                                        {activity.student || activity.teacher || activity.event || `${activity.count}`}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

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

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Student Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Age</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Parent/Guardian</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] rounded-full flex items-center justify-center text-white font-bold">
                                                {student.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-800">{student.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{student.age} years</td>
                                    <td className="px-6 py-4 text-gray-600">{student.parent}</td>
                                    <td className="px-6 py-4 text-gray-600">{student.phone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            student.status === 'Active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderEvents = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Event Management</h2>
                <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300">
                    <Plus className="w-5 h-5" />
                    Create Event
                </button>
            </div>

            <div className="grid gap-6">
                {upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>📍</span>
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{event.participants}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                    <Eye className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                                    <Edit className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderGallery = () => (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
                <div className="flex gap-3">
                    <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300">
                        <Plus className="w-5 h-5" />
                        Upload Photos
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-50 transition-all duration-300">
                        <Download className="w-5 h-5" />
                        Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="w-full h-48 bg-gradient-to-br from-red-100 to-green-100 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-4xl">🎄</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Christmas Celebration</h3>
                    <p className="text-sm text-gray-600 mb-3">24 photos • December 25, 2024</p>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-[#7CBD1E] text-white py-2 rounded-lg hover:bg-[#6BA91A] transition-colors duration-200">
                            View Gallery
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <Edit className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-4xl">🎨</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Art & Creativity</h3>
                    <p className="text-sm text-gray-600 mb-3">18 photos • Weekly Sessions</p>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-[#7CBD1E] text-white py-2 rounded-lg hover:bg-[#6BA91A] transition-colors duration-200">
                            View Gallery
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <Edit className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-4xl">📚</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Educational Play</h3>
                    <p className="text-sm text-gray-600 mb-3">32 photos • Daily Activities</p>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-[#7CBD1E] text-white py-2 rounded-lg hover:bg-[#6BA91A] transition-colors duration-200">
                            View Gallery
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <Edit className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
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
                                    setActiveTab(item.id);
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
                </nav>                {/* User Profile */}
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
            <div className="flex-1 flex flex-col overflow-hidden">
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
                                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize">
                                        {activeTab === 'overview' ? 'Dashboard Overview' : activeTab}
                                    </h2>
                                    <p className="text-sm lg:text-base text-gray-600">
                                        {activeTab === 'overview' 
                                            ? 'Welcome to your admin dashboard' 
                                            : `Manage your ${activeTab} efficiently`
                                        }
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

                {/* Content Area */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'students' && renderStudents()}
                    {activeTab === 'events' && renderEvents()}
                    {activeTab === 'gallery' && renderGallery()}
                    {activeTab === 'settings' && (
                        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
                            <Settings className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">Settings</h3>
                            <p className="text-gray-600">Settings panel will be implemented here.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;