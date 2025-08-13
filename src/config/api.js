/**
 * API Configuration and Endpoints
 * 
 * This file centralizes all API-related configuration including:
 * - Base URLs for different environments
 * - API endpoint definitions
 * - Request/response interceptors
 * - Authentication headers
 * - Error handling configurations
 * 
 * @file api.js
 * @description API configuration for backend integration
 * 
 * @usage
 * import { API_ENDPOINTS, API_CONFIG } from '../config/api';
 * 
 * @environments
 * - Development: Local development server
 * - Staging: Testing environment
 * - Production: Live production server
 * 
 * @maintenance
 * - Update base URLs when deploying to different environments
 * - Add new endpoints as backend APIs are developed
 * - Modify authentication logic as needed
 * - Update error handling based on backend response formats
 */

/**
 * Environment-based configuration
 * Set NODE_ENV to control which configuration is used
 */
const ENV = process.env.NODE_ENV || 'development';

/**
 * Base API URLs for different environments
 */
export const API_BASE_URLS = {
  development: 'http://localhost:8000/api/v1',
  staging: 'https://staging-api.studentportal.com/api/v1',
  production: 'https://api.studentportal.com/api/v1'
};

/**
 * Current API base URL based on environment
 */
export const API_BASE_URL = API_BASE_URLS[ENV];

/**
 * API endpoints organized by feature/module
 * Each endpoint includes the HTTP method and path
 */
export const API_ENDPOINTS = {
  // Authentication endpoints
  auth: {
    login: { method: 'POST', path: '/auth/login' },
    logout: { method: 'POST', path: '/auth/logout' },
    refresh: { method: 'POST', path: '/auth/refresh' },
    changePassword: { method: 'PUT', path: '/auth/change-password' },
  },

  // Student profile endpoints
  student: {
    profile: { method: 'GET', path: '/student/profile' },
    updateProfile: { method: 'PUT', path: '/student/profile' },
    guardian: { method: 'GET', path: '/student/guardian' },
    updateGuardian: { method: 'PUT', path: '/student/guardian' },
  },

  // Academic endpoints
  academic: {
    courses: { method: 'GET', path: '/academic/courses' },
    course: { method: 'GET', path: '/academic/courses/:id' },
    cgpa: { method: 'GET', path: '/academic/cgpa' },
    transcript: { method: 'GET', path: '/academic/transcript' },
  },

  // Assignment endpoints
  assignments: {
    list: { method: 'GET', path: '/assignments' },
    create: { method: 'POST', path: '/assignments' },
    update: { method: 'PUT', path: '/assignments/:id' },
    delete: { method: 'DELETE', path: '/assignments/:id' },
    submit: { method: 'POST', path: '/assignments/:id/submit' },
  },

  // Notification endpoints
  notifications: {
    list: { method: 'GET', path: '/notifications' },
    markRead: { method: 'PUT', path: '/notifications/:id/read' },
    create: { method: 'POST', path: '/notifications' },
    update: { method: 'PUT', path: '/notifications/:id' },
  }
};

/**
 * API configuration settings
 */
export const API_CONFIG = {
  // Request timeout in milliseconds
  timeout: 10000,
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000,
    backoff: 2
  },
  
  // Pagination defaults
  pagination: {
    pageSize: 20,
    maxPageSize: 100
  },
  
  // Cache configuration
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100
  }
};

/**
 * HTTP status codes and their meanings
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

/**
 * Common error messages for different scenarios
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

/**
 * Helper function to build full API URLs
 * 
 * @param {string} endpoint - API endpoint path
 * @param {Object} params - URL parameters to replace
 * @returns {string} Complete API URL
 * 
 * @example
 * buildApiUrl(API_ENDPOINTS.assignments.update, { id: 123 })
 * // Returns: "http://localhost:8000/api/v1/assignments/123"
 */
export const buildApiUrl = (endpoint, params = {}) => {
  let url = `${API_BASE_URL}${endpoint.path}`;
  
  // Replace URL parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
};

/**
 * Helper function to get HTTP method from endpoint
 * 
 * @param {Object} endpoint - API endpoint object
 * @returns {string} HTTP method
 */
export const getHttpMethod = (endpoint) => endpoint.method;

/**
 * Environment information for debugging
 */
export const ENV_INFO = {
  current: ENV,
  baseUrl: API_BASE_URL,
  isDevelopment: ENV === 'development',
  isStaging: ENV === 'staging',
  isProduction: ENV === 'production'
}; 