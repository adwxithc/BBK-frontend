"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Filter, Calendar, MapPin, Users, Eye, Edit, Trash2 } from 'lucide-react';

// Mock data for development
const mockEvents = [
  {
    _id: '1',
    title: 'Annual Day 2025',
    description: 'Grand celebration showcasing student talents with performances, awards, and cultural programs',
    slug: 'annual-day-2025',
    date: new Date('2025-03-15'),
    endDate: new Date('2025-03-15'),
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    targetAgeGroups: ['All Age Groups'],
    maxParticipants: 500,
    registrationRequired: true,
    registrationDeadline: new Date('2025-03-01'),
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop',
    gallery: [],
    status: 'published' as const,
    featured: true,
    category: {
      _id: '1',
      name: 'Annual Day',
      color: '#FF6B6B',
      icon: '🎭'
    },
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
  {
    _id: '2',
    title: 'Sports Day Championship 2025',
    description: 'Athletic competitions including running, jumping, and team sports for all age groups',
    slug: 'sports-day-2025',
    date: new Date('2025-02-20'),
    time: '9:00 AM - 3:00 PM',
    location: 'School Playground',
    targetAgeGroups: ['Ages 3-4', 'Ages 4-5', 'Ages 5-6'],
    registrationRequired: true,
    registrationDeadline: new Date('2025-02-10'),
    coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop',
    gallery: [],
    status: 'published' as const,
    featured: false,
    category: {
      _id: '2',
      name: 'Sports Day',
      color: '#4ECDC4',
      icon: '🏃‍♂️'
    },
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
  },
  {
    _id: '3',
    title: 'Teachers Day Appreciation 2024',
    description: 'Special celebration honoring our dedicated teachers with performances and gratitude',
    slug: 'teachers-day-2024',
    date: new Date('2024-09-05'),
    time: '11:00 AM - 2:00 PM',
    location: 'School Assembly Hall',
    targetAgeGroups: ['All Students'],
    registrationRequired: false,
    coverImage: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop',
    gallery: [],
    status: 'completed' as const,
    featured: false,
    category: {
      _id: '3',
      name: 'Teachers Day',
      color: '#45B7D1',
      icon: '👩‍🏫'
    },
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-09-10'),
  },
  {
    _id: '4',
    title: 'Christmas Celebration 2024',
    description: 'Magical Christmas celebration with Santa, carols, and festive activities for all children',
    slug: 'christmas-celebration-2024',
    date: new Date('2024-12-20'),
    time: '2:00 PM - 5:00 PM',
    location: 'Main Hall',
    targetAgeGroups: ['All Age Groups'],
    registrationRequired: false,
    coverImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=250&fit=crop',
    gallery: [],
    status: 'completed' as const,
    featured: true,
    category: {
      _id: '5',
      name: 'Christmas Celebration',
      color: '#E74C3C',
      icon: '🎄'
    },
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-12-25'),
  },
  {
    _id: '5',
    title: 'Science Fair 2025',
    description: 'Young scientists showcase their amazing experiments and discoveries',
    slug: 'science-fair-2025',
    date: new Date('2025-04-10'),
    time: '10:00 AM - 3:00 PM',
    location: 'Science Laboratory & Corridors',
    targetAgeGroups: ['Ages 4-6'],
    maxParticipants: 200,
    registrationRequired: true,
    registrationDeadline: new Date('2025-04-01'),
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=250&fit=crop',
    gallery: [],
    status: 'draft' as const,
    featured: false,
    category: {
      _id: '6',
      name: 'Science Fair',
      color: '#9B59B6',
      icon: '🔬'
    },
    createdAt: new Date('2025-01-25'),
    updatedAt: new Date('2025-01-25'),
  },
  {
    _id: '6',
    title: 'Art Exhibition Spring 2025',
    description: 'Display of beautiful artwork created by our creative young artists',
    slug: 'art-exhibition-spring-2025',
    date: new Date('2025-05-15'),
    time: '1:00 PM - 4:00 PM',
    location: 'Art Gallery',
    targetAgeGroups: ['Ages 3-6'],
    registrationRequired: false,
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop',
    gallery: [],
    status: 'draft' as const,
    featured: false,
    category: {
      _id: '4',
      name: 'Art & Craft Exhibition',
      color: '#F7DC6F',
      icon: '🎨'
    },
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-02-01'),
  },
];

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'completed' | 'cancelled'>('all');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && event.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = (date: Date) => {
    return date > new Date();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-1">Create and manage specific events with photos and details</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7CBD1E] focus:border-transparent"
          >
            <option value="all">All Events</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Cover Image */}
            <div className="h-48 relative overflow-hidden">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Featured Badge */}
              {event.featured && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>

              {/* Upcoming Indicator */}
              {isUpcoming(event.date) && event.status === 'published' && (
                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                    Upcoming
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category Tag */}
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: event.category.color }}
                ></div>
                <span className="text-xs text-gray-500 font-medium">{event.category.name}</span>
                <span className="text-xs">{event.category.icon}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#7CBD1E] transition-colors">
                {event.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{formatDate(event.date)} • {event.time}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{event.targetAgeGroups.join(', ')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button className="px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Create your first event to get started'
            }
          </p>
          {(!searchTerm && filterStatus === 'all') && (
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Event
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsPage;