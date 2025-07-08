import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const contactRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contactRef.current) return;

    // Animate section entrance
    gsap.fromTo(".contact-header", 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate form entrance
    gsap.fromTo(".contact-form", 
      { y: 80, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: formRef.current,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add loading animation
    gsap.to(".submit-button", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    try {
      // Using your Formspree form ID
      const formspreeEndpoint = 'https://formspree.io/f/xvgrjkqq';
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        
        // Success animation
        gsap.to(".contact-form", {
          scale: 1.02,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });

        toast({
          title: "Message sent successfully! ✨",
          description: "Thank you for your message. We'll get back to you soon.",
          variant: "default",
        });
        
        setFormData({ email: '', message: '' });
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Error animation
      gsap.to(".contact-form", {
        x: -10,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "power2.inOut"
      });

      toast({
        title: "Error sending message ❌",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Add focus animation
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target.parentElement, {
      y: -2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target.parentElement, {
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(e.target, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={contactRef}
      id="contact" 
      className="parallax-container min-h-screen bg-beige-300 py-20 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-56 h-56 bg-ochre-400 opacity-5 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-beige-100 opacity-10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(to bottom, var(--beige-200), var(--beige-400))' 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="contact-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ochre-600 mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
            Contact Us
          </h2>
          <p className="text-xl text-ochre-700 hover:text-ochre-600 transition-colors duration-300">
            Ready to transform your space? Let's talk!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div ref={formRef} className={`contact-form glass rounded-2xl p-8 shadow-2xl transition-all duration-500 ${isSuccess ? 'ring-4 ring-green-400 ring-opacity-50' : ''}`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-6 group">
                <label htmlFor="email" className="block text-ochre-700 text-lg font-medium mb-2 group-hover:text-ochre-600 transition-colors duration-300">
                  Email ✉️
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-beige-100 border-2 border-beige-300 focus:border-ochre-500 focus:outline-none text-ochre-700 placeholder-ochre-500 transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-[1.01]"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="mb-6 group">
                <label htmlFor="message" className="block text-ochre-700 text-lg font-medium mb-2 group-hover:text-ochre-600 transition-colors duration-300">
                  Message 💬
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-beige-100 border-2 border-beige-300 focus:border-ochre-500 focus:outline-none text-ochre-700 placeholder-ochre-500 resize-none transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-[1.01]"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button w-full glass-button py-4 rounded-lg text-beige-100 font-semibold text-lg transition-all duration-300 disabled:opacity-50 group relative overflow-hidden hover:shadow-2xl transform hover:scale-105 active:scale-95"
              >
                <span className={`transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  {isSuccess ? 'Message Sent! ✨' : 'Send Message 🚀'}
                </span>
                
                {/* Loading animation */}
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-beige-100 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-2">Sending...</span>
                  </div>
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-beige-100/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </form>

            {/* Success message */}
            {isSuccess && (
              <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center animate-fade-in-up">
                🎉 Your message has been sent successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
