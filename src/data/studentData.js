/**
 * Student Data and Utilities
 * 
 * This file contains:
 * - Mock student data for demonstration purposes
 * - Utility functions for data processing
 * - Sample data structures for development and testing
 * 
 * In a production application, this data would typically come from:
 * - API endpoints
 * - Database queries
 * - User authentication context
 * - Real-time data streams
 * 
 * @file studentData.js
 * @description Mock student data and utility functions for the Student Portal
 * 
 * @usage
 * import { studentData, calculateCGPA } from '../data/studentData';
 * 
 * @example
 * const courses = studentData.courses;
 * const gpa = calculateCGPA(courses);
 * 
 * @data-structure
 * - Personal Information: Basic student details
 * - Academic Records: Courses, grades, and credits
 * - Assignments: Course assignments and status
 * - Guardian Information: Emergency contact details
 */

/**
 * Mock student data object containing all student information
 * This simulates a real student's academic and personal data
 */
export const studentData = {
  /** Basic personal information */
  name: 'Alex Johnson',
  studentId: 'STU2024001',
  
  /** Academic information */
  currentSemester: 4,
  totalCredits: 72,
  
  /** Course enrollment and grades */
  courses: [
    {
      id: 'CS101',
      name: 'Introduction to Computer Science',
      credits: 3,
      grade: 'A',
      gradePoints: 4.0,
      semester: 1
    },
    {
      id: 'MATH201',
      name: 'Calculus I',
      credits: 4,
      grade: 'A-',
      gradePoints: 3.7,
      semester: 1
    },
    {
      id: 'ENG101',
      name: 'English Composition',
      credits: 3,
      grade: 'B+',
      gradePoints: 3.3,
      semester: 1
    },
    {
      id: 'PHY101',
      name: 'Physics I',
      credits: 4,
      grade: 'A',
      gradePoints: 4.0,
      semester: 2
    },
    {
      id: 'CHEM101',
      name: 'General Chemistry',
      credits: 4,
      grade: 'A-',
      gradePoints: 3.7,
      semester: 2
    },
    {
      id: 'CS201',
      name: 'Data Structures and Algorithms',
      credits: 3,
      grade: 'A',
      gradePoints: 4.0,
      semester: 3
    }
  ],
  
  /** Course assignments and deadlines */
  assignments: [
    {
      id: 'ASS001',
      courseId: 'CS101',
      title: 'Programming Fundamentals Project',
      dueDate: '2024-08-15',
      status: 'completed',
      score: 95
    },
    {
      id: 'ASS002',
      courseId: 'MATH201',
      title: 'Calculus Problem Set 3',
      dueDate: '2024-08-20',
      status: 'ongoing',
      score: null
    },
    {
      id: 'ASS003',
      courseId: 'ENG101',
      title: 'Research Paper Draft',
      dueDate: '2024-08-25',
      status: 'ongoing',
      score: null
    },
    {
      id: 'ASS004',
      courseId: 'PHY101',
      title: 'Lab Report - Mechanics',
      dueDate: '2024-08-10',
      status: 'completed',
      score: 88
    },
    {
      id: 'ASS005',
      courseId: 'CS201',
      title: 'Binary Tree Implementation',
      dueDate: '2024-08-30',
      status: 'ongoing',
      score: null
    }
  ]
};

/**
 * Calculates the Cumulative Grade Point Average (CGPA) for a student
 * 
 * CGPA is calculated by:
 * 1. Multiplying each course's grade points by its credit hours
 * 2. Summing all weighted grade points
 * 3. Dividing by total credit hours
 * 
 * @function calculateCGPA
 * @param {Array} courses - Array of course objects with gradePoints and credits
 * @returns {number} The calculated CGPA rounded to 2 decimal places
 * 
 * @example
 * const gpa = calculateCGPA(studentData.courses);
 * console.log(`Current CGPA: ${gpa}`); // Output: Current CGPA: 3.78
 * 
 * @formula
 * CGPA = Σ(Grade Points × Credits) / Σ(Credits)
 * 
 * @grade-scale
 * A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7
 * C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0
 */
export const calculateCGPA = (courses) => {
  // Input validation
  if (!Array.isArray(courses) || courses.length === 0) {
    return 0.0;
  }

  // Calculate total weighted grade points and total credits
  const totalWeightedPoints = courses.reduce((sum, course) => {
    // Ensure course has valid grade points and credits
    if (typeof course.gradePoints === 'number' && typeof course.credits === 'number') {
      return sum + (course.gradePoints * course.credits);
    }
    return sum;
  }, 0);

  const totalCredits = courses.reduce((sum, course) => {
    // Ensure course has valid credits
    if (typeof course.credits === 'number') {
      return sum + course.credits;
    }
    return sum;
  }, 0);

  // Calculate CGPA and round to 2 decimal places
  if (totalCredits === 0) {
    return 0.0;
  }

  const cgpa = totalWeightedPoints / totalCredits;
  return Math.round(cgpa * 100) / 100;
};

/**
 * Sample data for demonstration purposes
 * These can be used for testing different scenarios
 */
export const sampleData = {
  /** Sample course data for testing */
  sampleCourses: [
    {
      id: 'SAMPLE001',
      name: 'Sample Course 1',
      credits: 3,
      grade: 'A',
      gradePoints: 4.0
    },
    {
      id: 'SAMPLE002',
      name: 'Sample Course 2',
      credits: 4,
      grade: 'B+',
      gradePoints: 3.3
    }
  ],
  
  /** Sample assignment data for testing */
  sampleAssignments: [
    {
      id: 'SAMPLE_ASS001',
      courseId: 'SAMPLE001',
      title: 'Sample Assignment',
      dueDate: '2024-12-31',
      status: 'ongoing',
      score: null
    }
  ]
};

