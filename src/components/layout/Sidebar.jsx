/**
 * Application Sidebar Navigation Component
 * 
 * This component renders the main navigation sidebar containing:
 * - Toggle button to collapse/expand the sidebar
 * - Navigation menu items with icons and labels
 * - Active state highlighting for current page
 * - Responsive behavior for different screen sizes
 * 
 * The sidebar supports two states:
 * - Expanded: Shows full text labels alongside icons
 * - Collapsed: Shows only icons for space efficiency
 * 
 * @component Sidebar
 * @description Main navigation sidebar with collapsible behavior
 * @param {Object} props - Component props
 * @param {boolean} props.open - Current sidebar open state
 * @param {Function} props.setOpen - Function to toggle sidebar state
 * @returns {JSX.Element} Navigation sidebar with menu items
 * 
 * @example
 * <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
 * 
 * @features
 * - Collapsible navigation with smooth animations
 * - Active page highlighting
 * - Responsive design for mobile and desktop
 * - Icon-based navigation for collapsed state
 * - Smooth transitions and hover effects
 * 
 * @navigation-items
 * - Dashboard: Main overview page
 * - Courses: Course listing and grades
 * - CGPA Calculator: Grade point average calculator
 * - Assignments: Assignment tracking and management
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Book, 
  Calculator, 
  FileText 
} from 'lucide-react';

const Sidebar = ({ open, setOpen }) => {
  // Navigation menu configuration
  // Each item has: text, icon, and route path
  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <Home className="h-5 w-5" />, 
      path: '/' 
    },
    { 
      text: 'Courses', 
      icon: <Book className="h-5 w-5" />, 
      path: '/courses' 
    },
    { 
      text: 'CGPA Calculator', 
      icon: <Calculator className="h-5 w-5" />, 
      path: '/cgpa' 
    },
    { 
      text: 'Assignments', 
      icon: <FileText className="h-5 w-5" />, 
      path: '/assignments' 
    },
  ];

  return (
    <div className={`
      ${open ? 'w-64' : 'w-16'} 
      bg-slate-900 text-sky-300 
      transition-all duration-300 
      border-r border-slate-700 
      flex-shrink-0
    `}>
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-end p-4 h-16 bg-slate-900">
        <button
          onClick={() => setOpen(!open)}
          className="p-1 hover:bg-slate-800 rounded transition-colors"
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation Menu Items */}
      <nav className="mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.text}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center px-4 py-3 text-left 
              hover:bg-slate-800 transition-colors
              ${isActive 
                ? 'bg-slate-800 text-white border-r-2 border-sky-300' 
                : ''
              }
            `}
          >
            {/* Icon - always visible */}
            <span className="flex-shrink-0">{item.icon}</span>
            
            {/* Text label - only visible when sidebar is expanded */}
            {open && (
              <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
                {item.text}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

