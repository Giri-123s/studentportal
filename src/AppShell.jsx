/**
 * Application Shell Component
 * 
 * This component serves as the main application container that handles:
 * - Overall application layout (sidebar + main content area)
 * - Client-side routing between different pages
 * - Responsive design adjustments
 * - State management for sidebar toggle
 * 
 * The AppShell provides a consistent layout structure across all pages
 * while managing the responsive behavior of the sidebar navigation.
 * 
 * @component AppShell
 * @description Main application layout and routing container
 * @returns {JSX.Element} Complete application shell with routing
 * 
 * @example
 * // Rendered by App.js
 * <AppShell />
 * 
 * @structure
 * - Sidebar: Collapsible navigation menu
 * - Header: Top navigation bar with user menu
 * - Main Content: Dynamic content area based on current route
 * 
 * @routes
 * - "/" -> Dashboard (default/home page)
 * - "/courses" -> Courses listing page
 * - "/cgpa" -> CGPA calculator page
 * - "/assignments" -> Assignments management page
 */
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CGPA from './pages/CGPA';
import Assignments from './pages/Assignments';

function AppShell() {
  // State to control sidebar open/closed state
  // Used for responsive design on mobile devices
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar open={open} setOpen={setOpen} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <Header open={open} setOpen={setOpen} />
        
        {/* Main Content with Routing */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-900">
          <div className="max-w-full mx-auto">
            <Routes>
              {/* Dashboard - Home page with student overview */}
              <Route path="/" element={<Dashboard />} />
              
              {/* Courses - Student course listing and grades */}
              <Route path="/courses" element={<Courses />} />
              
              {/* CGPA Calculator - Grade point average calculator */}
              <Route path="/cgpa" element={<CGPA />} />
              
              {/* Assignments - Assignment tracking and management */}
              <Route path="/assignments" element={<Assignments />} />
              
              {/* Fallback route - redirect to dashboard for unknown paths */}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppShell;

