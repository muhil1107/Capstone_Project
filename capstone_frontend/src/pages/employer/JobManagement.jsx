//Post new job 
// //view all posted jobs /
// /application tracking /
// /view resumes in application tracking and filter / sort/search 
// //download applicant details 
// //promote job 
// //change status (shortlisted, interviewing , hired, rejected) 
// //view job analytics 
// //send messages to candidates(email/notification) 
// //export job data 

import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
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
import '../../styles/JobManagement.css';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('jobPostings');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: ''
  });

  // Sample data initialization
  useEffect(() => {
    // Mock job data
    const mockJobs = [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-time',
        postedDate: '2023-07-15',
        applications: 24,
        views: 156,
        status: 'active'
      },
      {
        id: 2,
        title: 'UX/UI Designer',
        department: 'Design',
        location: 'New York, NY',
        type: 'Full-time',
        postedDate: '2023-07-10',
        applications: 18,
        views: 132,
        status: 'active'
      },
      {
        id: 3,
        title: 'Backend Engineer',
        department: 'Engineering',
        location: 'San Francisco, CA',
        type: 'Full-time',
        postedDate: '2023-07-05',
        applications: 32,
        views: 198,
        status: 'active'
      },
      {
        id: 4,
        title: 'Marketing Intern',
        department: 'Marketing',
        location: 'Remote',
        type: 'Internship',
        postedDate: '2023-06-28',
        applications: 45,
        views: 210,
        status: 'paused'
      }
    ];

    // Mock applications data
    const mockApplications = [
      {
        id: 101,
        jobId: 1,
        candidate: 'John Doe',
        email: 'john.doe@example.com',
        appliedDate: '2023-07-18',
        status: 'reviewed',
        resume: 'john_doe_resume.pdf',
        experience: '5 years'
      },
      {
        id: 102,
        jobId: 1,
        candidate: 'Jane Smith',
        email: 'jane.smith@example.com',
        appliedDate: '2023-07-17',
        status: 'shortlisted',
        resume: 'jane_smith_resume.pdf',
        experience: '4 years'
      },
      {
        id: 103,
        jobId: 2,
        candidate: 'Robert Johnson',
        email: 'robert.j@example.com',
        appliedDate: '2023-07-16',
        status: 'interviewing',
        resume: 'robert_j_resume.pdf',
        experience: '6 years'
      },
      {
        id: 104,
        jobId: 3,
        candidate: 'Sarah Williams',
        email: 'sarah.w@example.com',
        appliedDate: '2023-07-15',
        status: 'hired',
        resume: 'sarah_w_resume.pdf',
        experience: '7 years'
      },
      {
        id: 105,
        jobId: 4,
        candidate: 'Michael Brown',
        email: 'michael.b@example.com',
        appliedDate: '2023-07-14',
        status: 'rejected',
        resume: 'michael_b_resume.pdf',
        experience: '2 years'
      }
    ];

    setJobs(mockJobs);
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  // Filter applications based on selected filters
  useEffect(() => {
    let filtered = applications;
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(app => app.status === filters.status);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(app => 
        app.candidate.toLowerCase().includes(searchLower) || 
        app.email.toLowerCase().includes(searchLower)
      );
    }
    
    if (selectedJob) {
      filtered = filtered.filter(app => app.jobId === selectedJob.id);
    }
    
    setFilteredApplications(filtered);
  }, [filters, selectedJob, applications]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJobForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitJob = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Job posted successfully!');
    setNewJobForm({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: ''
    });
  };

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  const handlePromoteJob = (jobId) => {
    // In a real app, this would integrate with a job promotion service
    alert(`Job #${jobId} promoted successfully!`);
  };

  const handleExportData = () => {
    // In a real app, this would generate a CSV or Excel file
    alert('Data exported successfully!');
  };

  const handleSendMessage = (candidateEmail) => {
    const message = prompt('Enter your message to the candidate:');
    if (message) {
      // In a real app, this would send an email or notification
      alert(`Message sent to ${candidateEmail}`);
    }
  };

  // Chart data for analytics
  const viewsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Job Views',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const applicationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [28, 35, 42, 50, 36, 45],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: ['Reviewed', 'Shortlisted', 'Interviewing', 'Hired', 'Rejected'],
    datasets: [
      {
        label: 'Application Status',
        data: [12, 8, 5, 3, 7],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="job-management">
      <div className="jm-header">
        <h1>Job Management</h1>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setActiveTab('postNewJob')}>
            Post New Job
          </button>
          <button className="btn-secondary" onClick={handleExportData}>
            Export Data
          </button>
        </div>
      </div>

      <div className="jm-tabs">
        <button 
          className={activeTab === 'jobPostings' ? 'active' : ''} 
          onClick={() => setActiveTab('jobPostings')}
        >
          Job Postings
        </button>
        <button 
          className={activeTab === 'applicationTracking' ? 'active' : ''} 
          onClick={() => setActiveTab('applicationTracking')}
        >
          Application Tracking
        </button>
        <button 
          className={activeTab === 'analytics' ? 'active' : ''} 
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={activeTab === 'postNewJob' ? 'active' : ''} 
          onClick={() => setActiveTab('postNewJob')}
        >
          Post New Job
        </button>
      </div>

      <div className="jm-content">
        {activeTab === 'jobPostings' && (
          <div className="job-postings">
            <h2>Your Job Postings</h2>
            <div className="jobs-grid">
              {jobs.map(job => (
                <div key={job.id} className="job-card">
                  <div className="job-card-header">
                    <h3>{job.title}</h3>
                    <span className={`status-badge ${job.status}`}>{job.status}</span>
                  </div>
                  <div className="job-details">
                    <p><strong>Department:</strong> {job.department}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Type:</strong> {job.type}</p>
                    <p><strong>Posted:</strong> {job.postedDate}</p>
                  </div>
                  <div className="job-stats">
                    <div className="stat">
                      <span className="stat-number">{job.applications}</span>
                      <span className="stat-label">Applications</span>
                    </div>
                    <div className="stat">
                      <span className="stat-number">{job.views}</span>
                      <span className="stat-label">Views</span>
                    </div>
                  </div>
                  <div className="job-actions">
                    <button className="btn-secondary" onClick={() => handlePromoteJob(job.id)}>
                      Promote
                    </button>
                    <button className="btn-primary" onClick={() => {
                      setSelectedJob(job);
                      setActiveTab('applicationTracking');
                    }}>
                      View Applications
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applicationTracking' && (
          <div className="application-tracking">
            <div className="tracking-header">
              <h2>
                Application Tracking
                {selectedJob && ` - ${selectedJob.title}`}
              </h2>
              <div className="tracking-filters">
                <select 
                  value={filters.status} 
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All Statuses</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search candidates..." 
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
            </div>

            <div className="applications-table">
              <table>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Applied Date</th>
                    <th>Experience</th>
                    <th>Resume</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map(app => (
                    <tr key={app.id}>
                      <td>
                        <div className="candidate-info">
                          <div className="candidate-name">{app.candidate}</div>
                          <div className="candidate-email">{app.email}</div>
                        </div>
                      </td>
                      <td>{app.appliedDate}</td>
                      <td>{app.experience}</td>
                      <td>
                        <button className="btn-link" onClick={() => alert('Downloading resume: ' + app.resume)}>
                          Download
                        </button>
                      </td>
                      <td>
                        <select 
                          value={app.status} 
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`status-select ${app.status}`}
                        >
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interviewing">Interviewing</option>
                          <option value="hired">Hired</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-icon" 
                            onClick={() => handleSendMessage(app.email)}
                            title="Send message"
                          >
                            ✉️
                          </button>
                          <button 
                            className="btn-icon" 
                            onClick={() => alert('Viewing candidate profile')}
                            title="View profile"
                          >
                            👤
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics">
            <h2>Job Analytics</h2>
            <div className="analytics-grid">
              <div className="chart-container">
                <h3>Job Views Over Time</h3>
                <Bar data={viewsData} />
              </div>
              <div className="chart-container">
                <h3>Applications Over Time</h3>
                <Line data={applicationsData} />
              </div>
              <div className="chart-container">
                <h3>Application Status Distribution</h3>
                <Pie data={statusData} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'postNewJob' && (
          <div className="post-new-job">
            <h2>Post a New Job</h2>
            <form onSubmit={handleSubmitJob}>
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newJobForm.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={newJobForm.department}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newJobForm.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Job Type</label>
                  <select
                    name="type"
                    value={newJobForm.type}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Job Description</label>
                <textarea
                  name="description"
                  value={newJobForm.description}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  value={newJobForm.requirements}
                  onChange={handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary">Post Job</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobManagement;