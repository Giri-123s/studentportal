/**
 * CreativeChart Component
 * An animated bar chart component with interactive hover effects.
 * Demonstrates creative data visualization and frontend animation skills.
 */
import React, { useState } from 'react';

const CreativeChart = ({ 
  data, 
  title, 
  height = 200, 
  colors = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'] 
}) => {
  const [hoveredBar, setHoveredBar] = useState(null);
  
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-sky-300 mb-6 text-center">{title}</h3>
      
      <div className="flex items-end justify-center space-x-4 h-48">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * height;
          const color = colors[index % colors.length];
          
          return (
            <div key={item.label} className="flex flex-col items-center space-y-2">
              {/* Animated bar */}
              <div
                className="relative w-12 rounded-t-lg transition-all duration-500 ease-out hover:scale-110 cursor-pointer"
                style={{ 
                  height: barHeight,
                  backgroundColor: color,
                  boxShadow: hoveredBar === index 
                    ? `0 0 20px ${color}80` 
                    : '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                initial={{ height: 0 }}
                animate={{ height: barHeight }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-t-lg opacity-0 transition-opacity duration-300"
                  style={{ 
                    backgroundColor: color,
                    filter: 'blur(8px)',
                    opacity: hoveredBar === index ? 0.6 : 0
                  }}
                />
                
                {/* Value label */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-sm font-medium opacity-0 transition-opacity duration-300"
                     style={{ opacity: hoveredBar === index ? 1 : 0 }}>
                  {item.value}
                </div>
              </div>
              
              {/* Label */}
              <span className="text-xs text-sky-300 font-medium text-center max-w-16">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mt-6 space-x-4">
        {data.map((item, index) => (
          <div key={item.label} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-xs text-sky-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeChart; 