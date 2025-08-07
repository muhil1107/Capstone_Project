import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('Job Seeker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Navigate to dashboard (fake for now)
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-white flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">JobPortal</h1>
        <p className="text-center text-gray-500 mb-6">Welcome back! Please sign in to your account</p>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded-l-full ${
              role === 'Job Seeker'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setRole('Job Seeker')}
          >
            Job Seeker
          </button>
          <button
            className={`px-4 py-2 rounded-r-full ${
              role === 'Employer'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => setRole('Employer')}
          >
            Employer
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 font-medium hover:underline">
            Sign up
          </a>
        </p>

        
      </div>
    </div>
  );
};

export default Login;
