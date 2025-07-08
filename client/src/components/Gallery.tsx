import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import type { GalleryImage } from "@shared/schema";

type GalleryCategory = 'residential' | 'commercial' | 'transition-to-complete' | null;

interface BeforeAfterPair {
  before: GalleryImage;
  after: GalleryImage;
  isShowingAfter: boolean;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(null);
  const [beforeAfterStates, setBeforeAfterStates] = useState<Record<string, boolean>>({});

  const { data: allImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const activeImages = allImages?.filter(img => img.isActive) || [];
  const residentialImages = activeImages.filter(img => img.category === 'residential');
  const commercialImages = activeImages.filter(img => img.category === 'commercial');
  const transitionImages = activeImages.filter(img => img.category === 'transition-to-complete');

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
        duration: 0.3,
        onComplete: () => {
          gsap.to(imageElement, {
            opacity: 1,
            duration: 0.3
          });
        }
      });
    }
  };

  const handleCategoryClick = (category: GalleryCategory) => {
    setSelectedCategory(category);
    
    // Smooth scroll to gallery images
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
      id="gallery" 
      className="parallax-container min-h-screen bg-ochre-500 py-20"
    >
      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(to bottom, var(--ochre-400), var(--ochre-600))' 
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Transition to Complete Box */}
          <div 
            className="hover-scale cursor-pointer glass rounded-2xl p-8 h-80 flex flex-col justify-between group"
            onClick={() => handleCategoryClick('transition-to-complete')}
          >
            <div>
              <h3 className="text-3xl font-bold text-beige-100 mb-4">
                Transition to Complete
              </h3>
              <p className="text-beige-200 text-lg">
                Click on images to see amazing before & after transformations
              </p>
            </div>
            <div className="text-6xl text-beige-100 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              🔄
            </div>
          </div>

          {/* Residential Work Box */}
          <div 
            className="hover-scale cursor-pointer glass rounded-2xl p-8 h-80 flex flex-col justify-between group"
            onClick={() => handleCategoryClick('residential')}
          >
            <div>
              <h3 className="text-3xl font-bold text-beige-100 mb-4">
                Residential
              </h3>
              <p className="text-beige-200 text-lg">
                Beautiful homes designed with care and attention to detail
              </p>
            </div>
            <div className="text-6xl text-beige-100 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              🏠
            </div>
          </div>
          
          {/* Commercial Work Box */}
          <div 
            className="hover-scale cursor-pointer glass rounded-2xl p-8 h-80 flex flex-col justify-between group"
            onClick={() => handleCategoryClick('commercial')}
          >
            <div>
              <h3 className="text-3xl font-bold text-beige-100 mb-4">
                Commercial Work
              </h3>
              <p className="text-beige-200 text-lg">
                Professional spaces that inspire productivity and creativity
              </p>
            </div>
            <div className="text-6xl text-beige-100 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              🏢
            </div>
          </div>
        </div>
        
        {/* Gallery Images */}
        {selectedCategory && (
          <div id="gallery-images" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCategory === 'transition-to-complete' && 
                beforeAfterPairs.map((pair) => {
                  const currentImage = beforeAfterStates[pair.before.id.toString()] ? pair.after : pair.before;
                  const isInteractive = pair.before.id !== pair.after.id;
                  
                  return (
                    <div key={pair.before.id} className="gallery-item">
                      <div 
                        className={`relative group ${isInteractive ? 'cursor-pointer' : ''}`}
                        onClick={() => isInteractive && handleBeforeAfterClick(pair.before.id.toString())}
                      >
                        <img 
                          id={`transition-image-${pair.before.id}`}
                          src={currentImage.imageUrl}
                          alt={currentImage.title}
                          className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        />
                        {isInteractive && (
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-beige-100 px-4 py-2 rounded-full text-ochre-600 font-semibold">
                              {beforeAfterStates[pair.before.id.toString()] ? 'Show Before' : 'Show After'}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <h4 className="text-beige-100 font-medium">
                          {currentImage.title} {isInteractive && (
                            <span className="text-beige-300 text-sm">
                              ({beforeAfterStates[pair.before.id.toString()] ? 'After' : 'Before'})
                            </span>
                          )}
                        </h4>
                        {currentImage.description && (
                          <p className="text-beige-200 text-sm">{currentImage.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              }

              {selectedCategory === 'residential' && 
                residentialImages.map((image) => (
                  <div key={image.id} className="gallery-item">
                    <img 
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                    <div className="mt-2">
                      <h4 className="text-beige-100 font-medium">{image.title}</h4>
                      {image.description && (
                        <p className="text-beige-200 text-sm">{image.description}</p>
                      )}
                    </div>
                  </div>
                ))
              }
              
              {selectedCategory === 'commercial' && 
                commercialImages.map((image) => (
                  <div key={image.id} className="gallery-item">
                    <img 
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                    <div className="mt-2">
                      <h4 className="text-beige-100 font-medium">{image.title}</h4>
                      {image.description && (
                        <p className="text-beige-200 text-sm">{image.description}</p>
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
