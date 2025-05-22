import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { Rocket, ChevronRight, CheckCircle } from 'lucide-react';

const JoinMissionSection: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setWalletAddress('');
    }, 1500);
  };
  
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
      id="join" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-dark-blue/40 to-black"></div>
      <div className="tech-grid absolute inset-0 opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <Rocket className="h-12 w-12 text-cyan-glow mx-auto mb-4" />
            <h2 className="section-title">Join The <span className="text-cyan-glow glow-text">Mission</span></h2>
            <p className="section-subtitle">
              The fate of Smoketron rests in your wallet. Register now for the airdrop and help us harvest Etherion.
            </p>
          </div>
          
          <div className="bg-gray-900/30 backdrop-blur-md border border-cyan-glow/30 rounded-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="wallet" className="block font-orbitron text-cyan-glow mb-2">Your Wallet Address</label>
                  <input 
                    type="text" 
                    id="wallet"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full bg-black/50 border border-cyan-glow/50 text-gray-200 p-3 rounded-md focus:outline-none focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow"
                    placeholder="0x..."
                    required
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="text-gray-400 text-sm order-2 md:order-1">
                    By joining, you accept the terms of the interstellar cooperation agreement.
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto order-1 md:order-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Register for Airdrop</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-cyan-glow mx-auto mb-4" />
                <h3 className="font-orbitron text-2xl text-white mb-2">Registration Complete!</h3>
                <p className="text-gray-300 mb-6">
                  You've been added to the Smoketron mission. Watch for communications about the Etherion airdrop.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>
                  Register Another Wallet
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="tech-card animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <h3 className="font-orbitron text-lg text-cyan-glow mb-2">Connect</h3>
              <p className="text-gray-400 text-sm">
                Register your wallet to establish a connection with the Smoketron mainframe.
              </p>
            </div>
            
            <div className="tech-card animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
              <h3 className="font-orbitron text-lg text-cyan-glow mb-2">Harvest</h3>
              <p className="text-gray-400 text-sm">
                Your wallet becomes a conduit for Etherion extraction from Earth's networks.
              </p>
            </div>
            
            <div className="tech-card animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
              <h3 className="font-orbitron text-lg text-cyan-glow mb-2">Prosper</h3>
              <p className="text-gray-400 text-sm">
                Receive $CIGAR tokens as compensation for your contribution to saving Smoketron.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinMissionSection;