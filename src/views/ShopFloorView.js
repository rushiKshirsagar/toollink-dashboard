import React, { useState, useMemo } from 'react';
import { 
  FaCogs, FaIndustry, FaUsers, FaChartLine, FaChartBar, 
  FaIndustry as FaIndustryIcon, FaEye, FaUser, FaFileAlt,
  FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { 
  AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
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
          color="#1b85b8"
          gradient={true}
        />
        <StatCard 
          title="Active Machines" 
          value={shopFloorData.activeMachines} 
          subtitle={`${((shopFloorData.activeMachines/shopFloorData.totalMachines)*100).toFixed(1)}% utilization`}
          icon={<FaIndustry />}
          color="#2d3748"
          gradient={true}
        />
        <StatCard 
          title="Total Operators" 
          value={shopFloorData.totalOperators} 
          icon={<FaUsers />}
          color="#718096"
          gradient={true}
        />
        <StatCard 
          title="Overall Efficiency" 
          value={shopFloorData.overallEfficiency} 
          unit="%" 
          icon={<FaChartLine />}
          color="#1b85b8"
          gradient={true}
          showEfficiencyInfo={true}
          efficiencyType="general"
        />
        <StatCard 
          title="Today's Production" 
          value={shopFloorData.todayProduction} 
          unit=" parts" 
          icon={<FaChartBar />}
          color="#2d3748"
          gradient={true}
        />
        <StatCard 
          title="Total Production" 
          value={shopFloorData.totalProduction} 
          unit=" parts" 
          icon={<FaIndustryIcon />}
          color="#718096"
          gradient={true}
        />
        <StatCard 
          title="Total Rejections" 
          value={shopFloorData.totalRejections} 
          unit=" parts" 
          icon={<FaTimesCircle />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Rejection Rate" 
          value={shopFloorData.rejectionRate} 
          unit="%" 
          icon={<FaExclamationTriangle />}
          color="#f6ad55"
          gradient={true}
        />
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Production Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={filteredData.productionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="production" 
                stroke="#1b85b8" 
                fill="url(#areaGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b85b8" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1b85b8" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
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
              <Tooltip />
            </PieChart>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopFloorView; 