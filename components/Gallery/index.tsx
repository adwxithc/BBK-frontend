'use client';

import React from 'react';
import Container from '../Container';
import Image from 'next/image';
import { EVENT_CATEGORIES } from '@/data/EventCategories';
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

function Gallery() {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const formatEventName = (name: string) => {
        return name.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div className='bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden py-20'>
            {/* Background decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 right-20 w-32 h-32 bg-[#7CBD1E]/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#F1F864]/20 rounded-full animate-bounce animation-delay-2000"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-300/20 rounded-full animate-pulse animation-delay-1000"></div>
                
                {/* Emoji decorations */}
                <div className="absolute top-32 left-1/4 text-4xl opacity-20 animate-bounce animation-delay-1000">🎊</div>
                <div className="absolute bottom-40 right-1/3 text-3xl opacity-20 animate-pulse animation-delay-2000">🎉</div>
                <div className="absolute top-1/3 right-10 text-2xl opacity-20 animate-bounce animation-delay-3000">🎈</div>
            </div>

            <Container className='relative z-10'>
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-[#7CBD1E] font-bold text-sm mb-6 shadow-lg border border-white/50">
                        <Sparkles className="w-5 h-5" />
                        Special Events & Celebrations
                    </div>
                    
                    <h2 className='text-5xl md:text-6xl font-bold mb-6 leading-tight'>
                        <span className="block text-gray-800">Memorable</span>
                        <span className="block bg-gradient-to-r from-[#7CBD1E] via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            Celebrations
                        </span>
                    </h2>
                    
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                        Get a glimpse of the fantastic events coordinated by our dedicated teachers. 
                        Every celebration becomes a learning opportunity filled with joy and wonder.
                    </p>
                </div>

                {/* Events Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12'>
                    {EVENT_CATEGORIES.map((item, index) => (
                        <div 
                            key={item.id} 
                            className='group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105'
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Image Container */}
                            <div className='relative h-64 overflow-hidden'>
                                <Image 
                                    src={item.image} 
                                    alt={`${formatEventName(item.name)} celebration`}
                                    fill
                                    className='object-cover transition-transform duration-700 group-hover:scale-110'
                                />
                                
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Floating badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#7CBD1E] font-bold text-xs shadow-md">
                                        🎉 Special Event
                                    </div>
                                </div>

                                {/* Date badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="bg-[#7CBD1E] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                        {formatDate(item.date)}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                {/* Event details */}
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Annual Event</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>All Ages</span>
                                    </div>
                                </div>
                                
                                <h3 className='text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#7CBD1E] transition-colors duration-300'>
                                    {formatEventName(item.name)}
                                </h3>
                                
                                <p className='text-gray-600 leading-relaxed mb-6'>
                                    {item.description || "A wonderful celebration that brings our school community together with joy, learning, and unforgettable memories for all our little ones."}
                                </p>

                                {/* Action button */}
                                <Link href={`/gallery/${item.name}`}>
                                    <button className="flex items-center gap-2 font-bold text-sm transition-all duration-300 transform text-[#7CBD1E] hover:text-[#F1F864] hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-[#7CBD1E] group-hover:to-[#F1F864] group-hover:text-white group-hover:px-6 group-hover:py-3 group-hover:rounded-full group-hover:shadow-lg">
                                        View Photo Gallery
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>

                            {/* Hover effect decoration */}
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#F1F864] rounded-full animate-ping"></div>
                                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#7CBD1E] rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Section */}
                <div className="text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-3xl mx-auto">
                        <div className="flex justify-center mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl animate-bounce">🎊</span>
                                <span className="text-3xl animate-pulse animation-delay-500">🎉</span>
                                <span className="text-3xl animate-bounce animation-delay-1000">🎈</span>
                            </div>
                        </div>
                        
                        <h3 className='text-3xl font-bold text-gray-800 mb-4'>
                            Join Our Next Celebration!
                        </h3>
                        
                        <p className='text-gray-600 mb-6 text-lg leading-relaxed'>
                            Be part of our vibrant school community. Every event is an opportunity for your child 
                            to learn, grow, and create beautiful memories with friends.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                <Calendar className="w-5 h-5" />
                                View Event Calendar
                            </button>
                            <button className="border-2 border-[#7CBD1E] text-[#7CBD1E] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#7CBD1E] hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Visit Our Campus
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Gallery;
