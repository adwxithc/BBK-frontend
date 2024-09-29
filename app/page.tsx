import AboutUs from "@/components/AboutUs";
import Bird from "@/components/Bird";
import Hero from "@/components/Hero";
import Navbar from "@/components/ui/Navbar";



export default function Home() {
  return (
    <main className="relative bg-background" >
      <Bird />
      <Navbar />
      <Hero />
      <AboutUs /> 




    </main>
    // <HomePage />
  );
}
