import React, { useState } from 'react';

const InternshipTaskReview = () => {
  const [interns, setInterns] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      internship: 'Frontend Development', 
      tasks: [
        { id: 1, title: 'Create React Component', status: 'Submitted', submissionDate: '2023-07-22' },
        { id: 2, title: 'API Integration', status: 'In Review', submissionDate: '2023-07-24' }
      ] 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      internship: 'UI/UX Design', 
      tasks: [
        { id: 1, title: 'Wireframe Design', status: 'Approved', submissionDate: '2023-07-20' },
        { id: 2, title: 'Prototype Creation', status: 'Submitted', submissionDate: '2023-07-25' }
      ] 
    }
  ]);

  const [selectedIntern, setSelectedIntern] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleViewTasks = (intern) => {
    setSelectedIntern(intern);
  };

  const handleReviewTask = (task) => {
    setSelectedTask(task);
  };

  const submitReview = () => {
    if (selectedTask && feedback) {
      // Update task status and add review
      const updatedInterns = interns.map(intern => {
        if (intern.id === selectedIntern.id) {
          const updatedTasks = intern.tasks.map(task => 
            task.id === selectedTask.id 
              ? { ...task, status: 'Reviewed', feedback, rating }
              : task
          );
          return { ...intern, tasks: updatedTasks };
        }
        return intern;
      });
      
      setInterns(updatedInterns);
      setSelectedTask(null);
      setFeedback('');
      setRating(0);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Internship Task Review</h2>
      
      <div style={styles.internsList}>
        <h3 style={styles.subtitle}>Assigned Interns</h3>
        
        {interns.map(intern => (
          <div key={intern.id} style={styles.internCard}>
            <div style={styles.internHeader}>
              <div>
                <h4 style={styles.internName}>{intern.name}</h4>
                <p style={styles.internship}>{intern.internship}</p>
              </div>
              <button 
                onClick={() => handleViewTasks(intern)}
                style={styles.viewTasksButton}
              >
                View Tasks
              </button>
            </div>
            
            <div style={styles.tasksSummary}>
              <span>Tasks: {intern.tasks.length}</span>
              <span>Pending Review: {intern.tasks.filter(t => t.status === 'Submitted' || t.status === 'In Review').length}</span>
            </div>
          </div>
        ))}
      </div>
      
      {selectedIntern && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Tasks for {selectedIntern.name}</h3>
            
            <div style={styles.tasksList}>
              {selectedIntern.tasks.map(task => (
                <div key={task.id} style={styles.taskItem}>
                  <div>
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                    <p style={styles.taskDate}>Submitted: {task.submissionDate}</p>
                  </div>
                  <div style={styles.taskActions}>
                    <span style={{
                      ...styles.taskStatus,
                      ...(task.status === 'Submitted' ? styles.statusSubmitted : 
                           task.status === 'In Review' ? styles.statusInReview : 
                           styles.statusApproved)
                    }}>
                      {task.status}
                    </span>
                    {(task.status === 'Submitted' || task.status === 'In Review') && (
                      <button 
                        onClick={() => handleReviewTask(task)}
                        style={styles.reviewButton}
                      >
                        Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setSelectedIntern(null)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {selectedTask && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Review Task: {selectedTask.title}</h3>
            
            <div style={styles.reviewForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Rating</label>
                <div style={styles.ratingInput}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      style={{
                        ...styles.star,
                        ...(star <= rating ? styles.starFilled : {})
                      }}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide detailed feedback for the intern..."
                  style={styles.feedbackTextarea}
                  rows="6"
                />
              </div>
              
              <div style={styles.formActions}>
                <button 
                  onClick={submitReview}
                  style={styles.submitButton}
                >
                  Submit Review
                </button>
                <button 
                  onClick={() => setSelectedTask(null)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
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
  title: {
    margin: '0 0 20px 0',
    color: '#2c3e50'
  },
  subtitle: {
    margin: '0 0 15px 0',
    color: '#2c3e50'
  },
  internCard: {
    border: '1px solid #eee',
    borderRadius: '4px',
    padding: '15px',
    marginBottom: '15px'
  },
  internHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  internName: {
    margin: '0 0 5px 0',
    color: '#2c3e50'
  },
  internship: {
    margin: 0,
    color: '#7f8c8d'
  },
  viewTasksButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  tasksSummary: {
    display: 'flex',
    gap: '15px',
    color: '#7f8c8d',
    fontSize: '14px'
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
  tasksList: {
    marginBottom: '20px'
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #eee'
  },
  taskTitle: {
    margin: '0 0 5px 0',
    color: '#2c3e50'
  },
  taskDate: {
    margin: 0,
    color: '#7f8c8d',
    fontSize: '14px'
  },
  taskActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  taskStatus: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  statusSubmitted: {
    backgroundColor: '#e8f4fc',
    color: '#3498db'
  },
  statusInReview: {
    backgroundColor: '#fef5e7',
    color: '#f39c12'
  },
  statusApproved: {
    backgroundColor: '#e7f4e4',
    color: '#2ecc71'
  },
  reviewButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  reviewForm: {
    margin: '20px 0'
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
  feedbackTextarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    resize: 'vertical'
  },
  formActions: {
    display: 'flex',
    gap: '10px'
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#7f8c8d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer'
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

export default InternshipTaskReview;
