import React, { useState, useMemo } from 'react';
import { 
  FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaTimesCircle,
  FaChartLine, FaChartBar, FaUser, FaCog, FaTools, FaThermometerHalf,
  FaTachometerAlt, FaIndustry, FaExclamationCircle, FaWrench
} from 'react-icons/fa';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter
} from 'recharts';
import StatCard from '../components/StatCard';
import AlertCard from '../components/AlertCard';
import Dropdown from '../components/Dropdown';
import DateFilter from '../components/DateFilter';
import '../styles/QAManagerView.css';

const QAManagerView = ({ machinesData, operatorsData, shopFloorData, COLORS }) => {
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter data based on selections
  const filteredMachines = useMemo(() => {
    let machines = machinesData;
    if (selectedMachine) {
      machines = machines.filter(machine => machine.id === selectedMachine);
    }
    return machines;
  }, [machinesData, selectedMachine]);

  const filteredOperators = useMemo(() => {
    let operators = operatorsData;
    if (selectedOperator) {
      operators = operators.filter(operator => operator.id === selectedOperator);
    }
    return operators;
  }, [operatorsData, selectedOperator]);

  // Calculate QA metrics
  const qaMetrics = useMemo(() => {
    const totalRejections = filteredMachines.reduce((sum, m) => sum + m.rejections, 0);
    const totalProduction = filteredMachines.reduce((sum, m) => sum + m.partsProduced, 0);
    const avgFPY = filteredOperators.reduce((sum, op) => sum + op.fpy, 0) / filteredOperators.length;
    const avgToolWear = filteredOperators.reduce((sum, op) => sum + op.toolChangeFrequency, 0) / filteredOperators.length;
    const avgErrorFreq = filteredOperators.reduce((sum, op) => sum + op.errorFrequency, 0) / filteredOperators.length;
    
    return {
      totalRejections,
      totalProduction,
      rejectionRate: totalProduction > 0 ? (totalRejections / totalProduction) * 100 : 0,
      avgFPY,
      avgToolWear,
      avgErrorFreq
    };
  }, [filteredMachines, filteredOperators]);

  // Rejection trends by machine
  const rejectionByMachine = useMemo(() => {
    return filteredMachines
      .filter(machine => machine.rejections > 0)
      .map(machine => ({
        name: machine.name,
        rejections: machine.rejections,
        rejectionRate: machine.rejectionRate,
        fpy: 100 - machine.rejectionRate
      }))
      .sort((a, b) => b.rejections - a.rejections);
  }, [filteredMachines]);

  // Rejection trends by operator
  const rejectionByOperator = useMemo(() => {
    return filteredOperators
      .filter(operator => operator.rejections > 0)
      .map(operator => ({
        name: operator.name,
        rejections: operator.rejections,
        rejectionRate: operator.rejectionRate,
        fpy: operator.fpy
      }))
      .sort((a, b) => b.rejections - a.rejections);
  }, [filteredOperators]);

  // Tool wear patterns
  const toolWearData = useMemo(() => {
    return filteredOperators.map(operator => ({
      name: operator.name,
      toolChangeFrequency: operator.toolChangeFrequency,
      toolWearRate: operator.cncMetrics?.toolWearRate || 0,
      spindleLoadDeviations: operator.spindleLoadDeviations,
      processDrift: operator.processDrift
    }));
  }, [filteredOperators]);

  // Error-prone programs/machines
  const errorProneData = useMemo(() => {
    return filteredMachines
      .filter(machine => machine.rejectionRate > 5 || machine.alarms.length > 0)
      .map(machine => ({
        name: machine.name,
        programName: machine.programName,
        rejectionRate: machine.rejectionRate,
        alarmCount: machine.alarms.length,
        oee: machine.oee,
        operator: machine.operator
      }))
      .sort((a, b) => b.rejectionRate - a.rejectionRate);
  }, [filteredMachines]);

  // Machine options
  const machineOptions = [
    { value: '', label: 'All Machines' },
    ...machinesData.map(machine => ({ value: machine.id, label: machine.name }))
  ];

  // Operator options
  const operatorOptions = [
    { value: '', label: 'All Operators' },
    ...operatorsData.map(operator => ({ value: operator.id, label: operator.name }))
  ];

  return (
    <div className="view-content">
      <div className="view-header">
        <h2>QA Manager Dashboard</h2>
        <p>Quality control and process stability monitoring</p>
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
          label="Filter by Machine"
          options={machineOptions}
          value={selectedMachine}
          onChange={setSelectedMachine}
          placeholder="Select machine"
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
          title="Total Rejections" 
          value={qaMetrics.totalRejections} 
          unit=" parts" 
          icon={<FaTimesCircle />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Rejection Rate" 
          value={qaMetrics.rejectionRate.toFixed(2)} 
          unit="%" 
          icon={<FaExclamationTriangle />}
          color="#f6ad55"
          gradient={true}
        />
        <StatCard 
          title="Average FPY" 
          value={qaMetrics.avgFPY.toFixed(1)} 
          unit="%" 
          icon={<FaCheckCircle />}
          color="#38a169"
          gradient={true}
        />
        <StatCard 
          title="Average Tool Wear" 
          value={qaMetrics.avgToolWear.toFixed(1)} 
          unit=" changes/shift" 
          icon={<FaTools />}
          color="#805ad5"
          gradient={true}
        />
        <StatCard 
          title="Average Error Frequency" 
          value={qaMetrics.avgErrorFreq.toFixed(1)} 
          unit=" errors/shift" 
          icon={<FaExclamationCircle />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Total Production" 
          value={qaMetrics.totalProduction} 
          unit=" parts" 
          icon={<FaIndustry />}
          color="#1b85b8"
          gradient={true}
        />
        <StatCard 
          title="Error-Prone Machines" 
          value={errorProneData.length} 
          icon={<FaCog />}
          color="#e53e3e"
          gradient={true}
        />
        <StatCard 
          title="Quality Score" 
          value={(100 - qaMetrics.rejectionRate).toFixed(1)} 
          unit="%" 
          icon={<FaShieldAlt />}
          color="#38a169"
          gradient={true}
        />
      </section>

      <section className="charts-section">
        <div className="chart-container">
          <h3>Rejections by Machine</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rejectionByMachine}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rejections" fill="#e53e3e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>First Pass Yield by Operator</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rejectionByOperator}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fpy" fill="#38a169" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="tool-wear-section">
        <h3>Tool Wear Patterns</h3>
        <div className="tool-wear-container">
          <div className="chart-container">
            <h4>Tool Change Frequency vs Process Drift</h4>
            <ResponsiveContainer width="100%" height={200}>
              <ScatterChart data={toolWearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="toolChangeFrequency" name="Tool Changes/Shift" />
                <YAxis dataKey="processDrift" name="Process Drift %" />
                <Tooltip />
                <Scatter dataKey="processDrift" fill="#805ad5" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="error-prone-section">
        <h3>Error-Prone Programs/Machines</h3>
        <div className="error-prone-container">
          {errorProneData.map((item, index) => (
            <div key={item.name} className="error-prone-card">
              <div className="error-prone-header">
                <h4>{item.name}</h4>
                <span className={`error-badge ${item.rejectionRate > 10 ? 'critical' : 'warning'}`}>
                  {item.rejectionRate.toFixed(1)}% Rejection
                </span>
              </div>
              <div className="error-prone-details">
                <div className="detail">
                  <span className="label">Program:</span>
                  <span className="value">{item.programName}</span>
                </div>
                <div className="detail">
                  <span className="label">Operator:</span>
                  <span className="value">{item.operator}</span>
                </div>
                <div className="detail">
                  <span className="label">OEE:</span>
                  <span className="value">{item.oee.toFixed(1)}%</span>
                </div>
                <div className="detail">
                  <span className="label">Alarms:</span>
                  <span className="value">{item.alarmCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="quality-trends-section">
        <h3>Quality Trends</h3>
        <div className="trends-container">
          <div className="chart-container">
            <h4>Rejection Rate Trends</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={rejectionByMachine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rejectionRate" stroke="#e53e3e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="alerts-section">
        <h3>Quality Alerts</h3>
        <div className="alerts-container">
          {shopFloorData.alerts
            .filter(alert => alert.alarmType === 'program' || alert.alarmType === 'temperature')
            .map((alert) => (
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

export default QAManagerView; 