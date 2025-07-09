import React from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import '../styles/AlertCard.css';

const AlertCard = ({ type, message, time }) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <FaExclamationTriangle />;
      case 'success':
        return <FaCheckCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <div className={`alert-card ${type}`}>
      <div className="alert-icon">
        {getIcon()}
      </div>
      <div className="alert-content">
        <p>{message}</p>
        <span className="alert-time">{time}</span>
      </div>
      <div className="alert-glow"></div>
    </div>
  );
};

export default AlertCard; 