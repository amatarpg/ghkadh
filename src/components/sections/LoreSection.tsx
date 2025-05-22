import React, { useEffect, useRef } from 'react';
import { Zap, Shield } from 'lucide-react';

const LoreSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elementsToObserve = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elementsToObserve?.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      elementsToObserve?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <section 
      id="lore" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-blue/20 to-black"></div>
      <div className="tech-grid absolute inset-0 opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <p className="text-magenta-glow font-exo uppercase tracking-widest mb-4">The Origin Story</p>
          <h2 className="section-title">Chronicles of <span className="text-magenta-glow magenta-glow">Smoketron</span></h2>
          <p className="section-subtitle">
            A once-thriving civilization on the brink of energy collapse, seeking salvation in the cosmic element: Etherion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Planet Smoketron */}
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100 h-full flex flex-col">
            <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/assets/images/smoketron_planet.png')",
                  filter: 'hue-rotate(60deg) brightness(0.8)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-orbitron text-xl text-white">Planet Smoketron</h3>
                <p className="text-cyan-glow text-sm">Home of the $CIGAR Protocol</p>
              </div>
            </div>
            
            <div className="space-y-6 flex-grow">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-magenta-glow mr-3 mt-1 shrink-0" />
                <p className="text-gray-300">
                  For millennia, the Smoketronians thrived as one of the most advanced civilizations in the galaxy, 
                  harnessing energy from their three suns and developing technologies beyond comprehension.
                </p>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-magenta-glow mr-3 mt-1 shrink-0" />
                <p className="text-gray-300">
                  But as their suns began to dim, their energy crisis worsened. Scientists discovered 
                  a cosmic element called Etherion that could sustain their civilization for thousands of years.
                </p>
              </div>
            </div>
          </div>
          
          {/* The Mission */}
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200 h-full flex flex-col">
            <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.pexels.com/photos/7672252/pexels-photo-7672252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                  filter: 'hue-rotate(-30deg) brightness(0.7)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-orbitron text-xl text-white">CIGAR - Cosmic Ionized Generator for Ancestral Revival</h3>
                <p className="text-cyan-glow text-sm">Extraction of Etherion</p>
              </div>
            </div>
            
            <div className="space-y-6 flex-grow">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-magenta-glow mr-3 mt-1 shrink-0" />
                <p className="text-gray-300">
                  Long-range scanners detected abundant Etherion deposits on a distant planet called Earth,
                  specifically concentrated in what the locals refer to as "blockchain networks."
                </p>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-magenta-glow mr-3 mt-1 shrink-0" />
                <p className="text-gray-300">
                  The $CIGAR Protocol was created - a sophisticated harvesting system designed to extract Etherion
                  while providing value to Earth's inhabitants, creating a symbiotic relationship between worlds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoreSection;