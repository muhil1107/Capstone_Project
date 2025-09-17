import React, { useState, useEffect } from 'react';

const MentorNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Sample notifications data
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        type: 'session',
        title: 'New Session Booked',
        message: 'John Doe has booked a mentorship session for July 25 at 5:00 PM',
        time: '2 hours ago',
        read: false,
        important: true
      },
      {
        id: 2,
        type: 'task',
        title: 'Task Submission',
        message: 'Jane Smith has submitted the Week 3 task for review',
        time: '5 hours ago',
        read: false,
        important: true
      },
      {
        id: 3,
        type: 'interview',
        title: 'Mock Interview Scheduled',
        message: 'You have been assigned to conduct a mock interview for Mike Johnson',
        time: '1 day ago',
        read: true,
        important: false
      },
      {
        id: 4,
        type: 'system',
        title: 'System Update',
        message: 'New features have been added to the mentorship dashboard',
        time: '2 days ago',
        read: true,
        important: false
      },
      {
        id: 5,
        type: 'feedback',
        title: 'New Feedback Received',
        message: 'You have received feedback from your recent mentorship session',
        time: '3 days ago',
        read: true,
        important: true
      }
    ];

    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === filter);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'session': return '📅';
      case 'task': return '📝';
      case 'interview': return '💼';
      case 'feedback': return '⭐';
      case 'system': return '🔔';
      default: return '📢';
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'session': return '#3498db';
      case 'task': return '#2ecc71';
      case 'interview': return '#9b59b6';
      case 'feedback': return '#f1c40f';
      case 'system': return '#95a5a6';
      default: return '#7f8c8d';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Notifications</h2>
        <div style={styles.headerActions}>
          <span style={styles.unreadCount}>{unreadCount} unread</span>
          <button onClick={markAllAsRead} style={styles.markAllReadButton}>
            Mark all as read
          </button>
        </div>
      </div>

      <div style={styles.filterBar}>
        <button 
          style={filter === 'all' ? styles.filterButtonActive : styles.filterButton}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          style={filter === 'session' ? styles.filterButtonActive : styles.filterButton}
          onClick={() => setFilter('session')}
        >
          Sessions
        </button>
        <button 
          style={filter === 'task' ? styles.filterButtonActive : styles.filterButton}
          onClick={() => setFilter('task')}
        >
          Tasks
        </button>
        <button 
          style={filter === 'interview' ? styles.filterButtonActive : styles.filterButton}
          onClick={() => setFilter('interview')}
        >
          Interviews
        </button>
        <button 
          style={filter === 'feedback' ? styles.filterButtonActive : styles.filterButton}
          onClick={() => setFilter('feedback')}
        >
          Feedback
        </button>
      </div>

      <div style={styles.notificationsList}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              style={{
                ...styles.notificationItem,
                ...(!notification.read ? styles.unreadNotification : {})
              }}
            >
              <div style={styles.notificationIcon}>
                <span style={{ 
                  fontSize: '20px',
                  color: getNotificationColor(notification.type)
                }}>
                  {getNotificationIcon(notification.type)}
                </span>
              </div>
              
              <div style={styles.notificationContent}>
                <h4 style={styles.notificationTitle}>{notification.title}</h4>
                <p style={styles.notificationMessage}>{notification.message}</p>
                <div style={styles.notificationMeta}>
                  <span style={styles.notificationTime}>{notification.time}</span>
                  {notification.important && (
                    <span style={styles.importantBadge}>Important</span>
                  )}
                </div>
              </div>
              
              <div style={styles.notificationActions}>
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    style={styles.actionButton}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button 
                  onClick={() => deleteNotification(notification.id)}
                  style={{...styles.actionButton, ...styles.deleteButton}}
                  title="Delete notification"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔔</div>
            <h3 style={styles.emptyTitle}>No notifications</h3>
            <p style={styles.emptyText}>
              {filter === 'all' 
                ? "You're all caught up!" 
                : `No ${filter} notifications to show`
              }
            </p>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Notifications are automatically cleared after 30 days
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #eee'
  },
  title: {
    margin: 0,
    color: '#2c3e50'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  unreadCount: {
    color: '#e74c3c',
    fontWeight: 'bold'
  },
  markAllReadButton: {
    backgroundColor: 'transparent',
    border: '1px solid #3498db',
    color: '#3498db',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  filterBar: {
    display: 'flex',
    padding: '10px 20px',
    borderBottom: '1px solid #eee',
    gap: '10px',
    overflowX: 'auto'
  },
  filterButton: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    whiteSpace: 'nowrap'
  },
  filterButtonActive: {
    backgroundColor: '#3498db',
    border: '1px solid #3498db',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    whiteSpace: 'nowrap'
  },
  notificationsList: {
    maxHeight: '400px',
    overflowY: 'auto'
  },
  notificationItem: {
    display: 'flex',
    padding: '15px 20px',
    borderBottom: '1px solid #f0f0f0',
    alignItems: 'flex-start',
    transition: 'background-color 0.2s'
  },
  unreadNotification: {
    backgroundColor: '#f8fcff'
  },
  notificationIcon: {
    marginRight: '15px',
    paddingTop: '2px'
  },
  notificationContent: {
    flex: 1
  },
  notificationTitle: {
    margin: '0 0 5px 0',
    color: '#2c3e50',
    fontSize: '14px'
  },
  notificationMessage: {
    margin: '0 0 8px 0',
    color: '#7f8c8d',
    fontSize: '13px',
    lineHeight: '1.4'
  },
  notificationMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  notificationTime: {
    color: '#95a5a6',
    fontSize: '12px'
  },
  importantBadge: {
    backgroundColor: '#ffeaa7',
    color: '#d35400',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 'bold'
  },
  notificationActions: {
    display: 'flex',
    gap: '5px'
  },
  actionButton: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#7f8c8d'
  },
  deleteButton: {
    color: '#e74c3c',
    borderColor: '#e74c3c'
  },
  emptyState: {
    padding: '40px 20px',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '40px',
    marginBottom: '15px',
    opacity: 0.5
  },
  emptyTitle: {
    margin: '0 0 10px 0',
    color: '#7f8c8d'
  },
  emptyText: {
    margin: 0,
    color: '#95a5a6',
    fontSize: '14px'
  },
  footer: {
    padding: '15px 20px',
    borderTop: '1px solid #eee',
    backgroundColor: '#f8f9fa'
  },
  footerText: {
    margin: 0,
    color: '#95a5a6',
    fontSize: '12px',
    textAlign: 'center'
  }
};

export default MentorNotifications;
