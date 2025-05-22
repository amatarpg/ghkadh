import React from 'react';
import { Twitter, Github, Disc as Discord, Rocket } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 mt-20 border-t border-cyan-glow/20">
      <div className="tech-grid absolute inset-0 opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Rocket className="h-6 w-6 text-cyan-glow mr-2" />
              <span className="font-orbitron text-lg font-bold text-white">
                <span className="text-cyan-glow">$</span>CIGAR
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              A mission from planet Smoketron to harvest Etherion from Earth's Base Network.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="font-orbitron text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Mission', 'Story', 'Technology', 'Community', 'Join'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-cyan-glow transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h3 className="font-orbitron text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Whitepaper', 'Tokenomics', 'Roadmap', 'FAQs', 'Airdrop'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-cyan-glow transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="font-orbitron text-white mb-4">Join The Fleet</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full flex items-center justify-center border border-cyan-glow/30 hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all"
              >
                <Twitter className="h-5 w-5 text-cyan-glow" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full flex items-center justify-center border border-cyan-glow/30 hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all"
              >
                <Discord className="h-5 w-5 text-cyan-glow" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full flex items-center justify-center border border-cyan-glow/30 hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all"
              >
                <Github className="h-5 w-5 text-cyan-glow" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-glow/20 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 $CIGAR Protocol. All rights reserved. Transmission from Smoketron.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;