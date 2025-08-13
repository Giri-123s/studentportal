/**
 * Application Header Component
 * 
 * This component renders the top navigation bar of the application, containing:
 * - Mobile menu toggle button (hamburger menu)
 * - Application title/logo
 * - User menu dropdown with actions
 * 
 * The header is responsive and adapts to different screen sizes:
 * - On mobile: Shows hamburger menu for sidebar toggle
 * - On desktop: Sidebar toggle is hidden (sidebar always visible)
 * 
 * @component Header
 * @description Top navigation bar with menu toggle and user actions
 * @param {Object} props - Component props
 * @param {boolean} props.open - Current sidebar open state
 * @param {Function} props.setOpen - Function to toggle sidebar state
 * @returns {JSX.Element} Application header with navigation
 * 
 * @example
 * <Header open={sidebarOpen} setOpen={setSidebarOpen} />
 * 
 * @features
 * - Responsive design with mobile-first approach
 * - Sidebar toggle for mobile devices
 * - User menu integration
 * - Consistent styling with the application theme
 */
import React from 'react';
import { Menu } from 'lucide-react';
import UserMenu from '../ui/UserMenu';

const Header = ({ open, setOpen }) => {
  /**
   * Handles user logout action
   * Currently logs to console - in production, this would:
   * - Clear authentication tokens
   * - Redirect to login page
   * - Clear user session data
   */
  const handleLogout = () => {
    console.log('Logging out...');
    // TODO: Implement actual logout logic
    // - Clear auth tokens from localStorage
    // - Redirect to login page
    // - Clear user context/state
  };

  return (
    <header className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-700">
      {/* Left side: Menu toggle and title */}
      <div className="flex items-center space-x-4">
        {/* Mobile menu toggle button - only visible on small screens */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-slate-800 rounded lg:hidden transition-colors"
          aria-label="Toggle sidebar navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        {/* Application title */}
        <h1 className="text-xl font-semibold">Student Portal</h1>
      </div>

      {/* Right side: User menu */}
      <div className="flex items-center space-x-4">
        <UserMenu onLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;

