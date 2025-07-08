import { useEffect } from "react";
import ScrambledText from "./ScrambledText";
import glamLogo from "@assets/glam_logo-removebg-preview_1751912831055.png";

export default function About() {
  useEffect(() => {
    const logo = document.querySelector('.logo-animation');
    if (logo) {
      logo.classList.add('pulse-animation');
    }
  }, []);

  return (
    <section 
      id="about" 
      className="parallax-container min-h-screen bg-beige-200 py-20"
    >
      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(to bottom, var(--beige-100), var(--beige-300))' 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="logo-animation">
              <div className="w-48 h-48 bg-ochre-500 rounded-full flex items-center justify-center shadow-2xl">
                <img 
                  src={glamLogo} 
                  alt="Glameili Logo" 
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 lg:pl-12">
            <h2 className="text-4xl md:text-5xl font-bold text-ochre-600 mb-8">
              About Glameili
            </h2>
            
            <div className="scramble-text text-xl leading-relaxed text-ochre-700 max-w-3xl">
              <ScrambledText 
                text="Glameili is a premier interior décor company dedicated to transforming homes and workplaces with innovative designs and impeccable craftsmanship."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
