import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryImage } from "@shared/schema";

gsap.registerPlugin(ScrollTrigger);

type GalleryCategory = 'residential' | 'commercial' | 'transition-to-complete' | null;

interface BeforeAfterPair {
  before: GalleryImage;
  after: GalleryImage;
  isShowingAfter: boolean;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(null);
  const [beforeAfterStates, setBeforeAfterStates] = useState<Record<string, boolean>>({});
  const galleryRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  const { data: allImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const activeImages = allImages?.filter(img => img.isActive) || [];
  const residentialImages = activeImages.filter(img => img.category === 'residential');
  const commercialImages = activeImages.filter(img => img.category === 'commercial');
  const transitionImages = activeImages.filter(img => img.category === 'transition-to-complete');

  // Scroll-triggered animations
  useEffect(() => {
    if (!galleryRef.current) return;

    // Animate section entrance
    gsap.fromTo(".gallery-header", 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate category cards with stagger
    gsap.fromTo(".category-card", 
      { y: 80, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate images when category changes
  useEffect(() => {
    if (selectedCategory && imagesRef.current) {
      gsap.fromTo(".gallery-item", 
        { y: 60, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        }
      );
    }
  }, [selectedCategory]);

  // Group transition images into before/after pairs
  const createBeforeAfterPairs = (images: GalleryImage[]): BeforeAfterPair[] => {
    const pairs: BeforeAfterPair[] = [];
    const processedImages = new Set<number>();

    images.forEach(image => {
      if (processedImages.has(image.id)) return;

      const title = image.title.toLowerCase();
      let pairedImage: GalleryImage | undefined;

      // Look for matching before/after pairs
      if (title.includes('before')) {
        const afterTitle = title.replace('before', 'after');
        pairedImage = images.find(img => 
          img.title.toLowerCase() === afterTitle && !processedImages.has(img.id)
        );
      } else if (title.includes('after')) {
        const beforeTitle = title.replace('after', 'before');
        pairedImage = images.find(img => 
          img.title.toLowerCase() === beforeTitle && !processedImages.has(img.id)
        );
      }

      if (pairedImage) {
        const beforeImage = title.includes('before') ? image : pairedImage;
        const afterImage = title.includes('before') ? pairedImage : image;
        
        pairs.push({
          before: beforeImage,
          after: afterImage,
          isShowingAfter: beforeAfterStates[beforeImage.id.toString()] || false
        });
        
        processedImages.add(image.id);
        processedImages.add(pairedImage.id);
      } else {
        // Single image without pair
        pairs.push({
          before: image,
          after: image,
          isShowingAfter: false
        });
        processedImages.add(image.id);
      }
    });

    return pairs;
  };

  const handleBeforeAfterClick = (beforeImageId: string) => {
    setBeforeAfterStates(prev => ({
      ...prev,
      [beforeImageId]: !prev[beforeImageId]
    }));

    // Animate the transition
    const imageElement = document.getElementById(`transition-image-${beforeImageId}`);
    if (imageElement) {
      gsap.to(imageElement, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(imageElement, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }
  };

  const handleCategoryClick = (category: GalleryCategory) => {
    setSelectedCategory(category);
    
    // Smooth scroll to gallery images with offset
    setTimeout(() => {
      const galleryImages = document.getElementById('gallery-images');
      if (galleryImages) {
        galleryImages.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const beforeAfterPairs = createBeforeAfterPairs(transitionImages);

  return (
    <section 
      ref={galleryRef}
      id="gallery" 
      className="parallax-container min-h-screen bg-ochre-500 py-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-beige-100 opacity-5 rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-ochre-300 opacity-10 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(to bottom, var(--ochre-400), var(--ochre-600))' 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="gallery-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-beige-100 mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
            Our Work
          </h2>
          <p className="text-xl text-beige-200 hover:text-beige-100 transition-colors duration-300">
            Transforming spaces with creativity and precision
          </p>
        </div>
        
        <div ref={categoriesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Transition to Complete Box */}
          <div 
            className="category-card hover-scale cursor-pointer glass rounded-2xl p-8 h-80 flex flex-col justify-between group transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            onClick={() => handleCategoryClick('transition-to-complete')}
          >
            <div>
              <h3 className="text-3xl font-bold text-beige-100 mb-4 group-hover:text-beige-200 transition-colors duration-300">
                Transition to Complete
              </h3>
              <p className="text-beige-200 text-lg group-hover:text-beige-100 transition-colors duration-300">
                Click on images to see amazing before & after transformations
              </p>
            </div>
            <div className="text-6xl text-beige-100 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              🔄
            </div>
          </div>

          {/* Residential Work Box */}
          <div 
            className="category-card hover-scale cursor-pointer glass rounded-2xl p-8 h-80 flex flex-col justify-between group transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            onClick={() => handleCategoryClick('residential')}
          >
            <div>
              <h3 className="text-3xl font-bold text-beige-100 mb-4 group-hover:text-beige-200 transition-colors duration-300">
                Residential
              </h3>
              <p className="text-beige-200 text-lg group-hover:text-beige-100 transition-colors duration-300">
                Beautiful homes designed with care and attention to detail
              </p>
            </div>
            <div className="text-6xl text-beige-100 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              🏠
            </div>
          </div>
          
          {/* Commercial Work Box */}
          <div 
            className="category-card hover-scale cursor-pointer glass rounded-2xl p-8 h-80 flex flex-col justify-between group transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            onClick={() => handleCategoryClick('commercial')}
          >
            <div>
              <h3 className="text-3xl font-bold text-beige-100 mb-4 group-hover:text-beige-200 transition-colors duration-300">
                Commercial Work
              </h3>
              <p className="text-beige-200 text-lg group-hover:text-beige-100 transition-colors duration-300">
                Professional spaces that inspire productivity and creativity
              </p>
            </div>
            <div className="text-6xl text-beige-100 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
              🏢
            </div>
          </div>
        </div>
        
        {/* Gallery Images */}
        {selectedCategory && (
          <div ref={imagesRef} id="gallery-images" className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCategory === 'transition-to-complete' && 
                beforeAfterPairs.map((pair, index) => {
                  const currentImage = beforeAfterStates[pair.before.id.toString()] ? pair.after : pair.before;
                  const isInteractive = pair.before.id !== pair.after.id;
                  
                  return (
                    <div key={pair.before.id} className="gallery-item" style={{animationDelay: `${index * 0.1}s`}}>
                      <div 
                        className={`relative group overflow-hidden rounded-lg ${isInteractive ? 'cursor-pointer' : ''} transform transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                        onClick={() => isInteractive && handleBeforeAfterClick(pair.before.id.toString())}
                      >
                        <img 
                          id={`transition-image-${pair.before.id}`}
                          src={currentImage.imageUrl}
                          alt={currentImage.title}
                          className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        {isInteractive && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <div className="bg-beige-100 px-4 py-2 rounded-full text-ochre-600 font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              {beforeAfterStates[pair.before.id.toString()] ? 'Show Before' : 'Show After'}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 transform transition-all duration-300 group-hover:translate-y-1">
                        <h4 className="text-beige-100 font-medium hover:text-beige-200 transition-colors duration-300">
                          {currentImage.title} {isInteractive && (
                            <span className="text-beige-300 text-sm animate-pulse">
                              ({beforeAfterStates[pair.before.id.toString()] ? 'After' : 'Before'})
                            </span>
                          )}
                        </h4>
                        {currentImage.description && (
                          <p className="text-beige-200 text-sm mt-1 opacity-80 hover:opacity-100 transition-opacity duration-300">
                            {currentImage.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              }

              {selectedCategory === 'residential' && 
                residentialImages.map((image, index) => (
                  <div key={image.id} className="gallery-item" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="relative group overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                      <img 
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-beige-100 font-medium hover:text-beige-200 transition-colors duration-300">{image.title}</h4>
                      {image.description && (
                        <p className="text-beige-200 text-sm mt-1 opacity-80 hover:opacity-100 transition-opacity duration-300">{image.description}</p>
                      )}
                    </div>
                  </div>
                ))
              }
              
              {selectedCategory === 'commercial' && 
                commercialImages.map((image, index) => (
                  <div key={image.id} className="gallery-item" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="relative group overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                      <img 
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-beige-100 font-medium hover:text-beige-200 transition-colors duration-300">{image.title}</h4>
                      {image.description && (
                        <p className="text-beige-200 text-sm mt-1 opacity-80 hover:opacity-100 transition-opacity duration-300">{image.description}</p>
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
