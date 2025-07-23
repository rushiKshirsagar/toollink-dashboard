import React, { useState, useEffect, useRef } from 'react';
import { FaClock, FaPlus, FaMinus, FaCheck, FaTimes, FaChartLine, FaPlay } from 'react-icons/fa';
import Dropdown from '../components/Dropdown';
import '../styles/DataEntryView.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { machinesData, operatorOptions, targetDimensions } from '../data/mockData';
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
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [measurementData, setMeasurementData] = useState([]);
  const [selectedRejectionCode, setSelectedRejectionCode] = useState('');
  const [downtime, setDowntime] = useState('');
  const [selectedDowntimeCode, setSelectedDowntimeCode] = useState('');
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

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!selectedCell) newErrors.cell = 'Please select a cell.';
    if (!selectedMachine) newErrors.machine = 'Please select a machine.';
    if (!selectedPart) newErrors.part = 'Please select a part/job code.';
    if (!selectedOperator) newErrors.operator = 'Please select an operator.';
    if (!selectedShift) newErrors.shift = 'Please select a shift.';
    if (!measurement || isNaN(Number(measurement))) newErrors.measurement = 'Enter a valid measurement.';
    // If rejected, require rejection reason
    const targetInfo = getTargetInfo();
    if (targetInfo && measurement) {
      const value = parseFloat(measurement);
      if (Math.abs(value - targetInfo.target) > targetInfo.tolerance && !selectedRejectionCode) {
        newErrors.rejection = 'Please select a rejection reason.';
      }
    }
    return newErrors;
  };

  // Get target/tolerance for selected machine+part
  const getTargetInfo = () => {
    if (!selectedMachine || !selectedPart) return null;
    return targetDimensions[`${selectedMachine}_${selectedPart}`];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    const targetInfo = getTargetInfo();
    let rejected = 0;
    let rejectionReason = '';
    if (targetInfo) {
      const value = parseFloat(measurement);
      if (Math.abs(value - targetInfo.target) > targetInfo.tolerance) {
        rejected = 1;
        rejectionReason = REJECTION_CODES.find(r => r.value === selectedRejectionCode)?.label || '';
      }
    }
    setMeasurementData((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        measurement: parseFloat(measurement),
        rejected,
        rejectionReason,
        operator: selectedOperator,
        shift: selectedShift
      }
    ]);
    setMeasurement('');
    setSelectedRejectionCode('');
    setErrors({});
  };

  // Custom tooltip for recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div style={{ background: '#fff', border: '1.5px solid #1b85b8', borderRadius: 8, padding: 10, color: '#1b85b8' }}>
          <div><b>Time:</b> {label}</div>
          <div><b>Measurement:</b> {entry.measurement?.toFixed(3)} mm</div>
          <div><b>Rejected:</b> {entry.rejected ? 'Yes' : 'No'}</div>
          {entry.rejected && entry.rejectionReason && (
            <div><b>Reason:</b> {entry.rejectionReason}</div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="view-content">
      <div className="view-header">
        <h2 style={{ color: '#1b85b8', letterSpacing: '0.5px', fontWeight: 700 }}>Operator Data Entry</h2>
        <p style={{ color: '#16648a', fontWeight: 500 }}>Enter measurement after each CNC cycle. Please fill all required fields.</p>
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
              <div className="input-group">
                <label>Measurement (mm)</label>
                <input
                  type="number"
                  step="0.001"
                  value={measurement}
                  onChange={e => setMeasurement(e.target.value)}
                  required
                  style={{ borderColor: errors.measurement ? '#e53e3e' : undefined }}
                />
                {errors.measurement && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.measurement}</span>}
                {getTargetInfo() && (
                  <span style={{ color: '#1b85b8', fontSize: '0.95em', marginTop: 2 }}>
                    Target: {getTargetInfo().target.toFixed(3)} mm &nbsp; | &nbsp; Tolerance: ±{getTargetInfo().tolerance.toFixed(3)} mm
                  </span>
                )}
              </div>
              <div className="input-group">
                <label>Rejected?</label>
                <input
                  type="text"
                  value={(() => {
                    if (!measurement || !getTargetInfo()) return '';
                    const value = parseFloat(measurement);
                    return Math.abs(value - getTargetInfo().target) > getTargetInfo().tolerance ? 'Yes' : 'No';
                  })()}
                  readOnly
                  style={{ background: '#f5faff', color: '#222', border: '1.5px solid #1b85b8', borderRadius: 8, padding: '10px 12px' }}
                />
              </div>
              {/* Rejection reason dropdown if rejected */}
              {(() => {
                const info = getTargetInfo();
                if (!info || !measurement) return null;
                const value = parseFloat(measurement);
                if (Math.abs(value - info.target) > info.tolerance) {
                  return (
                    <div className="input-group">
                      {/* <label>Rejection Reason</label> */}
                      <Dropdown
                        label="Rejection Reason"
                        options={REJECTION_CODES}
                        value={selectedRejectionCode}
                        onChange={setSelectedRejectionCode}
                        placeholder="Select reason"
                      />
                      {errors.rejection && <span style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 2 }}>{errors.rejection}</span>}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
            <div className="form-row">
              <button className="submit-btn" type="submit">
                <FaCheck /> Submit Entry
              </button>
            </div>
          </>
        )}
      </form>
      {/* Measurement Control Chart */}
      <div className="graph-section">
        <h3>Measurement Control Chart</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={measurementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={(() => {
              const info = getTargetInfo();
              if (!info) return [0, 'auto'];
              return [info.target - info.tolerance * 2, info.target + info.tolerance * 2];
            })()} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {/* Amber/green zones would require custom overlays; skip for now */}
            <Line
              type="monotone"
              dataKey="measurement"
              stroke="#1b85b8"
              dot={{
                stroke: d => {
                  const info = getTargetInfo();
                  if (!info) return '#38a169';
                  if (Math.abs(d.measurement - info.target) > info.tolerance * 2) return '#e53e3e';
                  if (Math.abs(d.measurement - info.target) > info.tolerance) return '#f6ad55';
                  return '#38a169';
                },
                strokeWidth: 2,
                r: 6
              }}
              name="Measurement"
            />
            {/* Target/control line */}
            {getTargetInfo() && (
              <Line
                type="linear"
                dataKey={() => getTargetInfo().target}
                stroke="#e53e3e"
                strokeDasharray="5 5"
                dot={false}
                name="Target"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Move old production graph to bottom */}
      <div className="graph-section">
        <h3>Real-Time Production Graph</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={measurementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={() => 1} stroke="#1b85b8" name="Jobs Produced" />
            <Line type="monotone" dataKey="rejected" stroke="#e53e3e" name="Jobs Rejected" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataEntryView; 