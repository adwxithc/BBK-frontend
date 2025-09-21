'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';

// Mock data for development
const mockEventCategories = [
  {
    _id: '1',
    name: 'Annual Day',
    description: 'Yearly celebration showcasing student talents and achievements',
    slug: 'annual-day',
    color: '#FF6B6B',
    icon: '🎭',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    _id: '2',
    name: 'Sports Day',
    description: 'Athletic competitions and physical activities for all age groups',
    slug: 'sports-day',
    color: '#4ECDC4',
    icon: '🏃‍♂️',
    coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop',
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    _id: '3',
    name: 'Teachers Day',
    description: 'Honoring our dedicated educators with special celebrations',
    slug: 'teachers-day',
    color: '#45B7D1',
    icon: '👩‍🏫',
    coverImage: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop',
    isActive: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    _id: '4',
    name: 'Art & Craft Exhibition',
    description: 'Showcasing creative works and artistic talents of our students',
    slug: 'art-craft-exhibition',
    color: '#F7DC6F',
    icon: '🎨',
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop',
    isActive: false,
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    _id: '5',
    name: 'Christmas Celebration',
    description: 'Festive celebrations with decorations, carols, and gift exchanges',
    slug: 'christmas-celebration',
    color: '#E74C3C',
    icon: '🎄',
    coverImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=250&fit=crop',
    isActive: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    _id: '6',
    name: 'Science Fair',
    description: 'Interactive science experiments and demonstrations by our young scientists',
    slug: 'science-fair',
    color: '#9B59B6',
    icon: '🔬',
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=250&fit=crop',
    isActive: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

const EventCategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredCategories = mockEventCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterActive === 'active') return matchesSearch && category.isActive;
    if (filterActive === 'inactive') return matchesSearch && !category.isActive;
    return matchesSearch;
  });

  const handleCreateCategory = () => {
    setShowCreateModal(true);
  };

  const handleEditCategory = (categoryId: string) => {
    console.log('Edit category:', categoryId);
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log('Delete category:', categoryId);
  };

  const handleViewCategory = (categoryId: string) => {
    console.log('View category:', categoryId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Event Categories</h1>
            <p className="text-gray-600 mt-1">Manage event categories like Sports Day, Annual Day, and more</p>
          </div>
          <button
            onClick={handleCreateCategory}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Category
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Cover Image */}
            <div 
              className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden"
              style={{ backgroundColor: category.color + '20' }}
            >
              {category.coverImage ? (
                <Image
                  src={category.coverImage}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center text-6xl"
                  style={{ backgroundColor: category.color + '10' }}
                >
                  {category.icon}
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    category.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Actions Menu */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </button>
                  {/* Dropdown menu would go here */}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#7CBD1E] transition-colors">
                  {category.name}
                </h3>
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                ></div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Created: {category.createdAt.toLocaleDateString()}</span>
                <span>/{category.slug}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewCategory(category._id)}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button
                  onClick={() => handleEditCategory(category._id)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No event categories found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || filterActive !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Create your first event category to get started'
            }
          </p>
          {(!searchTerm && filterActive === 'all') && (
            <button
              onClick={handleCreateCategory}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Category
            </button>
          )}
        </div>
      )}

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create Event Category</h2>
            <p className="text-gray-600 mb-4">Modal form will be implemented here</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-[#7CBD1E] text-white rounded-lg hover:bg-[#6BAE1A]"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCategoriesPage;