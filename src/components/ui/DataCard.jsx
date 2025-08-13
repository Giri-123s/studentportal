/**
 * DataCard Component
 * A reusable card component for displaying data with an optional edit button.
 * Supports different data types and consistent styling.
 */
import React from 'react';
import { Edit } from 'lucide-react';

const DataCard = ({ 
  title, 
  data, 
  onEdit, 
  showEditButton = true,
  className = '',
  children 
}) => {
  return (
    <div className={`bg-slate-800 text-white border border-slate-600 rounded-lg p-6 h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/20 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-sky-300">{title}</h3>
        {showEditButton && onEdit && (
          <button
            className="px-3 py-1 text-sm border border-sky-300 text-sky-300 rounded hover:bg-sky-300 hover:text-slate-800 transition-colors flex items-center gap-1"
            onClick={onEdit}
          >
            <Edit className="h-3 w-3" />
            Edit
          </button>
        )}
      </div>
      
      {children || (
        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <p className="text-sky-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-white">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataCard; 