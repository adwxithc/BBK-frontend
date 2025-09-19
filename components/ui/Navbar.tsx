"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { AlignJustify, X, Phone, Mail } from 'lucide-react';

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const navItems = [
        { id: 1, text: 'Home', href: '/', icon: '🏠' },
        { id: 2, text: 'Programs', href: '/programs', icon: '📚' },
        { id: 3, text: 'Gallery', href: '/gallery', icon: '🎨' },
        { id: 4, text: 'About', href: '/about', icon: '❤️' },
        { id: 5, text: 'Contact', href: '/contact', icon: '📞' },
    ];

    return (
        <nav className='fixed top-0 w-full z-50 transition-all duration-300'>
            {/* Top info bar - Mobile optimized */}
            <div className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white text-sm py-2 px-4'>
                <div className='max-w-[1240px] mx-auto flex justify-between items-center'>
                    <div className='flex items-center gap-2 sm:gap-4'>
                        <div className='flex items-center gap-1 sm:gap-2'>
                            <Phone className='w-3 h-3 sm:w-4 sm:h-4' />
                            <span className='font-medium text-xs sm:text-sm'>(555) 123-KIDS</span>
                        </div>
                        <div className='items-center gap-1 sm:gap-2 hidden sm:flex'>
                            <Mail className='w-3 h-3 sm:w-4 sm:h-4' />
                            <span className='font-medium text-xs sm:text-sm'>hello@bunnybabies.com</span>
                        </div>
                    </div>
                    <div className='text-xs sm:text-sm font-medium'>
                        🕒 <span className='hidden sm:inline'>Mon-Fri: </span>7AM-6PM
                    </div>
                </div>
            </div>

            {/* Main navigation - Mobile optimized */}
            <div className='bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'>
                <div className='max-w-[1240px] mx-auto px-4'>
                    <div className='flex items-center justify-between h-16 sm:h-20'>
                        {/* Mobile menu button - Enhanced touch target */}
                        <button 
                            onClick={handleNav} 
                            className='block md:hidden z-50 p-3 rounded-xl bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation'
                            aria-label={nav ? 'Close menu' : 'Open menu'}
                        >
                            {nav ? <X className='w-5 h-5 sm:w-6 sm:h-6' /> : <AlignJustify className='w-5 h-5 sm:w-6 sm:h-6' />}
                        </button>

                        {/* Logo - Mobile responsive */}
                        <div className='flex items-center gap-2 sm:gap-3'>
                            <div className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] p-1.5 sm:p-2 rounded-xl shadow-md'>
                                <span className='text-lg sm:text-2xl'>🐰</span>
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] bg-clip-text text-transparent'>
                                    Bunny Babies
                                </h1>
                                <span className='text-xs text-gray-600 font-medium hidden sm:block'>
                                    Kindergarten & Daycare
                                </span>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className='hidden md:flex items-center space-x-2'>
                            {navItems.map(item => (
                                <li key={item.id}>
                                    <Link 
                                        href={item.href}
                                        className='flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-[#7CBD1E] hover:to-[#F1F864] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-md group'
                                    >
                                        <span className='text-lg group-hover:animate-bounce'>{item.icon}</span>
                                        <span>{item.text}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button - Mobile responsive */}
                        <div className='hidden md:block'>
                            <button className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2'>
                                <span>🌟</span>
                                <span>Enroll Now</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu - Enhanced for mobile */}
                <div className={nav ? 'fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-md z-40 md:hidden transition-all duration-300' : 'fixed top-0 left-[-100%] w-full h-full bg-white/95 backdrop-blur-md z-40 md:hidden transition-all duration-500'}>
                    <div className='flex flex-col justify-center items-center h-full space-y-6 px-4'>
                        {/* Mobile logo */}
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] p-3 rounded-xl shadow-lg'>
                                <span className='text-3xl'>🐰</span>
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] bg-clip-text text-transparent'>
                                    Bunny Babies
                                </h1>
                                <span className='text-sm text-gray-600 font-medium'>
                                    Kindergarten & Daycare
                                </span>
                            </div>
                        </div>

                        {/* Mobile menu items - Enhanced touch targets */}
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={handleNav}
                                className='flex items-center gap-4 text-xl sm:text-2xl font-bold text-gray-700 hover:bg-gradient-to-r hover:from-[#7CBD1E] hover:to-[#F1F864] hover:text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 w-full max-w-sm text-center touch-manipulation'
                            >
                                <span className='text-2xl sm:text-3xl'>{item.icon}</span>
                                <span>{item.text}</span>
                            </Link>
                        ))}

                        {/* Mobile CTA - Enhanced */}
                        <button 
                            onClick={handleNav}
                            className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-8 sm:px-12 py-4 rounded-full font-bold text-lg sm:text-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mt-6 touch-manipulation'
                        >
                            <span className='text-xl sm:text-2xl'>🌟</span>
                            <span>Enroll Now</span>
                        </button>

                        {/* Contact info in mobile - Responsive */}
                        <div className='flex flex-col items-center gap-3 mt-6 text-gray-600'>
                            <div className='flex items-center gap-2'>
                                <Phone className='w-4 h-4 sm:w-5 sm:h-5' />
                                <span className='font-medium text-sm sm:text-base'>(555) 123-KIDS</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Mail className='w-4 h-4 sm:w-5 sm:h-5' />
                                <span className='font-medium text-sm sm:text-base'>hello@bunnybabies.com</span>
                            </div>
                            <div className='text-xs sm:text-sm text-gray-500 font-medium mt-2'>
                                🕒 Mon-Fri: 7:00 AM - 6:00 PM
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
