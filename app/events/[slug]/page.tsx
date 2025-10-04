'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Container from '@/components/Container';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Camera } from 'lucide-react';

// LightGallery imports
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import LightGallery from 'lightgallery/react';

// LightGallery CSS
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';

// Mock event data - in a real app, this would come from an API/database
const events = [
  {
    id: '1',
    title: 'Christmas Celebration 2025',
    description: 'Join us for a magical Christmas celebration filled with joy, music, and festive activities for all ages. Our annual Christmas event brings families together for an unforgettable experience with Santa visits, carol singing, craft activities, and delicious treats.',
    slug: 'christmas-celebration-2025',
    categoryName: 'Special Events',
    categoryColor: '#9B59B6',
    date: '2025-12-20',
    time: '2:00 PM - 5:00 PM',
    location: 'Main Hall',
    targetAgeGroups: ['All'],
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    ],
    status: 'published',
    featured: true,
    registrationRequired: true,
    registrationDeadline: '2025-12-15'
  },
  {
    id: '2',
    title: 'Art & Creativity Workshop',
    description: 'Children exploring their artistic side with colorful paints, crafts, and creative expression. This hands-on workshop encourages creativity and imagination through various art mediums.',
    slug: 'art-creativity-workshop',
    categoryName: 'Creative Arts',
    categoryColor: '#FF6B6B',
    date: '2025-10-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Art Room',
    targetAgeGroups: ['3-4 years', '5-6 years'],
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    ],
    status: 'published',
    featured: true,
    registrationRequired: false
  },
  {
    id: '3',
    title: 'Interactive Learning Session',
    description: 'Learning sessions that make education fun and engaging through play. These interactive sessions combine educational content with hands-on activities to promote active learning and development.',
    slug: 'interactive-learning-session',
    categoryName: 'Educational Play',
    categoryColor: '#4ECDC4',
    date: '2025-10-20',
    time: '9:00 AM - 11:00 AM',
    location: 'Main Classroom',
    targetAgeGroups: ['All'],
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544377193-d7c0b5d6c1a9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1587824162787-b89b8b0d1b32?w=400&h=300&fit=crop',
    ],
    status: 'published',
    featured: true,
    registrationRequired: true,
    registrationDeadline: '2025-10-18'
  },
  {
    id: '4',
    title: 'Outdoor Sports Day',
    description: 'Fresh air and physical activities designed for healthy development and fun for all children. This outdoor event promotes fitness, teamwork, and healthy competition in a safe environment.',
    slug: 'outdoor-sports-day',
    categoryName: 'Sports & Activities',
    categoryColor: '#F39C12',
    date: '2025-11-10',
    time: '10:00 AM - 3:00 PM',
    location: 'Playground',
    targetAgeGroups: ['4-5 years', '5-6 years'],
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1564519842238-0b6f6a6de1c1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=300&fit=crop',
    ],
    status: 'published',
    featured: true,
    registrationRequired: false
  },
  {
    id: '5',
    title: 'Music & Dance Workshop',
    description: 'Building confidence and creativity through music and movement. This workshop introduces children to rhythm, melody, and dance while fostering self-expression and coordination.',
    slug: 'music-dance-workshop',
    categoryName: 'Creative Arts',
    categoryColor: '#FF6B6B',
    date: '2025-11-25',
    time: '11:00 AM - 1:00 PM',
    location: 'Activity Room',
    targetAgeGroups: ['3-4 years', '4-5 years'],
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop',
    ],
    status: 'published',
    featured: false,
    registrationRequired: true
  },
  {
    id: '6',
    title: 'Science Discovery Day',
    description: 'Hands-on experiments and discoveries to spark curiosity and love for science. This engaging session introduces basic scientific concepts through fun, safe experiments and observations.',
    slug: 'science-discovery-day',
    categoryName: 'Educational Play',
    categoryColor: '#4ECDC4',
    date: '2025-12-05',
    time: '9:30 AM - 11:30 AM',
    location: 'Science Corner',
    targetAgeGroups: ['5-6 years'],
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    ],
    status: 'published',
    featured: false,
    registrationRequired: true
  }
];

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = events.find(e => e.slug === params.slug);
  
  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20">
        <Container>
          {/* Back Navigation */}
          <div className="pt-8 mb-8">
            <Link 
              href="/events"
              className="inline-flex items-center gap-2 text-[#7CBD1E] hover:text-[#5A9B14] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Events</span>
            </Link>
          </div>

          {/* Event Header */}
          <div className="relative mb-12">
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Event Info Overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="px-4 py-2 rounded-full text-sm font-bold"
                    style={{ 
                      backgroundColor: `${event.categoryColor}`,
                      color: 'white'
                    }}
                  >
                    {event.categoryName}
                  </span>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    isUpcoming 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    {isUpcoming ? 'Upcoming Event' : 'Past Event'}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-lg">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="text-lg">{event.targetAgeGroups.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="font-semibold text-gray-800">{event.location}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <span className="text-xl">📝</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">About This Event</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">Photo Gallery</h2>
                        <p className="text-gray-500">({event.gallery.length} Photos)</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 px-4 py-2 rounded-full">
                      <p className="text-sm text-gray-600">📸 Gallery Collection</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">
                    Click on any image to view in full size with zoom and navigation controls.
                  </p>
                  <LightGallery
                    speed={500}
                    plugins={[lgThumbnail, lgZoom, lgFullscreen, lgShare, lgRotate]}
                    mode="lg-fade"
                    thumbnail={true}
                    download={false}
                    counter={true}
                    closable={true}
                    mousewheel={true}
                    addClass="custom-gallery"
                    elementClassNames="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {event.gallery.map((image, index) => (
                      <a 
                        key={`gallery-${index}-${image.slice(-10)}`}
                        href={image}
                        data-lg-size="1200-800"
                        className="gallery-item"
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                          <Image
                            src={image}
                            alt={`Event gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                <Camera className="w-8 h-8 text-[#7CBD1E]" />
                              </div>
                            </div>
                          </div>
                          {/* Image counter */}
                          <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {index + 1} / {event.gallery.length}
                          </div>
                        </div>
                      </a>
                    ))}
                  </LightGallery>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Info */}
              {event.registrationRequired && (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-green-200/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Registration Required</h3>
                  </div>
                  <div className="bg-white/60 rounded-xl p-4 mb-4">
                    <p className="text-gray-700 text-sm mb-2">
                      📅 <strong>Deadline:</strong> {new Date(event.registrationDeadline || '').toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Secure your spot for this exciting event! Early registration ensures your child doesn&apos;t miss out.
                    </p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-6 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <span>🎯</span>
                    {" "}Register Now
                  </button>
                </div>
              )}

              {/* Event Quick Info */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">ℹ️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Quick Info</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Date & Time</p>
                      <p className="font-semibold text-gray-800">{formattedDate}</p>
                      <p className="text-sm text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl">
                    <div className={`w-4 h-4 rounded-full ${isUpcoming ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Status</p>
                      <p className="font-semibold text-gray-800">{isUpcoming ? 'Upcoming Event' : 'Past Event'}</p>
                    </div>
                  </div>
                  {event.registrationRequired && (
                    <div className="flex items-center gap-3 p-3 bg-orange-50/50 rounded-xl">
                      <span className="text-orange-500 text-lg">📝</span>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Registration</p>
                        <p className="font-semibold text-orange-600">Required</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">💬</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Need More Info?</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Have questions about this event? Our friendly staff is here to help with any inquiries about activities, timings, or special requirements.
                </p>
                <div className="space-y-3">
                  <Link 
                    href="/contact"
                    className="w-full border-2 border-[#7CBD1E] text-[#7CBD1E] px-6 py-3 rounded-2xl font-bold hover:bg-[#7CBD1E] hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <span>📞</span>
                    {" "}Contact Us
                  </Link>
                  <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300 inline-flex items-center justify-center gap-2">
                    <span>📧</span>
                    {" "}Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}