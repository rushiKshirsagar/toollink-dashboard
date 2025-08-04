import React, { useState, useMemo } from 'react';
import { 
  FaCogs, FaIndustry, FaUsers, FaChartLine, FaChartBar, 
  FaIndustry as FaIndustryIcon, FaEye, FaUser, FaFileAlt,
  FaTimesCircle, FaExclamationTriangle, FaTachometerAlt,
  FaClock, FaShieldAlt, FaBolt, FaThermometerHalf
} from 'react-icons/fa';
import { 
  AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar, ComposedChart, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import StatCard from '../components/StatCard';
import AlertCard from '../components/AlertCard';
import Dropdown from '../components/Dropdown';
import DateFilter from '../components/DateFilter';
import '../styles/ShopFloorView.css';

const ShopFloorView = ({ shopFloorData, productionTrends, qualityMetrics, COLORS, cellOptions, operatorOptions }) => {
  const [selectedCell, setSelectedCell] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Enhanced OEE data
  const oeeData = [
    { name: 'Availability', value: 96.5, target: 95 },
    { name: 'Performance', value: 92.1, target: 90 },
    { name: 'Quality', value: 96.4, target: 95 },
    { name: 'Overall OEE', value: 82.3, target: 85 }
  ];

  // Machine efficiency trends (last 7 days)
  const efficiencyTrends = [
    { day: 'Mon', efficiency: 87.2, target: 85 },
    { day: 'Tue', efficiency: 89.1, target: 85 },
    { day: 'Wed', efficiency: 91.3, target: 85 },
    { day: 'Thu', efficiency: 88.7, target: 85 },
    { day: 'Fri', efficiency: 86.9, target: 85 },
    { day: 'Sat', efficiency: 84.2, target: 85 },
    { day: 'Sun', efficiency: 82.1, target: 85 }
  ];

  // Real-time performance metrics
  const performanceMetrics = [
    { metric: 'Cycle Time', current: 4.2, target: 4.0, unit: 'min' },
    { metric: 'Idle Time', current: 1.8, target: 1.5, unit: 'min' },
    { metric: 'MTTR', current: 45, target: 30, unit: 'min' },
    { metric: 'MTBF', current: 480, target: 600, unit: 'min' }
  ];

  // Quality trends over time
  const qualityTrends = [
    { hour: '00:00', excellent: 65, good: 25, acceptable: 8, rejected: 2 },
    { hour: '04:00', excellent: 68, good: 22, acceptable: 8, rejected: 2 },
    { hour: '08:00', excellent: 72, good: 20, acceptable: 6, rejected: 2 },
    { hour: '12:00', excellent: 70, good: 23, acceptable: 5, rejected: 2 },
    { hour: '16:00', excellent: 67, good: 26, acceptable: 5, rejected: 2 },
    { hour: '20:00', excellent: 64, good: 28, acceptable: 6, rejected: 2 }
  ];

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let filtered = { ...shopFloorData };
    
    // Filter by date range
    if (startDate || endDate) {
      const filterStartDate = startDate || '1900-01-01';
      const filterEndDate = endDate || '2100-12-31';
      
      // Filter production trends
      filtered.productionTrends = productionTrends.filter(item => 
        item.date >= filterStartDate && item.date <= filterEndDate
      );
      
      // Filter quality metrics
      filtered.qualityMetrics = qualityMetrics.filter(item => 
        item.date >= filterStartDate && item.date <= filterEndDate
      );
    } else {
      filtered.productionTrends = productionTrends;
      filtered.qualityMetrics = qualityMetrics;
    }
    
    if (selectedCell) {
      // Filter alerts by cell
      filtered.alerts = shopFloorData.alerts.filter(alert => 
        alert.message.includes(`Cell ${selectedCell}`)
      );
    }
    
    if (selectedOperator) {
      // Filter alerts by operator
      filtered.alerts = filtered.alerts.filter(alert => 
        alert.message.includes(operatorOptions.find(op => op.value === selectedOperator)?.label || '')
      );
    }
    
    return filtered;
  }, [shopFloorData, productionTrends, qualityMetrics, selectedCell, selectedOperator, operatorOptions, startDate, endDate]);

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
          placeholder="Select a cell"
        />
        <Dropdown
          label="Filter by Operator"
          options={operatorOptions}
          value={selectedOperator}
          onChange={setSelectedOperator}
          placeholder="Select an operator"
        />
      </div>

      <section className="stats-grid">
        <StatCard 
          title="Total Machines" 
          value={shopFloorData.totalMachines} 
          icon={<FaCogs />}
          color="#00ffff"
          gradient={true}
        />
        <StatCard 
          title="Active Machines" 
          value={shopFloorData.activeMachines} 
          subtitle={`${((shopFloorData.activeMachines/shopFloorData.totalMachines)*100).toFixed(1)}% utilization`}
          icon={<FaIndustry />}
          color="#ff00ff"
          gradient={true}
        />
        <StatCard 
          title="Total Operators" 
          value={shopFloorData.totalOperators} 
          icon={<FaUsers />}
          color="#00ff00"
          gradient={true}
        />
        <StatCard 
          title="Overall Efficiency" 
          value={shopFloorData.overallEfficiency} 
          unit="%" 
          icon={<FaChartLine />}
          color="#00ffff"
          gradient={true}
          showEfficiencyInfo={true}
          efficiencyType="general"
        />
        <StatCard 
          title="Today's Production" 
          value={shopFloorData.todayProduction} 
          unit=" parts" 
          icon={<FaChartBar />}
          color="#ff00ff"
          gradient={true}
        />
        <StatCard 
          title="Total Production" 
          value={shopFloorData.totalProduction} 
          unit=" parts" 
          icon={<FaIndustryIcon />}
          color="#00ff00"
          gradient={true}
        />
        <StatCard 
          title="Total Rejections" 
          value={shopFloorData.totalRejections} 
          unit=" parts" 
          icon={<FaTimesCircle />}
          color="#ff6b6b"
          gradient={true}
        />
        <StatCard 
          title="Rejection Rate" 
          value={shopFloorData.rejectionRate} 
          unit="%" 
          icon={<FaExclamationTriangle />}
          color="#ffa500"
          gradient={true}
        />
        <StatCard 
          title="Overall OEE" 
          value={shopFloorData.overallOEE} 
          unit="%" 
          icon={<FaTachometerAlt />}
          color="#00ffff"
          gradient={true}
        />
        <StatCard 
          title="Avg Cycle Time" 
          value={shopFloorData.averageCycleTime} 
          unit=" min" 
          icon={<FaClock />}
          color="#ff00ff"
          gradient={true}
        />
        <StatCard 
          title="Avg MTTR" 
          value={shopFloorData.averageMTTR} 
          unit=" min" 
          icon={<FaShieldAlt />}
          color="#00ff00"
          gradient={true}
        />
        <StatCard 
          title="Avg MTBF" 
          value={shopFloorData.averageMTBF} 
          unit=" min" 
          icon={<FaBolt />}
          color="#ffa500"
          gradient={true}
        />
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Production Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={filteredData.productionTrends}>
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
              <Area 
                type="monotone" 
                dataKey="production" 
                stroke="#00ffff" 
                fill="url(#areaGradient)"
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00ffff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#00ffff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

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
          <h3>Quality Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={filteredData.qualityMetrics}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {filteredData.qualityMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <h3>Efficiency Trends (7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={efficiencyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#b0b0b0" />
              <YAxis stroke="#b0b0b0" domain={[80, 95]} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(0,255,255,0.3)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar dataKey="efficiency" fill="#00ffff" fillOpacity={0.6} />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ff00ff" 
                strokeWidth={3}
                strokeDasharray="5 5"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Quality Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={qualityTrends}>
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
            <BarChart data={performanceMetrics} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#b0b0b0" />
              <YAxis dataKey="metric" type="category" stroke="#b0b0b0" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(0,255,255,0.3)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar dataKey="current" fill="#00ffff" fillOpacity={0.7} />
              <Bar dataKey="target" fill="#ff00ff" fillOpacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bottom-section">
        <div className="alerts-panel">
          <h3>Recent Alerts</h3>
          <div className="alerts-list">
            {filteredData.alerts.map(alert => (
              <AlertCard key={alert.id} {...alert} />
            ))}
          </div>
        </div>

        <div className="quick-actions">
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
        </div>
      </section>
    </div>
  );
};

export default ShopFloorView; 