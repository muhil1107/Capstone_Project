import React, { useState } from 'react';

const MentorshipSessions = () => {
  const [sessions, setSessions] = useState([
    { id: 1, student: 'John Doe', date: '2023-07-25', time: '5:00 PM', status: 'Upcoming', type: 'Career Guidance' },
    { id: 2, student: 'Jane Smith', date: '2023-07-26', time: '3:30 PM', status: 'Upcoming', type: 'Technical Interview Prep' },
    { id: 3, student: 'Mike Johnson', date: '2023-07-20', time: '2:00 PM', status: 'Completed', type: 'Resume Review' },
    { id: 4, student: 'Sarah Williams', date: '2023-07-18', time: '4:00 PM', status: 'Completed', type: 'Project Guidance' }
  ]);

  const [selectedSession, setSelectedSession] = useState(null);
  const [notes, setNotes] = useState('');

  const handleViewDetails = (session) => {
    setSelectedSession(session);
  };

  const handleAddNotes = () => {
    if (selectedSession && notes) {
      // In a real app, you would save these notes to your backend
      alert(`Notes added for session with ${selectedSession.student}`);
      setNotes('');
      setSelectedSession(null);
    }
  };

  const completeSession = (sessionId) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'Completed' } 
        : session
    ));
  };

  const cancelSession = (sessionId) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Mentorship Sessions</h2>
      
      <div style={styles.sessionList}>
        <h3 style={styles.subtitle}>Your Sessions</h3>
        <div style={styles.filterTabs}>
          <button style={styles.tabActive}>All Sessions</button>
          <button style={styles.tab}>Upcoming</button>
          <button style={styles.tab}>Completed</button>
        </div>
        
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session.id}>
                  <td style={styles.td}>{session.student}</td>
                  <td style={styles.td}>{session.date}</td>
                  <td style={styles.td}>{session.time}</td>
                  <td style={styles.td}>{session.type}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.status,
                      ...(session.status === 'Upcoming' ? styles.statusUpcoming : styles.statusCompleted)
                    }}>
                      {session.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => handleViewDetails(session)}
                      style={styles.actionButton}
                    >
                      View
                    </button>
                    {session.status === 'Upcoming' && (
                      <>
                        <button 
                          onClick={() => completeSession(session.id)}
                          style={{...styles.actionButton, ...styles.completeButton}}
                        >
                          Complete
                        </button>
                        <button 
                          onClick={() => cancelSession(session.id)}
                          style={{...styles.actionButton, ...styles.cancelButton}}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectedSession && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Session Details</h3>
            <div style={styles.detailItem}>
              <strong>Student:</strong> {selectedSession.student}
            </div>
            <div style={styles.detailItem}>
              <strong>Date & Time:</strong> {selectedSession.date} at {selectedSession.time}
            </div>
            <div style={styles.detailItem}>
              <strong>Type:</strong> {selectedSession.type}
            </div>
            <div style={styles.detailItem}>
              <strong>Status:</strong> {selectedSession.status}
            </div>
            
            {selectedSession.status === 'Completed' && (
              <div style={styles.notesSection}>
                <h4 style={styles.notesTitle}>Session Notes</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes from this session..."
                  style={styles.notesTextarea}
                  rows="5"
                />
                <button onClick={handleAddNotes} style={styles.saveNotesButton}>
                  Save Notes
                </button>
              </div>
            )}
            
            <button 
              onClick={() => setSelectedSession(null)}
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
  subtitle: {
    margin: '0 0 15px 0',
    color: '#2c3e50'
  },
  filterTabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
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
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #eee',
    backgroundColor: '#f8f9fa',
    color: '#2c3e50'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee'
  },
  status: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  statusUpcoming: {
    backgroundColor: '#e8f4fc',
    color: '#3498db'
  },
  statusCompleted: {
    backgroundColor: '#e7f4e4',
    color: '#2ecc71'
  },
  actionButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
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
    width: '500px',
    maxWidth: '90%'
  },
  modalTitle: {
    margin: '0 0 15px 0',
    color: '#2c3e50'
  },
  detailItem: {
    marginBottom: '10px',
    padding: '8px 0'
  },
  notesSection: {
    margin: '15px 0'
  },
  notesTitle: {
    margin: '0 0 10px 0',
    color: '#2c3e50'
  },
  notesTextarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  saveNotesButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  closeButton: {
    backgroundColor: '#7f8c8d',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default MentorshipSessions;
