import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CellCard from '../components/CellCard';
import Dropdown from '../components/Dropdown';
import DateFilter from '../components/DateFilter';
import '../styles/CellsView.css';

const CellsView = ({ cellsData, setSelectedCell }) => {
  const [filterType, setFilterType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filterOptions = [
    { value: '', label: 'All Cells' },
    { value: 'high-efficiency', label: 'High Efficiency (>90%)' },
    { value: 'medium-efficiency', label: 'Medium Efficiency (75-90%)' },
    { value: 'low-efficiency', label: 'Low Efficiency (<75%)' },
    { value: 'high-production', label: 'High Production (>30 parts)' },
    { value: 'low-production', label: 'Low Production (<20 parts)' },
    { value: 'high-rejection', label: 'High Rejection Rate (>5%)' },
    { value: 'low-rejection', label: 'Low Rejection Rate (<3%)' }
  ];

  // Filter cells by date and other criteria
  const filteredCells = useMemo(() => {
    let filtered = cellsData;
    
    // Filter by date range
    if (startDate || endDate) {
      const filterStartDate = startDate || '1900-01-01';
      const filterEndDate = endDate || '2100-12-31';
      
      filtered = filtered.filter(cell => 
        cell.date >= filterStartDate && cell.date <= filterEndDate
      );
    }
    
    // Filter by type
    if (filterType) {
      switch (filterType) {
        case 'high-efficiency':
          filtered = filtered.filter(cell => cell.efficiency > 90);
          break;
        case 'medium-efficiency':
          filtered = filtered.filter(cell => cell.efficiency >= 75 && cell.efficiency <= 90);
          break;
        case 'low-efficiency':
          filtered = filtered.filter(cell => cell.efficiency < 75);
          break;
        case 'high-production':
          filtered = filtered.filter(cell => cell.production > 30);
          break;
        case 'low-production':
          filtered = filtered.filter(cell => cell.production < 20);
          break;
        case 'high-rejection':
          filtered = filtered.filter(cell => cell.rejectionRate > 5);
          break;
        case 'low-rejection':
          filtered = filtered.filter(cell => cell.rejectionRate < 3);
          break;
        default:
          break;
      }
    }
    
    return filtered;
  }, [cellsData, filterType, startDate, endDate]);

  return (
    <div className="view-content">
      <div className="view-header">
        <h2>Production Cells</h2>
        <p>Monitor individual cell performance and efficiency</p>
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
          label="Filter Cells"
          options={filterOptions}
          value={filterType}
          onChange={setFilterType}
          placeholder="Select filter"
        />
      </div>

      <section className="cells-grid">
        {filteredCells.map(cell => (
          <CellCard key={cell.id} cell={cell} onClick={setSelectedCell} />
        ))}
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Cell Efficiency Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={filteredCells}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiency" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b85b8" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Production vs Rejection Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={filteredCells}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="production" fill="url(#productionGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejections" fill="url(#rejectionGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2d3748" />
                  <stop offset="100%" stopColor="#1a202c" />
                </linearGradient>
                <linearGradient id="rejectionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e53e3e" />
                  <stop offset="100%" stopColor="#c53030" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default CellsView; 