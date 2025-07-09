import React, { useState, useMemo } from 'react';
import { 
  FaChartLine, FaClock, FaIndustry, FaShieldAlt, FaCogs, 
  FaNetworkWired, FaUserTie, FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import Dropdown from '../components/Dropdown';
import DateFilter from '../components/DateFilter';
import OperatorCard from '../components/OperatorCard';
import '../styles/OperatorsView.css';

const OperatorsView = ({ operatorsData, operatorPerformance, operatorOptions }) => {
  const [selectedOperatorId, setSelectedOperatorId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const selectedOperator = useMemo(() => {
    if (!selectedOperatorId) return null;
    return operatorsData.find(operator => operator.id === selectedOperatorId);
  }, [operatorsData, selectedOperatorId]);

  // Filter operators by date
  const filteredOperators = useMemo(() => {
    if (!startDate && !endDate) return operatorsData;
    
    const filterStartDate = startDate || '1900-01-01';
    const filterEndDate = endDate || '2100-12-31';
    
    return operatorsData.filter(operator => 
      operator.date >= filterStartDate && operator.date <= filterEndDate
    );
  }, [operatorsData, startDate, endDate]);

  return (
    <div className="view-content">
      <div className="view-header">
        <h2>Operator Management</h2>
        <p>Monitor operator performance and assignments</p>
      </div>

      <div className="dropdown-filters">
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          label="Filter by Date Range"
        />
        <Dropdown
          label="Select Operator"
          options={operatorOptions}
          value={selectedOperatorId}
          onChange={setSelectedOperatorId}
          placeholder="Choose an operator"
        />
      </div>

      {selectedOperator ? (
        // Show detailed view for selected operator
        <>
          <section className="operator-overview">
            <div className="operator-info">
              <div className="operator-avatar">
                <FaUserTie />
              </div>
              <div className="operator-details">
                <h3>{selectedOperator.name}</h3>
                <p className="operator-id">{selectedOperator.id}</p>
                <div className="operator-status">
                  <span className={`status-badge ${selectedOperator.status}`}>
                    {selectedOperator.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="stats-grid">
            <StatCard 
              title="Efficiency" 
              value={selectedOperator.efficiency} 
              unit="%" 
              icon={<FaChartLine />}
              color="#1b85b8"
              gradient={true}
              showEfficiencyInfo={true}
              efficiencyType="operator"
            />
            <StatCard 
              title="Hours Worked" 
              value={selectedOperator.hoursWorked} 
              unit=" hrs" 
              icon={<FaClock />}
              color="#2d3748"
              gradient={true}
            />
            <StatCard 
              title="Parts Produced" 
              value={selectedOperator.partsProduced} 
              unit=" parts" 
              icon={<FaIndustry />}
              color="#718096"
              gradient={true}
            />
            <StatCard 
              title="Quality Score" 
              value={selectedOperator.qualityScore} 
              unit="%" 
              icon={<FaShieldAlt />}
              color="#1b85b8"
              gradient={true}
            />
            <StatCard 
              title="Rejections" 
              value={selectedOperator.rejections} 
              unit=" parts" 
              icon={<FaTimesCircle />}
              color="#e53e3e"
              gradient={true}
            />
            <StatCard 
              title="Rejection Rate" 
              value={selectedOperator.rejectionRate} 
              unit="%" 
              icon={<FaExclamationTriangle />}
              color="#f6ad55"
              gradient={true}
            />
            <StatCard 
              title="Assigned Machines" 
              value={selectedOperator.assignedMachines} 
              unit=" machines" 
              icon={<FaCogs />}
              color="#2d3748"
              gradient={true}
            />
            <StatCard 
              title="Active Jobs" 
              value={selectedOperator.activeJobs} 
              unit=" jobs" 
              icon={<FaNetworkWired />}
              color="#718096"
              gradient={true}
            />
          </section>

          <section className="charts-section">
            <div className="chart-container">
              <h3>Operator Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={operatorPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="efficiency" fill="#1b85b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Current Tasks</h3>
              <div className="tasks-list">
                {selectedOperator.currentTasks.map((task, index) => (
                  <div key={index} className="task-item">
                    <div className="task-header">
                      <span className="task-machine">{task.machine}</span>
                      <span className="task-progress">{task.progress}%</span>
                    </div>
                    <p className="task-description">{task.task}</p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        // Show all operators in cards
        <section className="operators-grid">
          {filteredOperators.map(operator => (
            <OperatorCard 
              key={operator.id} 
              operator={operator} 
              onClick={() => setSelectedOperatorId(operator.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default OperatorsView; 