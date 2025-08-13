/**
 * Assignments Page
 * Provides filters and a table of assignments (mocked data).
 */
import React, { useState } from 'react';
import { studentData } from '../data/studentData';
import { PAGE_TITLES } from '../constants/ui';
import SelectDropdown from '../components/ui/SelectDropdown';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';

const Assignments = () => {
  const [assignmentFilter, setAssignmentFilter] = useState({ 
    courseId: '', 
    assignmentId: '', 
    status: 'all' 
  });
  
  const filteredAssignments = studentData.assignments.filter((assignment) => {
    return (
      (assignmentFilter.courseId === '' || assignment.courseId.includes(assignmentFilter.courseId)) &&
      (assignmentFilter.assignmentId === '' || assignment.id.includes(assignmentFilter.assignmentId)) &&
      (assignmentFilter.status === 'all' || assignment.status === assignmentFilter.status)
    );
  });

  const handleClearFilters = () => {
    setAssignmentFilter({ courseId: '', assignmentId: '', status: 'all' });
  };

  return (
    <div className="bg-slate-800 text-white rounded-lg p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{PAGE_TITLES.assignments}</h3>
        <Button variant="outline" size="sm" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 mb-6">
        <FormField
          label="Course ID"
          value={assignmentFilter.courseId}
          onChange={(e) => setAssignmentFilter({ ...assignmentFilter, courseId: e.target.value })}
          placeholder="Filter by Course ID"
          darkTheme={true}
        />
        <FormField
          label="Assignment ID"
          value={assignmentFilter.assignmentId}
          onChange={(e) => setAssignmentFilter({ ...assignmentFilter, assignmentId: e.target.value })}
          placeholder="Filter by Assignment ID"
          darkTheme={true}
        />
        <div className="space-y-1">
          <label className="block text-sm font-medium text-sky-300">Status</label>
          <SelectDropdown
            value={assignmentFilter.status}
            onChange={(val) => setAssignmentFilter({ ...assignmentFilter, status: val })}
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Completed', value: 'completed' },
              { label: 'Ongoing', value: 'ongoing' },
            ]}
            placeholder="Status"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-slate-700 rounded-lg overflow-hidden">
          <thead className="bg-slate-900">
            <tr>
              <th className="text-left p-4 text-sky-300 font-bold">Assignment ID</th>
              <th className="text-left p-4 text-sky-300 font-bold">Course ID</th>
              <th className="text-left p-4 text-sky-300 font-bold">Title</th>
              <th className="text-left p-4 text-sky-300 font-bold">Due Date</th>
              <th className="text-left p-4 text-sky-300 font-bold">Status</th>
              <th className="text-left p-4 text-sky-300 font-bold">Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-slate-600 transition-colors transition-transform hover:-translate-y-0.5">
                <td className="p-4">{assignment.id}</td>
                <td className="p-4">{assignment.courseId}</td>
                <td className="p-4">{assignment.title}</td>
                <td className="p-4">{assignment.dueDate}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 bg-slate-800 text-sky-300 border border-sky-300 rounded-full text-sm ${
                    assignment.status === 'completed' ? 'border-green-400 text-green-400' : ''
                  }`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="p-4">{assignment.score ? `${assignment.score}%` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;

