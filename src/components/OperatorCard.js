import React from 'react';
import { 
  FaChartLine, FaClock, FaIndustry, FaShieldAlt, FaCogs, 
  FaNetworkWired, FaUserTie, FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import StatCard from './StatCard';
import '../styles/OperatorCard.css';

const OperatorCard = ({ operator, onClick }) => (
  <div className="operator-card" onClick={() => onClick(operator)}>
    <div className="operator-header">
      <div className="operator-avatar">
        <FaUserTie />
      </div>
      <div className="operator-info">
        <h3>{operator.name}</h3>
        <p className="operator-id">{operator.id}</p>
        <span className={`status-badge ${operator.status}`}>
          {operator.status.toUpperCase()}
        </span>
      </div>
    </div>

    <div className="operator-stats">
      <div className="stat-row">
        <StatCard 
          title="Efficiency" 
          value={operator.efficiency} 
          unit="%" 
          icon={<FaChartLine />}
          color="#00ffff"
        />
        <StatCard 
          title="Hours Worked" 
          value={operator.hoursWorked} 
          unit=" hrs" 
          icon={<FaClock />}
          color="#ff00ff"
        />
      </div>
      
      <div className="stat-row">
        <StatCard 
          title="Parts Produced" 
          value={operator.partsProduced} 
          unit=" parts" 
          icon={<FaIndustry />}
          color="#00ff00"
        />
        <StatCard 
          title="Quality Score" 
          value={operator.qualityScore} 
          unit="%" 
          icon={<FaShieldAlt />}
          color="#00ffff"
        />
      </div>

      <div className="stat-row">
        <StatCard 
          title="Rejections" 
          value={operator.rejections} 
          unit=" parts" 
          icon={<FaTimesCircle />}
          color="#ff6b6b"
        />
        <StatCard 
          title="Rejection Rate" 
          value={operator.rejectionRate} 
          unit="%" 
          icon={<FaExclamationTriangle />}
          color="#ffa500"
        />
      </div>

      <div className="stat-row">
        <StatCard 
          title="Assigned Machines" 
          value={operator.assignedMachines} 
          unit=" machines" 
          icon={<FaCogs />}
          color="#00ffff"
        />
        <StatCard 
          title="Active Jobs" 
          value={operator.activeJobs} 
          unit=" jobs" 
          icon={<FaNetworkWired />}
          color="#ff00ff"
        />
      </div>
    </div>

    <div className="operator-tasks">
      <h4>Current Tasks ({operator.currentTasks.length})</h4>
      <div className="tasks-list">
        {operator.currentTasks.slice(0, 2).map((task, index) => (
          <div key={index} className="task-item">
            <span className="task-machine">{task.machine}</span>
            <span className="task-progress">{task.progress}%</span>
          </div>
        ))}
        {operator.currentTasks.length > 2 && (
          <div className="more-tasks">+{operator.currentTasks.length - 2} more</div>
        )}
      </div>
    </div>
  </div>
);

export default OperatorCard; 