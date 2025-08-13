/**
 * Application Entry Point
 * 
 * This is the main entry point for the React application. It:
 * - Renders the root React component
 * - Sets up React Router for client-side navigation
 * - Applies global CSS styles
 * - Initializes the application in the DOM
 * 
 * @file index.js
 * @description Main application entry point and initialization
 * 
 * @dependencies
 * - React: Core React library
 * - ReactDOM: React DOM rendering
 * - BrowserRouter: Client-side routing
 * - App: Root application component
 * 
 * @target
 * - DOM element with id 'root' (defined in public/index.html)
 * 
 * @example
 * // This file is automatically loaded by the browser
 * // No manual imports needed in other components
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Get the root DOM element where the React app will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application wrapped in React Router
root.render(
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing throughout the app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
