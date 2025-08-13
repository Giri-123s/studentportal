/**
 * UI Constants and Labels
 * 
 * This file centralizes all user-facing text and labels used throughout the application.
 * Centralizing these constants ensures:
 * - Consistency in terminology across the application
 * - Easy maintenance and updates
 * - Localization readiness
 * - Reduced typos and inconsistencies
 * 
 * @file ui.js
 * @description Centralized UI text constants for the Student Portal application
 * 
 * @usage
 * import { PAGE_TITLES, CARD_TITLES } from '../constants/ui';
 * 
 * @example
 * <h1>{PAGE_TITLES.dashboard}</h1>
 * <h2>{CARD_TITLES.personal}</h2>
 * 
 * @maintenance
 * - Add new constants here when adding new UI elements
 * - Update existing constants when changing terminology
 * - Keep descriptions clear and consistent
 * - Consider future localization needs
 */

/**
 * Page titles used in navigation and page headers
 * These appear in the browser tab, page headers, and navigation breadcrumbs
 */
export const PAGE_TITLES = {
  /** Main dashboard/home page */
  dashboard: 'Dashboard',
  
  /** Course listing and management page */
  courses: 'My Courses',
  
  /** CGPA calculator page */
  cgpa: 'CGPA Calculator',
  
  /** Assignment tracking and management page */
  assignments: 'Assignments',
};

/**
 * Card titles used in dashboard widgets and data cards
 * These appear as headers for different information sections
 */
export const CARD_TITLES = {
  /** Personal information section */
  personal: 'Personal Data',
  
  /** Guardian/emergency contact information */
  guardian: 'Guardian Data',
  
  /** Academic program and degree information */
  degree: 'Degree Program',
  
  /** Administrative notifications and alerts */
  admin: 'Admin Notifications',
  
  /** Recent activity and updates section */
  recentActivity: 'Recent Activity',
};

/**
 * User menu action labels
 * These appear in the top-right user dropdown menu
 */
export const USER_MENU_LABELS = {
  /** Edit personal information option */
  editPersonalData: 'Edit Personal Data',
  
  /** Change password option */
  changePassword: 'Change Password',
  
  /** Logout action */
  logout: 'Logout',
};

/**
 * Form field labels and placeholders
 * These appear in form inputs and validation messages
 */
export const FORM_LABELS = {
  /** Personal information fields */
  name: 'Name',
  studentId: 'Student ID',
  phone: 'Phone',
  email: 'Email',
  address: 'Address',
  
  /** Academic information fields */
  program: 'Program',
  discipline: 'Discipline',
  joinDate: 'Join Date',
  
  /** Filter and search fields */
  courseId: 'Course ID',
  assignmentId: 'Assignment ID',
  status: 'Status',
};

/**
 * Button text and labels
 * These appear on buttons throughout the application
 */
export const BUTTON_LABELS = {
  /** Form actions */
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  
  /** Filter actions */
  clearFilters: 'Clear Filters',
  applyFilters: 'Apply Filters',
  
  /** Navigation actions */
  exportData: 'Export Data',
  importData: 'Import Data',
};

/**
 * Status and state labels
 * These appear in status indicators and filters
 */
export const STATUS_LABELS = {
  /** Assignment statuses */
  completed: 'Completed',
  ongoing: 'Ongoing',
  pending: 'Pending',
  overdue: 'Overdue',
  
  /** Filter options */
  all: 'All',
  allStatus: 'All Status',
};

