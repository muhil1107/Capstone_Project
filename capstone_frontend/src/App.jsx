import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from './components/common/Sidebar';
import EmployerDashboard from './pages/employer/Dashboard';
import EmployerJobs from './pages/employer/JobManagement';
import EmployerInternships from './pages/employer/InternshipManagement';
import EmployerApplications from './pages/employer/Applications';
import EmployerNotifications from './pages/employer/Notifications';
import EmployerAnalytics from './pages/employer/Analytics';
import EmployerProfile from './pages/employer/Profile';

import UserDashboard from './pages/user/Dashboard';
import UserCourses from './pages/user/Courses';
import UserJobs from './pages/user/Jobs';
import UserInternships from './pages/user/Internships';
import UserMentors from './pages/user/Mentors';
import UserChallenges from './pages/user/Challenges';
import UserMockTests from './pages/user/Mocktest';
import UserAnalytics from './pages/user/Analytics';
import UserProfile from './pages/user/Profile';

// import MentorDashboard from './pages/mentor/Dashboard';
// import MentorSessions from './pages/mentor/Sessions';
// import MentorInterns from './pages/mentor/Interns';
// import MentorInterviews from './pages/mentor/Interviews';
// import MentorAvailability from './pages/mentor/Availability';
// import MentorProfile from './pages/mentor/Profile';

import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminEmployers from './pages/admin/Employers';
import AdminMentors from './pages/admin/Mentors';
import AdminJobs from './pages/admin/Jobs';
import AdminInternships from './pages/admin/Internships';
import AdminCourses from './pages/admin/Courses';
import AdminCertifications from './pages/admin/Certifications';
import AdminTests from './pages/admin/Tests';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSettings from './pages/admin/Settings';

import Login from './pages/auth/Login';
import signup from './pages/auth/Signup';

function App() {
  return (
    <Routes>
      {/* Authentication Route */}
      <Route path="/login" element={<Login />} />
      
      {/* Employer Routes */}
      <Route path="/employer" element={<SidebarLayout role="employer" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<EmployerDashboard />} />
        <Route path="jobs" element={<EmployerJobs />} />
        <Route path="internships" element={<EmployerInternships />} />
        <Route path="applications" element={<EmployerApplications />} />
        <Route path="notifications" element={<EmployerNotifications />} />
        <Route path="analytics" element={<EmployerAnalytics />} />
        <Route path="profile" element={<EmployerProfile />} />
      </Route>

      {/* User Routes */}
      <Route path="/user" element={<SidebarLayout role="user" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="courses" element={<UserCourses />} />
        <Route path="jobs" element={<UserJobs />} />
        <Route path="internships" element={<UserInternships />} />
        <Route path="mentors" element={<UserMentors />} />
        <Route path="challenges" element={<UserChallenges />} />
        <Route path="mocktests" element={<UserMockTests />} />
        <Route path="analytics" element={<UserAnalytics />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* Mentor Routes */}
      {/* <Route path="/mentor" element={<SidebarLayout role="mentor" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<MentorDashboard />} />
        <Route path="sessions" element={<MentorSessions />} />
        <Route path="interns" element={<MentorInterns />} />
        <Route path="interviews" element={<MentorInterviews />} />
        <Route path="availability" element={<MentorAvailability />} />
        <Route path="profile" element={<MentorProfile />} />
      </Route> */}

      {/* Admin Routes */}
      <Route path="/admin" element={<SidebarLayout role="admin" />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="employers" element={<AdminEmployers />} />
        <Route path="mentors" element={<AdminMentors />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="internships" element={<AdminInternships />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="certifications" element={<AdminCertifications />} />
        <Route path="tests" element={<AdminTests />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Default redirect to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Optional: Redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;