import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import LoreSection from './components/sections/LoreSection';
import TechnologySection from './components/sections/TechnologySection';
import CommunitySection from './components/sections/CommunitySection';
import JoinMissionSection from './components/sections/JoinMissionSection';
import ParticleBackground from './components/ui/ParticleBackground';
import StoryIntro from './components/story/StoryIntro';

function App() {
  const [introCompleted, setIntroCompleted] = useState(() => {
    return localStorage.getItem('introCompleted') === 'true';
  });

  const handleIntroComplete = () => {
    localStorage.setItem('introCompleted', 'true');
    setIntroCompleted(true);
  };

  const resetIntro = () => {
    localStorage.removeItem('introCompleted');
    setIntroCompleted(false);
  };

  if (!introCompleted) {
    return <StoryIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div className="relative min-h-screen bg-black text-white font-spaceMono overflow-hidden">
      <ParticleBackground />
      <div className="scanline-overlay"></div>
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <LoreSection />
          <TechnologySection />
          <CommunitySection />
          <JoinMissionSection />
        </main>
        <Footer />
        
        {/* Debug button to reset intro - you can remove this in production */}
        <button
          onClick={resetIntro}
          className="fixed bottom-4 right-4 text-xs text-gray-500 hover:text-cyan-glow"
        >
          Reset Intro
        </button>
      </div>
    </div>
  );
}

export default App;