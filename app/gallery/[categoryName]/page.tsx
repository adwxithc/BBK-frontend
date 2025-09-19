"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/Container";
import { MoveLeft } from "lucide-react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// Gallery data mapping
const galleryData: Record<string, {
  title: string;
  description: string;
  date: string;
  location: string;
  participants: string;
  images: string[];
  theme: string;
}> = {
  christmas: {
    title: "Christmas Celebration",
    description: "Join us in celebrating the magic of Christmas with joy, wonder, and festive cheer. Our little ones create unforgettable memories filled with laughter, crafts, and holiday spirit.",
    date: "December 25, 2024",
    location: "Main Hall & Playground",
    participants: "All Age Groups",
    images: [
      "/pics.jpg",
      "/hero1.webp",
      "/hero2.webp", 
      "/hero3.webp",
      "/hero4.webp",
      "/Group 12.webp"
    ],
    theme: "from-red-50 to-green-50"
  },
  "art-creativity": {
    title: "Art & Creativity Time",
    description: "Exploring artistic expression through colorful paints, creative crafts, and imaginative projects that inspire our young artists to discover their creative potential.",
    date: "Weekly Sessions",
    location: "Art Studio",
    participants: "Ages 3-6",
    images: [
      "/hero1.webp",
      "/pics.jpg",
      "/hero2.webp",
      "/hero3.webp"
    ],
    theme: "from-purple-50 to-pink-50"
  },
  "educational-play": {
    title: "Learning Through Play",
    description: "Interactive learning sessions that make education fun and engaging, combining play with valuable lessons that help children grow and develop essential skills.",
    date: "Daily Activities",
    location: "Classrooms & Play Areas",
    participants: "All Students",
    images: [
      "/hero2.webp",
      "/pics.jpg",
      "/hero1.webp",
      "/hero4.webp"
    ],
    theme: "from-blue-50 to-cyan-50"
  }
};

export default function EventGalleryPage() {
    const onInit = () => {
        console.log("lightGallery has been initialized");
    };
    const { categoryName } = useParams();
    const router = useRouter();
    
    const categoryKey = Array.isArray(categoryName) ? categoryName[0] : categoryName;
    const galleryInfo = galleryData[categoryKey] || galleryData.christmas;

    return (
        <div className={`min-h-screen bg-gradient-to-br ${galleryInfo.theme} relative overflow-hidden`}>
            {/* Background Decorations - Mobile optimized */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-20 sm:w-32 h-20 sm:h-32 bg-[#7CBD1E]/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-16 sm:w-24 h-16 sm:h-24 bg-[#F1F864]/20 rounded-full animate-bounce animation-delay-2000"></div>
                <div className="absolute top-1/2 right-1/4 w-12 sm:w-16 h-12 sm:h-16 bg-pink-300/20 rounded-full animate-pulse animation-delay-1000"></div>
                
                {/* Floating Emojis - Mobile responsive */}
                <div className="absolute top-16 sm:top-32 left-1/4 text-2xl sm:text-4xl opacity-20 animate-bounce animation-delay-1000">🎨</div>
                <div className="absolute bottom-20 sm:bottom-40 right-1/3 text-xl sm:text-3xl opacity-20 animate-pulse animation-delay-2000">📸</div>
                <div className="absolute top-1/3 right-5 sm:right-10 text-lg sm:text-2xl opacity-20 animate-bounce animation-delay-3000">⭐</div>
            </div>

            <Container className="relative z-10 px-4 sm:px-0">
                {/* Header Section - Mobile optimized */}
                <div className="pt-20 pb-8 sm:pb-12">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 sm:gap-8">
                        <div className="flex-1">
                            {/* Badge - Mobile responsive */}
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-[#7CBD1E] font-bold text-xs sm:text-sm mb-4 sm:mb-6 shadow-lg border border-white/50">
                                📷 Gallery Collection
                            </div>
                            
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
                                {galleryInfo.title}
                            </h1>
                            
                            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
                                {galleryInfo.description}
                            </p>

                            {/* Event Details - Mobile responsive */}
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 mb-6 sm:mb-8">
                                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-md">
                                    <span className="text-xl sm:text-2xl">📅</span>
                                    <span className="font-medium text-gray-700 text-sm sm:text-base">{galleryInfo.date}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-md">
                                    <span className="text-xl sm:text-2xl">📍</span>
                                    <span className="font-medium text-gray-700 text-sm sm:text-base">{galleryInfo.location}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-md">
                                    <span className="text-xl sm:text-2xl">👥</span>
                                    <span className="font-medium text-gray-700 text-sm sm:text-base">{galleryInfo.participants}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Back Button - Mobile responsive */}
                        <button
                            onClick={() => router.push('/')}
                            className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 sm:px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md w-full sm:w-auto justify-center touch-manipulation"
                        >
                            <MoveLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Back to Home</span>
                        </button>
                    </div>
                </div>

                {/* Gallery Section - Mobile optimized */}
                <div className="pb-12 sm:pb-20">
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                            Photo Gallery ({galleryInfo.images.length} Photos)
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Click on any image to view in full size with zoom and navigation controls.
                        </p>
                    </div>
                    
                    <LightGallery
                        onInit={onInit}
                        speed={500}
                        plugins={[lgThumbnail, lgZoom]}
                        elementClassNames="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {galleryInfo.images.map((src, index) => (
                            <a 
                                href={src} 
                                key={`gallery-${categoryKey}-${index}`}
                                className="group relative block bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 touch-manipulation"
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={`${galleryInfo.title} moment ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Zoom Icon - Mobile responsive */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-lg sm:text-2xl">🔍</span>
                                        </div>
                                    </div>
                                    
                                    {/* Photo Number Badge - Mobile responsive */}
                                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#7CBD1E] text-white px-2 py-1 rounded-full text-xs font-bold">
                                        {index + 1}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </LightGallery>
                </div>
            </Container>
        </div>
    );
}
