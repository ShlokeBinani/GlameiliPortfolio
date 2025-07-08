import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.classList.toggle('shadow-lg', window.scrollY > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ochre-500 transition-shadow duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-beige-100 text-xl font-bold">Glameili</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-beige-100 hover:text-beige-200 transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-beige-100 hover:text-beige-200 transition-colors duration-300"
            >
              About Me
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-beige-100 hover:text-beige-200 transition-colors duration-300"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-beige-100 hover:text-beige-200 transition-colors duration-300"
            >
              Contact
            </button>
            <a 
              href="/admin"
              className="text-beige-100 hover:text-beige-200 transition-colors duration-300"
            >
              Admin
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-beige-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-beige-100 hover:text-beige-200 transition-colors duration-300 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-beige-100 hover:text-beige-200 transition-colors duration-300 text-left"
              >
                About Me
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-beige-100 hover:text-beige-200 transition-colors duration-300 text-left"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-beige-100 hover:text-beige-200 transition-colors duration-300 text-left"
              >
                Contact
              </button>
              <a 
                href="/admin"
                className="text-beige-100 hover:text-beige-200 transition-colors duration-300 text-left"
              >
                Admin
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
