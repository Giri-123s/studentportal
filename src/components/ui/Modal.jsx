/**
 * Modal Component
 * A reusable modal dialog component with backdrop, header, content, and action buttons.
 * Supports different sizes and customizable actions.
 */
import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  actions, 
  size = 'md',
  showCloseButton = true 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-96',
    md: 'w-[28rem]',
    lg: 'w-[32rem]',
    xl: 'w-[40rem]'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl max-w-full max-h-[90vh] overflow-hidden ${sizeClasses[size]}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex justify-end space-x-2 p-6 border-t border-gray-200 bg-gray-50">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 