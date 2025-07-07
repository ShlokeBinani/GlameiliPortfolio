import { useState } from "react";
import { gsap } from "gsap";

export default function WorkShowcase() {
  const [isAfterImage, setIsAfterImage] = useState(false);

  const handleImageToggle = () => {
    const showcaseImage = document.getElementById('showcase-image');
    
    if (showcaseImage) {
      gsap.to(showcaseImage, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          if (!isAfterImage) {
            (showcaseImage as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900';
            (showcaseImage as HTMLImageElement).alt = 'After renovation - luxury living room';
          } else {
            (showcaseImage as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900';
            (showcaseImage as HTMLImageElement).alt = 'Before renovation - basic living room';
          }
          
          gsap.to(showcaseImage, {
            opacity: 1,
            duration: 0.4
          });
          
          setIsAfterImage(!isAfterImage);
        }
      });
    }
  };

  return (
    <section 
      id="work" 
      className="parallax-container min-h-screen bg-ochre-400 py-20"
    >
      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(to bottom, var(--ochre-300), var(--ochre-500))' 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-beige-100 mb-4">
            Our Work
          </h2>
          <p className="text-xl text-beige-200">
            Transforming spaces with creativity and precision
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative group cursor-pointer" onClick={handleImageToggle}>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img 
                id="showcase-image"
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900"
                alt="Before renovation - basic living room"
                className="w-full h-full object-cover image-transition"
              />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="glass-button px-8 py-4 rounded-full text-beige-100 font-semibold text-lg hover:bg-opacity-30 transition-all duration-300">
                  {isAfterImage ? 'See Before' : 'See Complete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
