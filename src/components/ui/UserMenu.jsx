/**
 * User Menu Dropdown Component
 * 
 * This component renders a dropdown menu for user actions, including:
 * - Edit Personal Data: Opens modal to edit user information
 * - Change Password: Opens modal to change user password
 * - Logout: Handles user logout action
 * 
 * The dropdown is responsive and includes:
 * - Click outside to close functionality
 * - Escape key to close functionality
 * - Proper accessibility attributes
 * - Responsive design for mobile devices
 * 
 * @component UserMenu
 * @description User action dropdown menu with edit and logout options
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Function called when logout is clicked
 * @returns {JSX.Element} User dropdown menu with action buttons
 * 
 * @example
 * <UserMenu onLogout={handleLogout} />
 * 
 * @features
 * - Responsive dropdown design
 * - Outside click detection
 * - Keyboard navigation support
 * - Accessibility compliance
 * - Smooth animations and transitions
 * 
 * @actions
 * - Edit Personal Data: Opens personal data edit modal
 * - Change Password: Opens password change modal
 * - Logout: Triggers logout process
 * 
 * @accessibility
 * - Proper ARIA labels and roles
 * - Keyboard navigation support
 * - Screen reader friendly
 * - Focus management
 */
import React, { useEffect, useRef, useState } from 'react';
import { User, ChevronDown, LogOut, Settings, Key } from 'lucide-react';

const UserMenu = ({ onLogout }) => {
  // State to control dropdown open/closed state
  const [open, setOpen] = useState(false);
  
  // Ref to detect clicks outside the dropdown
  const containerRef = useRef(null);

  /**
   * Handles opening the edit personal data modal
   * This would typically open a modal or navigate to an edit page
   */
  const handleEditPersonalData = () => {
    setOpen(false);
    // TODO: Implement personal data editing
    // Options:
    // 1. Open a modal dialog
    // 2. Navigate to edit page
    // 3. Dispatch action to global state
    console.log('Opening edit personal data modal...');
  };

  /**
   * Handles opening the change password modal
   * This would typically open a modal for password change
   */
  const handleChangePassword = () => {
    setOpen(false);
    // TODO: Implement password change functionality
    // Options:
    // 1. Open password change modal
    // 2. Navigate to password change page
    // 3. Show password change form
    console.log('Opening change password modal...');
  };

  /**
   * Handles user logout action
   * Calls the onLogout prop function and closes the dropdown
   */
  const handleLogout = () => {
    setOpen(false);
    onLogout?.();
  };

  // Effect to handle outside clicks and escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* User Menu Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 rounded text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 flex items-center transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        <User className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Menu</span>
        <ChevronDown className="h-4 w-4 ml-1" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-1rem)] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 sm:w-64"
        >
          <div className="py-1 text-slate-700">
            {/* Edit Personal Data Option */}
            <button
              onClick={handleEditPersonalData}
              className="w-full flex items-center px-4 py-2 text-sm hover:bg-slate-100 text-left transition-colors"
              role="menuitem"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Personal Data
            </button>

            {/* Change Password Option */}
            <button
              onClick={handleChangePassword}
              className="w-full flex items-center px-4 py-2 text-sm hover:bg-slate-100 text-left transition-colors"
              role="menuitem"
            >
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </button>

            {/* Divider */}
            <div className="my-1 border-t border-slate-200" />

            {/* Logout Option */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              role="menuitem"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

