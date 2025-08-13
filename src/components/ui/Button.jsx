/**
 * Button Component
 * A reusable button component with consistent styling and variants.
 */
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  disabled = false,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    outline: 'border border-sky-300 text-sky-300 hover:bg-sky-300 hover:text-slate-800 focus:ring-sky-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 