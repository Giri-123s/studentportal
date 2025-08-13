/**
 * AnimatedCard Component
 * A creative card component with 3D hover effects, glassmorphism, and smooth animations.
 * Perfect for showcasing frontend creativity and modern design skills.
 */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  glowColor = 'sky',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const variants = {
    default: 'bg-slate-800/80 backdrop-blur-sm border border-slate-600/50',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20',
    neon: 'bg-slate-900/90 border border-sky-400/50 shadow-lg shadow-sky-500/25',
    gradient: 'bg-gradient-to-br from-slate-800/90 to-slate-700/90 border border-slate-500/50'
  };

  const glowVariants = {
    sky: 'hover:shadow-sky-500/30',
    purple: 'hover:shadow-purple-500/30',
    green: 'hover:shadow-green-500/30',
    pink: 'hover:shadow-pink-500/30',
    yellow: 'hover:shadow-yellow-500/30'
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-xl p-6 cursor-pointer transition-all duration-300 ${variants[variant]} ${glowVariants[glowColor]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        y: -8,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${glowColor}-500/20 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Floating particles effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-${glowColor}-400 rounded-full`}
              initial={{ 
                x: Math.random() * 100, 
                y: Math.random() * 100,
                opacity: 0 
              }}
              animate={{ 
                x: Math.random() * 100, 
                y: Math.random() * 100,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedCard; 