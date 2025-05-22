import React, { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { Rocket, ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPos = window.scrollY;
      const parallaxElements = sectionRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '0.2');
        (el as HTMLElement).style.transform = `translateY(${scrollPos * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('lore');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadWhitepaper = () => {
    const link = document.createElement('a');
    link.href = '/whitepaper.pdf';
    link.download = 'whitepaper.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <section 
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-blue/40 to-black z-0"></div>
      <div className="tech-grid absolute inset-0 opacity-10 z-0"></div>
      
      {/* Floating Ship */}
      <div 
        className="absolute w-64 h-64 md:w-96 md:h-96 opacity-30 md:opacity-40 parallax animate-float" 
        data-speed="-0.1"
        style={{
          top: '15%',
          left: '10%',
          backgroundImage: "url('/assets/images/king.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.8) hue-rotate(140deg)',
        }}
      ></div>
      
      {/* Planet */}
      <div 
        className="absolute w-40 h-40 md:w-72 md:h-72 opacity-20 md:opacity-30 parallax" 
        data-speed="0.05"
        style={{
          bottom: '5%',
          right: '10%',
          backgroundImage: "url('/assets/images/smoketron_planet.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.8) hue-rotate(60deg)',
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-4 inline-block">
          <Rocket className="h-12 w-12 md:h-16 md:w-16 text-cyan-glow mx-auto mb-4 animate-pulse" />
        </div>
        
        <div className="space-y-1 mb-6">
          <p className="text-cyan-glow font-exo uppercase tracking-widest text-sm md:text-base">Interstellar Protocol</p>
          <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-white glow-text">
            Welcome to the <br /> <span className="text-cyan-glow">$CIGAR</span> Protocol
          </h1>
        </div>
        
        <p className="font-spaceMono text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          A mission from planet Smoketron to harvest Etherion from Earth's Base Network.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            Begin The Mission
          </Button>
          <Button variant="outline" size="lg" glowColor="magenta" onClick={handleDownloadWhitepaper}>
            View Whitepaper
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center">
          <span className="text-cyan-glow text-sm mb-2 font-exo">Scroll to Explore</span>
          <ChevronDown className="h-6 w-6 text-cyan-glow animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;