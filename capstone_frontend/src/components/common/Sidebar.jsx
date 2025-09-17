import React from 'react';

const Sidebar = ({ userRole, activeItem, onItemClick }) => {
  const getMenuItems = () => {
    switch(userRole) {
      case 'user':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'courses', label: 'Courses' },
          { id: 'jobs', label: 'Jobs' },
          { id: 'internships', label: 'Internships' },
          { id: 'mentors', label: 'Mentors' },
          { id: 'challenges', label: 'Challenges' },
          { id: 'mocktests', label: 'Mock Tests' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'profile', label: 'Profile' }
        ];
      case 'employer':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'jobmanagement', label: 'Job Management' },
          { id: 'internshipmanagement', label: 'Internship Management' },
          { id: 'applications', label: 'Applications' },
          { id: 'certifications', label: 'Certifications' },
          { id: 'tests', label: 'Tests & Tasks' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'profile', label: 'Profile' }
        ];
      case 'mentor':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'sessions', label: 'Sessions' },
          { id: 'interns', label: 'Interns' },
          { id: 'interviews', label: 'Interviews' },
          { id: 'availability', label: 'Availability' },
          { id: 'profile', label: 'Profile' }
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'users', label: 'User Management' },
          { id: 'employers', label: 'Employer Management' },
          { id: 'mentors', label: 'Mentor Management' },
          { id: 'jobs', label: 'Job Moderation' },
          { id: 'internships', label: 'Internship Management' },
          { id: 'courses', label: 'Course Management' },
          { id: 'certifications', label: 'Certification Control' },
          { id: 'tests', label: 'Test Management' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'settings', label: 'Settings' }
        ];
      default:
        return [];
    }
  };

  return (
    <aside style={sidebarStyle}>
      <ul style={listStyle}>
        {getMenuItems().map(item => (
          <li 
            key={item.id} 
            style={{ 
              ...itemStyle, 
              ...(activeItem === item.id ? activeItemStyle : {}) 
            }}
            onClick={() => onItemClick(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
};

const sidebarStyle = {
  width: '250px',
  backgroundColor: '#34495e',
  color: 'white',
  height: 'calc(100vh - 70px)',
  position: 'fixed',
  top: '70px',
  left: 0,
  overflowY: 'auto'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};

const itemStyle = {
  padding: '1rem 1.5rem',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};

const activeItemStyle = {
  backgroundColor: '#1abc9c',
  fontWeight: 'bold'
};

export default Sidebar;