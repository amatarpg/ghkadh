import React, { useEffect, useRef } from 'react';
import { Code, Database, Share2, Lock } from 'lucide-react';

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const TechCard: React.FC<TechCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className={`tech-card animate-on-scroll opacity-0 translate-y-10 transition-all duration-700`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-gray-800/50 border border-cyan-400/30">
          {icon}
        </div>
        <h3 className="font-orbitron text-xl text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

const TechnologySection: React.FC = () => {
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
      id="technology" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-dark-blue/20 to-black"></div>
      <div className="tech-grid absolute inset-0 opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <p className="text-electric-blue font-exo uppercase tracking-widest mb-4">Advanced Systems</p>
          <h2 className="section-title">Etherion <span className="text-electric-blue electric-blue-glow">Extraction</span> Tech</h2>
          <p className="section-subtitle">
            Our harvesting protocol utilizes advanced alien technology to efficiently extract Etherion while 
            providing benefits to Earth's inhabitants.
          </p>
        </div>
        
        {/* Technology Diagram */}
        <div className="relative mb-20 py-10 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
            {/* Earth */}
            <div className="flex flex-col items-center text-center z-10">
              <div className="h-20 w-20 rounded-full mb-4 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
                  }}
                ></div>
              </div>
              <h3 className="font-orbitron text-lg text-cyan-glow">Earth Network</h3>
              <p className="text-gray-400 text-xs mt-1">Source of Etherion</p>
            </div>
            
            {/* Protocol */}
            <div className="flex flex-col items-center text-center z-10">
              <div className="h-28 w-28 rounded-full border-4 border-electric-blue glow-box flex items-center justify-center bg-gray-900/70 mb-4">
                <span className="font-orbitron text-xl text-electric-blue">$CIGAR</span>
              </div>
              <h3 className="font-orbitron text-lg text-electric-blue">Extraction Protocol</h3>
              <p className="text-gray-400 text-xs mt-1">Processing & Distribution</p>
            </div>
            
            {/* Smoketron */}
            <div className="flex flex-col items-center text-center z-10">
              <div className="h-20 w-20 rounded-full mb-4 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/assets/images/smoketron_planet.png')",
                    filter: 'hue-rotate(60deg) brightness(0.8)'
                  }}
                ></div>
              </div>
              <h3 className="font-orbitron text-lg text-magenta-glow">Smoketron</h3>
              <p className="text-gray-400 text-xs mt-1">Energy Consumption</p>
            </div>
          </div>
        </div>
        
        {/* Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TechCard 
            icon={<Code className="h-8 w-8 text-cyan-glow" />}
            title="Smart Contracts"
            description="Self-executing contracts with autonomous validation mechanisms powered by Smoketronian quantum computing."
            delay={100}
          />
          <TechCard 
            icon={<Database className="h-8 w-8 text-cyan-glow" />}
            title="Token System"
            description="Proprietary token model that ensures fair distribution of Etherion energy between Earth and Smoketron participants."
            delay={200}
          />
          <TechCard 
            icon={<Share2 className="h-8 w-8 text-cyan-glow" />}
            title="Alien Networks"
            description="Interdimensional networking protocols allowing seamless communication between blockchain and Smoketronian mainframe."
            delay={300}
          />
          <TechCard 
            icon={<Lock className="h-8 w-8 text-cyan-glow" />}
            title="Encryption"
            description="Military-grade encryption using algorithms developed by Smoketron's elite alien cryptographers."
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;