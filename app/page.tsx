import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";

// Lazy load components that are below the fold
const AboutUs = dynamic(() => import("@/components/AboutUs"), {
  loading: () => <ComponentSkeleton />,
  ssr: true
});

const OurPrograms = dynamic(() => import("@/components/OurPrograms"), {
  loading: () => <ComponentSkeleton />,
  ssr: true
});


const OurDays = dynamic(() => import("@/components/OurDays"), {
  loading: () => <ComponentSkeleton />,
  ssr: true
});

// Loading skeleton component
function ComponentSkeleton() {
  return (
    <div className="py-20 bg-gradient-to-b from-white via-green-50/30 to-yellow-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          {/* Description skeleton */}
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`skeleton-${i}`} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="h-48 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default function Home() {
  return (
    <main className="relative bg-background" >
      <Navbar />
      <Hero />

      <AboutUs />
      <OurPrograms />
      <OurDays />
    </main>
  );
}
