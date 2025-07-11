interface GradientTextProps {
  text: string;
  className?: string;
}

export default function GradientText({ text, className = "" }: GradientTextProps) {
  return (
    <span className={`gradient-text ${className}`}>
      {text}
    </span>
  );
}
