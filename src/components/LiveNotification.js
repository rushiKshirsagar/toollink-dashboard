import React, { useState, useEffect } from 'react';
import { FaBell, FaExclamationTriangle, FaCog, FaThermometerHalf, FaClock, FaIndustry } from 'react-icons/fa';
import '../styles/LiveNotification.css';

const LiveNotification = ({ notifications, onDismiss }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    if (notifications.length > 0) {
      const newNotification = notifications[notifications.length - 1];
      setVisibleNotifications(prev => [...prev, { ...newNotification, id: Date.now() + Math.random() }]);
    }
  }, [notifications]);

  useEffect(() => {
    const timers = visibleNotifications.map(notification => {
      return setTimeout(() => {
        setVisibleNotifications(prev => prev.filter(n => n.id !== notification.id));
        onDismiss(notification.id);
      }, 10000); // 10 seconds
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [visibleNotifications, onDismiss]);

  const getIcon = (type) => {
    switch (type) {
      case 'machine_down':
        return <FaIndustry className="notification-icon machine-down" />;
      case 'measurement_threshold':
        return <FaThermometerHalf className="notification-icon measurement" />;
      case 'cycle_time':
        return <FaClock className="notification-icon cycle-time" />;
      case 'maintenance':
        return <FaCog className="notification-icon maintenance" />;
      default:
        return <FaExclamationTriangle className="notification-icon default" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'rgba(220, 38, 38, 0.9)';
      case 'warning':
        return 'rgba(245, 158, 11, 0.9)';
      case 'info':
        return 'rgba(59, 130, 246, 0.9)';
      default:
        return 'rgba(107, 114, 128, 0.9)';
    }
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="live-notifications-container">
      {visibleNotifications.map((notification, index) => (
        <div
          key={notification.id}
          className="live-notification"
          style={{
            backgroundColor: getPriorityColor(notification.priority),
            transform: `translateY(${index * 90}px)`,
            zIndex: 1000 - index
          }}
        >
          <div className="notification-content">
            <div className="notification-icon-container">
              {getIcon(notification.type)}
            </div>
            <div className="notification-text">
              <div className="notification-title">{notification.title}</div>
              <div className="notification-message">{notification.message}</div>
            </div>
          </div>
          <div className="notification-progress">
            <div className="progress-bar" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveNotification; 