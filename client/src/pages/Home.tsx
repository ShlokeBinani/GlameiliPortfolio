import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkShowcase from "@/components/WorkShowcase";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { setupParallax } from "@/utils/animations";

export default function Home() {
  useEffect(() => {
    setupParallax();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <WorkShowcase />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
