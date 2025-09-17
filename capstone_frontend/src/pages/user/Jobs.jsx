import React, { useState } from 'react';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: ''
  });

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechSolutions Inc.',
      description: 'We are looking for a skilled Frontend Developer to join our team...',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$90,000 - $120,000',
      posted: '2023-07-20',
      applicants: 234,
      skills: ['React', 'JavaScript', 'CSS', 'HTML5'],
      applied: true,
      status: 'Under Review',
      saved: true
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'CreativeMinds',
      description: 'Join our design team to create beautiful and functional user experiences...',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Junior',
      salary: '$70,000 - $90,000',
      posted: '2023-07-22',
      applicants: 178,
      skills: ['Figma', 'UI Design', 'User Research', 'Wireframing'],
      applied: false,
      status: null,
      saved: false
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'DataSystems',
      description: 'Looking for a backend engineer to develop and maintain our server infrastructure...',
      location: 'New York, NY',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$120,000 - $150,000',
      posted: '2023-07-18',
      applicants: 189,
      skills: ['Node.js', 'Python', 'SQL', 'AWS'],
      applied: true,
      status: 'Interview Scheduled',
      saved: true
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'InnovateTech',
      description: 'Lead product development initiatives and work with cross-functional teams...',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$110,000 - $140,000',
      posted: '2023-07-25',
      applicants: 156,
      skills: ['Product Strategy', 'Agile', 'User Stories', 'Roadmapping'],
      applied: false,
      status: null,
      saved: true
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesExperience = !filters.experience || job.experience === filters.experience;
    
    const matchesTab = activeTab === 'search' ? true : 
                      activeTab === 'applications' ? job.applied :
                      activeTab === 'saved' ? job.saved : true;
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience && matchesTab;
  });

  const applyForJob = (jobId) => {
    // In a real app, this would call an API
    alert(`Applying for job ${jobId}`);
  };

  const saveJob = (jobId) => {
    // In a real app, this would call an API
    alert(`Saving job ${jobId}`);
  };

  const getStatusBadgeStyle = (status) => {
    switch(status) {
      case 'Interview Scheduled':
        return { backgroundColor: '#3498db', color: 'white' };
      case 'Rejected':
        return { backgroundColor: '#e74c3c', color: 'white' };
      case 'Under Review':
        return { backgroundColor: '#f39c12', color: 'white' };
      case 'Offer Extended':
        return { backgroundColor: '#2ecc71', color: 'white' };
      default:
        return { backgroundColor: '#95a5a6', color: 'white' };
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Job Search</h2>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Tabs */}
      <div style={tabsStyle}>
        <button 
          style={{...tabStyle, ...(activeTab === 'search' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('search')}
        >
          Search Jobs
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'applications' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('applications')}
        >
          My Applications
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'saved' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('saved')}
        >
          Saved Jobs
        </button>
      </div>

      {/* Filters */}
      {activeTab === 'search' && (
        <div style={filtersStyle}>
          <h3 style={filtersTitleStyle}>Filters</h3>
          <div style={filtersGridStyle}>
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>Location</label>
              <input
                type="text"
                placeholder="e.g. Remote, New York"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                style={filterInputStyle}
              />
            </div>
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>Job Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                style={filterSelectStyle}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div style={filterGroupStyle}>
              <label style={filterLabelStyle}>Experience Level</label>
              <select
                value={filters.experience}
                onChange={(e) => setFilters({...filters, experience: e.target.value})}
                style={filterSelectStyle}
              >
                <option value="">All Levels</option>
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Jobs List */}
      <div style={jobsListStyle}>
        {filteredJobs.map(job => (
          <div key={job.id} style={jobCardStyle}>
            <div style={jobHeaderStyle}>
              <div>
                <h3 style={jobTitleStyle}>{job.title}</h3>
                <p style={companyStyle}>{job.company}</p>
              </div>
              <div style={jobActionsStyle}>
                {job.applied && job.status && (
                  <span style={{...statusBadgeStyle, ...getStatusBadgeStyle(job.status)}}>
                    {job.status}
                  </span>
                )}
                <button 
                  style={saveButtonStyle}
                  onClick={() => saveJob(job.id)}
                >
                  {job.saved ? '★' : '☆'}
                </button>
              </div>
            </div>
            
            <p style={jobDescStyle}>{job.description}</p>
            
            <div style={detailsGridStyle}>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>📍 Location:</span>
                <span style={detailValueStyle}>{job.location}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>📋 Type:</span>
                <span style={detailValueStyle}>{job.type}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>💼 Experience:</span>
                <span style={detailValueStyle}>{job.experience}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>💰 Salary:</span>
                <span style={detailValueStyle}>{job.salary}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>📅 Posted:</span>
                <span style={detailValueStyle}>{job.posted}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>👥 Applicants:</span>
                <span style={detailValueStyle}>{job.applicants}</span>
              </div>
            </div>
            
            <div style={skillsContainerStyle}>
              {job.skills.map(skill => (
                <span key={skill} style={skillTagStyle}>{skill}</span>
              ))}
            </div>
            
            <div style={actionsStyle}>
              {!job.applied ? (
                <button 
                  style={applyButtonStyle}
                  onClick={() => applyForJob(job.id)}
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

const filtersStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '1.5rem'
};

const filtersTitleStyle = {
  margin: '0 0 1rem 0',
  color: '#2c3e50'
};

const filtersGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem'
};

const filterGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const filterLabelStyle = {
  fontWeight: 'bold',
  color: '#34495e'
};

const filterInputStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const filterSelectStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  backgroundColor: 'white'
};

const jobsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const jobCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const jobHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1rem'
};

const jobTitleStyle = {
  margin: '0 0 0.25rem 0',
  color: '#2c3e50'
};

const companyStyle = {
  margin: 0,
  color: '#3498db',
  fontWeight: 'bold'
};

const jobActionsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const statusBadgeStyle = {
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const saveButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#f39c12'
};

const jobDescStyle = {
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

export default Jobs;