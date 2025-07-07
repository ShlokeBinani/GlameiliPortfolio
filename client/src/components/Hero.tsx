import { useEffect, useState } from "react";
import VariableText from "./VariableText";
import GradientText from "./GradientText";
import { gsap } from "gsap";

export default function Hero() {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const brandText = document.getElementById('brand-text');
      if (brandText) {
        gsap.to(brandText, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            setShowTagline(true);
          }
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="parallax-container min-h-screen flex items-center justify-center relative"
      style={{ 
        background: 'linear-gradient(45deg, var(--ochre-400), var(--beige-300))' 
      }}
    >
      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(45deg, var(--ochre-600), var(--beige-400))' 
        }}
      />
      
      <div className="relative z-10 text-center">
        <div 
          id="brand-text" 
          className={`mb-8 transition-opacity duration-1000 ${showTagline ? 'opacity-0' : 'opacity-100'}`}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-beige-100 tracking-wider">
            <VariableText text="Glameili" />
          </h1>
        </div>
        
        {showTagline && (
          <div className="opacity-0 animate-in fade-in duration-1000">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">
              <GradientText text="Let us Help Decorate your Home & Workplace" />
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}
