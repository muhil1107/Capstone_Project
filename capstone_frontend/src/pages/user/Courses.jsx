import React, { useState } from 'react';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample course data
  const courses = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Learn the basics of React including components, state, and props',
      instructor: 'John Doe',
      duration: '12 hours',
      level: 'Beginner',
      rating: 4.7,
      students: 2450,
      price: 49.99,
      isFree: false,
      category: 'Frontend',
      progress: 75,
      enrolled: true
    },
    {
      id: 2,
      title: 'JavaScript Advanced Concepts',
      description: 'Deep dive into advanced JavaScript patterns and practices',
      instructor: 'Jane Smith',
      duration: '15 hours',
      level: 'Advanced',
      rating: 4.9,
      students: 1890,
      price: 0,
      isFree: true,
      category: 'Programming',
      progress: 0,
      enrolled: false
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js',
      instructor: 'Mike Johnson',
      duration: '20 hours',
      level: 'Intermediate',
      rating: 4.5,
      students: 3250,
      price: 79.99,
      isFree: false,
      category: 'Backend',
      progress: 100,
      enrolled: true
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      description: 'Learn the fundamentals of user interface and experience design',
      instructor: 'Sarah Wilson',
      duration: '10 hours',
      level: 'Beginner',
      rating: 4.6,
      students: 4100,
      price: 0,
      isFree: true,
      category: 'Design',
      progress: 0,
      enrolled: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'enrolled' && course.enrolled) ||
                      (activeTab === 'free' && course.isFree) ||
                      (activeTab === 'paid' && !course.isFree);
    return matchesSearch && matchesTab;
  });

  const enrollCourse = (courseId) => {
    // In a real app, this would call an API
    alert(`Enrolling in course ${courseId}`);
  };

  const continueCourse = (courseId) => {
    // In a real app, this would navigate to the course page
    alert(`Continuing course ${courseId}`);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Courses</h2>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Tabs */}
      <div style={tabsStyle}>
        <button 
          style={{...tabStyle, ...(activeTab === 'all' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('all')}
        >
          All Courses
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'enrolled' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('enrolled')}
        >
          My Enrollments
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'free' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('free')}
        >
          Free Courses
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'paid' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('paid')}
        >
          Paid Courses
        </button>
      </div>

      {/* Courses Grid */}
      <div style={coursesGridStyle}>
        {filteredCourses.map(course => (
          <div key={course.id} style={courseCardStyle}>
            <div style={courseImageStyle}>
              <div style={categoryBadgeStyle}>{course.category}</div>
              {course.isFree && <div style={freeBadgeStyle}>FREE</div>}
            </div>
            
            <div style={courseContentStyle}>
              <h3 style={courseTitleStyle}>{course.title}</h3>
              <p style={courseDescStyle}>{course.description}</p>
              
              <div style={courseMetaStyle}>
                <span style={metaItemStyle}>👤 {course.instructor}</span>
                <span style={metaItemStyle}>⏱️ {course.duration}</span>
                <span style={metaItemStyle}>📊 {course.level}</span>
              </div>
              
              <div style={ratingStyle}>
                <span style={starsStyle}>★★★★☆</span>
                <span style={ratingTextStyle}>{course.rating} ({course.students} students)</span>
              </div>
              
              {course.enrolled ? (
                <div style={progressContainerStyle}>
                  <div style={progressLabelStyle}>
                    <span>Progress: {course.progress}%</span>
                    {course.progress === 100 ? (
                      <span style={completedTextStyle}>Completed ✓</span>
                    ) : null}
                  </div>
                  <div style={progressBarStyle}>
                    <div style={{...progressFillStyle, width: `${course.progress}%`}}></div>
                  </div>
                  {course.progress < 100 && (
                    <button 
                      style={continueButtonStyle}
                      onClick={() => continueCourse(course.id)}
                    >
                      Continue Learning
                    </button>
                  )}
                </div>
              ) : (
                <div style={priceContainerStyle}>
                  <span style={priceStyle}>
                    {course.isFree ? 'Free' : `$${course.price}`}
                  </span>
                  <button 
                    style={enrollButtonStyle}
                    onClick={() => enrollCourse(course.id)}
                  >
                    Enroll Now
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
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

const coursesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '1.5rem'
};

const courseCardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const courseImageStyle = {
  height: '160px',
  backgroundColor: '#ecf0f1',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '1rem'
};

const categoryBadgeStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#3498db',
  color: 'white',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const freeBadgeStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const courseContentStyle = {
  padding: '1.5rem'
};

const courseTitleStyle = {
  margin: '0 0 0.5rem 0',
  color: '#2c3e50',
  fontSize: '1.2rem'
};

const courseDescStyle = {
  margin: '0 0 1rem 0',
  color: '#7f8c8d',
  fontSize: '0.9rem'
};

const courseMetaStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1rem'
};

const metaItemStyle = {
  fontSize: '0.8rem',
  color: '#95a5a6'
};

const ratingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1rem'
};

const starsStyle = {
  color: '#f39c12'
};

const ratingTextStyle = {
  fontSize: '0.8rem',
  color: '#7f8c8d'
};

const progressContainerStyle = {
  marginTop: '1rem'
};

const progressLabelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem'
};

const completedTextStyle = {
  color: '#2ecc71',
  fontWeight: 'bold'
};

const progressBarStyle = {
  height: '8px',
  backgroundColor: '#ecf0f1',
  borderRadius: '4px',
  marginBottom: '1rem'
};

const progressFillStyle = {
  height: '100%',
  backgroundColor: '#3498db',
  borderRadius: '4px',
  transition: 'width 0.3s ease'
};

const continueButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%'
};

const priceContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1rem'
};

const priceStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#2c3e50'
};

const enrollButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Courses;