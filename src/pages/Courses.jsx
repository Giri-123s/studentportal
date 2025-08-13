/**
 * Courses Page
 * Renders the list of enrolled courses with grades and credit units.
 */
import React from 'react';
import { studentData } from '../data/studentData';
import { PAGE_TITLES } from '../constants/ui';
import Button from '../components/ui/Button';

const Courses = () => {
  return (
    <div className="bg-slate-800 text-white rounded-lg p-4 sm:p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{PAGE_TITLES.courses}</h3>
        <Button variant="outline" size="sm">
          Export Data
        </Button>
      </div>
      
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full bg-slate-700 rounded-lg overflow-hidden">
          <thead className="bg-slate-900">
            <tr>
              <th className="text-left p-4 text-sky-300 font-bold">Course ID</th>
              <th className="text-left p-4 text-sky-300 font-bold">Course Name</th>
              <th className="text-left p-4 text-sky-300 font-bold">Credit Units</th>
              <th className="text-left p-4 text-sky-300 font-bold">Student Grade</th>
              <th className="text-left p-4 text-sky-300 font-bold">Grade Points</th>
            </tr>
          </thead>
          <tbody>
            {studentData.courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-600 transition-colors transition-transform hover:-translate-y-0.5">
                <td className="p-4">{course.id}</td>
                <td className="p-4">{course.name}</td>
                <td className="p-4">{course.credits}</td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-slate-800 text-sky-300 border border-sky-300 rounded-full text-sm">
                    {course.grade}
                  </span>
                </td>
                <td className="p-4">{course.gradePoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;

