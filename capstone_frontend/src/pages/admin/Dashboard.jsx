import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Sidebar from '../../components/common/Sidebar';
import UserManagement from '../../components/admin/UserManagement';

const AdminDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const userName = "ADMIN";
  
  // Sample data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      progress: 60,
      appliedJobs: 3,
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      progress: 85,
      appliedJobs: 5,
      status: "active"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      progress: 30,
      appliedJobs: 1,
      status: "inactive"
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
            <h2>Admin Dashboard</h2>
            <div style={statsGridStyle}>
              <div style={statCardStyle}>
                <h3>Total Users</h3>
                <div style={statNumberStyle}>1,254</div>
              </div>
              <div style={statCardStyle}>
                <h3>Active Jobs</h3>
                <div style={statNumberStyle}>347</div>
              </div>
              <div style={statCardStyle}>
                <h3>Pending Approvals</h3>
                <div style={statNumberStyle}>23</div>
              </div>
              <div style={statCardStyle}>
                <h3>System Health</h3>
                <div style={statNumberStyle}>98%</div>
              </div>
            </div>
          </div>
        );
      case 'users':
        return <UserManagement users={users} />;
      case 'employers':
        return <div style={contentStyle}><h2>Employer Management</h2></div>;
      // Add other cases for other menu items
      default:
        return (
          <div style={contentStyle}>
            <h2>Admin Dashboard</h2>
            <div style={statsGridStyle}>
              <div style={statCardStyle}>
                <h3>Total Users</h3>
                <div style={statNumberStyle}>1,254</div>
              </div>
              <div style={statCardStyle}>
                <h3>Active Jobs</h3>
                <div style={statNumberStyle}>347</div>
              </div>
              <div style={statCardStyle}>
                <h3>Pending Approvals</h3>
                <div style={statNumberStyle}>23</div>
              </div>
              <div style={statCardStyle}>
                <h3>System Health</h3>
                <div style={statNumberStyle}>98%</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={appStyle}>
      <Header userRole="admin" userName={userName} onLogout={handleLogout} />
      <div style={mainContentStyle}>
        <Sidebar 
          userRole="admin" 
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

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1.5rem',
  marginTop: '1.5rem'
};

const statCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

const statNumberStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#3498db',
  marginTop: '0.5rem'
};

export default AdminDashboard;