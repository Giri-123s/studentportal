/**
 * Custom Hook: useApi
 * 
 * This hook provides a clean interface for managing API calls with:
 * - Loading states
 * - Error handling
 * - Data caching
 * - Automatic retries
 * - Optimistic updates
 * 
 * It simplifies the process of making API calls and managing their state
 * in React components.
 * 
 * @hook useApi
 * @description Manages API state, loading, errors, and data for backend integration
 * 
 * @usage
 * import { useApi } from '../hooks/useApi';
 * 
 * @example
 * // Simple GET request
 * const { data, loading, error, execute } = useApi(
 *   () => studentService.getProfile()
 * );
 * 
 * // POST request with data
 * const { execute: createAssignment, loading: creating } = useApi(
 *   (data) => studentService.submitAssignment(assignmentId, data)
 * );
 * 
 * // Manual execution
 * const handleSubmit = () => {
 *   createAssignment(formData);
 * };
 * 
 * @returns-object
 * - data: * - Response data from API
 * - loading: boolean - Loading state
 * - error: Error|null - Error object if request failed
 * - execute: Function - Function to execute the API call
 * - reset: Function - Reset hook state
 * - refetch: Function - Re-execute the API call
 */

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useApi Hook
 * 
 * @param {Function} apiCall - Function that returns a promise (API call)
 * @param {Object} options - Hook configuration options
 * @param {boolean} options.autoExecute - Whether to execute API call on mount
 * @param {boolean} options.cache - Whether to cache the response
 * @param {number} options.cacheTime - Cache TTL in milliseconds
 * @param {boolean} options.retry - Whether to retry failed requests
 * @param {number} options.retryAttempts - Number of retry attempts
 * @param {number} options.retryDelay - Delay between retries in milliseconds
 * @returns {Object} Hook state and functions
 */
export const useApi = (apiCall, options = {}) => {
  const {
    autoExecute = false,
    cache = true,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    retry = true,
    retryAttempts = 3,
    retryDelay = 1000
  } = options;

  // State management
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Refs for managing state
  const abortControllerRef = useRef(null);
  const cacheRef = useRef(new Map());
  const retryTimeoutRef = useRef(null);

  /**
   * Clear retry timeout
   */
  const clearRetryTimeout = () => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  };

  /**
   * Reset hook state
   */
  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    clearRetryTimeout();
    
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  /**
   * Execute API call with retry logic
   */
  const executeWithRetry = useCallback(async (args = [], attempt = 1) => {
    try {
      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      
      // Execute API call
      const result = await apiCall(...args);
      
      // Clear retry timeout and abort controller
      clearRetryTimeout();
      abortControllerRef.current = null;
      
      // Update state with success
      setData(result);
      setLoading(false);
      setError(null);
      
      // Cache the result if caching is enabled
      if (cache) {
        const cacheKey = JSON.stringify(args);
        cacheRef.current.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
      }
      
      return result;
    } catch (err) {
      // Handle abort
      if (err.name === 'AbortError') {
        return;
      }
      
      // Handle retry logic
      if (retry && attempt < retryAttempts && !err.message.includes('401')) {
        setError(`Attempt ${attempt} failed. Retrying...`);
        
        // Schedule retry
        retryTimeoutRef.current = setTimeout(() => {
          executeWithRetry(args, attempt + 1);
        }, retryDelay * attempt); // Exponential backoff
        
        return;
      }
      
      // Final failure
      setError(err);
      setLoading(false);
      abortControllerRef.current = null;
      throw err;
    }
  }, [apiCall, cache, retry, retryAttempts, retryDelay]);

  /**
   * Execute the API call
   */
  const execute = useCallback(async (...args) => {
    // Check cache first if enabled
    if (cache) {
      const cacheKey = JSON.stringify(args);
      const cached = cacheRef.current.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < cacheTime) {
        setData(cached.data);
        return cached.data;
      }
    }
    
    // Set loading state
    setLoading(true);
    setError(null);
    
    // Execute API call
    return executeWithRetry(args);
  }, [executeWithRetry, cache, cacheTime]);

  /**
   * Refetch data (ignore cache)
   */
  const refetch = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    // Clear cache for this request if caching is enabled
    if (cache) {
      const cacheKey = JSON.stringify(args);
      cacheRef.current.delete(cacheKey);
    }
    
    // Execute API call
    return executeWithRetry(args);
  }, [executeWithRetry, cache]);

  /**
   * Update data optimistically
   * Useful for immediate UI updates before API confirmation
   */
  const updateData = useCallback((updater) => {
    if (typeof updater === 'function') {
      setData(prevData => updater(prevData));
    } else {
      setData(updater);
    }
  }, []);

  /**
   * Clear cache
   */
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  /**
   * Auto-execute on mount if enabled
   */
  useEffect(() => {
    if (autoExecute) {
      execute();
    }
    
    // Cleanup on unmount
    return () => {
      clearRetryTimeout();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [autoExecute, execute]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    refetch,
    updateData,
    clearCache
  };
};

/**
 * useApiLazy Hook
 * 
 * Similar to useApi but doesn't execute automatically.
 * Useful for manual trigger scenarios.
 * 
 * @param {Function} apiCall - Function that returns a promise
 * @param {Object} options - Hook configuration options
 * @returns {Object} Hook state and functions
 */
export const useApiLazy = (apiCall, options = {}) => {
  return useApi(apiCall, { ...options, autoExecute: false });
};

/**
 * useApiPolling Hook
 * 
 * Executes API call periodically for real-time updates.
 * 
 * @param {Function} apiCall - Function that returns a promise
 * @param {Object} options - Hook configuration options
 * @param {number} options.interval - Polling interval in milliseconds
 * @param {boolean} options.enabled - Whether polling is enabled
 * @returns {Object} Hook state and functions
 */
export const useApiPolling = (apiCall, options = {}) => {
  const { interval = 30000, enabled = true, ...apiOptions } = options;
  
  const { data, loading, error, execute, reset, refetch } = useApi(apiCall, apiOptions);
  
  useEffect(() => {
    if (!enabled) return;
    
    const intervalId = setInterval(() => {
      refetch();
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [enabled, interval, refetch]);
  
  return {
    data,
    loading,
    error,
    execute,
    reset,
    refetch,
    stopPolling: reset
  };
}; 