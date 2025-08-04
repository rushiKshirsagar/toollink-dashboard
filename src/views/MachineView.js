import React, { useState, useMemo } from 'react';
import { 
  FaThermometerHalf, FaTachometerAlt, FaCog, FaClock, 
  FaChartLine, FaIndustry, FaTimesCircle, FaExclamationTriangle,
  FaShieldAlt, FaBolt, FaTools, FaPlay, FaPause, FaStop
} from 'react-icons/fa';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell
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
    const machine = machinesData.find(machine => machine.id === selectedMachineId);
    return machine || null;
  }, [machinesData, selectedMachineId]);

  // Enhanced OEE data for selected machine
  const oeeData = selectedMachine ? [
    { name: 'Availability', value: selectedMachine.availability || 0, target: 95 },
    { name: 'Performance', value: selectedMachine.performance || 0, target: 90 },
    { name: 'Quality', value: selectedMachine.quality || 0, target: 95 },
    { name: 'Overall OEE', value: selectedMachine.oee || 0, target: 85 }
  ] : [];

  // Performance trends over time (simulated data)
  const performanceTrends = selectedMachine ? [
    { hour: '00:00', efficiency: (selectedMachine.efficiency || 0) * 0.95, temperature: (selectedMachine.temperature || 0) * 0.98 },
    { hour: '04:00', efficiency: (selectedMachine.efficiency || 0) * 0.97, temperature: (selectedMachine.temperature || 0) * 0.99 },
    { hour: '08:00', efficiency: selectedMachine.efficiency || 0, temperature: selectedMachine.temperature || 0 },
    { hour: '12:00', efficiency: (selectedMachine.efficiency || 0) * 0.98, temperature: (selectedMachine.temperature || 0) * 1.02 },
    { hour: '16:00', efficiency: (selectedMachine.efficiency || 0) * 0.96, temperature: (selectedMachine.temperature || 0) * 1.01 },
    { hour: '20:00', efficiency: (selectedMachine.efficiency || 0) * 0.94, temperature: (selectedMachine.temperature || 0) * 0.97 }
  ] : [];

  // Machine status distribution
  const statusDistribution = useMemo(() => {
    const statuses = machinesData.reduce((acc, machine) => {
      if (machine && machine.status) {
        acc[machine.status] = (acc[machine.status] || 0) + 1;
      }
      return acc;
    }, {});
    
    return Object.entries(statuses).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));
  }, [machinesData]);

  // Quality metrics for selected machine
  const qualityMetrics = selectedMachine ? [
    { name: 'Excellent', value: 100 - (selectedMachine.rejectionRate || 0) - 5, color: '#00ff00' },
    { name: 'Good', value: 3, color: '#ffa500' },
    { name: 'Acceptable', value: 2, color: '#ff6b6b' },
    { name: 'Rejected', value: selectedMachine.rejectionRate || 0, color: '#ff0000' }
  ] : [];

  // Filter machines by date
  const filteredMachines = useMemo(() => {
    if (!startDate && !endDate) return machinesData;
    
    const filterStartDate = startDate || '1900-01-01';
    const filterEndDate = endDate || '2100-12-31';
    
    return machinesData.filter(machine => 
      machine && machine.date && machine.date >= filterStartDate && machine.date <= filterEndDate
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
              <h3>{selectedMachine.name || 'Unknown Machine'}</h3>
              <div className="machine-status">
                <span className={`status-badge ${selectedMachine.status || 'unknown'}`}>
                  {(selectedMachine.status || 'unknown').toUpperCase()}
                </span>
                <span className="machine-id">{selectedMachine.id || 'N/A'}</span>
              </div>
              <p className="machine-details">
                Operator: {selectedMachine.operator || 'N/A'} | Cell: {selectedMachine.cell || 'N/A'}
              </p>
            </div>
          </section>

          <section className="stats-grid">
            <StatCard 
              title="Temperature" 
              value={(selectedMachine.temperature || 0).toFixed(1)} 
              unit="°C" 
              icon={<FaThermometerHalf />}
              color="#00ffff"
            />
            <StatCard 
              title="Spindle Speed" 
              value={selectedMachine.spindleSpeed || 0} 
              unit=" RPM" 
              icon={<FaTachometerAlt />}
              color="#ff00ff"
            />
            <StatCard 
              title="Feed Rate" 
              value={selectedMachine.feedRate || 0} 
              unit=" mm/min" 
              icon={<FaCog />}
              color="#00ff00"
            />
            <StatCard 
              title="Job Progress" 
              value={(selectedMachine.jobProgress || 0).toFixed(1)} 
              unit="%" 
              icon={<FaClock />}
              color="#00ffff"
            />
            <StatCard 
              title="Efficiency" 
              value={selectedMachine.efficiency || 0} 
              unit="%" 
              icon={<FaChartLine />}
              color="#ff00ff"
              showEfficiencyInfo={true}
              efficiencyType="machine"
            />
            <StatCard 
              title="Parts Produced" 
              value={selectedMachine.partsProduced || 0} 
              unit=" parts" 
              icon={<FaIndustry />}
              color="#00ff00"
            />
            <StatCard 
              title="Rejections" 
              value={selectedMachine.rejections || 0} 
              unit=" parts" 
              icon={<FaTimesCircle />}
              color="#ff6b6b"
            />
            <StatCard 
              title="Rejection Rate" 
              value={selectedMachine.rejectionRate || 0} 
              unit="%" 
              icon={<FaExclamationTriangle />}
              color="#ffa500"
            />
            <StatCard 
              title="Uptime" 
              value={selectedMachine.uptime || 0} 
              unit="%" 
              icon={<FaCog />}
              color="#00ff00"
            />
            <StatCard 
              title="OEE" 
              value={selectedMachine.oee || 0} 
              unit="%" 
              icon={<FaShieldAlt />}
              color="#00ffff"
            />
            <StatCard 
              title="Cycle Time" 
              value={selectedMachine.cycleTime || 0} 
              unit=" min" 
              icon={<FaClock />}
              color="#ff00ff"
            />
            <StatCard 
              title="MTTR" 
              value={selectedMachine.mttr || 0} 
              unit=" min" 
              icon={<FaTools />}
              color="#ff6b6b"
            />
            <StatCard 
              title="MTBF" 
              value={selectedMachine.mtbf || 0} 
              unit=" hrs" 
              icon={<FaBolt />}
              color="#ffa500"
            />
            <StatCard 
              title="Spindle Load" 
              value={selectedMachine.spindleLoad || 0} 
              unit="%" 
              icon={<FaTachometerAlt />}
              color="#00ff00"
            />
          </section>

          <section className="charts-section">
            <div className="chart-container">
              <h3>OEE Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={oeeData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#b0b0b0' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#b0b0b0' }} />
                  <Radar
                    name="Current"
                    dataKey="value"
                    stroke="#00ffff"
                    fill="#00ffff"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke="#ff00ff"
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Performance Trends (24h)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="hour" stroke="#b0b0b0" />
                  <YAxis stroke="#b0b0b0" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#00ffff" 
                    strokeWidth={3}
                    name="Efficiency (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#ff00ff" 
                    strokeWidth={3}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Quality Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={qualityMetrics}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {qualityMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Machine Alerts</h3>
              <div className="alerts-list">
                {(selectedMachine.alerts || []).map((alert, index) => (
                  <AlertCard key={index} {...alert} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        // Show all machines overview
        <>
          <section className="overview-stats">
            <div className="chart-container">
              <h3>Machine Status Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#00ffff', '#ff00ff', '#00ff00', '#ffa500', '#ff6b6b'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h3>Overall Machine Performance</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={filteredMachines.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="id" stroke="#b0b0b0" />
                  <YAxis stroke="#b0b0b0" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(0,255,255,0.3)',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Bar dataKey="efficiency" fill="#00ffff" fillOpacity={0.7} name="Efficiency (%)" />
                  <Bar dataKey="oee" fill="#ff00ff" fillOpacity={0.7} name="OEE (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="machines-grid">
            {filteredMachines.map(machine => (
              <MachineCard 
                key={machine.id} 
                machine={machine} 
                onClick={() => setSelectedMachineId(machine.id)}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default MachineView; 