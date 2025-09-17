import React, { useState } from 'react';

const Challenges = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  
  // Sample challenges data
  const weeklyChallenges = [
    {
      id: 1,
      title: 'Build a React Todo App',
      description: 'Create a fully functional todo application with React',
      difficulty: 'Intermediate',
      points: 100,
      deadline: '2023-07-30',
      participants: 245,
      completed: false
    },
    {
      id: 2,
      title: 'CSS Grid Layout Challenge',
      description: 'Create a complex layout using CSS Grid',
      difficulty: 'Beginner',
      points: 50,
      deadline: '2023-07-28',
      participants: 178,
      completed: true
    },
    {
      id: 3,
      title: 'API Integration Challenge',
      description: 'Fetch and display data from a public API',
      difficulty: 'Advanced',
      points: 150,
      deadline: '2023-08-05',
      participants: 89,
      completed: false
    }
  ];

  const dailyChallenges = [
    {
      id: 4,
      title: 'JavaScript Algorithm: Array Manipulation',
      description: 'Solve this array manipulation problem',
      difficulty: 'Beginner',
      points: 20,
      timeLimit: '1 hour',
      participants: 342,
      completed: true
    },
    {
      id: 5,
      title: 'CSS Animation Challenge',
      description: 'Create a loading spinner using CSS animations',
      difficulty: 'Intermediate',
      points: 30,
      timeLimit: '2 hours',
      participants: 156,
      completed: false
    }
  ];

  const startChallenge = (challengeId) => {
    // In a real app, this would navigate to the challenge page
    alert(`Starting challenge ${challengeId}`);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Challenges</h2>
      
      {/* Tabs */}
      <div style={tabsStyle}>
        <button 
          style={{...tabStyle, ...(activeTab === 'weekly' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly Challenges
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'daily' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('daily')}
        >
          Daily Challenges
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'completed' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      {/* Challenges List */}
      <div style={challengesContainerStyle}>
        <h3 style={subtitleStyle}>
          {activeTab === 'weekly' ? 'Weekly Challenges' : 
           activeTab === 'daily' ? 'Daily Challenges' : 'Completed Challenges'}
        </h3>
        
        <div style={challengesGridStyle}>
          {(activeTab === 'weekly' ? weeklyChallenges : 
            activeTab === 'daily' ? dailyChallenges : 
            [...weeklyChallenges, ...dailyChallenges].filter(c => c.completed)).map(challenge => (
            <div key={challenge.id} style={challengeCardStyle}>
              <div style={challengeHeaderStyle}>
                <h4 style={challengeTitleStyle}>{challenge.title}</h4>
                <span style={{
                  ...difficultyBadgeStyle,
                  backgroundColor: challenge.difficulty === 'Beginner' ? '#2ecc71' : 
                                  challenge.difficulty === 'Intermediate' ? '#f39c12' : '#e74c3c'
                }}>
                  {challenge.difficulty}
                </span>
              </div>
              
              <p style={challengeDescStyle}>{challenge.description}</p>
              
              <div style={challengeMetaStyle}>
                <div style={metaItemStyle}>
                  <span style={metaLabelStyle}>Points:</span>
                  <span style={metaValueStyle}>{challenge.points}</span>
                </div>
                <div style={metaItemStyle}>
                  <span style={metaLabelStyle}>
                    {activeTab === 'daily' ? 'Time Limit:' : 'Deadline:'}
                  </span>
                  <span style={metaValueStyle}>
                    {activeTab === 'daily' ? challenge.timeLimit : challenge.deadline}
                  </span>
                </div>
                <div style={metaItemStyle}>
                  <span style={metaLabelStyle}>Participants:</span>
                  <span style={metaValueStyle}>{challenge.participants}</span>
                </div>
              </div>
              
              <div style={challengeActionsStyle}>
                {challenge.completed ? (
                  <span style={completedBadgeStyle}>✅ Completed</span>
                ) : (
                  <button 
                    style={startButtonStyle}
                    onClick={() => startChallenge(challenge.id)}
                  >
                    Start Challenge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
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

const challengesContainerStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const subtitleStyle = {
  margin: '0 0 1rem 0',
  color: '#2c3e50'
};

const challengesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '1.5rem'
};

const challengeCardStyle = {
  border: '1px solid #eee',
  borderRadius: '8px',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const challengeHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
};

const challengeTitleStyle = {
  margin: 0,
  color: '#2c3e50',
  flex: 1
};

const difficultyBadgeStyle = {
  padding: '0.25rem 0.5rem',
  color: 'white',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const challengeDescStyle = {
  margin: 0,
  color: '#7f8c8d',
  flex: 1
};

const challengeMetaStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const metaItemStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const metaLabelStyle = {
  color: '#95a5a6',
  fontWeight: 'bold'
};

const metaValueStyle = {
  color: '#34495e'
};

const challengeActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
};

const startButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const completedBadgeStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  borderRadius: '4px',
  fontWeight: 'bold'
};

export default Challenges;