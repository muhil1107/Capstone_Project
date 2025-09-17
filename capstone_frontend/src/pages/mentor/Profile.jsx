import React, { useState } from 'react';

const MentorProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Mentor',
    email: 'john.mentor@example.com',
    bio: 'Experienced software developer with 10+ years in the industry',
    expertise: 'React, Node.js, System Design',
    experience: '10 years',
    company: 'Tech Solutions Inc.',
    position: 'Senior Developer'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically save the profile data
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Mentor Profile</h2>
        <button 
          style={styles.editButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              style={styles.textarea}
              rows="4"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Expertise</label>
            <input
              type="text"
              name="expertise"
              value={profile.expertise}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Experience</label>
            <input
              type="text"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Company</label>
            <input
              type="text"
              name="company"
              value={profile.company}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Position</label>
            <input
              type="text"
              name="position"
              value={profile.position}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.saveButton}>
            Save Changes
          </button>
        </form>
      ) : (
        <div style={styles.profileView}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 style={styles.profileName}>{profile.name}</h3>
              <p style={styles.profileEmail}>{profile.email}</p>
            </div>
          </div>
          
          <div style={styles.details}>
            <div style={styles.detailItem}>
              <strong>Bio:</strong> {profile.bio}
            </div>
            <div style={styles.detailItem}>
              <strong>Expertise:</strong> {profile.expertise}
            </div>
            <div style={styles.detailItem}>
              <strong>Experience:</strong> {profile.experience}
            </div>
            <div style={styles.detailItem}>
              <strong>Company:</strong> {profile.company}
            </div>
            <div style={styles.detailItem}>
              <strong>Position:</strong> {profile.position}
            </div>
          </div>

          <div style={styles.ratings}>
            <h4 style={styles.ratingsTitle}>Ratings & Feedback</h4>
            <div style={styles.ratingItem}>
              <span>Overall Rating: </span>
              <span style={styles.ratingValue}>4.8/5</span>
            </div>
            <div style={styles.ratingItem}>
              <span>Total Sessions: </span>
              <span style={styles.ratingValue}>124</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px'
  },
  title: {
    margin: 0,
    color: '#2c3e50'
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    resize: 'vertical'
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
    alignSelf: 'flex-start'
  },
  profileView: {
    padding: '10px 0'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginRight: '15px'
  },
  profileName: {
    margin: '0 0 5px 0',
    color: '#2c3e50'
  },
  profileEmail: {
    margin: 0,
    color: '#7f8c8d'
  },
  details: {
    marginBottom: '20px'
  },
  detailItem: {
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  ratings: {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  ratingsTitle: {
    margin: '0 0 10px 0',
    color: '#2c3e50'
  },
  ratingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0'
  },
  ratingValue: {
    fontWeight: 'bold',
    color: '#3498db'
  }
};

export default MentorProfile;
