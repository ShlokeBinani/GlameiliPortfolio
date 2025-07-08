import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import type { GalleryImage } from "@shared/schema";

type GalleryCategory = 'residential' | 'commercial' | 'transition-to-complete' | null;

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(null);

  const { data: allImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const activeImages = allImages?.filter(img => img.isActive) || [];
  const residentialImages = activeImages.filter(img => img.category === 'residential');
  const commercialImages = activeImages.filter(img => img.category === 'commercial');
  const transitionImages = activeImages.filter(img => img.category === 'transition-to-complete');

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
            Gallery
          </h2>
          <p className="text-xl text-beige-200">
            Explore our diverse portfolio
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
                See our projects from start to stunning finish
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
                transitionImages.map((image) => (
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
