import React from 'react';
import { 
  FaThermometerHalf, FaTachometerAlt, FaCog, FaClock, 
  FaChartLine, FaIndustry, FaTimesCircle, FaExclamationTriangle,
  FaTools, FaFileAlt, FaBolt, FaWrench, FaPlay, FaPause, FaStop,
  FaThermometerHalf as FaThermometer, FaTachometerAlt as FaTachometer
} from 'react-icons/fa';
import StatCard from './StatCard';
import '../styles/MachineCard.css';

const MachineCard = ({ machine, onClick, showDetailedMetrics = false }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <FaPlay />;
      case 'idle':
        return <FaPause />;
      case 'error':
      case 'stopped':
        return <FaStop />;
      case 'maintenance':
        return <FaWrench />;
      default:
        return <FaCog />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return '#00ff00';
      case 'idle':
        return '#ffa500';
      case 'error':
      case 'stopped':
        return '#ff6b6b';
      case 'maintenance':
        return '#00ffff';
      case 'setup':
        return '#ff00ff';
      default:
        return '#808080';
    }
  };

  return (
    <div className="machine-card" onClick={() => onClick && onClick(machine)}>
      <div className="machine-header">
        <h3>{machine.name}</h3>
        <div className="machine-status">
          <span 
            className={`status-badge ${machine.status}`}
            style={{ backgroundColor: getStatusColor(machine.status) }}
          >
            {getStatusIcon(machine.status)}
            {machine.status.toUpperCase()}
          </span>
          <span className="machine-id">{machine.id}</span>
        </div>
      </div>
      
      <div className="machine-details">
        <p>Operator: {machine.operator}</p>
        <p>Cell: {machine.cell}</p>
        {showDetailedMetrics && (
          <>
            <p>Program: {machine.programName || 'N/A'}</p>
            <p>Tool: #{machine.toolNumber || 'N/A'}</p>
          </>
        )}
      </div>

      <div className="machine-stats">
        <div className="stat-row">
          <StatCard 
            title="Temperature" 
            value={machine.temperature.toFixed(1)} 
            unit="°C" 
            icon={<FaThermometerHalf />}
            color="#00ffff"
            gradient={true}
          />
          <StatCard 
            title="Spindle Speed" 
            value={machine.spindleSpeed} 
            unit=" RPM" 
            icon={<FaTachometerAlt />}
            color="#ff00ff"
            gradient={true}
          />
        </div>
        
        <div className="stat-row">
          <StatCard 
            title="Job Progress" 
            value={machine.jobProgress.toFixed(1)} 
            unit="%" 
            icon={<FaClock />}
            color="#00ffff"
            gradient={true}
          />
          <StatCard 
            title="Efficiency" 
            value={machine.efficiency} 
            unit="%" 
            icon={<FaChartLine />}
            color="#ff00ff"
            gradient={true}
          />
        </div>

        <div className="stat-row">
          <StatCard 
            title="Parts Produced" 
            value={machine.partsProduced} 
            unit=" parts" 
            icon={<FaIndustry />}
            color="#00ff00"
            gradient={true}
          />
          <StatCard 
            title="Rejections" 
            value={machine.rejections} 
            unit=" parts" 
            icon={<FaTimesCircle />}
            color="#ff6b6b"
            gradient={true}
          />
        </div>

        <div className="stat-row">
          <StatCard 
            title="Rejection Rate" 
            value={machine.rejectionRate} 
            unit="%" 
            icon={<FaExclamationTriangle />}
            color="#ffa500"
            gradient={true}
          />
          <StatCard 
            title="Uptime" 
            value={machine.uptime} 
            unit="%" 
            icon={<FaCog />}
            color="#00ff00"
            gradient={true}
          />
        </div>

        {showDetailedMetrics && (
          <>
            <div className="stat-row">
              <StatCard 
                title="OEE" 
                value={machine.oee} 
                unit="%" 
                icon={<FaChartLine />}
                color="#00ffff"
                gradient={true}
              />
              <StatCard 
                title="Spindle Load" 
                value={machine.spindleLoad} 
                unit="%" 
                icon={<FaTachometerAlt />}
                color="#ff00ff"
                gradient={true}
              />
            </div>

            <div className="stat-row">
              <StatCard 
                title="Cycle Time" 
                value={machine.cycleTime} 
                unit=" min" 
                icon={<FaClock />}
                color="#ffa500"
                gradient={true}
              />
              <StatCard 
                title="Idle Time" 
                value={machine.idleTime} 
                unit=" min" 
                icon={<FaPause />}
                color="#00ff00"
                gradient={true}
              />
            </div>

            <div className="stat-row">
              <StatCard 
                title="MTTR" 
                value={machine.mttr} 
                unit=" min" 
                icon={<FaWrench />}
                color="#ff00ff"
                gradient={true}
              />
              <StatCard 
                title="MTBF" 
                value={machine.mtbf} 
                unit=" min" 
                icon={<FaBolt />}
                color="#00ff00"
                gradient={true}
              />
            </div>

            <div className="stat-row">
              <StatCard 
                title="Availability" 
                value={machine.availability} 
                unit="%" 
                icon={<FaPlay />}
                color="#00ffff"
                gradient={true}
              />
              <StatCard 
                title="Performance" 
                value={machine.performance} 
                unit="%" 
                icon={<FaTachometerAlt />}
                color="#ff00ff"
                gradient={true}
              />
            </div>

            <div className="stat-row">
              <StatCard 
                title="Quality" 
                value={machine.quality} 
                unit="%" 
                icon={<FaChartLine />}
                color="#00ff00"
                gradient={true}
              />
              <StatCard 
                title="Feed Rate" 
                value={machine.feedRate} 
                unit=" mm/min" 
                icon={<FaCog />}
                color="#ffa500"
                gradient={true}
              />
            </div>
          </>
        )}
      </div>

      {showDetailedMetrics && machine.alarms && machine.alarms.length > 0 && (
        <div className="machine-alerts">
          <h4>Alerts</h4>
          {machine.alarms.map((alarm, index) => (
            <div key={index} className={`alert-item ${alarm.type}`}>
              <span className="alert-message">{alarm.message}</span>
              <span className="alert-time">{alarm.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MachineCard; 