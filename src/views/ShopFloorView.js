import React, { useState, useMemo, useEffect } from 'react';
import { 
  FaIndustry, FaUsers, FaChartBar, FaExclamationTriangle, 
  FaCheckCircle, FaTimesCircle, FaEye, FaUser, FaFileAlt, 
  FaTachometerAlt, FaThermometerHalf, FaBell
} from 'react-icons/fa';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ComposedChart, Line
} from 'recharts';
import StatCard from '../components/StatCard';
import AlertCard from '../components/AlertCard';
import Dropdown from '../components/Dropdown';
import DateFilter from '../components/DateFilter';
import notificationService from '../services/notificationService';
import { machinesData } from '../data/mockData';
import '../styles/ShopFloorView.css';

// Custom tooltip component for dark theme
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '12px',
        color: '#ffffff'
      }}>
        <p style={{ margin: '0 0 8px 0', color: '#b0b0b0' }}>{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ 
            margin: '4px 0', 
            color: entry.color,
            fontSize: '14px'
          }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ShopFloorView = ({ shopFloorData, productionTrends, qualityMetrics, COLORS, cellOptions, operatorOptions }) => {
  const [selectedCell, setSelectedCell] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [liveNotifications, setLiveNotifications] = useState([]);

  // Subscribe to live notifications
  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notifications) => {
      setLiveNotifications(notifications);
    });

    return unsubscribe;
  }, []);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let filteredMachines = machinesData;
    let filteredAlerts = shopFloorData.alerts || [];
    
    if (selectedCell) {
      filteredMachines = machinesData.filter(machine => machine.cell === selectedCell);
      filteredAlerts = filteredAlerts.filter(alert => alert.cell === selectedCell);
    }
    
    if (selectedOperator) {
      filteredMachines = filteredMachines.filter(machine => machine.operator === selectedOperator);
      filteredAlerts = filteredAlerts.filter(alert => alert.operator === selectedOperator);
    }
    
    return {
      machines: filteredMachines,
      alerts: filteredAlerts
    };
  }, [selectedCell, selectedOperator]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalMachines = filteredData.machines.length;
    const activeMachines = filteredData.machines.filter(m => m.status === 'running').length;
    const totalProduction = filteredData.machines.reduce((sum, m) => sum + (m.partsProduced || 0), 0);
    const totalRejections = filteredData.machines.reduce((sum, m) => sum + (m.rejections || 0), 0);
    const avgOEE = totalMachines > 0 ? filteredData.machines.reduce((sum, m) => sum + (m.oee || 0), 0) / totalMachines : 0;
    const avgEfficiency = totalMachines > 0 ? filteredData.machines.reduce((sum, m) => sum + (m.efficiency || 0), 0) / totalMachines : 0;
    const activeAlerts = filteredData.alerts.filter(a => a.status === 'active').length;
    const criticalAlerts = filteredData.alerts.filter(a => a.priority === 'critical').length;
    
    return {
      totalMachines,
      activeMachines,
      totalProduction,
      totalRejections,
      avgOEE,
      avgEfficiency,
      activeAlerts,
      criticalAlerts
    };
  }, [filteredData]);

  // Production trends data - use the original productionTrends data
  const productionTrendsData = useMemo(() => {
    return productionTrends.map(trend => ({
      hour: trend.hour,
      production: trend.production,
      target: 25 // Set a reasonable target
    }));
  }, [productionTrends]);

  // Quality trends data - create proper time-based data
  const qualityTrendsData = useMemo(() => {
    // Create 24-hour quality data
    const hours = Array.from({ length: 24 }, (_, i) => 
      `${i.toString().padStart(2, '0')}:00`
    );
    
    return hours.map(hour => ({
      hour,
      excellent: Math.floor(Math.random() * 20) + 60, // 60-80%
      good: Math.floor(Math.random() * 15) + 15,     // 15-30%
      acceptable: Math.floor(Math.random() * 8) + 5,  // 5-13%
      rejected: Math.floor(Math.random() * 3) + 1     // 1-4%
    }));
  }, []);

  // Performance metrics vs targets - fixed data structure with fallback values
  const performanceMetrics = useMemo(() => {
    // Ensure we have valid values even if KPIs are zero
    const oeeValue = kpis.avgOEE > 0 ? kpis.avgOEE : 85;
    const efficiencyValue = kpis.avgEfficiency > 0 ? kpis.avgEfficiency : 90;
    const qualityValue = kpis.totalProduction > 0 ? 100 - (kpis.totalRejections / kpis.totalProduction * 100) : 95;
    const uptimeValue = kpis.totalMachines > 0 ? (kpis.activeMachines / kpis.totalMachines) * 100 : 95;
    
    return [
      { 
        name: 'OEE', 
        current: Math.floor(Math.max(0, Math.min(100, oeeValue))), 
        target: 85,
        currentColor: '#00ffff',
        targetColor: '#ff00ff'
      },
      { 
        name: 'Efficiency', 
        current: Math.floor(Math.max(0, Math.min(100, efficiencyValue))), 
        target: 90,
        currentColor: '#00ffff',
        targetColor: '#ff00ff'
      },
      { 
        name: 'Quality', 
        current: Math.floor(Math.max(0, Math.min(100, qualityValue))), 
        target: 95,
        currentColor: '#00ffff',
        targetColor: '#ff00ff'
      },
      { 
        name: 'Uptime', 
        current: Math.floor(Math.max(0, Math.min(100, uptimeValue))), 
        target: 95,
        currentColor: '#00ffff',
        targetColor: '#ff00ff'
      }
    ];
  }, [kpis]);

  // Combine live notifications with existing alerts
  const allAlerts = useMemo(() => {
    const existingAlerts = filteredData.alerts.map(alert => ({
      ...alert,
      isLive: false
    }));
    
    const liveAlerts = liveNotifications.map(notification => ({
      id: `live-${notification.id}`,
      title: notification.title,
      message: notification.message,
      priority: notification.priority,
      status: 'active',
      timestamp: notification.timestamp,
      type: notification.type,
      isLive: true,
      machineId: notification.machineId,
      operatorId: notification.operatorId
    }));
    
    return [...liveAlerts, ...existingAlerts].sort((a, b) => 
      new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
    );
  }, [filteredData.alerts, liveNotifications]);

  return (
    <div className="view-content">
      <div className="view-header">
        <h2>Shop Floor Overview</h2>
        <p>Real-time monitoring of all manufacturing operations</p>
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
          label="Filter by Cell"
          options={cellOptions}
          value={selectedCell}
          onChange={setSelectedCell}
          placeholder="Select cell"
        />
        <Dropdown
          label="Filter by Operator"
          options={operatorOptions}
          value={selectedOperator}
          onChange={setSelectedOperator}
          placeholder="Select operator"
        />
      </div>

      <section className="stats-grid">
        <StatCard 
          title="Total Machines" 
          value={kpis.totalMachines} 
          icon={<FaIndustry />}
          color="#1b85b8"
          gradient={true}
        />
        <StatCard 
          title="Active Machines" 
          value={kpis.activeMachines} 
          icon={<FaCheckCircle />}
          color="#38a169"
          gradient={true}
        />
        <StatCard 
          title="Total Production" 
          value={kpis.totalProduction} 
          unit=" parts" 
          icon={<FaChartBar />}
          color="#2d3748"
          gradient={true}
        />
        <StatCard 
          title="Total Rejections" 
          value={kpis.totalRejections} 
          unit=" parts" 
          icon={<FaTimesCircle />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Average OEE" 
          value={kpis.avgOEE.toFixed(1)} 
          unit="%" 
          icon={<FaTachometerAlt />}
          color="#805ad5"
          gradient={true}
        />
        <StatCard 
          title="Average Efficiency" 
          value={kpis.avgEfficiency.toFixed(1)} 
          unit="%" 
          icon={<FaThermometerHalf />}
          color="#f6ad55"
          gradient={true}
        />
        <StatCard 
          title="Active Alerts" 
          value={kpis.activeAlerts} 
          icon={<FaExclamationTriangle />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Critical Alerts" 
          value={kpis.criticalAlerts} 
          icon={<FaBell />}
          color="#c53030"
          gradient={true}
        />
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Production Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={productionTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="#b0b0b0" />
              <YAxis stroke="#b0b0b0" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="production" fill="#00ffff" fillOpacity={0.6} />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="white" 
                strokeWidth={3}
                strokeDasharray="5 5"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Quality Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={qualityTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="#b0b0b0" />
              <YAxis stroke="#b0b0b0" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="excellent" stackId="1" stroke="#00ff00" fill="#00ff00" fillOpacity={0.6} />
              <Area type="monotone" dataKey="good" stackId="1" stroke="#ffa500" fill="#ffa500" fillOpacity={0.6} />
              <Area type="monotone" dataKey="acceptable" stackId="1" stroke="#ff6b6b" fill="#ff6b6b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="rejected" stackId="1" stroke="#ff0000" fill="#ff0000" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Performance Metrics vs Targets</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceMetrics} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                type="number" 
                stroke="#b0b0b0" 
                domain={[0, 100]}
                tick={{ fill: '#b0b0b0', fontSize: 12 }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#b0b0b0"
                tick={{ fill: '#b0b0b0', fontSize: 12 }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="current" 
                fill="#00ffff" 
                fillOpacity={0.7}
                radius={[0, 4, 4, 0]}
              />
              <Bar 
                dataKey="target" 
                fill="#ff00ff" 
                fillOpacity={0.5}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="alerts-section">
        <div className="alerts-header">
          <h3>Live Alerts & Notifications</h3>
          <div className="alerts-count">
            <span className="count-badge">{allAlerts.length}</span>
            <span className="count-label">Active Alerts</span>
          </div>
        </div>
        <div className="alerts-grid">
          {allAlerts.map(alert => (
            <AlertCard 
              key={alert.id} 
              {...alert} 
              isLive={alert.isLive}
            />
          ))}
        </div>
      </section>

      <section className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <FaEye />
            View All Machines
          </button>
          <button className="action-btn">
            <FaUser />
            Operator Status
          </button>
          <button className="action-btn">
            <FaFileAlt />
            Generate Report
          </button>
          <button className="action-btn">
            <FaTachometerAlt />
            OEE Analysis
          </button>
          <button className="action-btn">
            <FaThermometerHalf />
            System Health
          </button>
        </div>
      </section>
    </div>
  );
};

export default ShopFloorView; 