/**
 * CreativeLoader Component
 * A creative loading animation with multiple animated elements.
 * Demonstrates advanced CSS animations and creative frontend skills.
 */
import React from 'react';

const CreativeLoader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Main loading animation */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Rotating ring */}
        <div className="absolute inset-0 border-4 border-sky-500/30 rounded-full animate-ping" />
        <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
        
        {/* Pulsing center */}
        <div className="absolute inset-2 bg-sky-400 rounded-full animate-pulse" />
        
        {/* Floating dots */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
            style={{
              top: `${25 + 25 * Math.sin(i * Math.PI / 2)}%`,
              left: `${25 + 25 * Math.cos(i * Math.PI / 2)}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Loading text with typing effect */}
      <div className="text-sky-400 font-mono text-sm">
        <span className="inline-block animate-pulse">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </span>
          ))}
        </span>
        <span className="ml-1 animate-pulse">...</span>
      </div>

      {/* Progress bar */}
      <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-sky-500 to-purple-500 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default CreativeLoader; 