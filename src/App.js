/**
 * Main Application Component
 * 
 * This is the root component of the Student Portal application.
 * It serves as a simple wrapper that renders the AppShell component,
 * which contains the main application logic, routing, and layout.
 * 
 * @component App
 * @description Root component that initializes the application
 * @returns {JSX.Element} The main application shell
 * 
 * @example
 * // Usage in index.js
 * <App />
 */
import React from 'react';
import AppShell from './AppShell';

function App() {
  return <AppShell />;
}

export default App;

