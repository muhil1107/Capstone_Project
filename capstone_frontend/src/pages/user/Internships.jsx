import React, { useState } from 'react';

const Internships = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample internship data
  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp Inc.',
      description: 'Work on building responsive web applications using React and modern JavaScript',
      duration: '3 months',
      stipend: '$2000/month',
      location: 'Remote',
      type: 'Full-time',
      skills: ['React', 'JavaScript', 'HTML', 'CSS'],
      applicants: 145,
      deadline: '2023-08-15',
      applied: true,
      status: 'Under Review'
    },
    {
      id: 2,
      title: 'UI/UX Design Intern',
      company: 'DesignStudio',
      description: 'Create user-centered designs for digital products and collaborate with developers',
      duration: '6 months',
      stipend: '$1800/month',
      location: 'New York, NY',
      type: 'Part-time',
      skills: ['Figma', 'UI Design', 'UX Research', 'Wireframing'],
      applicants: 89,
      deadline: '2023-08-30',
      applied: false,
      status: null
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'DataInsights Ltd.',
      description: 'Analyze large datasets and build predictive models using machine learning',
      duration: '4 months',
      stipend: '$2500/month',
      location: 'Remote',
      type: 'Full-time',
      skills: ['Python', 'R', 'SQL', 'Machine Learning'],
      applicants: 210,
      deadline: '2023-08-10',
      applied: true,
      status: 'Accepted'
    },
    {
      id: 4,
      title: 'Backend Developer Intern',
      company: 'ServerStack',
      description: 'Develop and maintain server-side logic and databases for web applications',
      duration: '3 months',
      stipend: '$2200/month',
      location: 'San Francisco, CA',
      type: 'Full-time',
      skills: ['Node.js', 'Python', 'MongoDB', 'API Development'],
      applicants: 178,
      deadline: '2023-09-05',
      applied: false,
      status: null
    }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'available' ? !internship.applied : 
                      activeTab === 'applied' ? internship.applied : true;
    return matchesSearch && matchesTab;
  });

  const applyForInternship = (internshipId) => {
    // In a real app, this would call an API
    alert(`Applying for internship ${internshipId}`);
  };

  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Accepted':
        return { backgroundColor: '#2ecc71', color: 'white' };
      case 'Rejected':
        return { backgroundColor: '#e74c3c', color: 'white' };
      case 'Under Review':
        return { backgroundColor: '#f39c12', color: 'white' };
      default:
        return { backgroundColor: '#95a5a6', color: 'white' };
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Internships</h2>
        <input
          type="text"
          placeholder="Search internships..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Tabs */}
      <div style={tabsStyle}>
        <button 
          style={{...tabStyle, ...(activeTab === 'available' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('available')}
        >
          Available Internships
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'applied' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('applied')}
        >
          My Applications
        </button>
      </div>

      {/* Internships List */}
      <div style={internshipsListStyle}>
        {filteredInternships.map(internship => (
          <div key={internship.id} style={internshipCardStyle}>
            <div style={internshipHeaderStyle}>
              <div>
                <h3 style={internshipTitleStyle}>{internship.title}</h3>
                <p style={companyStyle}>{internship.company}</p>
              </div>
              {internship.applied && internship.status && (
                <span style={{...statusBadgeStyle, ...getStatusBadgeStyle(internship.status)}}>
                  {internship.status}
                </span>
              )}
            </div>
            
            <p style={internshipDescStyle}>{internship.description}</p>
            
            <div style={detailsGridStyle}>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>📍 Location:</span>
                <span style={detailValueStyle}>{internship.location}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>⏱️ Duration:</span>
                <span style={detailValueStyle}>{internship.duration}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>💰 Stipend:</span>
                <span style={detailValueStyle}>{internship.stipend}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>📋 Type:</span>
                <span style={detailValueStyle}>{internship.type}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>⏰ Deadline:</span>
                <span style={detailValueStyle}>{internship.deadline}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>👥 Applicants:</span>
                <span style={detailValueStyle}>{internship.applicants}</span>
              </div>
            </div>
            
            <div style={skillsContainerStyle}>
              {internship.skills.map(skill => (
                <span key={skill} style={skillTagStyle}>{skill}</span>
              ))}
            </div>
            
            <div style={actionsStyle}>
              {!internship.applied ? (
                <button 
                  style={applyButtonStyle}
                  onClick={() => applyForInternship(internship.id)}
                >
                  Apply Now
                </button>
              ) : (
                <button style={viewButtonStyle}>View Application</button>
              )}
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

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
  gap: '1rem'
};

const titleStyle = {
  margin: 0,
  color: '#2c3e50'
};

const searchInputStyle = {
  padding: '0.5rem 1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  minWidth: '250px'
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

const internshipsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const internshipCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const internshipHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1rem'
};

const internshipTitleStyle = {
  margin: '0 0 0.25rem 0',
  color: '#2c3e50'
};

const companyStyle = {
  margin: 0,
  color: '#3498db',
  fontWeight: 'bold'
};

const statusBadgeStyle = {
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const internshipDescStyle = {
  margin: '0 0 1.5rem 0',
  color: '#7f8c8d'
};

const detailsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '1.5rem'
};

const detailItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
};

const detailLabelStyle = {
  fontSize: '0.8rem',
  color: '#95a5a6',
  fontWeight: 'bold'
};

const detailValueStyle = {
  color: '#34495e'
};

const skillsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1.5rem'
};

const skillTagStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#e8f4fc',
  color: '#3498db',
  borderRadius: '4px',
  fontSize: '0.8rem'
};

const actionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
};

const applyButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const viewButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Internships;