import VariableText from "./VariableText";
import GradientText from "./GradientText";

export default function Hero() {
  return (
    <section 
      id="home" 
      className="parallax-container min-h-screen flex items-center justify-center relative"
      style={{ 
        background: 'linear-gradient(45deg, var(--ochre-400), var(--beige-300))' 
      }}
    >
      <div 
        className="parallax-bg"
        style={{ 
          background: 'linear-gradient(45deg, var(--ochre-600), var(--beige-400))' 
        }}
      />
      
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-beige-100 tracking-wider">
            <VariableText text="Glameili" />
          </h1>
        </div>
        
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium">
            <GradientText text="Let us Help Decorate your Home & Workplace" />
          </h2>
        </div>
      </div>
    </section>
  );
}
