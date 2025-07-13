"use client";
import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import Image from 'next/image';
import { AlignJustify, X } from 'lucide-react';

const Navbar = () => {
    // State to manage the navbar's visibility
    const [nav, setNav] = useState(false);

    // Toggle function to handle the navbar's display
    const handleNav = () => {
        setNav(!nav);
    };

    // Array containing navigation items
    const navItems = [
        { id: 1, text: 'Home', href: '/' },
        { id: 2, text: 'Company', href: '/company' },
        { id: 3, text: 'Resources', href: '/resources' },
        { id: 4, text: 'About', href: '/about' },
        { id: 5, text: 'Contact', href: '/contact' },
    ];

    return (
        <nav className=' text-black/70 font-semibold  absolute top-0 w-full'>
            <div className='bg-secondary px-4'>
                <div className=' flex items-center gap-2 max-w-[1240px] mx-auto container h-20'>
                    {/* Mobile Navigation Icon */}
                    <div onClick={handleNav} className='block md:hidden'>
                        {nav ? <button><X /></button> : <button><AlignJustify /></button>}
                    </div>

                    {/* Logo */}
                    <h1 className='w-full text-3xl font-bold'>Bunny Babies</h1>

                    {/* Desktop Navigation */}
                    <ul className='hidden md:flex'>
                        {navItems.map(item => (
                            <li
                                key={item.id}
                                className='p-4 rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                            >
                                <Link href={item.href}>{item.text}</Link> {/* Use Link instead of a */}
                            </li>
                        ))}
                    </ul>

                    

                    {/* Mobile Navigation Menu */}
                    <ul
                        className={
                            nav
                                ? 'fixed md:hidden z-20 left-0 top-0 w-full sm:w-[60%] h-full border-r border-r-neutral-400 bg-secondary ease-in-out duration-500'
                                : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                        }
                    >
                        {/* Mobile Logo */}
                        <div className='flex p-4 justify-between'>
                            <h1 className='w-full text-3xl font-bold '>Bunny Babies</h1>
                            <button className='cursor-pointer' onClick={handleNav}><X /></button>
                        </div>


                        {/* Mobile Navigation Items */}
                        {navItems.map(item => (
                            <li
                                key={item.id}
                                className='p-4  rounded-md hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer hover:bg-neutral-200/40'
                            >
                                <Link href={item.href}>{item.text}</Link> {/* Use Link instead of a */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='w-full  z-10 relative -top-1 xl:-top-2 overflow-hidden'>
                <Image width={1200} height={50} layout="responsive"
                 src="/melting.webp" alt="melting ice" />
            </div>
        </nav>
    );
};

export default Navbar;
