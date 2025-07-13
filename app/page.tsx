import AboutUs from "@/components/AboutUs";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import OurPrograms from "@/components/OurPrograms";
import Navbar from "@/components/ui/Navbar";



export default function Home() {
  return (
    <main className="relative bg-background" >
      <Navbar />
      <Hero />

      <AboutUs />
      <OurPrograms />
      <Gallery />
      {/* <Features /> */}
    </main>
  );
}
