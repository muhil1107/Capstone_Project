import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import DashboardStats from '../../components/user/DashboardStats';

const UserDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const userName = "MUHIL";
  
  // Sample data - in a real app this would come from API
  const userStats = {
    courseProgress: 60,
    courseName: "ReactJS",
    internshipTask: "Week 3 Task",
    internshipDue: "2 days",
    appliedJobs: 3,
    interviews: 1,
    nextMentorship: "July 25, 5PM",
    challengesCompleted: 4
  };

  const handleMenuItemClick = (itemId) => {
    setActiveMenuItem(itemId);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log("Logging out...");
  };

  const renderContent = () => {
    switch(activeMenuItem) {
      case 'dashboard':
        return <DashboardStats userName={userName} stats={userStats} />;
      case 'courses':
        return <div style={contentStyle}><h2>My Courses</h2></div>;
      case 'jobs':
        return <div style={contentStyle}><h2>Job Applications</h2></div>;
      // Add other cases for other menu items
      default:
        return <DashboardStats userName={userName} stats={userStats} />;
    }
  };

  return (
    <div style={appStyle}>
      <Header userRole="user" userName={userName} onLogout={handleLogout} />
      <div style={mainContentStyle}>
        <Sidebar 
          userRole="user" 
          activeItem={activeMenuItem} 
          onItemClick={handleMenuItemClick} 
        />
        <main style={mainStyle}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const appStyle = {
  minHeight: '100vh',
  backgroundColor: '#f5f5f5'
};

const mainContentStyle = {
  display: 'flex',
  marginTop: '70px'
};

const mainStyle = {
  flex: 1,
  marginLeft: '250px',
  padding: '0',
  minHeight: 'calc(100vh - 70px)'
};

const contentStyle = {
  padding: '1.5rem'
};

export default UserDashboard;