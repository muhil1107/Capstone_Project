import React from 'react';

const Header = ({ userRole, userName, onLogout }) => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>CareerConnect</div>
      <nav style={navStyle}>
        <span style={welcomeStyle}>Welcome, {userName}</span>
        <button style={buttonStyle} onClick={onLogout}>Logout</button>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#2c3e50',
  color: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold'
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const welcomeStyle = {
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Header;