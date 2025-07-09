import React, { useState, useMemo } from 'react';
import { 
  FaPlay, FaPause, FaStop, FaExclamationTriangle, FaCheckCircle,
  FaClock, FaThermometerHalf, FaTachometerAlt, FaCog, FaUser,
  FaIndustry, FaChartLine, FaChartBar, FaExclamationCircle
} from 'react-icons/fa';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import StatCard from '../components/StatCard';
import AlertCard from '../components/AlertCard';
import MachineCard from '../components/MachineCard';
import Dropdown from '../components/Dropdown';
import DateFilter from '../components/DateFilter';
import '../styles/FloorManagerView.css';

const FloorManagerView = ({ machinesData, shopFloorData, productionTrends, COLORS }) => {
  const [selectedShift, setSelectedShift] = useState('all');
  const [selectedCell, setSelectedCell] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter machines based on selections
  const filteredMachines = useMemo(() => {
    let filtered = machinesData;
    
    if (selectedShift !== 'all') {
      filtered = filtered.filter(machine => machine.shift === selectedShift);
    }
    
    if (selectedCell) {
      filtered = filtered.filter(machine => machine.cell === selectedCell);
    }
    
    return filtered;
  }, [machinesData, selectedShift, selectedCell]);

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const running = filteredMachines.filter(m => m.status === 'running').length;
    const idle = filteredMachines.filter(m => m.status === 'idle').length;
    const error = filteredMachines.filter(m => m.status === 'error').length;
    const maintenance = filteredMachines.filter(m => m.status === 'maintenance').length;
    
    const totalProduction = filteredMachines.reduce((sum, m) => sum + m.partsProduced, 0);
    const totalRejections = filteredMachines.reduce((sum, m) => sum + m.rejections, 0);
    const avgOEE = filteredMachines.reduce((sum, m) => sum + m.oee, 0) / filteredMachines.length;
    const avgUptime = filteredMachines.reduce((sum, m) => sum + m.uptime, 0) / filteredMachines.length;
    
    return {
      running,
      idle,
      error,
      maintenance,
      totalProduction,
      totalRejections,
      avgOEE,
      avgUptime
    };
  }, [filteredMachines]);

  // Production vs Target data
  const productionVsTarget = useMemo(() => {
    const target = 300; // Daily target
    const actual = summaryMetrics.totalProduction;
    const percentage = (actual / target) * 100;
    
    return [
      { name: 'Target', value: target, fill: '#e53e3e' },
      { name: 'Actual', value: actual, fill: '#38a169' }
    ];
  }, [summaryMetrics.totalProduction]);

  // Downtime reasons
  const downtimeReasons = useMemo(() => {
    const reasons = {
      'Maintenance': 0,
      'Setup': 0,
      'Error': 0,
      'Idle': 0,
      'Tool Change': 0
    };
    
    filteredMachines.forEach(machine => {
      if (machine.status === 'maintenance') reasons['Maintenance']++;
      else if (machine.status === 'error') reasons['Error']++;
      else if (machine.status === 'idle') reasons['Idle']++;
    });
    
    return Object.entries(reasons).map(([reason, count]) => ({
      name: reason,
      value: count
    }));
  }, [filteredMachines]);

  // Shift options
  const shiftOptions = [
    { value: 'all', label: 'All Shifts' },
    { value: 'Day', label: 'Day Shift' },
    { value: 'Night', label: 'Night Shift' }
  ];

  // Cell options
  const cellOptions = [
    { value: '', label: 'All Cells' },
    { value: 'A', label: 'Cell A' },
    { value: 'B', label: 'Cell B' },
    { value: 'C', label: 'Cell C' },
    { value: 'D', label: 'Cell D' }
  ];

  return (
    <div className="view-content">
      <div className="view-header">
        <h2>Floor Manager Dashboard</h2>
        <p>Live status monitoring and production oversight</p>
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
          label="Filter by Shift"
          options={shiftOptions}
          value={selectedShift}
          onChange={setSelectedShift}
          placeholder="Select shift"
        />
        <Dropdown
          label="Filter by Cell"
          options={cellOptions}
          value={selectedCell}
          onChange={setSelectedCell}
          placeholder="Select cell"
        />

      </div>

      <section className="stats-grid">
        <StatCard 
          title="Running Machines" 
          value={summaryMetrics.running} 
          subtitle={`${filteredMachines.length} total machines`}
          icon={<FaPlay />}
          color="#38a169"
          gradient={true}
        />
        <StatCard 
          title="Idle Machines" 
          value={summaryMetrics.idle} 
          icon={<FaPause />}
          color="#f6ad55"
          gradient={true}
        />
        <StatCard 
          title="Error Machines" 
          value={summaryMetrics.error} 
          icon={<FaExclamationTriangle />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Maintenance" 
          value={summaryMetrics.maintenance} 
          icon={<FaCog />}
          color="#805ad5"
          gradient={true}
        />
        <StatCard 
          title="Total Production" 
          value={summaryMetrics.totalProduction} 
          unit=" parts" 
          icon={<FaIndustry />}
          color="#1b85b8"
          gradient={true}
        />
        <StatCard 
          title="Total Rejections" 
          value={summaryMetrics.totalRejections} 
          unit=" parts" 
          icon={<FaExclamationCircle />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Average OEE" 
          value={summaryMetrics.avgOEE.toFixed(1)} 
          unit="%" 
          icon={<FaChartLine />}
          color="#2d3748"
          gradient={true}
        />
        <StatCard 
          title="Average Uptime" 
          value={summaryMetrics.avgUptime.toFixed(1)} 
          unit="%" 
          icon={<FaClock />}
          color="#718096"
          gradient={true}
        />
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Production vs Target</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productionVsTarget}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1b85b8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Downtime Reasons</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={downtimeReasons}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {downtimeReasons.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
      <h3 style={{margin:"20px 0 20px 0"}}>Machine Status Overview</h3>
      <section className="machines-grid">
        
        <div className="machines-container">
          {filteredMachines.map((machine) => (
            <MachineCard 
              key={machine.id}
              machine={machine}
              showDetailedMetrics={true}
            />
          ))}
        </div>
      </section>

      <section className="alerts-section">
        <h3>Live Alerts</h3>
        <div className="alerts-container">
          {shopFloorData.alerts.map((alert) => (
            <AlertCard 
              key={alert.id}
              alert={alert}
              showMachineInfo={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FloorManagerView; 