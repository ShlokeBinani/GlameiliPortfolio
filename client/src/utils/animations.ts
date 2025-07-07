import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const setupParallax = () => {
  // Parallax effect for background elements
  gsap.utils.toArray('.parallax-bg').forEach((bg: any) => {
    gsap.to(bg, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: bg,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Fade in animations for sections
  gsap.utils.toArray('section').forEach((section: any) => {
    gsap.fromTo(section.querySelectorAll('.animate-in'), 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
};

export const fadeInUp = (element: HTMLElement, delay: number = 0) => {
  gsap.fromTo(element, 
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay
    }
  );
};

export const scaleOnHover = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
};
