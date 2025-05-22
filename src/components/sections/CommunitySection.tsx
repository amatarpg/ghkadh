import React, { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { Users, Star, MessageCircle } from 'lucide-react';

interface AlienCardProps {
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
  delay: number;
}

const AlienCard: React.FC<AlienCardProps> = ({ name, role, imageUrl, quote, delay }) => {
  return (
    <div 
      className="bg-gray-900/50 backdrop-blur-sm border border-magenta-glow/30 rounded-lg overflow-hidden hover:border-magenta-glow/70 transition-all duration-300 animate-on-scroll opacity-0 translate-y-10"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-magenta-glow/50 mr-4">
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${imageUrl}')`,
                filter: 'hue-rotate(-30deg) brightness(0.9)' 
              }}
            ></div>
          </div>
          <div>
            <h3 className="font-orbitron text-white text-lg">{name}</h3>
            <p className="text-magenta-glow text-sm">{role}</p>
          </div>
        </div>
        
        <div className="relative">
          <MessageCircle className="absolute top-0 left-0 h-6 w-6 text-magenta-glow/30 -translate-x-2 -translate-y-2" />
          <p className="text-gray-300 text-sm italic pl-4">"{quote}"</p>
        </div>
      </div>
    </div>
  );
};

const CommunitySection: React.FC = () => {
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
  
  const aliens = [
    {
      name: "Zorb Nebulax",
      role: "Mission Commander",
      imageUrl: "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "Our mission to extract Etherion is critical for the survival of Smoketron. Join us, Earthlings.",
      delay: 100
    },
    {
      name: "Lyra Quasarix",
      role: "Chief Science Officer",
      imageUrl: "https://images.pexels.com/photos/761115/pexels-photo-761115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "The symbiotic relationship between our civilizations will usher in a new era of interstellar cooperation.",
      delay: 200
    },
    {
      name: "Kryp Stellaron",
      role: "Blockchain Engineer",
      imageUrl: "https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "Earth's blockchain technology is primitive but effective. We've enhanced it with Smoketronian quantum algorithms.",
      delay: 300
    },
    {
      name: "Vex Astralite",
      role: "Ambassador to Earth",
      imageUrl: "https://images.pexels.com/photos/3283568/pexels-photo-3283568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: "Greetings, humans. Your participation in our protocol will be rewarded generously.",
      delay: 400
    }
  ];
  
  return (
    <section 
      id="community" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-blue/20 to-black"></div>
      <div className="tech-grid absolute inset-0 opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-magenta-glow mr-2" />
            <Star className="h-6 w-6 text-magenta-glow" />
          </div>
          <p className="text-magenta-glow font-exo uppercase tracking-widest mb-4">The Fleet</p>
          <h2 className="section-title">Meet Our <span className="text-magenta-glow magenta-glow">Alien</span> Crew</h2>
          <p className="section-subtitle">
            The brave Smoketronians leading our interstellar mission to harvest Etherion and save their civilization.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aliens.map((alien, index) => (
            <AlienCard
              key={index}
              name={alien.name}
              role={alien.role}
              imageUrl={alien.imageUrl}
              quote={alien.quote}
              delay={alien.delay}
            />
          ))}
        </div>
        
        <div className="text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-500">
          <p className="text-gray-300 mb-6">
            Join thousands of Earthlings who have already pledged their support to the Smoketron mission.
          </p>
          <Button variant="outline" glowColor="magenta">
            Join Our Discord
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;