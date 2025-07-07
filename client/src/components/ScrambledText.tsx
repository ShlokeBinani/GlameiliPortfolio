import { useState, useEffect } from "react";

interface ScrambledTextProps {
  text: string;
  className?: string;
}

export default function ScrambledText({ text, className = "" }: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scrambleText = () => {
    if (isScrambling) return;
    
    setIsScrambling(true);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let iterations = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      if (iterations >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <p
      className={`scramble-text cursor-pointer ${className}`}
      onMouseEnter={scrambleText}
    >
      {displayText}
    </p>
  );
}
