import React, { useState } from 'react';

const UserAnalytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Sample analytics data
  const analyticsData = {
    skills: [
      { name: 'ReactJS', progress: 75 },
      { name: 'JavaScript', progress: 85 },
      { name: 'Node.js', progress: 60 },
      { name: 'CSS', progress: 90 },
      { name: 'Python', progress: 40 }
    ],
    applications: {
      applied: 24,
      interviews: 6,
      offers: 2,
      rejection: 16
    },
    activity: [
      { date: '2023-07-20', courses: 2, challenges: 3, applications: 1 },
      { date: '2023-07-19', courses: 1, challenges: 2, applications: 0 },
      { date: '2023-07-18', courses: 3, challenges: 1, applications: 2 },
      { date: '2023-07-17', courses: 0, challenges: 4, applications: 1 },
      { date: '2023-07-16', courses: 2, challenges: 2, applications: 1 }
    ]
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>My Analytics</h2>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          style={selectStyle}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>

      <div style={gridStyle}>
        {/* Skill Progress */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Skill Progress</h3>
          <div style={skillsContainerStyle}>
            {analyticsData.skills.map(skill => (
              <div key={skill.name} style={skillItemStyle}>
                <div style={skillHeaderStyle}>
                  <span style={skillNameStyle}>{skill.name}</span>
                  <span style={skillPercentStyle}>{skill.progress}%</span>
                </div>
                <div style={progressBarStyle}>
                  <div style={{...progressFillStyle, width: `${skill.progress}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Stats */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Application Statistics</h3>
          <div style={statsGridStyle}>
            <div style={statItemStyle}>
              <div style={{...statIconStyle, backgroundColor: '#3498db'}}>📋</div>
              <div style={statDataStyle}>
                <div style={statNumberStyle}>{analyticsData.applications.applied}</div>
                <div style={statLabelStyle}>Applied</div>
              </div>
            </div>
            <div style={statItemStyle}>
              <div style={{...statIconStyle, backgroundColor: '#f39c12'}}>💼</div>
              <div style={statDataStyle}>
                <div style={statNumberStyle}>{analyticsData.applications.interviews}</div>
                <div style={statLabelStyle}>Interviews</div>
              </div>
            </div>
            <div style={statItemStyle}>
              <div style={{...statIconStyle, backgroundColor: '#2ecc71'}}>🎉</div>
              <div style={statDataStyle}>
                <div style={statNumberStyle}>{analyticsData.applications.offers}</div>
                <div style={statLabelStyle}>Offers</div>
              </div>
            </div>
            <div style={statItemStyle}>
              <div style={{...statIconStyle, backgroundColor: '#e74c3c'}}>❌</div>
              <div style={statDataStyle}>
                <div style={statNumberStyle}>{analyticsData.applications.rejection}</div>
                <div style={statLabelStyle}>Rejections</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{...cardStyle, gridColumn: '1 / -1'}}>
          <h3 style={cardTitleStyle}>Recent Activity</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Courses Completed</th>
                <th style={thStyle}>Challenges Solved</th>
                <th style={thStyle}>Applications Sent</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.activity.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{item.date}</td>
                  <td style={tdStyle}>{item.courses}</td>
                  <td style={tdStyle}>{item.challenges}</td>
                  <td style={tdStyle}>{item.applications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '1.5rem'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem'
};

const titleStyle = {
  margin: 0,
  color: '#2c3e50'
};

const selectStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
  gap: '1.5rem'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const cardTitleStyle = {
  margin: '0 0 1rem 0',
  color: '#2c3e50',
  borderBottom: '2px solid #f5f5f5',
  paddingBottom: '0.5rem'
};

const skillsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const skillItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const skillHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const skillNameStyle = {
  fontWeight: 'bold',
  color: '#34495e'
};

const skillPercentStyle = {
  color: '#7f8c8d',
  fontSize: '0.9rem'
};

const progressBarStyle = {
  height: '8px',
  backgroundColor: '#ecf0f1',
  borderRadius: '4px'
};

const progressFillStyle = {
  height: '100%',
  backgroundColor: '#3498db',
  borderRadius: '4px',
  transition: 'width 0.3s ease'
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
};

const statItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px'
};

const statIconStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem'
};

const statDataStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const statNumberStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#2c3e50'
};

const statLabelStyle = {
  color: '#7f8c8d',
  fontSize: '0.9rem'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const thStyle = {
  padding: '1rem',
  textAlign: 'left',
  backgroundColor: '#f8f9fa',
  color: '#34495e',
  borderBottom: '1px solid #ddd'
};

const tdStyle = {
  padding: '1rem',
  borderBottom: '1px solid #f5f5f5'
};

export default UserAnalytics;