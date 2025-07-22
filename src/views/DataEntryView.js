import React, { useState, useEffect, useRef } from 'react';
import { FaClock, FaPlus, FaMinus, FaCheck, FaTimes, FaChartLine, FaPlay } from 'react-icons/fa';
import Dropdown from '../components/Dropdown';
import '../styles/DataEntryView.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { machinesData, operatorOptions } from '../data/mockData';
import { operatorsData } from '../data/mockData';

const REJECTION_CODES = [
  { value: 'R01', label: 'Surface Defect' },
  { value: 'R02', label: 'Dimension Out of Tolerance' },
  { value: 'R03', label: 'Burrs/Sharp Edges' },
  { value: 'R04', label: 'Material Flaw' },
  { value: 'R05', label: 'Other' }
];

const DOWNTIME_CODES = [
  { value: 'D01', label: 'Tool Change' },
  { value: 'D02', label: 'Material Shortage' },
  { value: 'D03', label: 'Maintenance' },
  { value: 'D04', label: 'Power Failure' },
  { value: 'D05', label: 'Other' }
];

const FREQUENCY_OPTIONS = [
  { value: 'per-part', label: 'After every part produced' },
  { value: '15', label: 'Every 15 minutes' },
  { value: '60', label: 'Every 1 hour' },
  { value: '120', label: 'Every 2 hours' },
  { value: 'custom', label: 'Custom (minutes)' }
];

const CYCLE_TIME_SEC = 60; // Default, can be adjusted by frequency

// Get unique shift values from operatorsData
const shiftOptions = Array.from(new Set(operatorsData.map(op => op.shift))).map(shift => ({ value: shift, label: shift }));

const DataEntryView = ({ cellOptions, machineOptions, operatorOptions: propOperatorOptions }) => {
  const [selectedCell, setSelectedCell] = useState('');
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [partOptions, setPartOptions] = useState([]);
  const [selectedPart, setSelectedPart] = useState('');
  const [frequency, setFrequency] = useState('per-part');
  const [customFrequency, setCustomFrequency] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [partsProduced, setPartsProduced] = useState('');
  const [partsRejected, setPartsRejected] = useState('');
  const [selectedRejectionCode, setSelectedRejectionCode] = useState('');
  const [downtime, setDowntime] = useState('');
  const [selectedDowntimeCode, setSelectedDowntimeCode] = useState('');
  const [timer, setTimer] = useState(CYCLE_TIME_SEC);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [errors, setErrors] = useState({});
  const timerRef = useRef();

  // Filter machines by cell using machinesData
  useEffect(() => {
    let machines = machinesData;
    if (selectedCell) {
      machines = machinesData.filter(m => m.cell === selectedCell);
    }
    setFilteredMachines(machines.map(m => ({ value: m.id, label: m.name })));
    setSelectedMachine('');
    setSelectedPart('');
    setPartOptions([]);
    setSelectedOperator('');
    setSelectedShift('');
  }, [selectedCell]);

  // Filter part/job codes by selected machine
  useEffect(() => {
    if (selectedMachine) {
      const machine = machinesData.find(m => m.id === selectedMachine);
      if (machine && machine.programNumber && machine.programName) {
        setPartOptions([
          { value: machine.programNumber, label: `${machine.programName} (${machine.programNumber})` }
        ]);
      } else {
        setPartOptions([]);
      }
    } else {
      setPartOptions([]);
    }
    setSelectedPart('');
    setSelectedOperator('');
    setSelectedShift('');
  }, [selectedMachine]);

  // Timer logic (frequency-based)
  useEffect(() => {
    let freqSec = CYCLE_TIME_SEC;
    if (frequency === 'per-part') freqSec = CYCLE_TIME_SEC;
    else if (frequency === 'custom' && customFrequency) freqSec = Number(customFrequency) * 60;
    else if (!isNaN(Number(frequency))) freqSec = Number(frequency) * 60;
    setTimer(freqSec);
    setIsTimerRunning(false);
  }, [frequency, customFrequency, selectedCell, selectedMachine, selectedPart]);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [isTimerRunning, timer]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!selectedCell) newErrors.cell = 'Please select a cell.';
    if (!selectedMachine) newErrors.machine = 'Please select a machine.';
    if (!selectedPart) newErrors.part = 'Please select a part/job code.';
    if (!selectedOperator) newErrors.operator = 'Please select an operator.';
    if (!selectedShift) newErrors.shift = 'Please select a shift.';
    if (Number(partsRejected) > 0 && !selectedRejectionCode) {
      newErrors.rejection = 'Please select a rejection reason.';
    }
    if (downtime && !selectedDowntimeCode) {
      newErrors.downtime = 'Please select a downtime reason.';
    }
    if (frequency === 'custom' && (!customFrequency || isNaN(Number(customFrequency)) || Number(customFrequency) <= 0)) {
      newErrors.frequency = 'Enter a valid custom frequency in minutes.';
    }
    return newErrors;
  };

  // Helper to get next timestamp for interval-based frequency
  const getNextTimestamp = () => {
    if (frequency === 'per-part') {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } else {
      // If graphData is empty, use now; else increment last timestamp by interval
      let lastDate = new Date();
      if (graphData.length > 0) {
        const last = graphData[graphData.length - 1];
        // Parse last.time as HH:mm:ss
        const [h, m, s] = last.time.split(':').map(Number);
        lastDate.setHours(h, m, s || 0, 0);
      }
      let intervalMin = 15;
      if (frequency === 'custom' && customFrequency) intervalMin = Number(customFrequency);
      else if (!isNaN(Number(frequency))) intervalMin = Number(frequency);
      lastDate.setMinutes(lastDate.getMinutes() + intervalMin);
      return lastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setGraphData((prev) => [
      ...prev,
      {
        time: getNextTimestamp(),
        produced: Number(partsProduced),
        rejected: Number(partsRejected),
        operator: selectedOperator,
        shift: selectedShift
      }
    ]);
    setPartsProduced('');
    setPartsRejected('');
    setSelectedRejectionCode('');
    setDowntime('');
    setSelectedDowntimeCode('');
    setErrors({});
  };

  return (
    <div className="view-content">
      <div className="view-header">
        <h2 style={{ color: '#1b85b8', letterSpacing: '0.5px', fontWeight: 700 }}>Operator Data Entry</h2>
        <p style={{ color: '#16648a', fontWeight: 500 }}>Enter production data after each CNC cycle. Please fill all required fields.</p>
      </div>
      <form className="data-entry-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Dropdown
            label="Select Cell"
            options={cellOptions.filter(c => c.value)}
            value={selectedCell}
            onChange={setSelectedCell}
            placeholder="Choose cell"
          />
          <Dropdown
            label="Select Machine"
            options={filteredMachines}
            value={selectedMachine}
            onChange={setSelectedMachine}
            placeholder="Choose machine"
          />
          <Dropdown
            label="Part / Job Code"
            options={partOptions}
            value={selectedPart}
            onChange={setSelectedPart}
            placeholder="Choose part/job code"
          />
        </div>
        {errors.cell && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.cell}</span>}
        {errors.machine && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.machine}</span>}
        {errors.part && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.part}</span>}
        {selectedCell && selectedMachine && selectedPart && (
          <>
            <div className="form-row">
              <Dropdown
                label="Operator Name"
                options={operatorOptions.filter(o => o.value)}
                value={selectedOperator}
                onChange={setSelectedOperator}
                placeholder="Select operator"
              />
              <Dropdown
                label="Shift Number"
                options={shiftOptions}
                value={selectedShift}
                onChange={setSelectedShift}
                placeholder="Select shift"
              />
            </div>
            {errors.operator && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.operator}</span>}
            {errors.shift && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.shift}</span>}
            <div className="form-row">
              <Dropdown
                label="Entry Frequency"
                options={FREQUENCY_OPTIONS}
                value={frequency}
                onChange={setFrequency}
                placeholder="Select frequency"
              />
              {frequency === 'custom' && (
                <div className="input-group">
                  <label>Custom Frequency (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    value={customFrequency}
                    onChange={e => setCustomFrequency(e.target.value)}
                    style={{ borderColor: errors.frequency ? '#e53e3e' : undefined }}
                  />
                  {errors.frequency && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.frequency}</span>}
                </div>
              )}
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Parts Produced</label>
                <input
                  type="number"
                  min="0"
                  value={partsProduced}
                  onChange={e => setPartsProduced(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Parts Rejected</label>
                <input
                  type="number"
                  min="0"
                  value={partsRejected}
                  onChange={e => setPartsRejected(e.target.value)}
                  required
                />
                {Number(partsRejected) > 0 && (
                  <>
                    <Dropdown
                      label="Rejection Reason"
                      options={REJECTION_CODES}
                      value={selectedRejectionCode}
                      onChange={setSelectedRejectionCode}
                      placeholder="Select reason"
                    />
                    {errors.rejection && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.rejection}</span>}
                  </>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="input-group downtime-group">
                <label>Downtime (min)</label>
                <input
                  type="number"
                  min="0"
                  value={downtime}
                  onChange={e => setDowntime(e.target.value)}
                />
                {downtime && (
                  <>
                    <Dropdown
                      label="Downtime Reason"
                      options={DOWNTIME_CODES}
                      value={selectedDowntimeCode}
                      onChange={setSelectedDowntimeCode}
                      placeholder="Select reason"
                    />
                    {errors.downtime && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.downtime}</span>}
                  </>
                )}
              </div>
            </div>
            <div className="form-row timer-row">
              <div className="timer-display">
                <FaClock />
                <span>Next Cycle: {timer}s</span>
                <button
                  type="button"
                  className="timer-btn"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                >
                  {isTimerRunning ? <FaTimes /> : <FaPlay />}
                </button>
                <button
                  type="button"
                  className="timer-btn"
                  onClick={() => { setTimer(timer); setIsTimerRunning(false); }}
                >
                  <FaTimes />
                </button>
              </div>
              <button className="submit-btn" type="submit">
                <FaCheck /> Submit Entry
              </button>
            </div>
          </>
        )}
      </form>
      <div className="graph-section">
        <h3>Real-Time Production Graph</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="produced" stroke="#1b85b8" name="Jobs Produced" />
            <Line type="monotone" dataKey="rejected" stroke="#e53e3e" name="Jobs Rejected" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataEntryView; 