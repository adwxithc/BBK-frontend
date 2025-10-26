'use client';

import { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import { Camera } from 'lucide-react';
import { IEvent, IEventCategory } from '@/types/events';

interface EventDisplay extends IEvent {
  categoryName: string;
  categoryColor: string;
  targetAgeGroups: string[];
  registrationRequired?: boolean;
  registrationDeadline?: Date;
}

// Sample event categories
const eventCategories: IEventCategory[] = [
  {
    _id: '1',
    name: 'Creative Arts',
    description: 'Art and creativity activities',
    slug: 'creative-arts',
    color: '#FF6B6B',
    isActive: true,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'Educational Play',
    description: 'Learning through interactive play',
    slug: 'educational-play',
    color: '#4ECDC4',
    isActive: true,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Special Events',
    description: 'Celebrations and special occasions',
    slug: 'special-events',
    color: '#9B59B6',
    isActive: true,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    name: 'Sports & Activities',
    description: 'Physical activities and sports',
    slug: 'sports-activities',
    color: '#F39C12',
    isActive: true,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Sample events with enhanced display information
const eventItems: EventDisplay[] = [
  {
    _id: '1',
    title: 'Art & Creativity Workshop',
    description: 'Children exploring their artistic side with colorful paints and crafts',
    slug: 'art-creativity-workshop',
    categoryId: '1',
    categoryName: 'Creative Arts',
    categoryColor: '#FF6B6B',
    date: new Date('2025-10-15'),
    time: '10:00 AM - 12:00 PM',
    location: 'Art Room',
    targetAgeGroups: ['3-4 years', '5-6 years'],
    registrationRequired: false,
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop',
    gallery: [],
    status: 'published',
    featured: true,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    title: 'Interactive Learning Session',
    description: 'Learning sessions that make education fun and engaging through play',
    slug: 'interactive-learning-session',
    categoryId: '2',
    categoryName: 'Educational Play',
    categoryColor: '#4ECDC4',
    date: new Date('2025-10-20'),
    time: '9:00 AM - 11:00 AM',
    location: 'Main Classroom',
    targetAgeGroups: ['All'],
    registrationRequired: true,
    registrationDeadline: new Date('2025-10-18'),
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop',
    gallery: [],
    status: 'published',
    featured: true,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    title: 'Christmas Celebration 2025',
    description: 'Festive joy and holiday spirit with our annual Christmas celebrations',
    slug: 'christmas-celebration-2025',
    categoryId: '3',
    categoryName: 'Special Events',
    categoryColor: '#9B59B6',
    date: new Date('2025-12-20'),
    time: '2:00 PM - 5:00 PM',
    location: 'Main Hall',
    targetAgeGroups: ['All'],
    registrationRequired: true,
    registrationDeadline: new Date('2025-12-15'),
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=300&fit=crop',
    gallery: [],
    status: 'published',
    featured: true,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '4',
    title: 'Outdoor Sports Day',
    description: 'Fresh air and physical activities for healthy development and fun',
    slug: 'outdoor-sports-day',
    categoryId: '4',
    categoryName: 'Sports & Activities',
    categoryColor: '#F39C12',
    date: new Date('2025-11-10'),
    time: '10:00 AM - 3:00 PM',
    location: 'Playground',
    targetAgeGroups: ['4-5 years', '5-6 years'],
    registrationRequired: false,
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
    gallery: [],
    status: 'published',
    featured: true,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5',
    title: 'Music & Dance Workshop',
    description: 'Building confidence and creativity through music and movement',
    slug: 'music-dance-workshop',
    categoryId: '1',
    categoryName: 'Creative Arts',
    categoryColor: '#FF6B6B',
    date: new Date('2025-11-25'),
    time: '11:00 AM - 1:00 PM',
    location: 'Activity Room',
    targetAgeGroups: ['3-4 years', '4-5 years'],
    registrationRequired: true,
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    gallery: [],
    status: 'published',
    featured: false,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '6',
    title: 'Science Discovery Day',
    description: 'Hands-on experiments and discoveries to spark curiosity',
    slug: 'science-discovery-day',
    categoryId: '2',
    categoryName: 'Educational Play',
    categoryColor: '#4ECDC4',
    date: new Date('2025-12-05'),
    time: '9:30 AM - 11:30 AM',
    location: 'Science Corner',
    targetAgeGroups: ['5-6 years'],
    registrationRequired: true,
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&h=300&fit=crop',
    gallery: [],
    status: 'published',
    featured: false,
    createdBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const allCategories = ['All', ...eventCategories.map(cat => cat.name)];

function OurDays() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = useMemo(() => 
    selectedCategory === 'All' 
      ? eventItems 
      : eventItems.filter(event => event.categoryName === selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300/20 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-20 right-1/3 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse animation-delay-4000"></div>
        
        {/* Emoji decorations */}
        <div className="absolute top-32 right-1/4 text-4xl opacity-20 animate-bounce animation-delay-1000">📸</div>
        <div className="absolute bottom-32 left-20 text-3xl opacity-20 animate-pulse animation-delay-2000">🎬</div>
        <div className="absolute top-1/2 right-10 text-2xl opacity-20 animate-bounce animation-delay-3000">✨</div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-[#7CBD1E] font-bold text-sm mb-6 shadow-lg border border-white/50">
            <Camera className="w-5 h-5" />
            Our Daily Adventures
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-800">Our Days at</span>
            <span className="block bg-gradient-to-r from-[#7CBD1E] via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Bunny Babies
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take a peek into the magical moments that happen every day at our kindergarten. 
            From creative arts to outdoor adventures, every moment is filled with joy, learning, and growth.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/50 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <EventsGrid filteredEvents={filteredEvents} />

        {/* Call to Action */}
        <CallToAction />
      </Container>
    </div>
  );
}

// Memoized EventsGrid Component
const EventsGrid = memo(({ filteredEvents }: {
  filteredEvents: EventDisplay[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    {filteredEvents.map((event, index) => (
      <EventCard key={event._id} event={event} index={index} />
    ))}
  </div>
));
EventsGrid.displayName = 'EventsGrid';

// Memoized EventCard Component
const EventCard = memo(({ event, index }: {
  event: EventDisplay;
  index: number;
}) => {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link href={`/events/${event.slug}`} className="block">
      <div
        className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Event Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={event.coverImage || 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&h=300&fit=crop'}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* View Event Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-8 h-8 text-[#7CBD1E]" />
            </div>
          </div>
          
          {/* Event Status Badge */}
          <div className="absolute top-4 left-4">
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
              isUpcoming 
                ? 'bg-green-500/90 text-white' 
                : 'bg-gray-500/90 text-white'
            }`}>
              {isUpcoming ? 'Upcoming' : 'Past Event'}
            </div>
          </div>

          {/* Registration Required Badge */}
          {event.registrationRequired && (
            <div className="absolute top-4 right-4">
              <div className="bg-orange-500/90 text-white px-2 py-1 rounded-full text-xs font-bold">
                Registration Required
              </div>
            </div>
          )}
        </div>

        {/* Event Content */}
        <div className="p-6">
          {/* Category and Date Info */}
          <div className="flex items-center justify-between mb-3">
            <span 
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ 
                backgroundColor: `${event.categoryColor}15`,
                color: event.categoryColor
              }}
            >
              {event.categoryName}
            </span>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <span>📅</span>
              <span>{formattedDate}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#7CBD1E] transition-colors duration-300">
            {event.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 overflow-hidden" style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical' 
          }}>
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>🕒</span>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>📍</span>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>👥</span>
              <span>{event.targetAgeGroups.join(', ')}</span>
            </div>
          </div>
          
          <div className="flex items-center text-[#7CBD1E] text-sm font-medium">
            <span>View Event Details</span>
            <Camera className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
});
EventCard.displayName = 'EventCard';

// Memoized CallToAction Component
const CallToAction = memo(() => (
  <div className="text-center">
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">
        Want to See More? 📱
      </h3>
      <p className="text-gray-600 mb-6 text-lg">
        Follow us on social media for daily updates and live glimpses into our children&apos;s adventures!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
          <span>📱</span>
          {" "}Follow Our Journey
        </button>
        <button className="border-2 border-[#7CBD1E] text-[#7CBD1E] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#7CBD1E] hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
          <span>📧</span>
          {" "}Get Updates
        </button>
      </div>
    </div>
  </div>
));
CallToAction.displayName = 'CallToAction';

export default OurDays;