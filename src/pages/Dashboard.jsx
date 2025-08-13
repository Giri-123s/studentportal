/**
 * Dashboard Page
 * Shows welcome banner, profile cards (personal/guardian/degree/admin),
 * key stats, and recent activity. Uses reusable components for better maintainability.
 * Enhanced with creative animations and modern design elements.
 */
import React, { useEffect, useState } from 'react';
import { Book, Clock, TrendingUp, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { CARD_TITLES } from '../constants/ui';
import { studentData, calculateCGPA } from '../data/studentData';
import useEditDialog from '../hooks/useEditDialog';

// Reusable Components
import DataCard from '../components/ui/DataCard';
import StatsCard from '../components/ui/StatsCard';
import Modal from '../components/ui/Modal';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';

// Creative Components
import AnimatedCard from '../components/ui/AnimatedCard';
import CreativeChart from '../components/ui/CreativeChart';

const Dashboard = () => {
  const [displayText, setDisplayText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fullText = 'Hi Alex, Welcome to Student Portal';

  // Data state
  const [personalData, setPersonalData] = useState({
    name: studentData.name,
    studentId: studentData.studentId,
    phone: '+1 (555) 123-4567',
    email: 'alex.johnson@example.com',
  });

  const [guardianData, setGuardianData] = useState({
    name: 'Michael Johnson',
    phone: '+1 (555) 987-6543',
    email: 'michael.johnson@example.com',
    address: '123 Maple Street, Springfield, IL',
  });

  const [degreeData, setDegreeData] = useState({
    program: 'B.Sc. Computer Science',
    discipline: 'Computer Science',
    joinDate: 'September 2022',
  });

  const [adminNotifications, setAdminNotifications] = useState([
    'Fee payment due: August 20, 2024',
    'Last date for course registration: August 15, 2024',
    'Upload certificate required: Academic transcript',
    'Pending status: Library book return overdue',
  ]);

  // Edit dialog hooks
  const personalDialog = useEditDialog(personalData);
  const guardianDialog = useEditDialog(guardianData);
  const degreeDialog = useEditDialog(degreeData);
  const notificationsDialog = useEditDialog(adminNotifications.join('\n'));

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setTimeout(() => {
          currentIndex = 0;
          setDisplayText('');
        }, 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Save handlers
  const handleSavePersonal = () => {
    setPersonalData(personalDialog.tempData);
    personalDialog.closeDialog();
  };

  const handleSaveGuardian = () => {
    setGuardianData(guardianDialog.tempData);
    guardianDialog.closeDialog();
  };

  const handleSaveDegree = () => {
    setDegreeData(degreeDialog.tempData);
    degreeDialog.closeDialog();
  };

  const handleSaveNotifications = () => {
    const lines = notificationsDialog.tempData
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    setAdminNotifications(lines);
    notificationsDialog.closeDialog();
  };

  // Chart data for creative visualization
  const courseData = [
    { label: 'CS101', value: 85 },
    { label: 'MATH201', value: 92 },
    { label: 'ENG101', value: 78 },
    { label: 'PHY101', value: 88 },
    { label: 'CHEM101', value: 90 }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-8">
            <Sparkles className="h-16 w-16 text-sky-400 mx-auto animate-pulse" />
          </div>
          <div className="text-sky-400 font-mono text-lg animate-pulse">
            Preparing Your Dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Creative Welcome Banner */}
      <AnimatedCard 
        variant="glass" 
        glowColor="yellow" 
        className="text-center py-16 mb-8"
      >
        <div className="relative">
          <h1 className="text-5xl font-bold text-yellow-400 font-mono min-h-[120px] flex items-center justify-center">
            {displayText}
            <span className="animate-pulse text-yellow-400">|</span>
          </h1>
          
          {/* Floating sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </AnimatedCard>

      {/* Data Cards Row 1 */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <AnimatedCard variant="neon" glowColor="sky">
          <DataCard
            title={CARD_TITLES.personal}
            data={personalData}
            onEdit={() => personalDialog.openDialog(personalData)}
          />
        </AnimatedCard>
        
        <AnimatedCard variant="neon" glowColor="purple">
          <DataCard
            title={CARD_TITLES.guardian}
            data={guardianData}
            onEdit={() => guardianDialog.openDialog(guardianData)}
          />
        </AnimatedCard>
      </div>

      {/* Data Cards Row 2 */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <AnimatedCard variant="neon" glowColor="green">
          <DataCard
            title={CARD_TITLES.degree}
            data={degreeData}
            onEdit={() => degreeDialog.openDialog(degreeData)}
          />
        </AnimatedCard>
        
        <AnimatedCard variant="neon" glowColor="pink">
          <DataCard
            title={CARD_TITLES.admin}
            onEdit={() => notificationsDialog.openDialog(adminNotifications.join('\n'))}
          >
            <div className="space-y-2 text-sm">
              {adminNotifications.map((note, idx) => (
                <p key={idx}>- {note}</p>
              ))}
            </div>
          </DataCard>
        </AnimatedCard>
      </div>

      {/* Creative Stats Section */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        <AnimatedCard variant="gradient" glowColor="sky">
          <StatsCard
            title="Total Courses"
            value={studentData.courses.length}
            icon={Book}
          />
        </AnimatedCard>
        <AnimatedCard variant="gradient" glowColor="purple">
          <StatsCard
            title="Pending Assignments"
            value={studentData.assignments.filter(a => a.status === 'ongoing').length}
            icon={Clock}
          />
        </AnimatedCard>
        <AnimatedCard variant="gradient" glowColor="green">
          <StatsCard
            title="Current CGPA"
            value={calculateCGPA(studentData.courses)}
            icon={TrendingUp}
          />
        </AnimatedCard>
      </div>

      {/* Creative Chart Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CreativeChart 
          data={courseData} 
          title="Course Performance Overview" 
        />
        
        {/* Recent Activity with enhanced styling */}
        <AnimatedCard variant="default" glowColor="sky">
          <h3 className="text-lg font-semibold mb-4 text-sky-300">{CARD_TITLES.recentActivity}</h3>
          <div className="space-y-4">
            {studentData.assignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="flex flex-wrap items-center gap-2 p-4 bg-slate-700/50 rounded-lg transition-all duration-300 hover:bg-slate-700 hover:scale-105 min-w-0">
                {assignment.status === 'completed' ? (
                  <CheckCircle className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-yellow-400 mr-4 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{assignment.title}</p>
                  <p className="text-sm text-sky-300 truncate">
                    {assignment.courseId} - Due: {assignment.dueDate}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap shrink-0 ml-auto transition-all duration-300 ${
                  assignment.status === 'completed'
                    ? 'border-green-400 text-green-400 bg-green-400/10'
                    : 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                }`}>
                  {assignment.status}
                </span>
              </div>
            ))}
          </div>
        </AnimatedCard>
      </div>

      {/* Edit Dialogs */}
      <Modal
        isOpen={personalDialog.isOpen}
        onClose={personalDialog.closeDialog}
        title="Edit Personal Data"
        size="sm"
        actions={
          <>
            <Button variant="ghost" onClick={personalDialog.closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSavePersonal}>
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Name"
            value={personalDialog.tempData.name}
            onChange={(e) => personalDialog.setTempData({ ...personalDialog.tempData, name: e.target.value })}
            placeholder="Enter name"
            darkTheme={false}
          />
          <FormField
            label="Student ID"
            value={personalDialog.tempData.studentId}
            onChange={(e) => personalDialog.setTempData({ ...personalDialog.tempData, studentId: e.target.value })}
            placeholder="Enter student ID"
            darkTheme={false}
          />
          <FormField
            label="Phone"
            value={personalDialog.tempData.phone}
            onChange={(e) => personalDialog.setTempData({ ...personalDialog.tempData, phone: e.target.value })}
            placeholder="Enter phone number"
            darkTheme={false}
          />
          <FormField
            label="Email"
            type="email"
            value={personalDialog.tempData.email}
            onChange={(e) => personalDialog.setTempData({ ...personalDialog.tempData, email: e.target.value })}
            placeholder="Enter email address"
            darkTheme={false}
          />
        </div>
      </Modal>

      <Modal
        isOpen={guardianDialog.isOpen}
        onClose={guardianDialog.closeDialog}
        title="Edit Guardian Data"
        size="sm"
        actions={
          <>
            <Button variant="ghost" onClick={guardianDialog.closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveGuardian}>
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Name"
            value={guardianDialog.tempData.name}
            onChange={(e) => guardianDialog.setTempData({ ...guardianDialog.tempData, name: e.target.value })}
            placeholder="Enter guardian name"
            darkTheme={false}
          />
          <FormField
            label="Phone"
            value={guardianDialog.tempData.phone}
            onChange={(e) => guardianDialog.setTempData({ ...guardianDialog.tempData, phone: e.target.value })}
            placeholder="Enter phone number"
            darkTheme={false}
          />
          <FormField
            label="Email"
            type="email"
            value={guardianDialog.tempData.email}
            onChange={(e) => guardianDialog.setTempData({ ...guardianDialog.tempData, email: e.target.value })}
            placeholder="Enter email address"
            darkTheme={false}
          />
          <FormField
            label="Address"
            value={guardianDialog.tempData.address}
            onChange={(e) => guardianDialog.setTempData({ ...guardianDialog.tempData, address: e.target.value })}
            placeholder="Enter address"
            darkTheme={false}
          />
        </div>
      </Modal>

      <Modal
        isOpen={degreeDialog.isOpen}
        onClose={degreeDialog.closeDialog}
        title="Edit Degree Program"
        size="sm"
        actions={
          <>
            <Button variant="ghost" onClick={degreeDialog.closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveDegree}>
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Program"
            value={degreeDialog.tempData.program}
            onChange={(e) => degreeDialog.setTempData({ ...degreeDialog.tempData, program: e.target.value })}
            placeholder="Enter program name"
            darkTheme={false}
          />
          <FormField
            label="Discipline"
            value={degreeDialog.tempData.discipline}
            onChange={(e) => degreeDialog.setTempData({ ...degreeDialog.tempData, discipline: e.target.value })}
            placeholder="Enter discipline"
            darkTheme={false}
          />
          <FormField
            label="Join Date"
            value={degreeDialog.tempData.joinDate}
            onChange={(e) => degreeDialog.setTempData({ ...degreeDialog.tempData, joinDate: e.target.value })}
            placeholder="Enter join date"
            darkTheme={false}
          />
        </div>
      </Modal>

      <Modal
        isOpen={notificationsDialog.isOpen}
        onClose={notificationsDialog.closeDialog}
        title="Edit Admin Notifications"
        size="md"
        actions={
          <>
            <Button variant="ghost" onClick={notificationsDialog.closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveNotifications}>
              Save
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter one notification per line.
          </p>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent h-48 resize-none"
            value={notificationsDialog.tempData}
            onChange={(e) => notificationsDialog.setTempData(e.target.value)}
            placeholder="Enter notifications..."
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;

