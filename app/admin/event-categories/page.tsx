'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, X } from 'lucide-react';
import CreateEventCategoryModal from '@/components/admin/events/CreateEventCategoryModal';
import DataTable from '@/components/admin/DataTable';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import Select from '@/components/ui/Select';
import TextField from '@/components/ui/TextField';

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
  {
    _id: '7',
    name: 'Science Fair',
    description: 'Interactive science experiments and demonstrations by our young scientists',
    slug: 'science-fair',
    color: '#9B59B6',
    isActive: true,
    createdBy: 'admin@example.com',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    _id: '8',
    name: 'Science Fair',
    description: 'Interactive science experiments and demonstrations by our young scientists',
    slug: 'science-fair',
    color: '#9B59B6',
    isActive: true,
    createdBy: 'admin@example.com',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    _id: '9',
    name: 'Science Fair',
    description: 'Interactive science experiments and demonstrations by our young scientists',
    slug: 'science-fair',
    color: '#9B59B6',
    isActive: true,
    createdBy: 'admin@example.com',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    _id: '10',
    name: 'Science Fair',
    description: 'Interactive science experiments and demonstrations by our young scientists',
    slug: 'science-fair',
    color: '#9B59B6',
    isActive: true,
    createdBy: 'admin@example.com',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    _id: '11',
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

  const filteredCategories = useMemo(() => {
    return mockEventCategories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterActive === 'active') return matchesSearch && category.isActive;
      if (filterActive === 'inactive') return matchesSearch && !category.isActive;
      return matchesSearch;
    });
  }, [searchTerm, filterActive]);

  const columns = useMemo(() => [
    {
      key: 'category',
      label: 'Category',
      render: (value: any, row: any) => (
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
            style={{ backgroundColor: row.color }}
          >
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{row.name}</h4>
          </div>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
          {value}
        </p>
      ),
    },
    {
      key: 'slug',
      label: 'Slug',
      render: (value: string) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
          /{value}
        </code>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value: boolean) => (
        <span
          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${value
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
            }`}
        >
          {value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (value: Date) => (
        <div className="text-sm text-gray-600">
          <div>{value.toLocaleDateString()}</div>
          <div className="text-xs text-gray-400">
            {value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      className: 'text-right',
      render: (value: any, row: any) => (
        <div className="flex items-center justify-end gap-2">
          <IconButton
            icon={<Eye className="h-4 w-4" />}
            onClick={() => handleViewCategory(row._id)}
            variant="text"
            color="blue"
            size="sm"
            tooltip="View Category"
          />
          <IconButton
            icon={<Edit className="h-4 w-4" />}
            onClick={() => handleEditCategory(row._id)}
            variant="text"
            color="green"
            size="sm"
            tooltip="Edit Category"
          />
          <IconButton
            icon={<Trash2 className="h-4 w-4" />}
            onClick={() => handleDeleteCategory(row._id)}
            variant="text"
            color="red"
            size="sm"
            tooltip="Delete Category"
          />
          <IconButton
            icon={<MoreVertical className="h-4 w-4" />}
            variant="text"
            color="gray"
            size="sm"
            tooltip="More Options"
          />
        </div>
      ),
    },
  ], []);

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
    <div className="max-w-7xl mx-auto">


      {/* Filters , Search and add new*/}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <TextField
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startIcon={<Search className="h-4 w-4" />}
            endIcon={searchTerm ? <X className="h-4 w-4" /> : undefined}
            onEndIconClick={searchTerm ? () => setSearchTerm('') : undefined}
            variant="modern"
            size="md"
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filterActive}
            onChange={(value) => setFilterActive(value as 'all' | 'active' | 'inactive')}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'active', label: 'Active Only' },
              { value: 'inactive', label: 'Inactive Only' }
            ]}
            variant="modern"
            size="md"
            color="primary"
            className="min-w-[160px]"
          />
        </div>
        <div className='flex items-center  gap-2'>
          <Button
            onClick={handleCreateCategory}
            variant="contained"
            color="primary"
            size="md"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Category
          </Button>
        </div>
      </div>

      {/* Categories Table */}
      <DataTable
        data={filteredCategories}
        columns={columns}
        height="calc(100vh - 255px)"
        emptyMessage={
          searchTerm || filterActive !== 'all'
            ? 'Try adjusting your search or filters'
            : 'Create your first event category to get started'
        }
        pagination={{
          showPagination: true,
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 50]
        }}
      />

      {/* Empty State Action - only show when no search/filter applied */}
      {filteredCategories.length === 0 && !searchTerm && filterActive === 'all' && (
        <div className="mt-6 text-center">
          <Button
            onClick={handleCreateCategory}
            variant="contained"
            color="primary"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Category
          </Button>
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