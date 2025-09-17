//Edit empoyer name, logo, company logo
// Upload ID proof
//Admin approval status
//Ratings UI


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/profile.css';

function Profile() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    employerName: 'MV Technologies',
    email: 'mv@gmail.com',
    logo: 'https://via.placeholder.com/150',
    idProof: 'https://via.placeholder.com/150',
    adminApproval: 'Pending',
    ratings: 4.5,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [showIdProof, setShowIdProof] = useState(false); // For toggling ID proof visibility

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };
  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, [field]: imageUrl }));
    }
  };

  const statusClass = {
    Approved: 'status-approved',
    Rejected: 'status-rejected',
    Pending: 'status-pending',
  }[profileData.adminApproval] || 'status-default';

  return (
    <div className="profile-container">
      <h1 className="profile-title">Employer Profile</h1>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-header-left">
            <img src={formData.logo} alt="Company Logo" className="profile-logo" />
            {isEditing ? (
              <input
                type="text"
                name="employerName"
                value={formData.employerName}
                onChange={handleChange}
                className="input-field name-input"
              />
            ) : (
              <h2 className="profile-name">{profileData.employerName}</h2>
            )}
          </div>
          <button onClick={isEditing ? handleSave : handleEdit} className="edit-button">
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-details">
          <div className="field-group">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{profileData.email}</p>
            )}
          </div>

          {isEditing && (
            <div className="field-group">
              <label>Upload Logo</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} />
            </div>
          )}

          <div className="field-group" style={{ marginBottom: '20px' }}>
            <label>ID Proof</label>
            {isEditing ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'idProof')}
                />
                {formData.idProof && (
                  <img
                    src={formData.idProof}
                    alt="ID Proof"
                    className="preview-image"
                    style={{ marginTop: '10px' }}
                  />
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="link"
                  onClick={() => setShowIdProof(!showIdProof)}
                >
                  {showIdProof ? 'Hide ID Proof' : 'View ID Proof'}
                </button>
                {showIdProof && (
                  <div style={{ marginTop: '20px' }}>
                    <img
                      src={profileData.idProof}
                      alt="ID Proof"
                      className="preview-image"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="field-group">
            <label>Admin Approval Status</label>
            <p className={`status ${statusClass}`}>{profileData.adminApproval}</p>
          </div>

          <div className="field-group">
            <label>Ratings</label>
            <p className="ratings">
              {'⭐'.repeat(Math.floor(profileData.ratings))} {profileData.ratings.toFixed(1)}
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="button-group">
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
            <button onClick={handleSave} className="save-button">Save Changes</button>
          </div>
        )}
      </div>

      <div className="back-button-container">
        <button onClick={() => navigate('/employer/dashboard')} className="back-button">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;
