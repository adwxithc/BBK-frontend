"use client";

import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  participants: string;
}

const EventsPage = () => {
  const upcomingEvents: Event[] = [
    { id: 1, title: "Christmas Celebration", date: "2024-12-25", location: "Main Hall", participants: "All Age Groups" },
    { id: 2, title: "Art & Creativity Workshop", date: "2024-12-20", location: "Art Studio", participants: "Ages 3-6" },
    { id: 3, title: "Parent-Teacher Conference", date: "2024-12-22", location: "Classrooms", participants: "All Parents" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Events Management</h2>
        <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
          <Plus className="w-5 h-5 inline mr-2" />
          Create Event
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Event Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Participants</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {upcomingEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                  <td className="px-6 py-4 text-gray-600">{event.date}</td>
                  <td className="px-6 py-4 text-gray-600">{event.location}</td>
                  <td className="px-6 py-4 text-gray-600">{event.participants}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
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
};

export default EventsPage;