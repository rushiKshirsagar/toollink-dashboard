import React, { useState, useMemo } from 'react';
import { 
  FaCog, FaIndustry, FaChartLine, FaExclamationTriangle, FaCheckCircle,
  FaClock, FaThermometerHalf, FaTachometerAlt, FaUser, FaTools,
  FaChartBar, FaBolt, FaWrench
} from 'react-icons/fa';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, HeatMap
} from 'recharts';
import StatCard from '../components/StatCard';
import CellCard from '../components/CellCard';
import MachineCard from '../components/MachineCard';
import Dropdown from '../components/Dropdown';
import DateFilter from '../components/DateFilter';
import '../styles/CellManagerView.css';

const CellManagerView = ({ cellsData, machinesData, COLORS }) => {
  const [selectedCell, setSelectedCell] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter data based on selections
  const filteredCells = useMemo(() => {
    if (selectedCell) {
      return cellsData.filter(cell => cell.id === selectedCell);
    }
    return cellsData;
  }, [cellsData, selectedCell]);

  const filteredMachines = useMemo(() => {
    let machines = machinesData;
    if (selectedCell) {
      machines = machines.filter(machine => machine.cell === selectedCell);
    }
    return machines;
  }, [machinesData, selectedCell]);

  // Calculate cell-wide metrics
  const cellMetrics = useMemo(() => {
    return filteredCells.map(cell => {
      const cellMachines = filteredMachines.filter(m => m.cell === cell.id);
      const bottleneckMachine = cellMachines.reduce((prev, current) => 
        (current.oee < prev.oee) ? current : prev
      );
      
      return {
        ...cell,
        bottleneckMachine: bottleneckMachine?.name || 'N/A',
        bottleneckOEE: bottleneckMachine?.oee || 0,
        totalMachines: cellMachines.length,
        avgCycleTime: cellMachines.reduce((sum, m) => sum + m.cycleTime, 0) / cellMachines.length,
        avgIdleTime: cellMachines.reduce((sum, m) => sum + m.idleTime, 0) / cellMachines.length,
        avgMTTR: cellMachines.reduce((sum, m) => sum + m.mttr, 0) / cellMachines.length,
        avgMTBF: cellMachines.reduce((sum, m) => sum + m.mtbf, 0) / cellMachines.length
      };
    });
  }, [filteredCells, filteredMachines]);

  // Coordination status data
  const coordinationData = useMemo(() => {
    return cellMetrics.map(cell => ({
      name: cell.name,
      coordination: cell.coordinationStatus === 'optimal' ? 100 : 
                   cell.coordinationStatus === 'suboptimal' ? 70 : 40,
      changeoverTime: cell.changeoverTime,
      oee: cell.oee
    }));
  }, [cellMetrics]);

  // Bottleneck analysis
  const bottleneckData = useMemo(() => {
    return filteredMachines
      .filter(machine => machine.oee < 85) // Machines with OEE below 85%
      .map(machine => ({
        name: machine.name,
        oee: machine.oee,
        cell: machine.cell,
        reason: machine.oee < 70 ? 'Critical' : machine.oee < 80 ? 'Warning' : 'Attention'
      }))
      .sort((a, b) => a.oee - b.oee);
  }, [filteredMachines]);

  // Cell options
  const cellOptions = [
    { value: '', label: 'All Cells' },
    ...cellsData.map(cell => ({ value: cell.id, label: cell.name }))
  ];

  return (
    <div className="view-content">
      <div className="view-header">
        <h2>Cell Manager Dashboard</h2>
        <p>Cell-wide performance and coordination monitoring</p>
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
      </div>

      <section className="stats-grid">
        <StatCard 
          title="Total Cells" 
          value={filteredCells.length} 
          icon={<FaIndustry />}
          color="#1b85b8"
          gradient={true}
        />
        <StatCard 
          title="Total Machines" 
          value={filteredMachines.length} 
          icon={<FaCog />}
          color="#2d3748"
          gradient={true}
        />
        <StatCard 
          title="Average Cell OEE" 
          value={(cellMetrics.reduce((sum, cell) => sum + cell.oee, 0) / cellMetrics.length).toFixed(1)} 
          unit="%" 
          icon={<FaChartLine />}
          color="#718096"
          gradient={true}
        />
        <StatCard 
          title="Bottleneck Machines" 
          value={bottleneckData.length} 
          icon={<FaExclamationTriangle />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Average Changeover Time" 
          value={(cellMetrics.reduce((sum, cell) => sum + cell.changeoverTime, 0) / cellMetrics.length).toFixed(1)} 
          unit=" min" 
          icon={<FaClock />}
          color="#f6ad55"
          gradient={true}
        />
        <StatCard 
          title="Average MTTR" 
          value={(cellMetrics.reduce((sum, cell) => sum + cell.avgMTTR, 0) / cellMetrics.length).toFixed(1)} 
          unit=" min" 
          icon={<FaWrench />}
          color="#805ad5"
          gradient={true}
        />
        <StatCard 
          title="Average MTBF" 
          value={(cellMetrics.reduce((sum, cell) => sum + cell.avgMTBF, 0) / cellMetrics.length).toFixed(0)} 
          unit=" min" 
          icon={<FaBolt />}
          color="#38a169"
          gradient={true}
        />
        <StatCard 
          title="Optimal Coordination" 
          value={cellMetrics.filter(cell => cell.coordinationStatus === 'optimal').length} 
          subtitle={`of ${cellMetrics.length} cells`}
          icon={<FaCheckCircle />}
          color="#38a169"
          gradient={true}
        />
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Cell OEE Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cellMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="oee" fill="#1b85b8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Coordination Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={coordinationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="coordination" fill="#38a169" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <h3 style={{margin:"20px 0 20px 0"}}>Cell Performance Overview</h3>
      <section className="cells-grid">
        <div className="cells-container">
          {cellMetrics.map((cell) => (
            <CellCard 
              key={cell.id}
              cell={cell}
              showDetailedMetrics={true}
            />
          ))}
        </div>
      </section>

      <section className="bottleneck-section">
        <h3>Bottleneck Machine Detection</h3>
        <div className="bottleneck-container">
          {bottleneckData.map((machine, index) => (
            <div key={machine.name} className={`bottleneck-card ${machine.reason.toLowerCase()}`}>
              <div className="bottleneck-header">
                <h4>{machine.name}</h4>
                <span className={`bottleneck-badge ${machine.reason.toLowerCase()}`}>
                  {machine.reason}
                </span>
              </div>
              <div className="bottleneck-metrics">
                <div className="metric">
                  <span className="label">OEE:</span>
                  <span className="value">{machine.oee.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span className="label">Cell:</span>
                  <span className="value">{machine.cell}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="machines-section">
        <h3>Cell Machines Detail</h3>
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
    </div>
  );
};

export default CellManagerView; 