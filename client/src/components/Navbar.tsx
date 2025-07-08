import { useState, useEffect } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Animate navbar entrance
    gsap.fromTo("nav", 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (scrolled) {
          gsap.to(navbar, {
            backgroundColor: 'rgba(204, 137, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(navbar, {
            backgroundColor: 'var(--ochre-500)',
            backdropFilter: 'blur(0px)',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll with offset
      const elementPosition = element.offsetTop - 80;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Animate menu opening
      gsap.fromTo(".mobile-menu", 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(".mobile-menu-item", 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out", delay: 0.1 }
      );
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="text-beige-100 text-xl font-bold cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => scrollToSection('home')}
          >
            <span className="bg-gradient-to-r from-beige-100 to-beige-200 bg-clip-text text-transparent hover:from-beige-200 hover:to-beige-100 transition-all duration-300">
              Glameili
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Me' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'contact', label: 'Contact' }
            ].map((item, index) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-beige-100 hover:text-beige-200 transition-all duration-300 group py-2 px-4 rounded-lg hover:bg-beige-100/10"
                style={{animationDelay: `${(index + 1) * 0.1}s`}}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-beige-100 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300 transform scale-0 group-hover:scale-100"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-beige-100 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-beige-100 focus:outline-none group"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute top-0 left-0 w-full h-0.5 bg-beige-100 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : ''}`}></span>
                <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-beige-100 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`absolute top-5 left-0 w-full h-0.5 bg-beige-100 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4 bg-ochre-600/20 backdrop-blur-md rounded-xl p-4">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Me' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="mobile-menu-item text-beige-100 hover:text-beige-200 transition-all duration-300 text-left py-3 px-4 rounded-lg hover:bg-beige-100/20 transform hover:translate-x-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
