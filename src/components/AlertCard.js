import React from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaCog, FaThermometerHalf, FaClock, FaIndustry, FaBell } from 'react-icons/fa';
import '../styles/AlertCard.css';

const AlertCard = ({ type, message, time, priority, title, isLive, timestamp, ...props }) => {
  const getIcon = () => {
    if (isLive && props.type) {
      switch (props.type) {
        case 'machine_down':
          return <FaIndustry className="alert-icon machine-down" />;
        case 'measurement_threshold':
          return <FaThermometerHalf className="alert-icon measurement" />;
        case 'cycle_time':
          return <FaClock className="alert-icon cycle-time" />;
        case 'maintenance':
          return <FaCog className="alert-icon maintenance" />;
        default:
          return <FaExclamationTriangle className="alert-icon default" />;
      }
    }
    
    switch (type) {
      case 'warning':
        return <FaExclamationTriangle className="alert-icon warning" />;
      case 'success':
        return <FaCheckCircle className="alert-icon success" />;
      default:
        return <FaInfoCircle className="alert-icon info" />;
    }
  };

  const getPriorityClass = () => {
    if (isLive && priority) {
      return priority;
    }
    return type || 'info';
  };

  const formatTime = () => {
    if (isLive && timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString();
    }
    return time || 'Now';
  };

  const displayMessage = () => {
    if (isLive && title) {
      return (
        <div className="alert-content">
          <h4 className="alert-title">{title}</h4>
          <p className="alert-message">{message}</p>
          <span className="alert-time">{formatTime()}</span>
          {isLive && <span className="live-indicator">LIVE</span>}
        </div>
      );
    }
    
    return (
      <div className="alert-content">
        <p className="alert-message">{message}</p>
        <span className="alert-time">{formatTime()}</span>
      </div>
    );
  };

  return (
    <div className={`alert-card ${getPriorityClass()} ${isLive ? 'live-alert' : ''}`}>
      <div className="alert-icon">
        {getIcon()}
      </div>
      {displayMessage()}
      <div className="alert-glow"></div>
    </div>
  );
};

export default AlertCard; 