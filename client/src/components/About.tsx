import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import glamLogo from "@assets/glam_logo-removebg-preview_1751912831055.png";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    // Animate logo entrance
    gsap.fromTo(".logo-container", 
      { x: -100, opacity: 0, rotation: -10 },
      { 
        x: 0, 
        opacity: 1, 
        rotation: 0,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate content entrance
    gsap.fromTo(".about-content", 
      { x: 100, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 75%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Add floating animation to logo
    gsap.to(".logo-animation", {
      y: -15,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Add parallax effect to background elements
    gsap.to(".about-floating-element", {
      y: -50,
      duration: 4,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

    const logo = document.querySelector('.logo-animation');
    if (logo) {
      logo.classList.add('pulse-animation');
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={aboutRef}
      id="about" 
      className="parallax-container bg-beige-200 py-16 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="about-floating-element absolute top-20 right-20 w-40 h-40 bg-ochre-400 opacity-5 rounded-full"></div>
        <div className="about-floating-element absolute bottom-32 left-10 w-32 h-32 bg-beige-100 opacity-10 rounded-full" style={{animationDelay: '1s'}}></div>
        <div className="about-floating-element absolute top-1/2 right-1/4 w-24 h-24 bg-ochre-300 opacity-8 rounded-full" style={{animationDelay: '2s'}}></div>
      </div>

      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(to bottom, var(--beige-100), var(--beige-300))' 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-5xl mx-auto">
          <div ref={logoRef} className="logo-container lg:w-2/5 mb-6 lg:mb-0 flex justify-center">
            <div className="logo-animation relative group">
              <div className="w-40 h-40 bg-ochre-500 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:shadow-3xl hover:scale-110 relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-beige-100/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <img 
                  src={glamLogo} 
                  alt="Glameili Logo" 
                  className="w-28 h-28 object-contain relative z-10 transform transition-all duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 w-40 h-40 bg-ochre-400 opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-500"></div>
            </div>
          </div>
          
          <div ref={contentRef} className="about-content lg:w-3/5 lg:pl-6">
            <h2 className="text-4xl md:text-5xl font-bold text-ochre-600 mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
              <span className="inline-block hover:animate-pulse">About</span>{" "}
              <span className="inline-block hover:animate-pulse" style={{animationDelay: '0.1s'}}>Glameili</span>
            </h2>
            
            <div className="text-xl leading-relaxed text-ochre-700">
              <p 
                className="transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg p-4 rounded-lg hover:bg-beige-100/50"
                style={{
                  filter: 'none',
                  transition: 'filter 0.3s ease, transform 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'contrast(1.2) saturate(1.3) blur(0.5px)';
                  e.currentTarget.style.imageRendering = 'pixelated';
                  
                  // Add sparkle effect
                  gsap.to(e.currentTarget, {
                    boxShadow: '0 0 20px rgba(204, 137, 0, 0.3)',
                    duration: 0.3
                  });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'none';
                  e.currentTarget.style.imageRendering = 'auto';
                  
                  gsap.to(e.currentTarget, {
                    boxShadow: '0 0 0px rgba(204, 137, 0, 0)',
                    duration: 0.3
                  });
                }}
              >
                ✨ Glameili is a premier interior décor company dedicated to transforming homes and workplaces with innovative designs and impeccable craftsmanship.
              </p>
            </div>

            {/* Additional interactive elements */}
            <div className="mt-8 flex flex-wrap gap-4">
              {['🏠 Residential', '🏢 Commercial', '✨ Premium Design'].map((tag, index) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-ochre-500/20 text-ochre-700 rounded-full text-sm font-medium hover:bg-ochre-500/30 hover:scale-110 transition-all duration-300 cursor-default"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
