import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";
import ComponentSkeleton from "@/components/ui/ComponentSkeleton";

// Lazy load components that are below the fold
const AboutUs = dynamic(() => import("@/components/AboutUs"), {
  loading: () => <ComponentSkeleton rows={3} />,
  ssr: true
});

const OurPrograms = dynamic(() => import("@/components/OurPrograms"), {
  loading: () => <ComponentSkeleton rows={4} />,
  ssr: true
});

const OurDays = dynamic(() => import("@/components/OurDays"), {
  loading: () => <ComponentSkeleton rows={5} />,
  ssr: true
});

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <AboutUs />
      <OurPrograms />
      <OurDays />
    </main>
  );
}