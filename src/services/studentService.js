/**
 * Student Service
 * 
 * This service handles all student-related API operations including:
 * - Profile management (personal data, guardian info)
 * - Academic information (courses, grades, CGPA)
 * - Assignment tracking
 * - Notifications
 * 
 * The service provides a clean interface for components to interact with
 * the backend without worrying about API details.
 * 
 * @file studentService.js
 * @description Service layer for student-related API operations
 * 
 * @usage
 * import studentService from '../services/studentService';
 * 
 * @example
 * // Get student profile
 * const profile = await studentService.getProfile();
 * 
 * // Update personal data
 * await studentService.updateProfile(profileData);
 * 
 * // Get courses with grades
 * const courses = await studentService.getCourses();
 * 
 * // Calculate CGPA
 * const cgpa = await studentService.getCGPA();
 */

import apiService from './apiService';
import { API_ENDPOINTS } from '../config/api';

/**
 * Student Service Class
 * Provides methods for all student-related API operations
 */
class StudentService {
  /**
   * Get student profile information
   * 
   * @returns {Promise<Object>} Student profile data
   * @throws {Error} If API request fails
   * 
   * @example
   * try {
   *   const profile = await studentService.getProfile();
   *   console.log('Student:', profile.name);
   * } catch (error) {
   *   console.error('Failed to fetch profile:', error.message);
   * }
   */
  async getProfile() {
    try {
      const response = await apiService.get(API_ENDPOINTS.student.profile.path);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching student profile:', error);
      throw error;
    }
  }

  /**
   * Update student profile information
   * 
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated profile data
   * @throws {Error} If API request fails
   * 
   * @example
   * const updatedProfile = await studentService.updateProfile({
   *   name: 'John Doe',
   *   email: 'john.doe@example.com',
   *   phone: '+1234567890'
   * });
   */
  async updateProfile(profileData) {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.student.updateProfile.path, 
        profileData
      );
      return response.data || response;
    } catch (error) {
      console.error('Error updating student profile:', error);
      throw error;
    }
  }

  /**
   * Get guardian information
   * 
   * @returns {Promise<Object>} Guardian data
   * @throws {Error} If API request fails
   */
  async getGuardian() {
    try {
      const response = await apiService.get(API_ENDPOINTS.student.guardian.path);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching guardian data:', error);
      throw error;
    }
  }

  /**
   * Update guardian information
   * 
   * @param {Object} guardianData - Updated guardian data
   * @returns {Promise<Object>} Updated guardian data
   * @throws {Error} If API request fails
   */
  async updateGuardian(guardianData) {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.student.updateGuardian.path, 
        guardianData
      );
      return response.data || response;
    } catch (error) {
      console.error('Error updating guardian data:', error);
      throw error;
    }
  }

  /**
   * Get student courses with grades
   * 
   * @param {Object} options - Query options
   * @param {number} options.semester - Filter by semester
   * @param {string} options.status - Filter by course status
   * @returns {Promise<Array>} Array of courses
   * @throws {Error} If API request fails
   * 
   * @example
   * // Get all courses
   * const allCourses = await studentService.getCourses();
   * 
   * // Get courses for specific semester
   * const semesterCourses = await studentService.getCourses({ semester: 3 });
   */
  async getCourses(options = {}) {
    try {
      // Build query string from options
      const queryParams = new URLSearchParams();
      if (options.semester) queryParams.append('semester', options.semester);
      if (options.status) queryParams.append('status', options.status);
      
      const queryString = queryParams.toString();
      const endpoint = queryString 
        ? `${API_ENDPOINTS.academic.courses.path}?${queryString}`
        : API_ENDPOINTS.academic.courses.path;
      
      const response = await apiService.get(endpoint);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  /**
   * Get specific course details
   * 
   * @param {string} courseId - Course identifier
   * @returns {Promise<Object>} Course details
   * @throws {Error} If API request fails
   */
  async getCourse(courseId) {
    try {
      const endpoint = API_ENDPOINTS.academic.course.path.replace(':id', courseId);
      const response = await apiService.get(endpoint);
      return response.data || response;
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      throw error;
    }
  }

  /**
   * Get student CGPA
   * 
   * @returns {Promise<Object>} CGPA information
   * @throws {Error} If API request fails
   * 
   * @example
   * const cgpaInfo = await studentService.getCGPA();
   * console.log('Current CGPA:', cgpaInfo.cgpa);
   * console.log('Total Credits:', cgpaInfo.totalCredits);
   */
  async getCGPA() {
    try {
      const response = await apiService.get(API_ENDPOINTS.academic.cgpa.path);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching CGPA:', error);
      throw error;
    }
  }

  /**
   * Get student transcript
   * 
   * @param {Object} options - Transcript options
   * @param {boolean} options.includeGrades - Include detailed grades
   * @param {string} options.format - Output format (pdf, json)
   * @returns {Promise<Object|Blob>} Transcript data or PDF blob
   * @throws {Error} If API request fails
   */
  async getTranscript(options = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (options.includeGrades) queryParams.append('includeGrades', 'true');
      if (options.format) queryParams.append('format', options.format);
      
      const queryString = queryParams.toString();
      const endpoint = queryString 
        ? `${API_ENDPOINTS.academic.transcript.path}?${queryString}`
        : API_ENDPOINTS.academic.transcript.path;
      
      const response = await apiService.get(endpoint);
      
      // Handle different response formats
      if (options.format === 'pdf') {
        return response; // Return blob for PDF
      }
      
      return response.data || response;
    } catch (error) {
      console.error('Error fetching transcript:', error);
      throw error;
    }
  }

  /**
   * Get student assignments
   * 
   * @param {Object} options - Assignment filter options
   * @param {string} options.status - Filter by status (completed, ongoing, pending)
   * @param {string} options.courseId - Filter by course
   * @param {string} options.dueDate - Filter by due date
   * @returns {Promise<Array>} Array of assignments
   * @throws {Error} If API request fails
   * 
   * @example
   * // Get all assignments
   * const allAssignments = await studentService.getAssignments();
   * 
   * // Get pending assignments
   * const pendingAssignments = await studentService.getAssignments({ 
   *   status: 'pending' 
   * });
   */
  async getAssignments(options = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (options.status) queryParams.append('status', options.status);
      if (options.courseId) queryParams.append('courseId', options.courseId);
      if (options.dueDate) queryParams.append('dueDate', options.dueDate);
      
      const queryString = queryParams.toString();
      const endpoint = queryString 
        ? `${API_ENDPOINTS.assignments.list.path}?${queryString}`
        : API_ENDPOINTS.assignments.list.path;
      
      const response = await apiService.get(endpoint);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching assignments:', error);
      throw error;
    }
  }

  /**
   * Submit assignment
   * 
   * @param {string} assignmentId - Assignment identifier
   * @param {Object} submissionData - Assignment submission data
   * @returns {Promise<Object>} Submission confirmation
   * @throws {Error} If API request fails
   */
  async submitAssignment(assignmentId, submissionData) {
    try {
      const endpoint = API_ENDPOINTS.assignments.submit.path.replace(':id', assignmentId);
      const response = await apiService.post(endpoint, submissionData);
      return response.data || response;
    } catch (error) {
      console.error(`Error submitting assignment ${assignmentId}:`, error);
      throw error;
    }
  }

  /**
   * Get student notifications
   * 
   * @param {Object} options - Notification options
   * @param {boolean} options.unreadOnly - Get only unread notifications
   * @param {string} options.type - Filter by notification type
   * @returns {Promise<Array>} Array of notifications
   * @throws {Error} If API request fails
   */
  async getNotifications(options = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (options.unreadOnly) queryParams.append('unreadOnly', 'true');
      if (options.type) queryParams.append('type', options.type);
      
      const queryString = queryParams.toString();
      const endpoint = queryString 
        ? `${API_ENDPOINTS.notifications.list.path}?${queryString}`
        : API_ENDPOINTS.notifications.list.path;
      
      const response = await apiService.get(endpoint);
      return response.data || response;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  /**
   * Mark notification as read
   * 
   * @param {string} notificationId - Notification identifier
   * @returns {Promise<Object>} Updated notification
   * @throws {Error} If API request fails
   */
  async markNotificationRead(notificationId) {
    try {
      const endpoint = API_ENDPOINTS.notifications.markRead.path.replace(':id', notificationId);
      const response = await apiService.put(endpoint);
      return response.data || response;
    } catch (error) {
      console.error(`Error marking notification ${notificationId} as read:`, error);
      throw error;
    }
  }

  /**
   * Change student password
   * 
   * @param {Object} passwordData - Password change data
   * @param {string} passwordData.currentPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @param {string} passwordData.confirmPassword - Password confirmation
   * @returns {Promise<Object>} Password change confirmation
   * @throws {Error} If API request fails
   */
  async changePassword(passwordData) {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.auth.changePassword.path, 
        passwordData
      );
      return response.data || response;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new StudentService(); 