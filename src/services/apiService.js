/**
 * API Service Layer
 * 
 * This service provides a clean interface for making HTTP requests to the backend.
 * It handles:
 * - Request/response interceptors
 * - Authentication headers
 * - Error handling and retries
 * - Request caching
 * - Response transformation
 * 
 * @file apiService.js
 * @description Centralized API service for backend communication
 * 
 * @usage
 * import apiService from '../services/apiService';
 * 
 * @example
 * // GET request
 * const courses = await apiService.get('/academic/courses');
 * 
 * // POST request with data
 * const newAssignment = await apiService.post('/assignments', assignmentData);
 * 
 * // PUT request with parameters
 * const updatedProfile = await apiService.put('/student/profile', profileData);
 * 
 * // DELETE request
 * await apiService.delete('/assignments/123');
 */

import { 
  API_BASE_URL, 
  API_CONFIG, 
  HTTP_STATUS, 
  ERROR_MESSAGES,
  buildApiUrl 
} from '../config/api';

/**
 * Default request headers
 */
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

/**
 * Get authentication token from localStorage
 * In a real app, this might come from a context or secure storage
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Add authentication header to request headers
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  if (token) {
    return {
      ...DEFAULT_HEADERS,
      'Authorization': `Bearer ${token}`
    };
  }
  return DEFAULT_HEADERS;
};

/**
 * Handle API response and extract data
 */
const handleResponse = async (response) => {
  // Check if response is ok (status 200-299)
  if (!response.ok) {
    // Handle different error status codes
    switch (response.status) {
      case HTTP_STATUS.UNAUTHORIZED:
        // Token expired or invalid - redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      
      case HTTP_STATUS.FORBIDDEN:
        throw new Error('Access denied. You do not have permission for this action.');
      
      case HTTP_STATUS.NOT_FOUND:
        throw new Error(ERROR_MESSAGES.NOT_FOUND);
      
      case HTTP_STATUS.VALIDATION_ERROR:
        const validationErrors = await response.json();
        throw new Error(`Validation Error: ${JSON.stringify(validationErrors)}`);
      
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        throw new Error(ERROR_MESSAGES.SERVER_ERROR);
      
      default:
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  // Try to parse JSON response
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    // If response is empty or not JSON, return null
    return null;
  }
};

/**
 * Retry mechanism for failed requests
 */
const retryRequest = async (requestFn, attempts = API_CONFIG.retry.attempts) => {
  try {
    return await requestFn();
  } catch (error) {
    if (attempts > 1 && !error.message.includes('401')) {
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.retry.delay));
      return retryRequest(requestFn, attempts - 1);
    }
    throw error;
  }
};

/**
 * Simple cache implementation
 */
class SimpleCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = API_CONFIG.cache.maxSize;
    this.ttl = API_CONFIG.cache.ttl;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    // Check if item has expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

// Initialize cache
const cache = new SimpleCache();

/**
 * Main API service class
 */
class ApiService {
  /**
   * Make a GET request
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @param {boolean} options.useCache - Whether to use cache
   * @returns {Promise} API response
   */
  async get(endpoint, options = {}) {
    const { useCache = true, ...requestOptions } = options;
    
    // Check cache first if enabled
    if (useCache && API_CONFIG.cache.enabled) {
      const cached = cache.get(endpoint);
      if (cached) return cached;
    }

    const requestFn = async () => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getAuthHeaders(),
        ...requestOptions
      });
      
      return handleResponse(response);
    };

    const result = await retryRequest(requestFn);
    
    // Cache the result if caching is enabled
    if (useCache && API_CONFIG.cache.enabled) {
      cache.set(endpoint, result);
    }
    
    return result;
  }

  /**
   * Make a POST request
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise} API response
   */
  async post(endpoint, data, options = {}) {
    const requestFn = async () => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
        ...options
      });
      
      return handleResponse(response);
    };

    return retryRequest(requestFn);
  }

  /**
   * Make a PUT request
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise} API response
   */
  async put(endpoint, data, options = {}) {
    const requestFn = async () => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
        ...options
      });
      
      return handleResponse(response);
    };

    return retryRequest(requestFn);
  }

  /**
   * Make a DELETE request
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise} API response
   */
  async delete(endpoint, options = {}) {
    const requestFn = async () => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        ...options
      });
      
      return handleResponse(response);
    };

    return retryRequest(requestFn);
  }

  /**
   * Make a PATCH request
   * 
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise} API response
   */
  async patch(endpoint, data, options = {}) {
    const requestFn = async () => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
        ...options
      });
      
      return handleResponse(response);
    };

    return retryRequest(requestFn);
  }

  /**
   * Upload file(s) using FormData
   * 
   * @param {string} endpoint - API endpoint
   * @param {FormData} formData - Form data with files
   * @param {Object} options - Request options
   * @returns {Promise} API response
   */
  async upload(endpoint, formData, options = {}) {
    const requestFn = async () => {
      // Remove Content-Type header for FormData (browser sets it automatically)
      const headers = { ...getAuthHeaders() };
      delete headers['Content-Type'];
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
        ...options
      });
      
      return handleResponse(response);
    };

    return retryRequest(requestFn);
  }

  /**
   * Clear the request cache
   */
  clearCache() {
    cache.clear();
  }

  /**
   * Set authentication token
   * 
   * @param {string} token - JWT token
   */
  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  /**
   * Remove authentication token
   */
  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  /**
   * Check if user is authenticated
   * 
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return !!getAuthToken();
  }
}

// Export singleton instance
export default new ApiService(); 