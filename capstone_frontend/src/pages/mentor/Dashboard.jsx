import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import SessionManager from '../../components/mentor/SessionManager';

const MentorDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const userName = "DR. SMITH";
  
  // Sample data
  const upcomingSessions = [
    {
      id: 1,
      userName: "John Doe",
      date: "July 25, 2023",
      time: "5:00 PM",
      topic: "ReactJS Fundamentals"
    },
    {
      id: 2,
      userName: "Jane Smith",
      date: "July 26, 2023",
      time: "3:00 PM",
      topic: "Career Guidance"
    }
  ];

  const handleMenuItemClick = (itemId) => {
    setActiveMenuItem(itemId);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const renderContent = () => {
    switch(activeMenuItem) {
      case 'dashboard':
        return (
          <div style={contentStyle}>
            <h2>Mentor Dashboard</h2>
            <SessionManager sessions={upcomingSessions} />
          </div>
        );
      case 'sessions':
        return <div style={contentStyle}><h2>All Sessions</h2></div>;
      case 'interns':
        return <div style={contentStyle}><h2>My Interns</h2></div>;
      // Add other cases for other menu items
      default:
        return (
          <div style={contentStyle}>
            <h2>Mentor Dashboard</h2>
            <SessionManager sessions={upcomingSessions} />
          </div>
        );
    }
  };

  return (
    <div style={appStyle}>
      <Header userRole="mentor" userName={userName} onLogout={handleLogout} />
      <div style={mainContentStyle}>
        <Sidebar 
          userRole="mentor" 
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

export default MentorDashboard;