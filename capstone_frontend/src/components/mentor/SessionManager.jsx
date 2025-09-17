import React from 'react';

const SessionManager = ({ sessions }) => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Upcoming Sessions</h2>
      <div style={sessionsListStyle}>
        {sessions.map(session => (
          <div key={session.id} style={sessionCardStyle}>
            <div style={sessionHeaderStyle}>
              <h3 style={sessionTitleStyle}>{session.userName}</h3>
              <span style={sessionTimeStyle}>{session.date} at {session.time}</span>
            </div>
            <p style={sessionTopicStyle}>Topic: {session.topic}</p>
            <div style={sessionActionsStyle}>
              <button style={actionButtonStyle}>Join Session</button>
              <button style={{...actionButtonStyle, backgroundColor: '#e74c3c'}}>Reschedule</button>
              <button style={{...actionButtonStyle, backgroundColor: '#7f8c8d'}}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '1.5rem'
};

const titleStyle = {
  margin: '0 0 1.5rem 0',
  color: '#2c3e50'
};

const sessionsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const sessionCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const sessionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem'
};

const sessionTitleStyle = {
  margin: 0,
  color: '#2c3e50'
};

const sessionTimeStyle = {
  color: '#7f8c8d'
};

const sessionTopicStyle = {
  margin: '0 0 1rem 0',
  color: '#34495e'
};

const sessionActionsStyle = {
  display: 'flex',
  gap: '0.5rem'
};

const actionButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default SessionManager;