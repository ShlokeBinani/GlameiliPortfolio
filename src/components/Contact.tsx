import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. We'll get back to you soon.",
          variant: "default",
        });
        setFormData({ email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error sending message",
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
  };

  return (
    <section 
      id="contact" 
      className="parallax-container min-h-screen bg-beige-300 py-20"
    >
      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(to bottom, var(--beige-200), var(--beige-400))' 
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ochre-600 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-ochre-700">
            Ready to transform your space? Let's talk!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-ochre-700 text-lg font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-beige-100 border-2 border-beige-300 focus:border-ochre-500 focus:outline-none text-ochre-700 placeholder-ochre-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-ochre-700 text-lg font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-beige-100 border-2 border-beige-300 focus:border-ochre-500 focus:outline-none text-ochre-700 placeholder-ochre-500 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full glass-button py-4 rounded-lg text-beige-100 font-semibold text-lg hover:bg-opacity-30 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
