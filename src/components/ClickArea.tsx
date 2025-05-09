import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, Sparkles } from 'lucide-react';
import { formatNumber } from '../utils/gameUtils';

interface ClickParticleProps {
  x: number;
  y: number;
  value: number;
  onComplete: () => void;
}

const ClickParticle: React.FC<ClickParticleProps> = ({ x, y, value, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x, y }}
      animate={{
        opacity: 0,
        scale: 1.5,
        y: y - 100,
        x: x + (Math.random() * 100 - 50)
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="absolute pointer-events-none text-amber-500 font-bold z-10 text-lg"
      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
    >
      +{formatNumber(value)}
    </motion.div>
  );
};

interface ClickAreaProps {
  points: number;
  pointsPerClick: number;
  pointsPerSecond: number;
  onClick: () => void;
}

const ClickArea: React.FC<ClickAreaProps> = ({
  points,
  pointsPerClick,
  pointsPerSecond,
  onClick
}) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; value: number }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scale, setScale] = useState(1);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScale(1.05);
      setTimeout(() => setScale(1), 150);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate position relative to the button
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create multiple particles with different trajectories
    const particleCount = Math.min(3, Math.max(1, Math.floor(pointsPerClick / 10)));
    
    for (let i = 0; i < particleCount; i++) {
      const newParticle = {
        id: Date.now() + i,
        x: x + (Math.random() * 40 - 20),
        y: y + (Math.random() * 40 - 20),
        value: Math.floor(pointsPerClick / particleCount)
      };

      setParticles(prev => [...prev, newParticle]);
    }

    // Button animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    // Trigger click handler
    onClick();
  };

  const removeParticle = (id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          <motion.span
            className="inline-block text-amber-500"
            animate={{ scale }}
            transition={{ duration: 0.15 }}
          >
            {formatNumber(points)}
          </motion.span>
          <br />
          <span className="text-3xl">Knowledge Points</span>
        </h1>
        <div className="flex justify-center gap-8 text-gray-700">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
            <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{formatNumber(pointsPerClick)} per click</span>
          </div>
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
            <Brain className="h-5 w-5 mr-2 text-indigo-600" />
            <span>{formatNumber(pointsPerSecond)} per second</span>
          </div>
        </div>
      </motion.div>

      <div 
        ref={buttonRef}
        className="relative w-56 h-56 mb-6 cursor-pointer select-none"
        onClick={handleClick}
      >
        <AnimatePresence>
          {particles.map((particle) => (
            <ClickParticle
              key={particle.id}
              x={particle.x}
              y={particle.y}
              value={particle.value}
              onComplete={() => removeParticle(particle.id)}
            />
          ))}
        </AnimatePresence>

        <motion.div 
          className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-700 shadow-lg hover:shadow-xl"
          animate={{
            scale: isAnimating ? 0.95 : 1,
            rotate: isAnimating ? -5 : 0
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div 
            className="w-48 h-48 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-inner"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <motion.div 
              className="w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-inner"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Sparkles className="w-20 h-20 text-indigo-700" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClickArea;