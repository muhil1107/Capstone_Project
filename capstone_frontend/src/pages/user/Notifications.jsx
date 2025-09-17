import React, { useState } from 'react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Update',
      message: 'Your application for Frontend Developer at TechCorp has been reviewed.',
      time: '2 hours ago',
      read: false,
      important: true
    },
    {
      id: 2,
      type: 'course',
      title: 'New Course Available',
      message: 'A new course "Advanced React Patterns" is now available for enrollment.',
      time: '5 hours ago',
      read: false,
      important: false
    },
    {
      id: 3,
      type: 'mentor',
      title: 'Mentor Session Reminder',
      message: 'Your session with Dr. Sarah Johnson is scheduled for tomorrow at 3 PM.',
      time: '1 day ago',
      read: true,
      important: true
    },
    {
      id: 4,
      type: 'challenge',
      title: 'Weekly Challenge',
      message: 'The new weekly challenge "Build a React Todo App" is now live.',
      time: '2 days ago',
      read: true,
      important: false
    },
    {
      id: 5,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance this weekend. The platform will be unavailable for 2 hours.',
      time: '3 days ago',
      read: true,
      important: false
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({...notification, read: true})));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    return activeTab === 'all' || 
           (activeTab === 'unread' && !notification.read) ||
           (activeTab === 'important' && notification.important);
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Notifications</h2>
        <div style={headerActionsStyle}>
          <span style={unreadCountStyle}>{unreadCount} unread</span>
          <button style={markAllButtonStyle} onClick={markAllAsRead}>
            Mark all as read
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={tabsStyle}>
        <button 
          style={{...tabStyle, ...(activeTab === 'all' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('all')}
        >
          All Notifications
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'unread' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('unread')}
        >
          Unread
        </button>
        <button 
          style={{...tabStyle, ...(activeTab === 'important' ? activeTabStyle : {})}}
          onClick={() => setActiveTab('important')}
        >
          Important
        </button>
      </div>

      {/* Notifications List */}
      <div style={notificationsListStyle}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              style={{
                ...notificationItemStyle,
                ...(!notification.read ? unreadNotificationStyle : {})
              }}
            >
              <div style={notificationContentStyle}>
                <div style={notificationHeaderStyle}>
                  <h3 style={notificationTitleStyle}>{notification.title}</h3>
                  {notification.important && <span style={importantBadgeStyle}>Important</span>}
                </div>
                <p style={notificationMessageStyle}>{notification.message}</p>
                <div style={notificationFooterStyle}>
                  <span style={notificationTimeStyle}>{notification.time}</span>
                  <span style={notificationTypeStyle}>{notification.type}</span>
                </div>
              </div>
              <div style={notificationActionsStyle}>
                {!notification.read && (
                  <button 
                    style={markReadButtonStyle}
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </button>
                )}
                <button 
                  style={deleteButtonStyle}
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={emptyStateStyle}>
            <p style={emptyStateTextStyle}>No notifications found</p>
          </div>
        )}
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

const headerActionsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const unreadCountStyle = {
  color: '#e74c3c',
  fontWeight: 'bold'
};

const markAllButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
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

const notificationsListStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflow: 'hidden'
};

const notificationItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem',
  borderBottom: '1px solid #f5f5f5'
};

const unreadNotificationStyle = {
  backgroundColor: '#f8f9fa',
  borderLeft: '4px solid #3498db'
};

const notificationContentStyle = {
  flex: 1
};

const notificationHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.5rem'
};

const notificationTitleStyle = {
  margin: 0,
  color: '#2c3e50'
};

const importantBadgeStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#e74c3c',
  color: 'white',
  borderRadius: '4px',
  fontSize: '0.7rem',
  fontWeight: 'bold'
};

const notificationMessageStyle = {
  margin: '0 0 0.5rem 0',
  color: '#7f8c8d'
};

const notificationFooterStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const notificationTimeStyle = {
  fontSize: '0.8rem',
  color: '#95a5a6'
};

const notificationTypeStyle = {
  fontSize: '0.8rem',
  color: '#3498db',
  backgroundColor: '#e8f4fc',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px'
};

const notificationActionsStyle = {
  display: 'flex',
  gap: '0.5rem'
};

const markReadButtonStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem'
};

const deleteButtonStyle = {
  padding: '0.25rem 0.5rem',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem'
};

const emptyStateStyle = {
  padding: '3rem',
  textAlign: 'center'
};

const emptyStateTextStyle = {
  margin: 0,
  color: '#7f8c8d'
};

export default Notifications;