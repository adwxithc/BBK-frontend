"use client"; // Required for Framer Motion with Next.js

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function HomePage() {
  const birdRef = useRef(null);

  // Track the scroll progress
  const { scrollYProgress } = useScroll();

  // Transform bird's X position to move across sections (parallax effect)
  const birdX = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const birdY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-blue-200 flex justify-center items-center">
        {/* Bird (parallax effect with Framer Motion) */}
        <motion.div
          ref={birdRef}
          className="absolute w-24 top-10 left-5 z-20"
          style={{ x: birdX, y: birdY }}
        >
          <Image src="/hero4.webp" alt="Flying Bird" width={100} height={100} />
        </motion.div>

        <h1 className="text-4xl font-bold text-white">Welcome to Our Play School</h1>
      </section>

      {/* Next Section */}
      <section className="h-screen bg-yellow-300 flex justify-center items-center">
        <h2 className="text-3xl font-bold">Explore Our Programs</h2>
      </section>

      {/* Another Section */}
      <section className="h-screen bg-green-200 flex justify-center items-center">
        <h2 className="text-3xl font-bold">Meet Our Teachers</h2>
      </section>
    </div>
  );
}
