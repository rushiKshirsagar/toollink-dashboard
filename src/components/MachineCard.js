import React from 'react';
import { 
  FaThermometerHalf, FaTachometerAlt, FaCog, FaClock, 
  FaChartLine, FaIndustry, FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import StatCard from './StatCard';
import '../styles/MachineCard.css';

const MachineCard = ({ machine, onClick }) => (
  <div className="machine-card" onClick={() => onClick(machine)}>
    <div className="machine-header">
      <h3>{machine.name}</h3>
      <div className="machine-status">
        <span className={`status-badge ${machine.status}`}>
          {machine.status.toUpperCase()}
        </span>
        <span className="machine-id">{machine.id}</span>
      </div>
    </div>
    
    <div className="machine-details">
      <p>Operator: {machine.operator}</p>
      <p>Cell: {machine.cell}</p>
    </div>

    <div className="machine-stats">
      <div className="stat-row">
        <StatCard 
          title="Temperature" 
          value={machine.temperature.toFixed(1)} 
          unit="°C" 
          icon={<FaThermometerHalf />}
          color="#1b85b8"
          gradient={true}
        />
        <StatCard 
          title="Spindle Speed" 
          value={machine.spindleSpeed} 
          unit=" RPM" 
          icon={<FaTachometerAlt />}
          color="#2d3748"
          gradient={true}
        />
      </div>
      
      <div className="stat-row">
        <StatCard 
          title="Job Progress" 
          value={machine.jobProgress.toFixed(1)} 
          unit="%" 
          icon={<FaClock />}
          color="#1b85b8"
          gradient={true}
        />
        <StatCard 
          title="Efficiency" 
          value={machine.efficiency} 
          unit="%" 
          icon={<FaChartLine />}
          color="#2d3748"
          gradient={true}
        />
      </div>

      <div className="stat-row">
        <StatCard 
          title="Parts Produced" 
          value={machine.partsProduced} 
          unit=" parts" 
          icon={<FaIndustry />}
          color="#718096"
          gradient={true}
        />
        <StatCard 
          title="Rejections" 
          value={machine.rejections} 
          unit=" parts" 
          icon={<FaTimesCircle />}
          color="#e53e3e"
          gradient={true}
        />
      </div>

      <div className="stat-row">
        <StatCard 
          title="Rejection Rate" 
          value={machine.rejectionRate} 
          unit="%" 
          icon={<FaExclamationTriangle />}
          color="#f6ad55"
          gradient={true}
        />
        <StatCard 
          title="Uptime" 
          value={machine.uptime} 
          unit="%" 
          icon={<FaCog />}
          color="#68d391"
          gradient={true}
        />
      </div>
    </div>
  </div>
);

export default MachineCard; 