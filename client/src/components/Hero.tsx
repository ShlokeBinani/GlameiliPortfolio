import { useState, useEffect } from "react";
import { gsap } from "gsap";
import VariableText from "./VariableText";
import GradientText from "./GradientText";

interface ImagePair {
  before: string;
  after: string;
  title: string;
}

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAfterImage, setIsAfterImage] = useState(false);

  // Your before/after image pairs - Add your images here!
  const imagePairs: ImagePair[] = [
    {
      before: "/images/showcase/living-room-before.jpg",
      after: "/images/showcase/living-room-after.jpg", 
      title: "Living Room Transformation"
    },
    {
      before: "/images/showcase/kitchen-before.jpg",
      after: "/images/showcase/kitchen-after.jpg",
      title: "Kitchen Makeover"
    },
    {
      before: "/images/showcase/bedroom-before.jpg", 
      after: "/images/showcase/bedroom-after.jpg",
      title: "Bedroom Redesign"
    }
    // Add more image pairs here as needed
  ];

  const currentPair = imagePairs[currentImageIndex];
  const currentImage = isAfterImage ? currentPair?.after : currentPair?.before;

  const handleImageToggle = () => {
    const showcaseImage = document.getElementById('hero-showcase-image');
    
    if (showcaseImage && currentPair) {
      gsap.to(showcaseImage, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          setIsAfterImage(!isAfterImage);
          gsap.to(showcaseImage, {
            opacity: 1,
            duration: 0.4
          });
        }
      });
    }
  };

  const nextImagePair = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagePairs.length);
    setIsAfterImage(false); // Reset to before image
  };

  const prevImagePair = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagePairs.length) % imagePairs.length);
    setIsAfterImage(false); // Reset to before image
  };

  // Auto-advance images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAfterImage) {
        nextImagePair();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isAfterImage]);

  return (
    <section 
      id="home" 
      className="parallax-container min-h-screen flex flex-col items-center justify-center relative"
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
      
      <div className="relative z-10 text-center mb-12">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-beige-100 tracking-wider">
            <VariableText text="Glameili" />
          </h1>
        </div>
        
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">
            <GradientText text="Let us Help Decorate your Home & Workplace" />
          </h2>
        </div>
      </div>

      {/* Image Showcase Section */}
      {currentPair && (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <div className="relative group cursor-pointer" onClick={handleImageToggle}>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img 
                id="hero-showcase-image"
                src={currentImage}
                alt={`${currentPair.title} - ${isAfterImage ? 'After' : 'Before'}`}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  // Fallback to a placeholder if image doesn't exist
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg width='800' height='450' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' dy='.3em' fill='%23999'%3EAdd your image: " + currentImage + "%3C/text%3E%3C/svg%3E";
                }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="glass-button px-8 py-4 rounded-full text-beige-100 font-semibold text-lg hover:bg-opacity-30 transition-all duration-300">
                  {isAfterImage ? 'See Before' : 'See Complete'}
                </button>
              </div>
            </div>

            {/* Navigation arrows */}
            {imagePairs.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImagePair(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-button p-3 rounded-full text-beige-100 opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  ←
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImagePair(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-button p-3 rounded-full text-beige-100 opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Image info */}
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-beige-100 mb-2">
              {currentPair.title}
            </h3>
            <div className="flex justify-center space-x-2 mb-2">
              {imagePairs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { setCurrentImageIndex(index); setIsAfterImage(false); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-beige-100' : 'bg-beige-100 opacity-40'
                  }`}
                />
              ))}
            </div>
            <p className="text-beige-200 text-sm">
              {isAfterImage ? 'After' : 'Before'} • {currentImageIndex + 1} of {imagePairs.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
