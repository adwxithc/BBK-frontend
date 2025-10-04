import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/ui/Navbar';
import Container from '@/components/Container';
import { Camera, Calendar, MapPin, Users, Clock } from 'lucide-react';

// This would typically come from an API or database
const featuredEvents = [
  {
    id: '1',
    title: 'Christmas Celebration 2025',
    description: 'Join us for a magical Christmas celebration filled with joy, music, and festive activities for all ages.',
    slug: 'christmas-celebration-2025',
    categoryName: 'Special Events',
    categoryColor: '#9B59B6',
    date: '2025-12-20',
    time: '2:00 PM - 5:00 PM',
    location: 'Main Hall',
    targetAgeGroups: ['All'],
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=400&fit=crop',
    status: 'published',
    featured: true
  },
  {
    id: '2',
    title: 'Art & Creativity Workshop',
    description: 'Children exploring their artistic side with colorful paints, crafts, and creative expression.',
    slug: 'art-creativity-workshop',
    categoryName: 'Creative Arts',
    categoryColor: '#FF6B6B',
    date: '2025-10-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Art Room',
    targetAgeGroups: ['3-4 years', '5-6 years'],
    coverImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop',
    status: 'published',
    featured: true
  },
  {
    id: '3',
    title: 'Outdoor Sports Day',
    description: 'Fresh air and physical activities designed for healthy development and fun for all children.',
    slug: 'outdoor-sports-day',
    categoryName: 'Sports & Activities',
    categoryColor: '#F39C12',
    date: '2025-11-10',
    time: '10:00 AM - 3:00 PM',
    location: 'Playground',
    targetAgeGroups: ['4-5 years', '5-6 years'],
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    status: 'published',
    featured: true
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20">
        <Container>
          {/* Page Header */}
          <div className="text-center mb-16 pt-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-[#7CBD1E] font-bold text-sm mb-6 shadow-lg border border-white/50">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-gray-800">Our</span>
              <span className="block bg-gradient-to-r from-[#7CBD1E] via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the exciting events and activities planned for our little ones. 
              From creative workshops to special celebrations, there&apos;s always something fun happening at Bunny Babies!
            </p>
          </div>

          {/* Featured Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredEvents.map((event, index) => (
              <EventPreviewCard key={event.id} event={event} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Want to Stay Updated? 🔔
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Subscribe to our newsletter to get notified about new events and activities!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  📧 Subscribe Now
                </button>
                <Link 
                  href="/contact"
                  className="border-2 border-[#7CBD1E] text-[#7CBD1E] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#7CBD1E] hover:text-white transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                >
                  📞 Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}

function EventPreviewCard({ event, index }: { event: any; index: number }) {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link href={`/events/${event.slug}`}>
      <div
        className="group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Event Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
              isUpcoming 
                ? 'bg-green-500/90 text-white' 
                : 'bg-gray-500/90 text-white'
            }`}>
              {isUpcoming ? 'Upcoming' : 'Past Event'}
            </div>
          </div>

          {/* View Event Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-8 h-8 text-[#7CBD1E]" />
              </div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6">
          {/* Category and Date */}
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
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#7CBD1E] transition-colors duration-300">
            {event.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{event.targetAgeGroups.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}