import React from 'react';
import EfficiencyInfo from './EfficiencyInfo';
import '../styles/StatCard.css';

const StatCard = ({ title, value, unit, icon, color = '#1b85b8', gradient = false, subtitle = null, showEfficiencyInfo = false, efficiencyType = "general" }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ color }}>
      {icon}
    </div>
    <div className="stat-content">
      <div className="stat-header">
        <h5>{title}</h5>
        
      </div>
      <p className={`stat-value ${gradient ? 'gradient-text' : ''}`}>
        {value}{unit}
      </p>
      {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      <div className="stat-glow"></div>
    </div>
    {/* {showEfficiencyInfo && <EfficiencyInfo type={efficiencyType} />} */}
  </div>
);

export default StatCard; 