import React, { useState, useMemo } from 'react';
import { 
  FaThermometerHalf, FaTachometerAlt, FaCog, FaClock, 
  FaChartLine, FaIndustry, FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer
} from 'recharts';
import StatCard from '../components/StatCard';
import AlertCard from '../components/AlertCard';
import Dropdown from '../components/Dropdown';
import DateFilter from '../components/DateFilter';
import MachineCard from '../components/MachineCard';
import '../styles/MachineView.css';

const MachineView = ({ machinesData, machineOptions }) => {
  const [selectedMachineId, setSelectedMachineId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const selectedMachine = useMemo(() => {
    if (!selectedMachineId) return null;
    return machinesData.find(machine => machine.id === selectedMachineId);
  }, [machinesData, selectedMachineId]);

  // Filter machines by date
  const filteredMachines = useMemo(() => {
    if (!startDate && !endDate) return machinesData;
    
    const filterStartDate = startDate || '1900-01-01';
    const filterEndDate = endDate || '2100-12-31';
    
    return machinesData.filter(machine => 
      machine.date >= filterStartDate && machine.date <= filterEndDate
    );
  }, [machinesData, startDate, endDate]);

  return (
    <div className="view-content">
      <div className="view-header">
        <h2>Machine Details</h2>
        <p>Real-time monitoring of manufacturing machines</p>
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
          label="Select Machine"
          options={machineOptions}
          value={selectedMachineId}
          onChange={setSelectedMachineId}
          placeholder="Choose a machine"
        />
      </div>

      {selectedMachine ? (
        // Show detailed view for selected machine
        <>
          <section className="machine-overview">
            <div className="machine-info">
              <h3>{selectedMachine.name}</h3>
              <div className="machine-status">
                <span className={`status-badge ${selectedMachine.status}`}>
                  {selectedMachine.status.toUpperCase()}
                </span>
                <span className="machine-id">{selectedMachine.id}</span>
              </div>
              <p className="machine-details">
                Operator: {selectedMachine.operator} | Cell: {selectedMachine.cell}
              </p>
            </div>
          </section>

          <section className="stats-grid">
            <StatCard 
              title="Temperature" 
              value={selectedMachine.temperature.toFixed(1)} 
              unit="°C" 
              icon={<FaThermometerHalf />}
              color="#1b85b8"
              gradient={true}
            />
            <StatCard 
              title="Spindle Speed" 
              value={selectedMachine.spindleSpeed} 
              unit=" RPM" 
              icon={<FaTachometerAlt />}
              color="#2d3748"
              gradient={true}
            />
            <StatCard 
              title="Feed Rate" 
              value={selectedMachine.feedRate} 
              unit=" mm/min" 
              icon={<FaCog />}
              color="#718096"
              gradient={true}
            />
            <StatCard 
              title="Job Progress" 
              value={selectedMachine.jobProgress.toFixed(1)} 
              unit="%" 
              icon={<FaClock />}
              color="#1b85b8"
              gradient={true}
            />
            <StatCard 
              title="Efficiency" 
              value={selectedMachine.efficiency} 
              unit="%" 
              icon={<FaChartLine />}
              color="#2d3748"
              gradient={true}
              showEfficiencyInfo={true}
              efficiencyType="machine"
            />
            <StatCard 
              title="Parts Produced" 
              value={selectedMachine.partsProduced} 
              unit=" parts" 
              icon={<FaIndustry />}
              color="#718096"
              gradient={true}
            />
            <StatCard 
              title="Rejections" 
              value={selectedMachine.rejections} 
              unit=" parts" 
              icon={<FaTimesCircle />}
              color="#e53e3e"
              gradient={true}
            />
            <StatCard 
              title="Rejection Rate" 
              value={selectedMachine.rejectionRate} 
              unit="%" 
              icon={<FaExclamationTriangle />}
              color="#f6ad55"
              gradient={true}
            />
            <StatCard 
              title="Uptime" 
              value={selectedMachine.uptime} 
              unit="%" 
              icon={<FaCog />}
              color="#68d391"
              gradient={true}
            />
          </section>

          <section className="charts-section">
            <div className="chart-container">
              <h3>Machine Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={[
                  { metric: 'Efficiency', value: selectedMachine.efficiency },
                  { metric: 'Uptime', value: selectedMachine.uptime },
                  { metric: 'Quality', value: 100 - selectedMachine.rejectionRate },
                  { metric: 'Speed', value: 88 },
                  { metric: 'Accuracy', value: 94 }
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis />
                  <Radar dataKey="value" stroke="#1b85b8" fill="#1b85b8" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Machine Alerts</h3>
              <div className="alerts-list">
                {selectedMachine.alerts.map((alert, index) => (
                  <AlertCard key={index} {...alert} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        // Show all machines in cards
        <section className="machines-grid">
          {filteredMachines.map(machine => (
            <MachineCard 
              key={machine.id} 
              machine={machine} 
              onClick={() => setSelectedMachineId(machine.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default MachineView; 