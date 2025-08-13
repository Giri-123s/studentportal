/**
 * FormField Component
 * A reusable form field component with consistent styling and label handling.
 * Supports both light and dark themes.
 */
import React from 'react';

const FormField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = '',
  darkTheme = false,
  ...props 
}) => {
  const inputId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  const baseInputClasses = "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors";
  const themeClasses = darkTheme 
    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400" 
    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500";
  
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={inputId} className={`block text-sm font-medium ${darkTheme ? 'text-sky-300' : 'text-gray-700'}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${baseInputClasses} ${themeClasses}`}
        {...props}
      />
    </div>
  );
};

export default FormField; 