"use client";

import React from 'react';
import { Plus, Edit } from 'lucide-react';

const GalleryPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
        <div className="flex gap-3">
          <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300">
            <Plus className="w-5 h-5" />
            Upload Photos
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
};

export default GalleryPage;