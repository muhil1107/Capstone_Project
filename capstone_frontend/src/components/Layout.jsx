import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../styles/Layout.css'; 

const SidebarLayout = () => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2>Employer Panel</h2>
        <div className="nav-links">
          <NavLink to="dashboard">Dashboard</NavLink>
          <NavLink to="jobs">Jobs</NavLink>
          <NavLink to="internships">Internships</NavLink>
          <NavLink to="applications">Applications</NavLink>
          <NavLink to="notifications">Notifications</NavLink>
          <NavLink to="analytics">Analytics</NavLink>
          <NavLink to="profile">Profile</NavLink>
        </div>
        <div className="logout">
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
