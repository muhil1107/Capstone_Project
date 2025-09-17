//dashboard
//job management
//internsip management
//tests & tasks
//certifications
//applications
//analytics
//profile


import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userRole') === 'Employer';

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/employer/dashboard' },
    { label: 'Job Management', path: '/employer/jobs' },
    { label: 'Internship Management', path: '/employer/internships' },
    { label: 'Tests & Tasks', path: '/employer/tests' },
    { label: 'Certifications', path: '/employer/certificates' },
    { label: 'Applications', path: '/employer/applications' },
    { label: 'Profile', path: '/employer/profile' },
  ];

  return (
    <div className="min-h-screen w-64 bg-blue-900 text-white flex flex-col p-4 shadow-lg">
      <div className="text-2xl font-bold mb-8 text-center">Employer Panel</div>

      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `py-2 px-4 rounded hover:bg-blue-700 transition ${
                isActive ? 'bg-blue-700' : ''
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 border-t border-blue-700 pt-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/"
            className="w-full block text-center py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
