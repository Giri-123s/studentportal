/**
 * CGPA Calculator Page
 * 
 * This page displays the student's current Cumulative Grade Point Average (CGPA)
 * and provides a detailed breakdown of their academic performance. It shows:
 * - Current CGPA with visual representation
 * - Individual course grades and credit hours
 * - Grade point calculations for each course
 * - Academic standing and progress indicators
 * 
 * The CGPA is calculated using the standard formula:
 * CGPA = Σ(Grade Points × Credits) / Σ(Credits)
 * 
 * @component CGPA
 * @description CGPA calculator and academic performance overview
 * @returns {JSX.Element} CGPA calculation page with course breakdown
 * 
 * @example
 * // Rendered by AppShell when navigating to /cgpa route
 * <Route path="/cgpa" element={<CGPA />} />
 * 
 * @features
 * - Real-time CGPA calculation
 * - Visual grade representation
 * - Course-by-course breakdown
 * - Responsive design for all devices
 * - Interactive hover effects
 * 
 * @data-source
 * - Uses studentData.courses for course information
 * - calculateCGPA utility function for GPA computation
 * - Real-time updates when data changes
 */
import React from 'react';
import { Trophy } from 'lucide-react';
import { studentData, calculateCGPA } from '../data/studentData';
import { PAGE_TITLES } from '../constants/ui';

const CGPA = () => {
  // Calculate current CGPA from student's course data
  const currentCGPA = calculateCGPA(studentData.courses);
  
  // Calculate total credits completed
  const totalCredits = studentData.courses.reduce((sum, course) => sum + course.credits, 0);
  
  // Determine academic standing based on CGPA
  const getAcademicStanding = (cgpa) => {
    if (cgpa >= 3.5) return { status: 'Dean\'s List', color: 'text-green-400', bgColor: 'bg-green-400/10' };
    if (cgpa >= 3.0) return { status: 'Good Standing', color: 'text-blue-400', bgColor: 'bg-blue-400/10' };
    if (cgpa >= 2.0) return { status: 'Satisfactory', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' };
    return { status: 'Academic Warning', color: 'text-red-400', bgColor: 'bg-red-400/10' };
  };

  const academicStanding = getAcademicStanding(currentCGPA);

  return (
    <div className="bg-slate-800 text-white rounded-lg p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/20">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-sky-300 mb-2">{PAGE_TITLES.cgpa}</h1>
        <p className="text-slate-300">Track your academic progress and performance</p>
      </div>

      {/* CGPA Overview Card */}
      <div className="bg-slate-700 rounded-lg p-6 mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="h-16 w-16 text-yellow-400 mr-4" />
          <div>
            <h2 className="text-4xl font-bold text-white">{currentCGPA}</h2>
            <p className="text-slate-300">Current CGPA</p>
          </div>
        </div>
        
        {/* Academic Standing */}
        <div className={`inline-block px-4 py-2 rounded-full ${academicStanding.bgColor} ${academicStanding.color} border border-current`}>
          {academicStanding.status}
        </div>
        
        {/* Total Credits */}
        <p className="text-slate-300 mt-4">
          Total Credits Completed: <span className="text-sky-300 font-semibold">{totalCredits}</span>
        </p>
      </div>

      {/* Course Breakdown Table */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-sky-300 mb-4">Course Breakdown</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left p-3 text-sky-300 font-semibold">Course</th>
                <th className="text-left p-3 text-sky-300 font-semibold">Credits</th>
                <th className="text-left p-3 text-sky-300 font-semibold">Grade</th>
                <th className="text-left p-3 text-sky-300 font-semibold">Grade Points</th>
                <th className="text-left p-3 text-sky-300 font-semibold">Weighted Points</th>
              </tr>
            </thead>
            <tbody>
              {studentData.courses.map((course) => (
                <tr key={course.id} className="border-b border-slate-600 hover:bg-slate-600 transition-colors">
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{course.id}</div>
                      <div className="text-sm text-slate-300">{course.name}</div>
                    </div>
                  </td>
                  <td className="p-3 text-center">{course.credits}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 bg-slate-800 text-sky-300 border border-sky-300 rounded-full text-sm">
                      {course.grade}
                    </span>
                  </td>
                  <td className="p-3 text-center">{course.gradePoints}</td>
                  <td className="p-3 text-center font-medium text-sky-300">
                    {(course.gradePoints * course.credits).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CGPA Calculation Summary */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg">
          <h4 className="text-lg font-semibold text-sky-300 mb-3">CGPA Calculation</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-300">Total Credits:</span>
              <span className="ml-2 text-white font-medium">{totalCredits}</span>
            </div>
            <div>
              <span className="text-slate-300">Total Weighted Points:</span>
              <span className="ml-2 text-white font-medium">
                {studentData.courses.reduce((sum, course) => sum + (course.gradePoints * course.credits), 0).toFixed(1)}
              </span>
            </div>
            <div>
              <span className="text-slate-300">CGPA:</span>
              <span className="ml-2 text-white font-medium">{currentCGPA}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Tips */}
      <div className="mt-6 p-4 bg-slate-700 rounded-lg">
        <h4 className="text-lg font-semibold text-sky-300 mb-3">Academic Tips</h4>
        <ul className="text-slate-300 space-y-2 text-sm">
          <li>• Maintain a CGPA of 3.0 or higher for good academic standing</li>
          <li>• Seek help early if you're struggling with any course</li>
          <li>• Balance your course load to maintain quality performance</li>
          <li>• Regular attendance and participation can improve your grades</li>
        </ul>
      </div>
    </div>
  );
};

export default CGPA;

