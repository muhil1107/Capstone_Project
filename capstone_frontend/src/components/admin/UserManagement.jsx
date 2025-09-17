import React, { useState } from 'react';

const UserManagement = ({ users }) => {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(filter.toLowerCase()) || 
                          user.email.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>User Management</h2>
      
      <div style={filtersStyle}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={inputStyle}
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Progress</th>
            <th style={thStyle}>Applied Jobs</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                <div style={progressBarStyle}>
                  <div style={{...progressFillStyle, width: `${user.progress}%`}}></div>
                </div>
                <span>{user.progress}%</span>
              </td>
              <td style={tdStyle}>{user.appliedJobs}</td>
              <td style={tdStyle}>
                <span style={{
                  ...statusStyle,
                  backgroundColor: user.status === 'active' ? '#2ecc71' : 
                                 user.status === 'inactive' ? '#f39c12' : '#e74c3c'
                }}>
                  {user.status}
                </span>
              </td>
              <td style={tdStyle}>
                <button style={actionButtonStyle}>View</button>
                <button style={{...actionButtonStyle, backgroundColor: '#e74c3c'}}>
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

const filtersStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '1.5rem'
};

const inputStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  flex: 1
};

const selectStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const thStyle = {
  padding: '1rem',
  textAlign: 'left',
  backgroundColor: '#34495e',
  color: 'white',
  borderBottom: '2px solid #2c3e50'
};

const tdStyle = {
  padding: '1rem',
  borderBottom: '1px solid #ddd'
};

const progressBarStyle = {
  height: '8px',
  backgroundColor: '#ecf0f1',
  borderRadius: '4px',
  margin: '0.5rem 0',
  width: '100px'
};

const progressFillStyle = {
  height: '100%',
  backgroundColor: '#3498db',
  borderRadius: '4px'
};

const statusStyle = {
  padding: '0.25rem 0.5rem',
  borderRadius: '12px',
  color: 'white',
  fontSize: '0.8rem'
};

const actionButtonStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '0.5rem'
};

export default UserManagement;