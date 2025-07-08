import { useEffect } from "react";
import { gsap } from "gsap";
import VariableText from "./VariableText";
import GradientText from "./GradientText";

export default function Hero() {
  useEffect(() => {
    // Create timeline for entrance animations
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set(".hero-title", { y: 100, opacity: 0 });
    gsap.set(".hero-tagline", { y: 50, opacity: 0 });
    gsap.set(".hero-bg", { scale: 1.2, opacity: 0 });
    
    // Animate entrance
    tl.to(".hero-bg", { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" })
      .to(".hero-title", { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }, "-=0.8")
      .to(".hero-tagline", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");
    
    // Add floating animation
    gsap.to(".hero-content", {
      y: -10,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero-parallax');
      if (parallax) {
        gsap.to(parallax, {
          y: scrolled * 0.5,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="parallax-container min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(45deg, var(--ochre-400), var(--beige-300))' 
      }}
    >
      <div 
        className="hero-bg parallax-bg absolute inset-0"
        style={{ 
          background: 'linear-gradient(45deg, var(--ochre-600), var(--beige-400))' 
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-parallax absolute top-10 left-10 w-32 h-32 bg-beige-100 opacity-10 rounded-full animate-pulse"></div>
        <div className="hero-parallax absolute top-1/4 right-20 w-24 h-24 bg-ochre-300 opacity-20 rounded-full" style={{animationDelay: '1s'}}></div>
        <div className="hero-parallax absolute bottom-20 left-1/4 w-40 h-40 bg-beige-200 opacity-15 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
      </div>
      
      <div className="hero-content relative z-10 text-center">
        <div className="hero-title mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-beige-100 tracking-wider hover:scale-105 transition-transform duration-300 cursor-default">
            <VariableText text="Glameili" />
          </h1>
        </div>
        
        <div className="hero-tagline">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium hover:scale-105 transition-transform duration-300 cursor-default">
            <GradientText text="Let us Help Decorate your Home & Workplace" />
          </h2>
        </div>

        {/* Call to action with smooth scroll */}
        <div className="mt-12 opacity-0 animate-fade-in-up" style={{animationDelay: '2s'}}>
          <button 
            onClick={() => {
              document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group glass-button px-8 py-4 rounded-full text-beige-100 font-semibold text-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
          >
            <span className="flex items-center gap-2">
              Explore Our Work
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
