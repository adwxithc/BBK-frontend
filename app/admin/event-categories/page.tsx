'use client';

import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import CreateEventCategoryModal from '@/components/admin/events/CreateEventCategoryModal';

// Mock data for development
const mockEventCategories = [
  {
    _id: '1',
    name: 'Annual Day',
    description: 'Yearly celebration showcasing student talents and achievements',
    slug: 'annual-day',
    color: '#FF6B6B',
    isActive: true,
    createdBy: 'admin@example.com',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    _id: '2',
    name: 'Sports Day',
    description: 'Athletic competitions and physical activities for all age groups',
    slug: 'sports-day',
    color: '#4ECDC4',
    isActive: true,
    createdBy: 'admin@example.com',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    _id: '3',
    name: 'Teachers Day',
    description: 'Honoring our dedicated educators with special celebrations',
    slug: 'teachers-day',
    color: '#45B7D1',
    isActive: true,
    createdBy: 'admin@example.com',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    _id: '4',
    name: 'Art & Craft Exhibition',
    description: 'Showcasing creative works and artistic talents of our students',
    slug: 'art-craft-exhibition',
    color: '#F7DC6F',
    isActive: false,
    createdBy: 'admin@example.com',
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20'),
  },
  {
    _id: '5',
    name: 'Christmas Celebration',
    description: 'Festive celebrations with decorations, carols, and gift exchanges',
    slug: 'christmas-celebration',
    color: '#E74C3C',
    isActive: true,
    createdBy: 'admin@example.com',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    _id: '6',
    name: 'Science Fair',
    description: 'Interactive science experiments and demonstrations by our young scientists',
    slug: 'science-fair',
    color: '#9B59B6',
    isActive: true,
    createdBy: 'admin@example.com',
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

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Description</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Slug</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Created</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
                        <div 
                          className="w-3 h-3 rounded-full mt-1"
                          style={{ backgroundColor: category.color }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                      {category.description}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
                      /{category.slug}
                    </code>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                        category.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">
                      <div>{category.createdAt.toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">
                        {category.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewCategory(category._id)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Category"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditCategory(category._id)}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Category"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      {/* Create Event Category Modal */}
      <CreateEventCategoryModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          // Optionally refresh the data or show a success message
          console.log('Event category created successfully');
        }}
      />
    </div>
  );
};

export default EventCategoriesPage;