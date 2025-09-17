import React from 'react';

const DashboardStats = ({ userName, stats }) => {
  return (
    <div style={containerStyle}>
      <h2 style={welcomeStyle}>Welcome, {userName}</h2>
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <h3 style={statTitleStyle}>Course Progress</h3>
          <div style={statValueStyle}>{stats.courseProgress}% complete</div>
          <div style={progressBarStyle}>
            <div style={{...progressFillStyle, width: `${stats.courseProgress}%`}}></div>
          </div>
          <div style={statSubtextStyle}>{stats.courseName}</div>
        </div>
        
        <div style={statCardStyle}>
          <h3 style={statTitleStyle}>Internship</h3>
          <div style={statValueStyle}>{stats.internshipTask}</div>
          <div style={statSubtextStyle}>Due in {stats.internshipDue}</div>
        </div>
        
        <div style={statCardStyle}>
          <h3 style={statTitleStyle}>Applications</h3>
          <div style={statValueStyle}>{stats.appliedJobs} | Interviews: {stats.interviews}</div>
        </div>
        
        <div style={statCardStyle}>
          <h3 style={statTitleStyle}>Mentorship</h3>
          <div style={statValueStyle}>Next - {stats.nextMentorship}</div>
        </div>
        
        <div style={statCardStyle}>
          <h3 style={statTitleStyle}>Challenges</h3>
          <div style={statValueStyle}>{stats.challengesCompleted}/7 this week</div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '1.5rem',
  backgroundColor: '#f8f9fa'
};

const welcomeStyle = {
  margin: '0 0 1.5rem 0',
  color: '#2c3e50'
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1.5rem'
};

const statCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const statTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '0.9rem',
  color: '#7f8c8d',
  textTransform: 'uppercase'
};

const statValueStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#2c3e50'
};

const statSubtextStyle = {
  fontSize: '0.9rem',
  color: '#7f8c8d'
};

const progressBarStyle = {
  height: '8px',
  backgroundColor: '#ecf0f1',
  borderRadius: '4px',
  margin: '0.5rem 0'
};

const progressFillStyle = {
  height: '100%',
  backgroundColor: '#3498db',
  borderRadius: '4px'
};

export default DashboardStats;