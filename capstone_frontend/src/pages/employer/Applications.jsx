//Table of received applications
//Filter by job title, date, status
//Sort by application date, candidate name
//Upload materials
//View candidate profiles
//Download resumes
//Mark applications as reviewed
//Send messages to candidates
//Export application data
//Pagination for large number of applications
//Search functionality for specific candidates
//Job/internship toggle
//Cange status of applications
//View application history

import React, { useState, useEffect } from 'react';
import '../../styles/Applications.css';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const itemsPerPage = 8;

  // Sample data initialization
  useEffect(() => {
    const mockApplications = [
      {
        id: 101,
        candidate: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        appliedDate: '2023-07-18',
        status: 'Under Review',
        jobTitle: 'Frontend Development Intern',
        jobType: 'Internship',
        resume: 'john_doe_resume.pdf',
        coverLetter: 'john_doe_cover.pdf',
        portfolio: 'https://johndoeportfolio.com',
        education: 'BS Computer Science, Stanford University',
        skills: ['React', 'JavaScript', 'HTML', 'CSS', 'UI/UX'],
        experience: '2 years as Web Developer at TechCorp',
        notes: 'Strong portfolio, good communication skills',
        lastUpdated: '2023-07-20',
        avatarColor: '#3B82F6'
      },
      {
        id: 102,
        candidate: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 987-6543',
        appliedDate: '2023-07-17',
        status: 'Shortlisted',
        jobTitle: 'Data Science Intern',
        jobType: 'Internship',
        resume: 'jane_smith_resume.pdf',
        coverLetter: 'jane_smith_cover.pdf',
        portfolio: 'https://janesmithportfolio.com',
        education: 'MS Data Science, MIT',
        skills: ['Python', 'Pandas', 'ML', 'Statistics', 'SQL'],
        experience: '1 year as Data Analyst at DataWorks',
        notes: 'Excellent technical skills, needs final interview',
        lastUpdated: '2023-07-19',
        avatarColor: '#10B981'
      },
      {
        id: 103,
        candidate: 'Robert Johnson',
        email: 'robert.j@example.com',
        phone: '+1 (555) 456-7890',
        appliedDate: '2023-07-16',
        status: 'Interviewing',
        jobTitle: 'UX/UI Designer',
        jobType: 'Job',
        resume: 'robert_j_resume.pdf',
        coverLetter: 'robert_j_cover.pdf',
        portfolio: 'https://robertjohnsondesign.com',
        education: 'BFA Design, Parsons School of Design',
        skills: ['Figma', 'UI Design', 'Wireframing', 'User Research'],
        experience: '3 years as UX Designer at CreativeMinds',
        notes: 'Second interview scheduled for Friday',
        lastUpdated: '2023-07-18',
        avatarColor: '#F59E0B'
      },
      {
        id: 104,
        candidate: 'Sarah Williams',
        email: 'sarah.w@example.com',
        phone: '+1 (555) 234-5678',
        appliedDate: '2023-07-15',
        status: 'Hired',
        jobTitle: 'Digital Marketing Specialist',
        jobType: 'Job',
        resume: 'sarah_w_resume.pdf',
        coverLetter: 'sarah_w_cover.pdf',
        portfolio: 'https://sarahwilliamsmarketing.com',
        education: 'BA Marketing, UCLA',
        skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
        experience: '2 years as Marketing Coordinator at BrandUp',
        notes: 'Offer sent, waiting for response',
        lastUpdated: '2023-07-17',
        avatarColor: '#8B5CF6'
      },
      {
        id: 105,
        candidate: 'Michael Brown',
        email: 'michael.b@example.com',
        phone: '+1 (555) 876-5432',
        appliedDate: '2023-07-14',
        status: 'Rejected',
        jobTitle: 'Backend Developer',
        jobType: 'Job',
        resume: 'michael_b_resume.pdf',
        coverLetter: 'michael_b_cover.pdf',
        portfolio: 'https://michaelbrown.dev',
        education: 'BS Software Engineering, Carnegie Mellon',
        skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Docker'],
        experience: '4 years as Backend Developer at ServerStack',
        notes: 'Not enough experience with cloud technologies',
        lastUpdated: '2023-07-16',
        avatarColor: '#EF4444'
      },
      {
        id: 106,
        candidate: 'Emily Chen',
        email: 'emily.chen@example.com',
        phone: '+1 (555) 345-6789',
        appliedDate: '2023-07-13',
        status: 'Under Review',
        jobTitle: 'Frontend Development Intern',
        jobType: 'Internship',
        resume: 'emily_chen_resume.pdf',
        coverLetter: 'emily_chen_cover.pdf',
        portfolio: 'https://emilychenportfolio.com',
        education: 'BS Computer Science, UC Berkeley',
        skills: ['React', 'TypeScript', 'SASS', 'Jest', 'GraphQL'],
        experience: '1 year as Frontend Intern at WebSolutions',
        notes: 'Strong coding skills, good cultural fit',
        lastUpdated: '2023-07-15',
        avatarColor: '#EC4899'
      },
      {
        id: 107,
        candidate: 'David Kim',
        email: 'david.kim@example.com',
        phone: '+1 (555) 765-4321',
        appliedDate: '2023-07-12',
        status: 'Shortlisted',
        jobTitle: 'Data Science Intern',
        jobType: 'Internship',
        resume: 'david_kim_resume.pdf',
        coverLetter: 'david_kim_cover.pdf',
        portfolio: 'https://davidkimdatascience.com',
        education: 'MS Statistics, University of Michigan',
        skills: ['R', 'Python', 'Data Visualization', 'Machine Learning'],
        experience: '6 months as Research Assistant',
        notes: 'Excellent academic background',
        lastUpdated: '2023-07-14',
        avatarColor: '#06B6D4'
      },
      {
        id: 108,
        candidate: 'Amanda Rodriguez',
        email: 'amanda.r@example.com',
        phone: '+1 (555) 543-2109',
        appliedDate: '2023-07-11',
        status: 'Interviewing',
        jobTitle: 'Product Manager',
        jobType: 'Job',
        resume: 'amanda_r_resume.pdf',
        coverLetter: 'amanda_r_cover.pdf',
        portfolio: 'https://amandarodriguezpm.com',
        education: 'MBA, Harvard Business School',
        skills: ['Product Strategy', 'Agile', 'Market Research', 'UX'],
        experience: '5 years as Product Manager at TechGrowth',
        notes: 'Second interview with team scheduled',
        lastUpdated: '2023-07-13',
        avatarColor: '#F97316'
      }
    ];

    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  // Filter and sort applications
  useEffect(() => {
    let filtered = [...applications];
    
    // Apply job type filter
    if (selectedJobType !== 'all') {
      filtered = filtered.filter(app => app.jobType.toLowerCase() === selectedJobType.toLowerCase());
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(app => app.status === filters.status);
    }
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(app => 
        app.candidate.toLowerCase().includes(searchLower) || 
        app.jobTitle.toLowerCase().includes(searchLower) ||
        app.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'asc' 
          ? new Date(a.appliedDate) - new Date(b.appliedDate)
          : new Date(b.appliedDate) - new Date(a.appliedDate);
      } else if (filters.sortBy === 'name') {
        return filters.sortOrder === 'asc' 
          ? a.candidate.localeCompare(b.candidate)
          : b.candidate.localeCompare(a.candidate);
      } else if (filters.sortBy === 'status') {
        return filters.sortOrder === 'asc' 
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
    
    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [filters, applications, selectedJobType]);

  // Get current applications for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const handleStatusChange = (applicationId, newStatus) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] } : app
    );
    setApplications(updatedApplications);
  };

  const handleSearchChange = (e) => {
    setFilters({...filters, search: e.target.value});
  };

  const handleSortChange = (sortBy) => {
    const sortOrder = filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    setFilters({...filters, sortBy, sortOrder});
  };

  const handleSendMessage = (candidate) => {
    setSelectedCandidate(candidate);
    setShowMessageModal(true);
  };

  const handleSubmitMessage = () => {
    // In a real app, this would send the message via email or notification
    alert(`Message sent to ${selectedCandidate.candidate}: ${messageContent}`);
    setShowMessageModal(false);
    setMessageContent('');
  };

  const handleExportData = () => {
    // In a real app, this would generate a CSV or Excel file
    alert('Application data exported successfully!');
  };

  const handleDownloadResume = (application) => {
    alert(`Downloading resume: ${application.resume}`);
  };

  const handleViewProfile = (application) => {
    setSelectedApplication(application);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Under Review': return 'status-under-review';
      case 'Shortlisted': return 'status-shortlisted';
      case 'Interviewing': return 'status-interviewing';
      case 'Hired': return 'status-hired';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const getAvatarInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="applications-dashboard">
      <div className="dashboard-header">
        <h1>Applications Management</h1>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleExportData}>
            Export Data
          </button>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="controls-section">
          <div className="job-type-toggle">
            <button 
              className={selectedJobType === 'all' ? 'active' : ''} 
              onClick={() => setSelectedJobType('all')}
            >
              All Applications
            </button>
            <button 
              className={selectedJobType === 'job' ? 'active' : ''} 
              onClick={() => setSelectedJobType('job')}
            >
              Jobs
            </button>
            <button 
              className={selectedJobType === 'internship' ? 'active' : ''} 
              onClick={() => setSelectedJobType('internship')}
            >
              Internships
            </button>
          </div>

          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search candidates, job titles..." 
              value={filters.search}
              onChange={handleSearchChange}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select 
              value={filters.status} 
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="sort-buttons">
            <span>Sort by:</span>
            <button 
              className={filters.sortBy === 'date' ? 'active' : ''} 
              onClick={() => handleSortChange('date')}
            >
              Date {filters.sortBy === 'date' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              className={filters.sortBy === 'name' ? 'active' : ''} 
              onClick={() => handleSortChange('name')}
            >
              Name {filters.sortBy === 'name' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button 
              className={filters.sortBy === 'status' ? 'active' : ''} 
              onClick={() => handleSortChange('status')}
            >
              Status {filters.sortBy === 'status' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      <div className="applications-content">
        <div className="applications-list">
          <div className="list-header">
            <h2>
              {selectedJobType === 'all' ? 'All Applications' : 
               selectedJobType === 'job' ? 'Job Applications' : 'Internship Applications'}
              <span className="count-badge">{filteredApplications.length}</span>
            </h2>
          </div>

          <div className="applications-grid">
            {currentApplications.length > 0 ? (
              currentApplications.map(application => (
                <div key={application.id} className="application-card">
                  <div className="card-header">
                    <div className="candidate-info">
                      <div 
                        className="candidate-avatar"
                        style={{ backgroundColor: application.avatarColor }}
                      >
                        {getAvatarInitials(application.candidate)}
                      </div>
                      <div>
                        <h3>{application.candidate}</h3>
                        <p>{application.jobTitle}</p>
                      </div>
                    </div>
                    <span className={`status-badge ${getStatusClass(application.status)}`}>
                      {application.status}
                    </span>
                  </div>

                  <div className="card-details">
                    <div className="detail-item">
                      <span className="label">Applied:</span>
                      <span>{application.appliedDate}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Email:</span>
                      <span>{application.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Type:</span>
                      <span className="type-tag">{application.jobType}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => handleViewProfile(application)}
                    >
                      View Profile
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => handleDownloadResume(application)}
                    >
                      Download Resume
                    </button>
                  </div>

                  <div className="card-footer">
                    <select 
                      value={application.status} 
                      onChange={(e) => handleStatusChange(application.id, e.target.value)}
                      className={`status-select ${getStatusClass(application.status)}`}
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    
                    <button 
                      className="btn-icon" 
                      onClick={() => handleSendMessage(application)}
                      title="Send message"
                    >
                      ✉️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No applications found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredApplications.length > 0 && (
            <div className="pagination">
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Candidate Profile Sidebar */}
        {selectedApplication && (
          <div className="candidate-profile">
            <div className="profile-header">
              <h2>Candidate Profile</h2>
              <button className="btn-close" onClick={() => setSelectedApplication(null)}>×</button>
            </div>

            <div className="profile-content">
              <div className="profile-section">
                <div className="candidate-main-info">
                  <div 
                    className="candidate-avatar large"
                    style={{ backgroundColor: selectedApplication.avatarColor }}
                  >
                    {getAvatarInitials(selectedApplication.candidate)}
                  </div>
                  <div>
                    <h3>{selectedApplication.candidate}</h3>
                    <p>{selectedApplication.jobTitle} · {selectedApplication.jobType}</p>
                    <span className={`status-badge ${getStatusClass(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                  </div>
                </div>

                <div className="contact-info">
                  <h4>Contact Information</h4>
                  <p><strong>Email:</strong> {selectedApplication.email}</p>
                  <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                  <p><strong>Portfolio:</strong> <a href={selectedApplication.portfolio} target="_blank" rel="noopener noreferrer">{selectedApplication.portfolio}</a></p>
                </div>
              </div>

              <div className="profile-section">
                <h4>Education</h4>
                <p>{selectedApplication.education}</p>
              </div>

              <div className="profile-section">
                <h4>Experience</h4>
                <p>{selectedApplication.experience}</p>
              </div>

              <div className="profile-section">
                <h4>Skills</h4>
                <div className="skills-list">
                  {selectedApplication.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h4>Application Details</h4>
                <p><strong>Applied on:</strong> {selectedApplication.appliedDate}</p>
                <p><strong>Last updated:</strong> {selectedApplication.lastUpdated}</p>
                <p><strong>Notes:</strong> {selectedApplication.notes}</p>
              </div>

              <div className="profile-actions">
                <button className="btn-primary" onClick={() => handleDownloadResume(selectedApplication)}>
                  Download Resume
                </button>
                <button className="btn-secondary" onClick={() => handleDownloadResume(selectedApplication)}>
                  Download Cover Letter
                </button>
                <button className="btn-secondary" onClick={() => handleSendMessage(selectedApplication)}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Send Message to {selectedCandidate.candidate}</h3>
              <button className="btn-close" onClick={() => setShowMessageModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message here..."
                rows="6"
              ></textarea>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowMessageModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSubmitMessage}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;