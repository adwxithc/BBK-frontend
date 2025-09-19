import Image from 'next/image';
import React from 'react';
import Container from '../Container';
import { BookOpen, Users, Heart, Star, Clock, Award, Baby, GraduationCap } from 'lucide-react';

const programs = [
  {
    id: 1,
    title: "Toddler Care",
    subtitle: "Ages 6 months - 2 years",
    description: "Gentle, nurturing care for your littlest ones with age-appropriate activities that promote early development and social skills.",
    icon: Baby,
    color: "from-pink-400 to-rose-400",
    features: ["Sensory Play", "Early Motor Skills", "Caring Environment", "Flexible Schedules"],
    bgColor: "bg-pink-50",
    iconBg: "bg-pink-100"
  },
  {
    id: 2,
    title: "Preschool Program",
    subtitle: "Ages 3 - 4 years",
    description: "Interactive learning through play, building foundational skills in literacy, numeracy, and social development.",
    icon: BookOpen,
    color: "from-blue-400 to-cyan-400",
    features: ["Early Literacy", "Creative Arts", "Social Skills", "STEM Introduction"],
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100"
  },
  {
    id: 3,
    title: "Kindergarten",
    subtitle: "Ages 5 - 6 years",
    description: "Comprehensive school readiness program preparing children for elementary education with confidence and enthusiasm.",
    icon: GraduationCap,
    color: "from-[#7CBD1E] to-[#F1F864]",
    features: ["School Readiness", "Advanced Learning", "Leadership Skills", "Critical Thinking"],
    bgColor: "bg-green-50",
    iconBg: "bg-green-100"
  }
];

const highlights = [
  { icon: Users, text: "Small Class Sizes", subtext: "Max 12 children per class" },
  { icon: Award, text: "Certified Teachers", subtext: "Expert early childhood educators" },
  { icon: Clock, text: "Flexible Hours", subtext: "7:00 AM - 6:00 PM" },
  { icon: Heart, text: "Loving Environment", subtext: "Where every child feels valued" }
];

function OurPrograms() {
  return (
    <div className='bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative pt-16 pb-20 overflow-hidden'>
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#7CBD1E]/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#F1F864]/20 rounded-full animate-bounce animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full animate-pulse animation-delay-1000"></div>
        
        {/* Emoji decorations */}
        <div className="absolute top-32 right-1/4 text-4xl opacity-20 animate-bounce animation-delay-1000">📚</div>
        <div className="absolute bottom-40 left-1/3 text-3xl opacity-20 animate-pulse animation-delay-2000">🎯</div>
        <div className="absolute top-1/3 right-10 text-2xl opacity-20 animate-bounce animation-delay-3000">⭐</div>
      </div>

      {/* Cloud decoration at top */}
      <div className="z-10 absolute -top-5 sm:-top-10 md:-top-14 xl:-top-20 w-full">
        <Image layout="responsive" width={1200} height={100} src="/cloud.webp" alt="decorative clouds" />
      </div>

      <Container className="relative z-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-[#7CBD1E] font-bold text-sm mb-6 shadow-lg border border-white/50">
            <GraduationCap className="w-5 h-5" />
            Educational Excellence
          </div>
          
          <h2 className='text-5xl md:text-6xl font-bold mb-6 leading-tight'>
            <span className="block text-gray-800">Our Learning</span>
            <span className="block bg-gradient-to-r from-[#7CBD1E] via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Programs
            </span>
          </h2>
          
          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Thoughtfully designed programs that nurture each child&apos;s unique potential, 
            fostering growth through play-based learning and individualized attention.
          </p>
        </div>

        {/* Programs Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <div 
                key={program.id} 
                className={`group relative ${program.bgColor} backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Header with icon */}
                <div className={`${program.iconBg} p-6 relative`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className='text-2xl font-bold text-gray-800 mb-1'>
                    {program.title}
                  </h3>
                  
                  <p className='text-sm font-semibold text-gray-600 mb-4'>
                    {program.subtitle}
                  </p>
                  
                  {/* Decorative element */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <Star className="w-8 h-8 text-gray-400 animate-pulse" />
                  </div>
                </div>

                {/* Content */}
                <div className='p-6 bg-white/60 backdrop-blur-sm'>
                  <p className='text-gray-700 leading-relaxed mb-6'>
                    {program.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-bold text-gray-800 text-sm">Program Highlights:</h4>
                    {program.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className={`w-2 h-2 bg-gradient-to-r ${program.color} rounded-full`}></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action button */}
                  <button className={`w-full bg-gradient-to-r ${program.color} text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}>
                    Learn More
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#7CBD1E] rounded-full animate-bounce"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlights Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose Bunny Babies?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight) => {
              const IconComponent = highlight.icon;
              return (
                <div 
                  key={highlight.text}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] rounded-full shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-2">
                    {highlight.text}
                  </h4>
                  
                  <p className="text-sm text-gray-600">
                    {highlight.subtext}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] rounded-3xl p-8 shadow-xl text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Begin Your Child&apos;s Journey? 🌟
            </h3>
            
            <p className="text-lg mb-6 opacity-90">
              Schedule a tour today and see how we can help your child thrive in a loving, educational environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#7CBD1E] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Schedule a Tour
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#7CBD1E] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default OurPrograms;
