import React from 'react';
import { FaBell } from 'react-icons/fa';
import '../styles/LiveNotification.css';

const NotificationBell = ({ notificationCount, onClick, hasNotifications }) => {
  return (
    <div 
      className={`notification-bell ${hasNotifications ? 'has-notifications' : ''}`}
      onClick={onClick}
    >
      <FaBell className="notification-bell-icon" />
      {notificationCount > 0 && (
        <div className="notification-count">
          {notificationCount > 99 ? '99+' : notificationCount}
        </div>
      )}
    </div>
  );
};

export default NotificationBell; 