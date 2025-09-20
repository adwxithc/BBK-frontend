"use client";

import React from 'react';
import { Users, Calendar, ImageIcon } from 'lucide-react';

interface Activity {
  id: number;
  action: string;
  student?: string;
  teacher?: string;
  event?: string;
  count?: string;
  time: string;
}

const AdminDashboard = () => {
  // Sample data
  const stats = {
    totalStudents: 85,
    totalTeachers: 12,
    upcomingEvents: 5,
    galleryPhotos: 156
  };

  const recentActivities: Activity[] = [
    { id: 1, action: "New student enrollment", student: "Emma Johnson", time: "2 hours ago" },
    { id: 2, action: "Photo uploaded to Christmas gallery", count: "12 photos", time: "4 hours ago" },
    { id: 3, action: "Event scheduled", event: "Art & Creativity Session", time: "1 day ago" },
    { id: 4, action: "Teacher added", teacher: "Ms. Sarah Wilson", time: "2 days ago" }
  ];

  return (
    <div className="space-y-6 h-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-shrink-0">
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
              <p className="text-3xl font-bold text-[#3B82F6] mt-1">{stats.upcomingEvents}</p>
            </div>
            <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Gallery Photos</p>
              <p className="text-3xl font-bold text-[#8B5CF6] mt-1">{stats.galleryPhotos}</p>
            </div>
            <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-[#8B5CF6]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 flex-1 min-h-0">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h3>
        <div className="space-y-4 overflow-y-auto max-h-full">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">
                  {activity.student && `Student: ${activity.student}`}
                  {activity.teacher && `Teacher: ${activity.teacher}`}
                  {activity.event && `Event: ${activity.event}`}
                  {activity.count && `${activity.count}`}
                </p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
