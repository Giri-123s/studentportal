/**
 * StatsCard Component
 * A reusable card component for displaying statistics with icons and hover effects.
 */
import React from 'react';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  borderColor = 'border-sky-300',
  iconColor = 'text-sky-300',
  className = '' 
}) => {
  return (
    <div className={`bg-slate-800 text-white border-l-4 ${borderColor} rounded-lg p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/20 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${iconColor} text-sm`}>{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className={`h-12 w-12 ${iconColor}`} />
      </div>
    </div>
  );
};

export default StatsCard; 