import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Muhil',
      email: 'muhil@example.com',
      phone: '+1 234-567-8900',
      location: 'New York, USA',
      bio: 'Frontend developer with 3 years of experience specializing in React and Vue.js'
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      jobAlerts: true,
      courseUpdates: true,
      mentorSessionReminders: true,
      challengeNotifications: true
    },
    privacy: {
      profileVisibility: 'public',
      resumeVisibility: 'employers',
      showOnlineStatus: true,
      allowMessages: 'all',
      searchEngineIndexing: false
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      deviceManagement: true
    }
  });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = (section) => {
    // In a real app, this would call an API
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved`);
  };

  const renderProfileSettings = () => (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>Profile Information</h3>
      <div style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Location</label>
          <input
            type="text"
            value={settings.profile.location}
            onChange={(e) => handleInputChange('profile', 'location', e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Bio</label>
          <textarea
            value={settings.profile.bio}
            onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
            style={textareaStyle}
            rows="4"
          />
        </div>
      </div>
      <button 
        style={saveButtonStyle}
        onClick={() => handleSave('profile')}
      >
        Save Profile
      </button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>Notification Preferences</h3>
      <div style={formStyle}>
        <h4 style={subsectionTitleStyle}>Notification Methods</h4>
        <div style={checkboxGroupStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
              style={checkboxStyle}
            />
            Email Notifications
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={(e) => handleInputChange('notifications', 'push', e.target.checked)}
              style={checkboxStyle}
            />
            Push Notifications
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.notifications.sms}
              onChange={(e) => handleInputChange('notifications', 'sms', e.target.checked)}
              style={checkboxStyle}
            />
            SMS Notifications
          </label>
        </div>

        <h4 style={subsectionTitleStyle}>Notification Types</h4>
        <div style={checkboxGroupStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.notifications.jobAlerts}
              onChange={(e) => handleInputChange('notifications', 'jobAlerts', e.target.checked)}
              style={checkboxStyle}
            />
            Job Alerts
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.notifications.courseUpdates}
              onChange={(e) => handleInputChange('notifications', 'courseUpdates', e.target.checked)}
              style={checkboxStyle}
            />
            Course Updates
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.notifications.mentorSessionReminders}
              onChange={(e) => handleInputChange('notifications', 'mentorSessionReminders', e.target.checked)}
              style={checkboxStyle}
            />
            Mentor Session Reminders
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.notifications.challengeNotifications}
              onChange={(e) => handleInputChange('notifications', 'challengeNotifications', e.target.checked)}
              style={checkboxStyle}
            />
            Challenge Notifications
          </label>
        </div>
      </div>
      <button 
        style={saveButtonStyle}
        onClick={() => handleSave('notifications')}
      >
        Save Notification Preferences
      </button>
    </div>
  );

  const renderPrivacySettings = () => (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>Privacy Settings</h3>
      <div style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Profile Visibility</label>
          <select
            value={settings.privacy.profileVisibility}
            onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
            style={selectStyle}
          >
            <option value="public">Public</option>
            <option value="employers">Employers Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Resume Visibility</label>
          <select
            value={settings.privacy.resumeVisibility}
            onChange={(e) => handleInputChange('privacy', 'resumeVisibility', e.target.value)}
            style={selectStyle}
          >
            <option value="public">Public</option>
            <option value="employers">Employers Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Allow Messages From</label>
          <select
            value={settings.privacy.allowMessages}
            onChange={(e) => handleInputChange('privacy', 'allowMessages', e.target.value)}
            style={selectStyle}
          >
            <option value="all">Everyone</option>
            <option value="employers">Employers Only</option>
            <option value="mentors">Mentors Only</option>
            <option value="none">No One</option>
          </select>
        </div>
        <div style={checkboxGroupStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.privacy.showOnlineStatus}
              onChange={(e) => handleInputChange('privacy', 'showOnlineStatus', e.target.checked)}
              style={checkboxStyle}
            />
            Show Online Status
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.privacy.searchEngineIndexing}
              onChange={(e) => handleInputChange('privacy', 'searchEngineIndexing', e.target.checked)}
              style={checkboxStyle}
            />
            Allow Search Engine Indexing
          </label>
        </div>
      </div>
      <button 
        style={saveButtonStyle}
        onClick={() => handleSave('privacy')}
      >
        Save Privacy Settings
      </button>
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>Security Settings</h3>
      <div style={formStyle}>
        <div style={checkboxGroupStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
              style={checkboxStyle}
            />
            Enable Two-Factor Authentication
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.security.loginAlerts}
              onChange={(e) => handleInputChange('security', 'loginAlerts', e.target.checked)}
              style={checkboxStyle}
            />
            Send Login Alerts
          </label>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={settings.security.deviceManagement}
              onChange={(e) => handleInputChange('security', 'deviceManagement', e.target.checked)}
              style={checkboxStyle}
            />
            Enable Device Management
          </label>
        </div>
        
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Change Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            style={inputStyle}
          />
        </div>
      </div>
      <button 
        style={saveButtonStyle}
        onClick={() => handleSave('security')}
      >
        Save Security Settings
      </button>
    </div>
  );

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Settings</h2>
      
      {/* Tabs */}
      <div style={tabsStyle}>
        <button 
          style={{...tabStyle, ...(activeTab === 'profile' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'notifications' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'privacy' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'security' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      {/* Settings Content */}
      <div style={contentStyle}>
        {activeTab === 'profile' && renderProfileSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'privacy' && renderPrivacySettings()}
        {activeTab === 'security' && renderSecuritySettings()}
      </div>
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

const contentStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  padding: '1.5rem'
}

export default Settings;