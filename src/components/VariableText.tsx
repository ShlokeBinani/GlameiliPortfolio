import { useEffect, useRef } from "react";

interface VariableTextProps {
  text: string;
  className?: string;
}

export default function VariableText({ text, className = "" }: VariableTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll('.variable-letter');
    
    if (letters) {
      letters.forEach((letter) => {
        const letterElement = letter as HTMLElement;
        
        letterElement.addEventListener('mouseenter', () => {
          letterElement.style.fontVariationSettings = "'wght' 900";
        });
        
        letterElement.addEventListener('mouseleave', () => {
          letterElement.style.fontVariationSettings = "'wght' 400";
        });
      });
    }
  }, []);

  return (
    <span ref={containerRef} className={`variable-text ${className}`}>
      {text.split('').map((letter, index) => (
        <span
          key={index}
          className="variable-letter inline-block cursor-default"
          style={{ fontVariationSettings: "'wght' 400" }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
