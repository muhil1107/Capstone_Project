//Add Online/Virtual internship management
//Create internship postings
//Edit internship details
//Delete internship postings
//View internship applications
//Filter internships by type, date, status
//Sort internships by date, title, status
//Search internships by title or category
//View internship history
//Pagination for large number of internships
//Track submissions and progress
//Send messages to candidates
//Export internship data
//Change internship status (active/inactive)
//Assign mentors
//Auto generate internship certificates

import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);
import '../../styles/InternManagement.css';

const InternshipManagement = () => {
  const [activeTab, setActiveTab] = useState('internshipList');
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [newInternshipForm, setNewInternshipForm] = useState({
    title: '',
    category: '',
    duration: '',
    type: 'Virtual',
    description: '',
    requirements: '',
    skills: '',
    stipend: '',
    status: 'Active'
  });

  // Sample data initialization
  useEffect(() => {
    // Mock internship data
    const mockInternships = [
      {
        id: 1,
        title: 'Frontend Development Intern',
        category: 'Web Development',
        duration: '3 months',
        type: 'Virtual',
        postedDate: '2023-07-15',
        applications: 45,
        views: 210,
        status: 'Active',
        mentor: 'Sarah Johnson',
        skills: ['React', 'JavaScript', 'HTML', 'CSS'],
        stipend: '$1000'
      },
      {
        id: 2,
        title: 'Data Science Intern',
        category: 'Data Analytics',
        duration: '6 months',
        type: 'Hybrid',
        postedDate: '2023-07-10',
        applications: 32,
        views: 185,
        status: 'Active',
        mentor: 'Michael Chen',
        skills: ['Python', 'Pandas', 'ML', 'Statistics'],
        stipend: '$1200'
      },
      {
        id: 3,
        title: 'UX/UI Design Intern',
        category: 'Design',
        duration: '4 months',
        type: 'On-site',
        postedDate: '2023-07-05',
        applications: 28,
        views: 165,
        status: 'Active',
        mentor: 'Emily Rodriguez',
        skills: ['Figma', 'UI Design', 'Wireframing'],
        stipend: '$900'
      },
      {
        id: 4,
        title: 'Digital Marketing Intern',
        category: 'Marketing',
        duration: '3 months',
        type: 'Virtual',
        postedDate: '2023-06-28',
        applications: 52,
        views: 240,
        status: 'Completed',
        mentor: 'David Wilson',
        skills: ['SEO', 'Social Media', 'Content'],
        stipend: '$800'
      },
      {
        id: 5,
        title: 'Backend Development Intern',
        category: 'Web Development',
        duration: '5 months',
        type: 'Virtual',
        postedDate: '2023-06-20',
        applications: 38,
        views: 195,
        status: 'Active',
        mentor: 'James Anderson',
        skills: ['Node.js', 'Express', 'MongoDB'],
        stipend: '$1100'
      },
      {
        id: 6,
        title: 'Mobile App Development Intern',
        category: 'App Development',
        duration: '4 months',
        type: 'Hybrid',
        postedDate: '2023-06-15',
        applications: 27,
        views: 150,
        status: 'Paused',
        mentor: 'Lisa Kim',
        skills: ['React Native', 'iOS', 'Android'],
        stipend: '$1000'
      }
    ];

    // Mock applications data
    const mockApplications = [
      {
        id: 101,
        internshipId: 1,
        candidate: 'John Doe',
        email: 'john.doe@example.com',
        appliedDate: '2023-07-18',
        status: 'Under Review',
        resume: 'john_doe_resume.pdf',
        progress: 0,
        tasksCompleted: 0,
        totalTasks: 5
      },
      {
        id: 102,
        internshipId: 1,
        candidate: 'Jane Smith',
        email: 'jane.smith@example.com',
        appliedDate: '2023-07-17',
        status: 'Shortlisted',
        resume: 'jane_smith_resume.pdf',
        progress: 20,
        tasksCompleted: 1,
        totalTasks: 5
      },
      {
        id: 103,
        internshipId: 2,
        candidate: 'Robert Johnson',
        email: 'robert.j@example.com',
        appliedDate: '2023-07-16',
        status: 'Interviewing',
        resume: 'robert_j_resume.pdf',
        progress: 40,
        tasksCompleted: 2,
        totalTasks: 5
      },
      {
        id: 104,
        internshipId: 3,
        candidate: 'Sarah Williams',
        email: 'sarah.w@example.com',
        appliedDate: '2023-07-15',
        status: 'Hired',
        resume: 'sarah_w_resume.pdf',
        progress: 80,
        tasksCompleted: 4,
        totalTasks: 5
      },
      {
        id: 105,
        internshipId: 4,
        candidate: 'Michael Brown',
        email: 'michael.b@example.com',
        appliedDate: '2023-07-14',
        status: 'Rejected',
        resume: 'michael_b_resume.pdf',
        progress: 100,
        tasksCompleted: 5,
        totalTasks: 5
      }
    ];

    // Mock mentors data
    const mockMentors = [
      { id: 1, name: 'Sarah Johnson', expertise: 'Frontend Development', availability: 'High' },
      { id: 2, name: 'Michael Chen', expertise: 'Data Science', availability: 'Medium' },
      { id: 3, name: 'Emily Rodriguez', expertise: 'UI/UX Design', availability: 'High' },
      { id: 4, name: 'David Wilson', expertise: 'Digital Marketing', availability: 'Low' },
      { id: 5, name: 'James Anderson', expertise: 'Backend Development', availability: 'Medium' },
      { id: 6, name: 'Lisa Kim', expertise: 'Mobile Development', availability: 'High' }
    ];

    setInternships(mockInternships);
    setApplications(mockApplications);
    setMentors(mockMentors);
    setFilteredInternships(mockInternships);
  }, []);

  // Filter and sort internships
  useEffect(() => {
    let filtered = [...internships];
    
    // Apply filters
    if (filters.status !== 'all') {
      filtered = filtered.filter(internship => internship.status === filters.status);
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(internship => internship.type === filters.type);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(internship => 
        internship.title.toLowerCase().includes(searchLower) || 
        internship.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'asc' 
          ? new Date(a.postedDate) - new Date(b.postedDate)
          : new Date(b.postedDate) - new Date(a.postedDate);
      } else if (filters.sortBy === 'title') {
        return filters.sortOrder === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (filters.sortBy === 'applications') {
        return filters.sortOrder === 'asc' 
          ? a.applications - b.applications
          : b.applications - a.applications;
      }
      return 0;
    });
    
    setFilteredInternships(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, internships]);

  // Get current internships for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInternships = filteredInternships.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInternshipForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitInternship = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    const newId = internships.length > 0 ? Math.max(...internships.map(i => i.id)) + 1 : 1;
    const newInternship = {
      id: newId,
      ...newInternshipForm,
      postedDate: new Date().toISOString().split('T')[0],
      applications: 0,
      views: 0,
      skills: newInternshipForm.skills.split(',').map(skill => skill.trim()),
      mentor: mentors[0].name // Default to first mentor
    };
    
    setInternships(prev => [...prev, newInternship]);
    alert('Internship posted successfully!');
    setNewInternshipForm({
      title: '',
      category: '',
      duration: '',
      type: 'Virtual',
      description: '',
      requirements: '',
      skills: '',
      stipend: '',
      status: 'Active'
    });
    setActiveTab('internshipList');
  };

  const handleDeleteInternship = (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      setInternships(prev => prev.filter(internship => internship.id !== id));
    }
  };

  const handleStatusChange = (internshipId, newStatus) => {
    setInternships(prev => prev.map(internship => 
      internship.id === internshipId ? { ...internship, status: newStatus } : internship
    ));
  };

  const handleMentorChange = (internshipId, newMentor) => {
    setInternships(prev => prev.map(internship => 
      internship.id === internshipId ? { ...internship, mentor: newMentor } : internship
    ));
  };

  const handleApplicationStatusChange = (applicationId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const handleGenerateCertificate = (applicationId) => {
    // In a real app, this would generate a certificate PDF
    const application = applications.find(app => app.id === applicationId);
    alert(`Certificate generated for ${application.candidate}`);
  };

  const handleExportData = () => {
    // In a real app, this would generate a CSV or Excel file
    alert('Internship data exported successfully!');
  };

  const handleSendMessage = (candidateEmail) => {
    const message = prompt('Enter your message to the candidate:');
    if (message) {
      // In a real app, this would send an email or notification
      alert(`Message sent to ${candidateEmail}`);
    }
  };

  // Chart data for analytics
  const applicationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Internship Applications',
        data: [28, 35, 42, 50, 36, 45],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: ['Active', 'Completed', 'Paused'],
    datasets: [
      {
        label: 'Internship Status',
        data: [4, 1, 1],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const typeData = {
    labels: ['Virtual', 'Hybrid', 'On-site'],
    datasets: [
      {
        label: 'Internship Type',
        data: [3, 2, 1],
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="internship-management">
      <div className="im-header">
        <h1>Internship Management</h1>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setActiveTab('createInternship')}>
            Create New Internship
          </button>
          <button className="btn-secondary" onClick={handleExportData}>
            Export Data
          </button>
        </div>
      </div>

      <div className="im-tabs">
        <button 
          className={activeTab === 'internshipList' ? 'active' : ''} 
          onClick={() => setActiveTab('internshipList')}
        >
          Internship List
        </button>
        <button 
          className={activeTab === 'applications' ? 'active' : ''} 
          onClick={() => setActiveTab('applications')}
        >
          Applications
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={activeTab === 'createInternship' ? 'active' : ''} 
          onClick={() => setActiveTab('createInternship')}
        >
          Create Internship
        </button>
      </div>

      <div className="im-content">
        {activeTab === 'internshipList' && (
          <div className="internship-list">
            <div className="list-header">
              <h2>Manage Internships</h2>
              <div className="list-filters">
                <div className="filter-group">
                  <label>Status:</label>
                  <select 
                    value={filters.status} 
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Type:</label>
                  <select 
                    value={filters.type} 
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="all">All Types</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Sort By:</label>
                  <select 
                    value={filters.sortBy} 
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="applications">Applications</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Order:</label>
                  <select 
                    value={filters.sortOrder} 
                    onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <input 
                    type="text" 
                    placeholder="Search internships..." 
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="internships-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Posted</th>
                    <th>Applications</th>
                    <th>Mentor</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInternships.map(internship => (
                    <tr key={internship.id}>
                      <td>
                        <div className="internship-title">{internship.title}</div>
                        <div className="internship-skills">
                          {internship.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </td>
                      <td>{internship.category}</td>
                      <td>
                        <span className={`type-badge ${internship.type.toLowerCase()}`}>
                          {internship.type}
                        </span>
                      </td>
                      <td>{internship.duration}</td>
                      <td>{internship.postedDate}</td>
                      <td>
                        <span className="applications-count">{internship.applications}</span>
                      </td>
                      <td>
                        <select 
                          value={internship.mentor} 
                          onChange={(e) => handleMentorChange(internship.id, e.target.value)}
                          className="mentor-select"
                        >
                          {mentors.map(mentor => (
                            <option key={mentor.id} value={mentor.name}>
                              {mentor.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select 
                          value={internship.status} 
                          onChange={(e) => handleStatusChange(internship.id, e.target.value)}
                          className={`status-select ${internship.status.toLowerCase()}`}
                        >
                          <option value="Active">Active</option>
                          <option value="Completed">Completed</option>
                          <option value="Paused">Paused</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-icon" 
                            onClick={() => {
                              setSelectedInternship(internship);
                              setActiveTab('applications');
                            }}
                            title="View applications"
                          >
                            👥
                          </button>
                          <button 
                            className="btn-icon" 
                            onClick={() => {
                              // Edit functionality would go here
                              alert(`Edit internship: ${internship.title}`);
                            }}
                            title="Edit internship"
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn-icon" 
                            onClick={() => handleDeleteInternship(internship.id)}
                            title="Delete internship"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications">
            <div className="applications-header">
              <h2>
                Internship Applications
                {selectedInternship && ` - ${selectedInternship.title}`}
              </h2>
              <button 
                className="btn-secondary" 
                onClick={() => setSelectedInternship(null)}
                disabled={!selectedInternship}
              >
                View All Applications
              </button>
            </div>

            <div className="applications-filters">
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
              
              <input 
                type="text" 
                placeholder="Search candidates..." 
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>

            <div className="applications-grid">
              {applications
                .filter(app => !selectedInternship || app.internshipId === selectedInternship.id)
                .filter(app => filters.status === 'all' || app.status === filters.status)
                .filter(app => {
                  if (!filters.search) return true;
                  const searchLower = filters.search.toLowerCase();
                  return (
                    app.candidate.toLowerCase().includes(searchLower) || 
                    app.email.toLowerCase().includes(searchLower)
                  );
                })
                .map(app => {
                  const internship = internships.find(i => i.id === app.internshipId);
                  return (
                    <div key={app.id} className="application-card">
                      <div className="application-header">
                        <h3>{app.candidate}</h3>
                        <span className={`status-badge ${app.status.replace(' ', '-').toLowerCase()}`}>
                          {app.status}
                        </span>
                      </div>
                      
                      <div className="application-details">
                        <p><strong>Email:</strong> {app.email}</p>
                        <p><strong>Applied:</strong> {app.appliedDate}</p>
                        <p><strong>Internship:</strong> {internship?.title}</p>
                        
                        <div className="progress-section">
                          <label>Progress: {app.progress}%</label>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${app.progress}%` }}
                            ></div>
                          </div>
                          <span>{app.tasksCompleted}/{app.totalTasks} tasks completed</span>
                        </div>
                      </div>
                      
                      <div className="application-actions">
                        <select 
                          value={app.status} 
                          onChange={(e) => handleApplicationStatusChange(app.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        
                        <button 
                          className="btn-link" 
                          onClick={() => alert('Downloading resume: ' + app.resume)}
                        >
                          Download Resume
                        </button>
                        
                        <button 
                          className="btn-icon" 
                          onClick={() => handleSendMessage(app.email)}
                          title="Send message"
                        >
                          ✉️
                        </button>
                        
                        {app.status === 'Hired' && app.progress === 100 && (
                          <button 
                            className="btn-primary" 
                            onClick={() => handleGenerateCertificate(app.id)}
                          >
                            Generate Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics">
            <h2>Internship Analytics</h2>
            <div className="analytics-grid">
              <div className="chart-container">
                <h3>Applications Over Time</h3>
                <Line data={applicationsData} />
              </div>
              <div className="chart-container">
                <h3>Internship Status Distribution</h3>
                <Doughnut data={statusData} />
              </div>
              <div className="chart-container">
                <h3>Internship Type Distribution</h3>
                <Doughnut data={typeData} />
              </div>
            </div>
            
            <div className="stats-overview">
              <div className="stat-card">
                <h3>Total Internships</h3>
                <p className="stat-number">{internships.length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Applications</h3>
                <p className="stat-number">{applications.length}</p>
              </div>
              <div className="stat-card">
                <h3>Average Completion Rate</h3>
                <p className="stat-number">78%</p>
              </div>
              <div className="stat-card">
                <h3>Hired Candidates</h3>
                <p className="stat-number">
                  {applications.filter(app => app.status === 'Hired').length}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'createInternship' && (
          <div className="create-internship">
            <h2>Create New Internship</h2>
            <form onSubmit={handleSubmitInternship}>
              <div className="form-row">
                <div className="form-group">
                  <label>Internship Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newInternshipForm.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={newInternshipForm.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={newInternshipForm.duration}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 3 months"
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={newInternshipForm.type}
                    onChange={handleInputChange}
                  >
                    <option value="Virtual">Virtual</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Stipend</label>
                  <input
                    type="text"
                    name="stipend"
                    value={newInternshipForm.stipend}
                    onChange={handleInputChange}
                    placeholder="e.g., $1000/month"
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={newInternshipForm.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Required Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={newInternshipForm.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., React, JavaScript, CSS"
                />
              </div>
              
              <div className="form-group">
                <label>Internship Description</label>
                <textarea
                  name="description"
                  value={newInternshipForm.description}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  value={newInternshipForm.requirements}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Assign Mentor</label>
                <select>
                  {mentors.map(mentor => (
                    <option key={mentor.id} value={mentor.id}>
                      {mentor.name} - {mentor.expertise} ({mentor.availability})
                    </option>
                  ))}
                </select>
              </div>
              
              <button type="submit" className="btn-primary">Create Internship</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipManagement;