//Job posting count
//Applications count
//Selected users count
//Graphs (Job views, conversion rate)
//Welcome header with employer name
//Recent job postings
//Pending applications
//Recent notifications
//Quick links to job management, internship management, applications, notifications, analytics
//Profile summary with edit option


import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import '../../styles/Dashboard.css';

const EmployerDashboard = () => {
  const [employerData, setEmployerData] = useState({
    name: "Tech Solutions Inc.",
    jobPostings: 12,
    applications: 145,
    selectedUsers: 23,
    profileCompletion: 85,
    recentJobs: [
      { id: 1, title: "Senior Frontend Developer", posted: "2 days ago", applications: 24 },
      { id: 2, title: "UX/UI Designer", posted: "5 days ago", applications: 18 },
      { id: 3, title: "Backend Engineer", posted: "1 week ago", applications: 32 }
    ],
    pendingApplications: [
      { id: 101, job: "Frontend Developer", candidate: "John Doe", applied: "1 day ago" },
      { id: 102, job: "Data Analyst", candidate: "Jane Smith", applied: "2 days ago" }
    ],
    notifications: [
      { id: 1, message: "Your internship posting has been approved", time: "2 hours ago" },
      { id: 2, message: "5 new applications for Senior Developer role", time: "5 hours ago" },
      { id: 3, message: "Weekly analytics report is ready", time: "1 day ago" }
    ],
    analytics: {
      jobViews: [
        { name: 'Jan', views: 400 },
        { name: 'Feb', views: 700 },
        { name: 'Mar', views: 1000 },
        { name: 'Apr', views: 800 },
        { name: 'May', views: 1100 },
        { name: 'Jun', views: 900 },
      ],
      conversionRate: [
        { name: 'Jan', rate: 24 },
        { name: 'Feb', rate: 32 },
        { name: 'Mar', rate: 18 },
        { name: 'Apr', rate: 27 },
        { name: 'May', rate: 35 },
        { name: 'Jun', rate: 29 },
      ],
      applicationStatus: [
        { name: 'Selected', value: 23 },
        { name: 'Rejected', value: 45 },
        { name: 'Pending', value: 77 }
      ]
    }
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="employer-dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <h1>Welcome, {employerData.name}</h1>
        <div className="profile-summary">
          <span>Profile Completion: {employerData.profileCompletion}%</span>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <h3>Job Postings</h3>
          <p className="stat-number">{employerData.jobPostings}</p>
          <span className="stat-label">Active listings</span>
        </div>
        
        <div className="stat-card">
          <h3>Applications</h3>
          <p className="stat-number">{employerData.applications}</p>
          <span className="stat-label">Total received</span>
        </div>
        
        <div className="stat-card">
          <h3>Selected Users</h3>
          <p className="stat-number">{employerData.selectedUsers}</p>
          <span className="stat-label">Successful hires</span>
        </div>
        
        <div className="stat-card">
          <h3>Conversion Rate</h3>
          <p className="stat-number">
            {((employerData.selectedUsers / employerData.applications) * 100).toFixed(1)}%
          </p>
          <span className="stat-label">Selection ratio</span>
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <h2>Quick Actions</h2>
        <div className="link-buttons">
          <button className="link-btn">Post a New Job</button>
          <button className="link-btn">Manage Internships</button>
          <button className="link-btn">View Applications</button>
          <button className="link-btn">Analytics Panel</button>
          <button className="link-btn">Notification Settings</button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Analytics Graphs */}
          <div className="analytics-section">
            <h2>Performance Analytics</h2>
            
            <div className="graph-container">
              <h3>Job Views</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={employerData.analytics.jobViews}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="graph-container">
              <h3>Application Status</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={employerData.analytics.applicationStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {employerData.analytics.applicationStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* Recent Job Postings */}
          <div className="info-card">
            <h2>Recent Job Postings</h2>
            <div className="job-list">
              {employerData.recentJobs.map(job => (
                <div key={job.id} className="job-item">
                  <h4>{job.title}</h4>
                  <p>Posted: {job.posted}</p>
                  <p>{job.applications} applications</p>
                  <button className="view-btn">View Details</button>
                </div>
              ))}
            </div>
            <button className="see-all-btn">See All Jobs</button>
          </div>

          {/* Pending Applications */}
          <div className="info-card">
            <h2>Pending Applications</h2>
            <div className="application-list">
              {employerData.pendingApplications.map(app => (
                <div key={app.id} className="application-item">
                  <h4>{app.candidate} - {app.job}</h4>
                  <p>Applied: {app.applied}</p>
                  <div className="action-buttons">
                    <button className="review-btn">Review</button>
                    <button className="schedule-btn">Schedule Interview</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="see-all-btn">View All Applications</button>
          </div>

          {/* Notifications */}
          <div className="info-card">
            <h2>Recent Notifications</h2>
            <div className="notification-list">
              {employerData.notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              ))}
            </div>
            <button className="see-all-btn">See All Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;