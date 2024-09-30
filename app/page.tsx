import AboutUs from "@/components/AboutUs";
import Bird from "@/components/Bird";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";



export default function Home() {
  return (
    <main className="relative bg-background" >
      
      <Navbar />
      <Hero />
      <AboutUs /> 
      <Features />



    </main>
    // <HomePage />
  );
}
