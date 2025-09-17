import React, { useState } from 'react';

const MockInterviews = () => {
  const [interviews, setInterviews] = useState([
    { id: 1, student: 'John Doe', date: '2023-07-28', time: '10:00 AM', type: 'Technical Interview', status: 'Scheduled' },
    { id: 2, student: 'Jane Smith', date: '2023-07-29', time: '2:30 PM', type: 'Behavioral Interview', status: 'Scheduled' },
    { id: 3, student: 'Mike Johnson', date: '2023-07-25', time: '11:00 AM', type: 'Technical Interview', status: 'Completed' }
  ]);

  const [selectedInterview, setSelectedInterview] = useState(null);
  const [feedback, setFeedback] = useState({
    technical: 0,
    communication: 0,
    problemSolving: 0,
    overall: 0,
    notes: ''
  });

  const handleViewDetails = (interview) => {
    setSelectedInterview(interview);
  };

  const handleFeedbackChange = (field, value) => {
    setFeedback({
      ...feedback,
      [field]: value
    });
  };

  const submitFeedback = () => {
    if (selectedInterview) {
      // Update interview status and add feedback
      const updatedInterviews = interviews.map(interview => 
        interview.id === selectedInterview.id 
          ? { ...interview, status: 'Reviewed', feedback }
          : interview
      );
      
      setInterviews(updatedInterviews);
      setSelectedInterview(null);
      setFeedback({
        technical: 0,
        communication: 0,
        problemSolving: 0,
        overall: 0,
        notes: ''
      });
    }
  };

  const cancelInterview = (interviewId) => {
    setInterviews(interviews.filter(interview => interview.id !== interviewId));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mock Interviews</h2>
      
      <div style={styles.controls}>
        <button style={styles.primaryButton}>Schedule New Interview</button>
        <div style={styles.filterTabs}>
          <button style={styles.tabActive}>All Interviews</button>
          <button style={styles.tab}>Scheduled</button>
          <button style={styles.tab}>Completed</button>
        </div>
      </div>
      
      <div style={styles.interviewList}>
        {interviews.map(interview => (
          <div key={interview.id} style={styles.interviewCard}>
            <div style={styles.interviewHeader}>
              <div>
                <h4 style={styles.studentName}>{interview.student}</h4>
                <p style={styles.interviewType}>{interview.type}</p>
              </div>
              <span style={{
                ...styles.statusBadge,
                ...(interview.status === 'Scheduled' ? styles.statusScheduled : styles.statusCompleted)
              }}>
                {interview.status}
              </span>
            </div>
            
            <div style={styles.interviewDetails}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Date:</span>
                <span>{interview.date}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Time:</span>
                <span>{interview.time}</span>
              </div>
            </div>
            
            <div style={styles.interviewActions}>
              <button 
                onClick={() => handleViewDetails(interview)}
                style={styles.actionButton}
              >
                View Details
              </button>
              {interview.status === 'Scheduled' && (
                <>
                  <button style={{...styles.actionButton, ...styles.completeButton}}>
                    Start Interview
                  </button>
                  <button 
                    onClick={() => cancelInterview(interview.id)}
                    style={{...styles.actionButton, ...styles.cancelButton}}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedInterview && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Interview Details</h3>
            
            <div style={styles.detailSection}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Student:</span>
                <span>{selectedInterview.student}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Date & Time:</span>
                <span>{selectedInterview.date} at {selectedInterview.time}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Type:</span>
                <span>{selectedInterview.type}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Status:</span>
                <span>{selectedInterview.status}</span>
              </div>
            </div>
            
            {selectedInterview.status === 'Completed' && !selectedInterview.feedback && (
              <div style={styles.feedbackSection}>
                <h4 style={styles.sectionTitle}>Interview Feedback</h4>
                
                <div style={styles.ratingCategory}>
                  <label style={styles.ratingLabel}>Technical Skills</label>
                  <div style={styles.ratingInput}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        style={{
                          ...styles.star,
                          ...(star <= feedback.technical ? styles.starFilled : {})
                        }}
                        onClick={() => handleFeedbackChange('technical', star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={styles.ratingCategory}>
                  <label style={styles.ratingLabel}>Communication</label>
                  <div style={styles.ratingInput}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        style={{
                          ...styles.star,
                          ...(star <= feedback.communication ? styles.starFilled : {})
                        }}
                        onClick={() => handleFeedbackChange('communication', star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={styles.ratingCategory}>
                  <label style={styles.ratingLabel}>Problem Solving</label>
                  <div style={styles.ratingInput}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        style={{
                          ...styles.star,
                          ...(star <= feedback.problemSolving ? styles.starFilled : {})
                        }}
                        onClick={() => handleFeedbackChange('problemSolving', star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={styles.ratingCategory}>
                  <label style={styles.ratingLabel}>Overall Performance</label>
                  <div style={styles.ratingInput}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        style={{
                          ...styles.star,
                          ...(star <= feedback.overall ? styles.starFilled : {})
                        }}
                        onClick={() => handleFeedbackChange('overall', star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={styles.notesSection}>
                  <label style={styles.notesLabel}>Additional Notes</label>
                  <textarea
                    value={feedback.notes}
                    onChange={(e) => handleFeedbackChange('notes', e.target.value)}
                    style={styles.notesTextarea}
                    rows="4"
                  />
                </div>
                
                <button onClick={submitFeedback} style={styles.submitButton}>
                  Submit Feedback
                </button>
              </div>
            )}
            
            {selectedInterview.feedback && (
              <div style={styles.feedbackView}>
                <h4 style={styles.sectionTitle}>Feedback Provided</h4>
                <div style={styles.feedbackRating}>
                  <div>Technical Skills: {selectedInterview.feedback.technical}/5</div>
                  <div>Communication: {selectedInterview.feedback.communication}/5</div>
                  <div>Problem Solving: {selectedInterview.feedback.problemSolving}/5</div>
                  <div>Overall: {selectedInterview.feedback.overall}/5</div>
                </div>
                <div style={styles.feedbackNotes}>
                  <strong>Notes:</strong>
                  <p>{selectedInterview.feedback.notes}</p>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setSelectedInterview(null)}
              style={styles.closeButton}
            >
              Close
            </button>
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
  title: {
    margin: '0 0 20px 0',
    color: '#2c3e50'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  primaryButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  filterTabs: {
    display: 'flex',
    gap: '10px'
  },
  tabActive: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  tab: {
    backgroundColor: '#f8f9fa',
    color: '#2c3e50',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  interviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  interviewCard: {
    border: '1px solid #eee',
    borderRadius: '4px',
    padding: '15px'
  },
  interviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  studentName: {
    margin: '0 0 5px 0',
    color: '#2c3e50'
  },
  interviewType: {
    margin: 0,
    color: '#7f8c8d'
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  statusScheduled: {
    backgroundColor: '#e8f4fc',
    color: '#3498db'
  },
  statusCompleted: {
    backgroundColor: '#e7f4e4',
    color: '#2ecc71'
  },
  interviewDetails: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px'
  },
  detailItem: {
    display: 'flex',
    gap: '5px'
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  interviewActions: {
    display: 'flex',
    gap: '10px'
  },
  actionButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  completeButton: {
    backgroundColor: '#2ecc71'
  },
  cancelButton: {
    backgroundColor: '#e74c3c'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '600px',
    maxWidth: '90%',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  modalTitle: {
    margin: '0 0 15px 0',
    color: '#2c3e50'
  },
  detailSection: {
    marginBottom: '20px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee'
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  feedbackSection: {
    margin: '20px 0'
  },
  sectionTitle: {
    margin: '0 0 15px 0',
    color: '#2c3e50'
  },
  ratingCategory: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  ratingLabel: {
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  ratingInput: {
    display: 'flex',
    gap: '5px'
  },
  star: {
    fontSize: '24px',
    color: '#ddd',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  starFilled: {
    color: '#f39c12'
  },
  notesSection: {
    marginBottom: '15px'
  },
  notesLabel: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  notesTextarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'vertical'
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  feedbackView: {
    margin: '20px 0'
  },
  feedbackRating: {
    marginBottom: '15px'
  },
  feedbackNotes: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },
  closeButton: {
    backgroundColor: '#7f8c8d',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default MockInterviews;
