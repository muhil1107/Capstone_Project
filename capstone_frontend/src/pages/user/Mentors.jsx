import React, { useState } from 'react';

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookingModal, setBookingModal] = useState(null);

  // Sample mentors data
  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Software Engineer at TechCorp',
      expertise: ['React', 'JavaScript', 'Frontend Architecture'],
      experience: '8 years',
      rating: 4.9,
      sessions: 245,
      category: 'Frontend Development',
      availability: ['Mon 2-4 PM', 'Wed 10-12 PM', 'Fri 3-5 PM'],
      rate: '$75/hour',
      image: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Lead Data Scientist at DataInsights',
      expertise: ['Python', 'Machine Learning', 'Data Visualization'],
      experience: '10 years',
      rating: 4.8,
      sessions: 189,
      category: 'Data Science',
      availability: ['Tue 1-3 PM', 'Thu 9-11 AM', 'Sat 2-4 PM'],
      rate: '$90/hour',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'UX Design Director at CreativeStudio',
      expertise: ['UI/UX Design', 'User Research', 'Figma'],
      experience: '7 years',
      rating: 4.7,
      sessions: 156,
      category: 'UI/UX Design',
      availability: ['Mon 9-11 AM', 'Wed 2-4 PM', 'Fri 10-12 PM'],
      rate: '$70/hour',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Backend Architect at ServerStack',
      expertise: ['Node.js', 'AWS', 'Microservices'],
      experience: '12 years',
      rating: 4.9,
      sessions: 278,
      category: 'Backend Development',
      availability: ['Tue 3-5 PM', 'Thu 10-12 PM', 'Sat 9-11 AM'],
      rate: '$85/hour',
      image: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  ];

  const categories = ['all', 'Frontend Development', 'Data Science', 'UI/UX Design', 'Backend Development'];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || mentor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openBookingModal = (mentorId) => {
    setBookingModal(mentorId);
  };

  const closeBookingModal = () => {
    setBookingModal(null);
  };

  const bookSession = (mentorId, timeSlot) => {
    // In a real app, this would call an API
    alert(`Booking session with mentor ${mentorId} at ${timeSlot}`);
    closeBookingModal();
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Find a Mentor</h2>
        <input
          type="text"
          placeholder="Search mentors or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Categories */}
      <div style={categoriesStyle}>
        {categories.map(category => (
          <button
            key={category}
            style={{
              ...categoryButtonStyle,
              ...(selectedCategory === category ? activeCategoryStyle : {})
            }}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      {/* Mentors Grid */}
      <div style={mentorsGridStyle}>
        {filteredMentors.map(mentor => (
          <div key={mentor.id} style={mentorCardStyle}>
            <div style={mentorHeaderStyle}>
              <img src={mentor.image} alt={mentor.name} style={mentorImageStyle} />
              <div>
                <h3 style={mentorNameStyle}>{mentor.name}</h3>
                <p style={mentorTitleStyle}>{mentor.title}</p>
                <div style={ratingStyle}>
                  <span style={starsStyle}>★★★★★</span>
                  <span style={ratingTextStyle}>{mentor.rating} ({mentor.sessions} sessions)</span>
                </div>
              </div>
            </div>

            <div style={expertiseStyle}>
              <h4 style={sectionTitleStyle}>Expertise</h4>
              <div style={skillsContainerStyle}>
                {mentor.expertise.map(skill => (
                  <span key={skill} style={skillTagStyle}>{skill}</span>
                ))}
              </div>
            </div>

            <div style={detailsStyle}>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>Experience:</span>
                <span style={detailValueStyle}>{mentor.experience}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>Category:</span>
                <span style={detailValueStyle}>{mentor.category}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>Rate:</span>
                <span style={detailValueStyle}>{mentor.rate}</span>
              </div>
            </div>

            <div style={availabilityStyle}>
              <h4 style={sectionTitleStyle}>Availability</h4>
              <div style={timeSlotsStyle}>
                {mentor.availability.map(slot => (
                  <span key={slot} style={timeSlotStyle}>{slot}</span>
                ))}
              </div>
            </div>

            <button 
              style={bookButtonStyle}
              onClick={() => openBookingModal(mentor.id)}
            >
              Book Session
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>Book a Session</h3>
              <button style={closeButtonStyle} onClick={closeBookingModal}>×</button>
            </div>
            <div style={modalContentStyle}>
              <p>Select a time slot for your session:</p>
              <div style={modalTimeSlotsStyle}>
                {mentors.find(m => m.id === bookingModal)?.availability.map(slot => (
                  <button
                    key={slot}
                    style={modalTimeSlotStyle}
                    onClick={() => bookSession(bookingModal, slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
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
  marginBottom: '1.5rem',
  gap: '1rem'
};

const titleStyle = {
  margin: 0,
  color: '#2c3e50'
};

const searchInputStyle = {
  padding: '0.5rem 1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  minWidth: '250px'
};

const categoriesStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1.5rem'
};

const categoryButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#f8f9fa',
  color: '#7f8c8d',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer'
};

const activeCategoryStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  borderColor: '#3498db'
};

const mentorsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '1.5rem'
};

const mentorCardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const mentorHeaderStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem'
};

const mentorImageStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  objectFit: 'cover'
};

const mentorNameStyle = {
  margin: '0 0 0.25rem 0',
  color: '#2c3e50'
};

const mentorTitleStyle = {
  margin: '0 0 0.5rem 0',
  color: '#7f8c8d',
  fontSize: '0.9rem'
};

const ratingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const starsStyle = {
  color: '#f39c12'
};

const ratingTextStyle = {
  fontSize: '0.8rem',
  color: '#7f8c8d'
};

const expertiseStyle = {
  marginTop: '0.5rem'
};

const sectionTitleStyle = {
  margin: '0 0 0.5rem 0',
  color: '#2c3e50',
  fontSize: '1rem'
};

const skillsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem'
};

const skillTagStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#e8f4fc',
  color: '#3498db',
  borderRadius: '4px',
  fontSize: '0.8rem'
};

const detailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const detailItemStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const detailLabelStyle = {
  color: '#95a5a6',
  fontWeight: 'bold'
};

const detailValueStyle = {
  color: '#34495e'
};

const availabilityStyle = {
  marginTop: '0.5rem'
};

const timeSlotsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const timeSlotStyle = {
  padding: '0.5rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  fontSize: '0.9rem',
  color: '#34495e'
};

const bookButtonStyle = {
  padding: '0.75rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginTop: 'auto'
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '1.5rem',
  width: '90%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflow: 'auto'
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem'
};

const modalTitleStyle = {
  margin: 0,
  color: '#2c3e50'
};

const closeButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#7f8c8d'
};

const modalContentStyle = {
  marginBottom: '1.5rem'
};

const modalTimeSlotsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '1rem'
};

const modalTimeSlotStyle = {
  padding: '0.75rem',
  backgroundColor: '#f8f9fa',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'background-color 0.2s'
};

export default Mentors;