import React, { useState } from 'react';

const Mocktest = () => {
  const [activeTab, setActiveTab] = useState('available');
  
  // Sample test data
  const availableTests = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Test your knowledge of React basics',
      duration: 30,
      questions: 20,
      difficulty: 'Beginner',
      category: 'Frontend'
    },
    {
      id: 2,
      title: 'JavaScript Advanced',
      description: 'Advanced JavaScript concepts and patterns',
      duration: 45,
      questions: 25,
      difficulty: 'Advanced',
      category: 'Frontend'
    },
    {
      id: 3,
      title: 'Node.js Backend',
      description: 'Server-side JavaScript with Node.js',
      duration: 60,
      questions: 30,
      difficulty: 'Intermediate',
      category: 'Backend'
    }
  ];

  const completedTests = [
    {
      id: 4,
      title: 'HTML/CSS Basics',
      score: 85,
      total: 100,
      date: '2023-07-15',
      timeSpent: '25:30'
    },
    {
      id: 5,
      title: 'Python Fundamentals',
      score: 72,
      total: 100,
      date: '2023-07-10',
      timeSpent: '35:12'
    }
  ];

  const startTest = (testId) => {
    // In a real app, this would navigate to the test page
    alert(`Starting test ${testId}`);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Mock Tests</h2>
      
      {/* Tabs */}
      <div style={tabsStyle}>
        <button 
          style={{...tabStyle, ...(activeTab === 'available' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('available')}
        >
          Available Tests
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'completed' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('completed')}
        >
          Completed Tests
        </button>
      </div>

      {/* Test List */}
      <div style={testsContainerStyle}>
        {activeTab === 'available' ? (
          <>
            <h3 style={subtitleStyle}>Available Tests</h3>
            <div style={testsGridStyle}>
              {availableTests.map(test => (
                <div key={test.id} style={testCardStyle}>
                  <h4 style={testTitleStyle}>{test.title}</h4>
                  <p style={testDescStyle}>{test.description}</p>
                  <div style={testMetaStyle}>
                    <span style={testMetaItemStyle}>⏱️ {test.duration} min</span>
                    <span style={testMetaItemStyle}>❓ {test.questions} questions</span>
                    <span style={testMetaItemStyle}>📊 {test.difficulty}</span>
                    <span style={testMetaItemStyle}>🏷️ {test.category}</span>
                  </div>
                  <button 
                    style={startButtonStyle}
                    onClick={() => startTest(test.id)}
                  >
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 style={subtitleStyle}>Completed Tests</h3>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Test Name</th>
                  <th style={thStyle}>Score</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Time Spent</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {completedTests.map(test => (
                  <tr key={test.id}>
                    <td style={tdStyle}>{test.title}</td>
                    <td style={tdStyle}>
                      <span style={{
                        color: test.score >= 80 ? '#2ecc71' : test.score >= 60 ? '#f39c12' : '#e74c3c',
                        fontWeight: 'bold'
                      }}>
                        {test.score}/{test.total}
                      </span>
                    </td>
                    <td style={tdStyle}>{test.date}</td>
                    <td style={tdStyle}>{test.timeSpent}</td>
                    <td style={tdStyle}>
                      <button style={viewButtonStyle}>View Results</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
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

const tabsStyle = {
  display: 'flex',
  borderBottom: '1px solid #ddd',
  marginBottom: '1.5rem'
};

const tabStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  color: '#7f8c8d'
};

const activeTabStyle = {
  color: '#3498db',
  borderBottom: '2px solid #3498db',
  fontWeight: 'bold'
};

const testsContainerStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const subtitleStyle = {
  margin: '0 0 1rem 0',
  color: '#2c3e50'
};

const testsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '1.5rem'
};

const testCardStyle = {
  border: '1px solid #eee',
  borderRadius: '8px',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const testTitleStyle = {
  margin: 0,
  color: '#2c3e50'
};

const testDescStyle = {
  margin: 0,
  color: '#7f8c8d',
  flex: 1
};

const testMetaStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const testMetaItemStyle = {
  fontSize: '0.8rem',
  color: '#95a5a6',
  backgroundColor: '#f8f9fa',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px'
};

const startButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  alignSelf: 'flex-start'
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

const viewButtonStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#95a5a6',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Mocktest;