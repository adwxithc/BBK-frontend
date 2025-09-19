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
            {/* Top info bar */}
            <div className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white text-sm py-2 px-4'>
                <div className='max-w-[1240px] mx-auto flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <Phone className='w-4 h-4' />
                            <span className='font-medium'>(555) 123-KIDS</span>
                        </div>
                        <div className='items-center gap-2 hidden sm:flex'>
                            <Mail className='w-4 h-4' />
                            <span className='font-medium'>hello@bunnybabies.com</span>
                        </div>
                    </div>
                    <div className='text-xs font-medium'>
                        🕒 Mon-Fri: 7:00 AM - 6:00 PM
                    </div>
                </div>
            </div>

            {/* Main navigation */}
            <div className='bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'>
                <div className='max-w-[1240px] mx-auto px-4'>
                    <div className='flex items-center justify-between h-20'>
                        {/* Mobile menu button */}
                        <button onClick={handleNav} className='block md:hidden z-50 p-2 rounded-xl bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white shadow-md hover:shadow-lg transition-all duration-300'>
                            {nav ? <X className='w-6 h-6' /> : <AlignJustify className='w-6 h-6' />}
                        </button>

                        {/* Logo */}
                        <div className='flex items-center gap-3'>
                            <div className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] p-2 rounded-xl shadow-md'>
                                <span className='text-2xl'>🐰</span>
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] bg-clip-text text-transparent'>
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

                        {/* CTA Button */}
                        <div className='hidden md:block'>
                            <button className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-6 py-3 rounded-full font-bold text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2'>
                                <span>🌟</span>
                                {" "}Enroll Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={nav ? 'fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-md z-40 md:hidden' : 'fixed top-0 left-[-100%] w-full h-full bg-white/95 backdrop-blur-md z-40 md:hidden transition-all duration-500'}>
                    <div className='flex flex-col justify-center items-center h-full space-y-8'>
                        {/* Mobile logo */}
                        <div className='flex items-center gap-3 mb-8'>
                            <div className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] p-3 rounded-xl shadow-lg'>
                                <span className='text-3xl'>🐰</span>
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='text-3xl font-bold bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] bg-clip-text text-transparent'>
                                    Bunny Babies
                                </h1>
                                <span className='text-sm text-gray-600 font-medium'>
                                    Kindergarten & Daycare
                                </span>
                            </div>
                        </div>

                        {/* Mobile menu items */}
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={handleNav}
                                className='flex items-center gap-4 text-2xl font-bold text-gray-700 hover:bg-gradient-to-r hover:from-[#7CBD1E] hover:to-[#F1F864] hover:text-white px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105'
                            >
                                <span className='text-3xl'>{item.icon}</span>
                                <span>{item.text}</span>
                            </Link>
                        ))}

                        {/* Mobile CTA */}
                        <button 
                            onClick={handleNav}
                            className='bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mt-8'
                        >
                            <span className='text-2xl'>🌟</span>
                            {" "}Enroll Now
                        </button>

                        {/* Contact info in mobile */}
                        <div className='flex flex-col items-center gap-2 mt-8 text-gray-600'>
                            <div className='flex items-center gap-2'>
                                <Phone className='w-5 h-5' />
                                <span className='font-medium'>(555) 123-KIDS</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Mail className='w-5 h-5' />
                                <span className='font-medium'>hello@bunnybabies.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
