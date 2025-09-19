'use client';

import { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import { Camera, Heart, Star } from 'lucide-react';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
  category: string;
  galleryRoute: string;
}

// Sample media data
const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: '/hero1.webp',
    title: 'Art & Creativity Time',
    description: 'Children exploring their artistic side with colorful paints and crafts',
    category: 'Creative Arts',
    galleryRoute: 'art-creativity'
  },
  {
    id: 2,
    type: 'image',
    src: '/hero2.webp',
    title: 'Learning Through Play',
    description: 'Interactive learning sessions that make education fun and engaging',
    category: 'Educational Play',
    galleryRoute: 'educational-play'
  },
  {
    id: 3,
    type: 'image',
    src: '/hero3.webp',
    title: 'Happy Moments',
    description: 'Capturing the joy and laughter that fills our classrooms every day',
    category: 'Daily Life',
    galleryRoute: 'daily-life'
  },
  {
    id: 4,
    type: 'image',
    src: '/Group 12.webp',
    title: 'Group Activities',
    description: 'Building friendships and social skills through collaborative activities',
    category: 'Social Development',
    galleryRoute: 'social-development'
  },
  {
    id: 5,
    type: 'image',
    src: '/kids.png',
    title: 'Outdoor Adventures',
    description: 'Fresh air and physical activities for healthy development',
    category: 'Outdoor Play',
    galleryRoute: 'outdoor-play'
  },
  {
    id: 6,
    type: 'image',
    src: '/hero4.webp',
    title: 'Christmas Celebration',
    description: 'Festive joy and holiday spirit with our Christmas celebrations',
    category: 'Special Events',
    galleryRoute: 'christmas'
  }
];

const categories = ['All', 'Creative Arts', 'Educational Play', 'Daily Life', 'Social Development', 'Outdoor Play', 'Special Events'];

function OurDays() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMedia = useMemo(() => 
    selectedCategory === 'All' 
      ? mediaItems 
      : mediaItems.filter(item => item.category === selectedCategory),
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
          {categories.map((category) => (
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

        {/* Media Grid */}
        <MediaGrid filteredMedia={filteredMedia} />

        {/* Call to Action */}
        <CallToAction />
      </Container>
    </div>
  );
}

// Memoized MediaGrid Component
const MediaGrid = memo(({ filteredMedia }: {
  filteredMedia: MediaItem[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    {filteredMedia.map((item, index) => (
      <MediaCard key={item.id} item={item} index={index} />
    ))}
  </div>
));
MediaGrid.displayName = 'MediaGrid';

// Memoized MediaCard Component
const MediaCard = memo(({ item, index }: {
  item: MediaItem;
  index: number;
}) => (
  <Link href={`/gallery/${item.galleryRoute}`} className="block">
    <div
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Media Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* View Gallery Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Camera className="w-8 h-8 text-[#7CBD1E]" />
          </div>
        </div>
        
        {/* Media type indicator */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md">
            <Camera className="w-4 h-4 text-[#7CBD1E]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-[#7CBD1E] bg-[#7CBD1E]/10 px-3 py-1 rounded-full">
            {item.category}
          </span>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-pink-400" />
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#7CBD1E] transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {item.description}
        </p>
        
        <div className="flex items-center text-[#7CBD1E] text-sm font-medium">
          <span>View Gallery</span>
          <Camera className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  </Link>
));
MediaCard.displayName = 'MediaCard';

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