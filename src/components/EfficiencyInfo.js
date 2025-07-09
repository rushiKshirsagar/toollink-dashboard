import React, { useState } from 'react';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
import '../styles/EfficiencyInfo.css';

const EfficiencyInfo = ({ type = "general" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getEfficiencyFormula = () => {
    switch (type) {
      case "machine":
        return "Machine Efficiency = (Actual Output / Maximum Possible Output) × 100%";
      case "operator":
        return "Operator Efficiency = (Actual Production / Target Production) × 100%";
      case "cell":
        return "Cell Efficiency = (Total Cell Output / Total Cell Capacity) × 100%";
      default:
        return "Overall Efficiency = (Total Production / Total Capacity) × 100%";
    }
  };

  const getEfficiencyFactors = () => {
    switch (type) {
      case "machine":
        return [
          "Uptime percentage",
          "Production speed vs. maximum speed",
          "Quality rate",
          "Maintenance downtime"
        ];
      case "operator":
        return [
          "Production targets met",
          "Quality standards maintained",
          "Time efficiency",
          "Skill level utilization"
        ];
      case "cell":
        return [
          "Machine utilization rates",
          "Operator efficiency",
          "Material flow",
          "Quality control"
        ];
      default:
        return [
          "Machine uptime",
          "Operator productivity",
          "Quality rates",
          "Production targets"
        ];
    }
  };

  return (
    <div className="efficiency-info-container">
      <FaInfoCircle 
        className="efficiency-info-icon"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      
      {showTooltip && (
        <div className="efficiency-tooltip">
          <div className="tooltip-header">
            <h4>Efficiency Calculation</h4>
            <FaTimes 
              className="tooltip-close"
              onClick={() => setShowTooltip(false)}
            />
          </div>
          <div className="tooltip-content">
            <p className="formula">{getEfficiencyFormula()}</p>
            <div className="factors">
              <h5>Key Factors:</h5>
              <ul>
                {getEfficiencyFactors().map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EfficiencyInfo; 