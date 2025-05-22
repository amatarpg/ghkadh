import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Scene {
  id: number;
  location: string;
  text: string[];
  background: string;
  character: {
    image: string;
    position: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    size: {
      width: string;
      height: string;
    };
    animation: {
      initial: any;
      animate: any;
    };
  };
  textPosition?: 'left' | 'right';
}

interface StoryIntroProps {
  onComplete: () => void;
}

const getPositionClasses = (position: string) => {
  const positions = {
    'top-left': 'top-0 left-0',
    'top-center': 'top-0 left-1/2 -translate-x-1/2',
    'top-right': 'top-0 right-0',
    'center-left': 'top-1/2 -translate-y-1/2 left-0',
    'center': 'top-1 left-1/2 -translate-x-1/2 -translate-y-1',
    'center-right': 'top-1/2 -translate-y-1/2 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-0 right-0'
  };
  return positions[position as keyof typeof positions] || positions['center'];
};

const scenes: Scene[] = [
  {
    id: 1,
    location: "Outer Galaxy – Planet Smoketron",
    text: [
      "In a forgotten corner of the galaxy…<br>",
      "Lies a world veiled in smoke and silence — ",
      "Smoketron.<br>",
      "Once radiant with life… now dim, fractured, and barely breathing."
    ],
    background: "/assets/images/smoketron_planet.png",
    character: {
      image: "/assets/images/king.png",
      position: "bottom-left",
      size: {
        width: "w-auto",
        height: "h-screen"
      },
      animation: {
        initial: { y: 0, scale: 0.8, opacity: 0 },
        animate: { y: 0, scale: 1, opacity: 0.7 }
      }
    },
    textPosition: "left"
  },
  {
    id: 2,
    location: "Smoketron Laboratory",
    text: [
      "The scientists gave it everything they had.<br>",
      "But only one answer remained… ",
      "Etherion.<br>",
      "A rare particle — the most powerful energy source in the known universe."
    ],
    background: "/assets/images/laboratory.png",
    character: {
      image: "",
      position: "center-left",
      size: {
        width: "w-72",
        height: "h-72"
      },
      animation: {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 0.7 }
      }
    },
    textPosition: "left"
  },
  {
    id: 3,
    location: "Signal Control Center",
    text: [
      "Then one day…<br>",
      "A distant signal was detected.<br>",
      "A tiny blue dot… ",
      "Deep within a network they called... BASE."
    ],
    background: "/assets/images/signal_control.png",
    character: {
      image: "/assets/images/signal.png",
      position: "top-center",
      size: {
        width: "w-auto",
        height: "h-full"
      },
      animation: {
        initial: { rotate: 0, scale: 0.8, opacity: 0 },
        animate: { rotate: 0, scale: 1, opacity: 1 }
      }
    },
    textPosition: "left"
  },
  {
    id: 4,
    location: "Orbit of Planet Earth",
    text: [
      "The Blue Planet.<br>",
      "Etherion traces scattered across vibrant digital activity.<br>",
      "But this mission… is not for just anyone."
    ],
    background: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg",
    character: {
      image: "",
      position: "center",
      size: {
        width: "w-auto",
        height: "h-[512px]"
      },
      animation: {
        initial: { y: -100, scale: 1.2, opacity: 0 },
        animate: { y: 0, scale: 1, opacity: 0.7 }
      }
    },
    textPosition: "left"
  },
  {
    id: 5,
    location: "Launch Station",
    text: [
      "And so… someone was chosen.<br>",
      "A journey with no map, ",
      "No promise of return.<br>",
      "Only the bold and the curious will discover…<br>",
      "what's truly at stake."
    ],
    background: "/assets/images/station.png",
    character: {
      image: "/assets/images/rocket1.png",
      position: "bottom-right",
      size: {
        width: "w-auto",
        height: "h-full"
      },
      animation: {
        initial: { y: 200,scale: 0.6, rotate: 0, opacity: 0 },
        animate: { y: 0, scale: 0.7, rotate: -5, opacity: 0.7 }
      }
    },
    textPosition: "left"
  },
  {
    id: 6,
    location: "Final Transmission",
    text: [
      "If you're reading this, you're already part of the signal.<br>",
      "🚪 The mission gate will soon open 🚪.<br>",
      "Only those registered in the relay channel will gain first access."
    ],
    background: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
    character: {
      image: "",
      position: "center",
      size: {
        width: "w-96",
        height: "h-96"
      },
      animation: {
        initial: { scale: 1.5, opacity: 0 },
        animate: { scale: 1, opacity: 0.3 }
      }
    }
  }
];

const StoryIntro: React.FC<StoryIntroProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTypingComplete && currentScene < scenes.length - 1 && autoAdvance) {
      timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
        setIsTypingComplete(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [currentScene, isTypingComplete, autoAdvance]);

  const handleActivateProtocol = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const handlePrevScene = () => {
    if (currentScene > 0) {
      setAutoAdvance(false);
      setCurrentScene(prev => prev - 1);
      setIsTypingComplete(false);
    }
  };

  const handleNextScene = () => {
    if (currentScene < scenes.length - 1) {
      setAutoAdvance(false);
      setCurrentScene(prev => prev + 1);
      setIsTypingComplete(false);
    }
  };

  const NavigationArrow = ({ direction, onClick, disabled }: { direction: 'left' | 'right', onClick: () => void, disabled: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 ${direction === 'left' ? 'left-4' : 'right-4'} 
                 z-50 w-12 h-12 rounded-full flex items-center justify-center
                 border border-cyan-glow/30 bg-black/50 backdrop-blur-sm
                 hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all duration-300
                 ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-6 h-6 text-cyan-glow" />
      ) : (
        <ChevronRight className="w-6 h-6 text-cyan-glow" />
      )}
    </button>
  );

  return (
    <motion.div 
      className="fixed inset-0 bg-black overflow-hidden"
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="smoke-effect"></div>
      
      {/* Navigation Arrows */}
      <NavigationArrow
        direction="left"
        onClick={handlePrevScene}
        disabled={currentScene === 0}
      />
      <NavigationArrow
        direction="right"
        onClick={handleNextScene}
        disabled={currentScene === scenes.length - 1}
      />
      
      {/* Scene Progress Indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {scenes.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentScene
                ? 'bg-cyan-glow w-4'
                : 'bg-cyan-glow/30'
            }`}
          />
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full h-full"
        >
          {/* Background Layer */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10 }}
            style={{
              backgroundImage: `url(${scenes[currentScene].background})`
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </motion.div>

          {/* Character Layer */}
          <motion.div
            className={`absolute flex items-center justify-center ${getPositionClasses(scenes[currentScene].character.position)} ${scenes[currentScene].character.size.width} ${scenes[currentScene].character.size.height}`}
            initial={scenes[currentScene].character.animation.initial}
            animate={scenes[currentScene].character.animation.animate}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {scenes[currentScene].character.image && (
              <img
                src={scenes[currentScene].character.image}
                className="h-full w-auto object-contain"
                alt=""
              />
            )}
          </motion.div>

          {/* Content */}
          {currentScene === scenes.length - 1 ? (
            // Final Scene - Centered Content
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl text-center"
              >
                <div className="text-lg md:text-2xl text-cyan-glow font-orbitron mb-8 md:mb-12">
                  <Typewriter
                    onInit={(typewriter) => {
                      scenes[currentScene].text.forEach((line) => {
                        typewriter
                          .typeString(line)
                          .pauseFor(1000)
                          .start();
                      });
                    }}
                    options={{
                      delay: 50,
                      cursor: '|',
                    }}
                  />
                </div>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: scenes[currentScene].text.join("").length * 0.05 }}
                  onClick={handleActivateProtocol}
                  className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-cyan-glow text-cyan-glow 
                           font-orbitron text-base md:text-xl rounded hover:bg-cyan-glow/20 
                           transition-all duration-300 relative overflow-hidden
                           after:absolute after:inset-0 after:bg-cyan-glow/10 
                           after:opacity-0 hover:after:opacity-100 after:transition-opacity"
                >
                  AKTIFKAN PROTOKOL
                </motion.button>
              </motion.div>
            </div>
          ) : (
            // Regular Scenes
            <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white text-sm md:text-lg text-center"
              >
                {scenes[currentScene].location}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`max-w-2xl mx-auto ${scenes[currentScene].textPosition === 'right' ? 'text-right' : 'text-left'}`}
              >
                <div className="text-base md:text-2xl text-cyan-glow font-orbitron">
                  <Typewriter
                    onInit={(typewriter) => {
                      scenes[currentScene].text.forEach((line, index) => {
                        typewriter
                          .typeString(line)
                          .pauseFor(1000)
                          .callFunction(() => {
                            if (index === scenes[currentScene].text.length - 1) {
                              setIsTypingComplete(true);
                            }
                          })
                          .start();
                      });
                    }}
                    options={{
                      delay: 50,
                      cursor: '|',
                    }}
                  />
                </div>
              </motion.div>
            </div>
          )}

          {/* Futuristic Corner Elements */}
          <div className="absolute top-4 left-4 w-12 h-12 md:w-32 md:h-32 border-l-2 border-t-2 border-cyan-glow/50 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-12 h-12 md:w-32 md:h-32 border-r-2 border-t-2 border-cyan-glow/50 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 md:w-32 md:h-32 border-l-2 border-b-2 border-cyan-glow/50 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 md:w-32 md:h-32 border-r-2 border-b-2 border-cyan-glow/50 rounded-br-lg"></div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default StoryIntro;