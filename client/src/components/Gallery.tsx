import { useState } from "react";
import { gsap } from "gsap";

type GalleryCategory = 'residential' | 'commercial' | null;

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(null);

  const residentialImages = [
    {
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Modern living room design"
    },
    {
      src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Luxury bedroom interior"
    },
    {
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Modern kitchen design"
    }
  ];

  const commercialImages = [
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Modern office interior"
    },
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Restaurant interior design"
    },
    {
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Retail space design"
    }
  ];

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
              {selectedCategory === 'residential' && 
                residentialImages.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                  </div>
                ))
              }
              
              {selectedCategory === 'commercial' && 
                commercialImages.map((image, index) => (
                  <div key={index} className="gallery-item">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
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
