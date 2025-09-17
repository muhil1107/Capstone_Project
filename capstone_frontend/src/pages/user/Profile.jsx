import React, { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Muhil',
    email: 'muhil@example.com',
    phone: '+1 234-567-8900',
    location: 'New York, USA',
    bio: 'Frontend developer with 3 years of experience specializing in React and Vue.js',
    education: 'B.S. in Computer Science',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js'],
    resume: 'muhil_resume.pdf',
    profileCompletion: 75
  });

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to API here
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>My Profile</h2>
        <div style={buttonGroupStyle}>
          {isEditing ? (
            <>
              <button style={primaryButtonStyle} onClick={handleSave}>Save Changes</button>
              <button style={secondaryButtonStyle} onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button style={primaryButtonStyle} onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>

      {/* Profile Completion */}
      <div style={cardStyle}>
        <h3 style={cardTitleStyle}>Profile Completion</h3>
        <div style={completionContainerStyle}>
          <div style={progressBarStyle}>
            <div style={{...progressFillStyle, width: `${profile.profileCompletion}%`}}></div>
          </div>
          <span style={completionTextStyle}>{profile.profileCompletion}% Complete</span>
        </div>
        <p style={completionHintStyle}>
          Complete your profile to get better job recommendations: Add a bio, education, and more skills.
        </p>
      </div>

      <div style={gridStyle}>
        {/* Personal Information */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Personal Information</h3>
          <div style={formStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Location</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Bio</h3>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            style={{...textareaStyle, ...(!isEditing ? disabledInputStyle : {})}}
            rows="4"
          />
        </div>

        {/* Education */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Education</h3>
          <input
            type="text"
            name="education"
            value={profile.education}
            onChange={handleInputChange}
            disabled={!isEditing}
            style={{...inputStyle, ...(!isEditing ? disabledInputStyle : {})}}
          />
        </div>

        {/* Skills */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Skills</h3>
          <div style={skillsContainerStyle}>
            {profile.skills.map(skill => (
              <div key={skill} style={skillTagStyle}>
                {skill}
                {isEditing && (
                  <button 
                    style={removeSkillButtonStyle}
                    onClick={() => removeSkill(skill)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div style={addSkillContainerStyle}>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                style={skillInputStyle}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <button style={addSkillButtonStyle} onClick={addSkill}>Add</button>
            </div>
          )}
        </div>

        {/* Resume */}
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Resume</h3>
          <div style={resumeContainerStyle}>
            <span style={resumeTextStyle}>{profile.resume}</span>
            <button style={secondaryButtonStyle}>
              {isEditing ? 'Upload New' : 'Download'}
            </button>
          </div>
        </div>
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
  marginBottom: '1.5rem'
};

const titleStyle = {
  margin: 0,
  color: '#2c3e50'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '0.5rem'
};

const primaryButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const secondaryButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: 'transparent',
  color: '#7f8c8d',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const cardTitleStyle = {
  margin: '0 0 1rem 0',
  color: '#2c3e50',
  borderBottom: '2px solid #f5f5f5',
  paddingBottom: '0.5rem'
};

const completionContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '0.5rem'
};

const progressBarStyle = {
  height: '8px',
  backgroundColor: '#ecf0f1',
  borderRadius: '4px',
  flex: 1
};

const progressFillStyle = {
  height: '100%',
  backgroundColor: '#2ecc71',
  borderRadius: '4px'
};

const completionTextStyle = {
  fontWeight: 'bold',
  color: '#2c3e50'
};

const completionHintStyle = {
  margin: 0,
  fontSize: '0.9rem',
  color: '#7f8c8d'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem',
  marginTop: '1.5rem'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#34495e'
};

const inputStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const textareaStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  resize: 'vertical',
  fontFamily: 'inherit'
};

const disabledInputStyle = {
  backgroundColor: '#f8f9fa',
  color: '#7f8c8d',
  cursor: 'not-allowed'
};

const skillsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1rem'
};

const skillTagStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#e8f4fc',
  color: '#3498db',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem'
};

const removeSkillButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#e74c3c',
  cursor: 'pointer',
  fontSize: '1.2rem',
  padding: 0,
  marginLeft: '0.25rem'
};

const addSkillContainerStyle = {
  display: 'flex',
  gap: '0.5rem'
};

const skillInputStyle = {
  padding: '0.5rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  flex: 1
};

const addSkillButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const resumeContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const resumeTextStyle = {
  color: '#34495e'
};

export default UserProfile;