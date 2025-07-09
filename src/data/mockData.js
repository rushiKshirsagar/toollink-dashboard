// Mock data for CNC Dashboard
import { 
  FaCogs, FaIndustry, FaUsers, FaChartLine, FaChartBar, 
  FaIndustry as FaIndustryIcon, FaEye, FaUser, FaFileAlt,
  FaExclamationTriangle, FaCheckCircle, FaClock, FaThermometerHalf,
  FaTachometerAlt, FaShieldAlt, FaTimesCircle, FaTools, FaCog,
  FaWrench, FaExclamationCircle, FaPlay, FaPause, FaStop,
  FaBolt, FaTachometerAlt as FaTachometer, FaThermometerHalf as FaThermometer,
  FaCog as FaCogIcon, FaWrench as FaWrenchIcon, FaExclamationCircle as FaExclamationCircleIcon
} from 'react-icons/fa';

// Colors for charts
export const COLORS = ['#1b85b8', '#2d3748', '#718096', '#f6ad55', '#68d391', '#e53e3e', '#805ad5', '#38a169'];

// Helper function to get current date and past dates
const getDateString = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Helper function to get current time
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// CNC Machine Status Types
export const MACHINE_STATUS = {
  RUNNING: 'running',
  IDLE: 'idle',
  ERROR: 'error',
  MAINTENANCE: 'maintenance',
  SETUP: 'setup',
  STOPPED: 'stopped'
};

// Alarm/Error Types
export const ALARM_TYPES = {
  TEMPERATURE: 'temperature',
  SPINDLE_LOAD: 'spindle_load',
  TOOL_WEAR: 'tool_wear',
  DOOR_OPEN: 'door_open',
  COOLANT: 'coolant',
  POWER: 'power',
  PROGRAM: 'program',
  AXIS: 'axis'
};

// Shop Floor Data
export const shopFloorData = {
  totalMachines: 12,
  activeMachines: 10,
  totalOperators: 8,
  overallEfficiency: 87.5,
  todayProduction: 245,
  totalProduction: 12450,
  totalRejections: 23,
  rejectionRate: 1.85, // percentage
  overallOEE: 82.3, // Overall Equipment Effectiveness
  averageCycleTime: 4.2, // minutes
  averageIdleTime: 1.8, // minutes
  averageMTTR: 45, // minutes
  averageMTBF: 480, // minutes (8 hours)
  alerts: [
    {
      id: 1,
      type: 'warning',
      message: 'Machine M-001 temperature exceeding normal range',
      time: '2 minutes ago',
      icon: <FaThermometerHalf />,
      machineId: 'M-001',
      alarmType: ALARM_TYPES.TEMPERATURE
    },
    {
      id: 2,
      type: 'success',
      message: 'Cell A completed production target for today',
      time: '15 minutes ago',
      icon: <FaCheckCircle />,
      machineId: null,
      alarmType: null
    },
    {
      id: 3,
      type: 'error',
      message: 'High rejection rate detected in Cell B',
      time: '1 hour ago',
      icon: <FaTimesCircle />,
      machineId: 'M-004',
      alarmType: ALARM_TYPES.PROGRAM
    },
    {
      id: 4,
      type: 'info',
      message: 'Operator John Smith started shift on Machine M-003',
      time: '2 hours ago',
      icon: <FaUser />,
      machineId: 'M-003',
      alarmType: null
    }
  ]
};

// Production Trends (24h)
export const productionTrends = [
  { hour: '00:00', production: 8, date: getDateString(1) },
  { hour: '02:00', production: 12, date: getDateString(1) },
  { hour: '04:00', production: 15, date: getDateString(1) },
  { hour: '06:00', production: 18, date: getDateString(1) },
  { hour: '08:00', production: 22, date: getDateString(1) },
  { hour: '10:00', production: 25, date: getDateString(1) },
  { hour: '12:00', production: 28, date: getDateString(1) },
  { hour: '14:00', production: 30, date: getDateString(1) },
  { hour: '16:00', production: 27, date: getDateString(1) },
  { hour: '18:00', production: 24, date: getDateString(1) },
  { hour: '20:00', production: 20, date: getDateString(1) },
  { hour: '22:00', production: 16, date: getDateString(1) },
  { hour: '00:00', production: 10, date: getDateString(0) },
  { hour: '02:00', production: 14, date: getDateString(0) },
  { hour: '04:00', production: 17, date: getDateString(0) },
  { hour: '06:00', production: 21, date: getDateString(0) },
  { hour: '08:00', production: 25, date: getDateString(0) },
  { hour: '10:00', production: 28, date: getDateString(0) },
  { hour: '12:00', production: 31, date: getDateString(0) },
  { hour: '14:00', production: 33, date: getDateString(0) },
  { hour: '16:00', production: 30, date: getDateString(0) },
  { hour: '18:00', production: 26, date: getDateString(0) },
  { hour: '20:00', production: 22, date: getDateString(0) },
  { hour: '22:00', production: 18, date: getDateString(0) }
];

// Quality Metrics
export const qualityMetrics = [
  { name: 'Excellent', value: 65, date: getDateString(0) },
  { name: 'Good', value: 25, date: getDateString(0) },
  { name: 'Acceptable', value: 8, date: getDateString(0) },
  { name: 'Rejected', value: 2, date: getDateString(0) }
];

// CNC Machines Data with comprehensive metrics
export const machinesData = [
  {
    id: 'M-001',
    name: 'CNC Machine 001',
    status: MACHINE_STATUS.RUNNING,
    operator: 'John Smith',
    cell: 'A',
    temperature: 45.2,
    spindleSpeed: 1200,
    feedRate: 150,
    spindleLoad: 78.5,
    jobProgress: 75.5,
    efficiency: 94.2,
    partsProduced: 28,
    rejections: 1,
    rejectionRate: 3.57,
    uptime: 96.5,
    cycleTime: 4.2,
    idleTime: 1.8,
    mttr: 42,
    mtbf: 485,
    oee: 89.2,
    availability: 96.5,
    performance: 92.1,
    quality: 96.4,
    toolNumber: 3,
    programNumber: 'P001',
    programName: 'Part_A_Production',
    executionTime: 126, // minutes
    connectedTime: 480, // minutes
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 125.5, y: 85.2, z: 45.8 },
    toolPosition: { x: 125.5, y: 85.2, z: 45.8 },
    alarms: [
      {
        id: 1,
        type: 'warning',
        code: 'TEMP_HIGH',
        message: 'Temperature approaching limit',
        time: '5 minutes ago',
        alarmType: ALARM_TYPES.TEMPERATURE
      }
    ],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 85,
      airPressure: 6.2,
      hydraulicPressure: 120
    }
  },
  {
    id: 'M-002',
    name: 'CNC Machine 002',
    status: MACHINE_STATUS.RUNNING,
    operator: 'Sarah Johnson',
    cell: 'A',
    temperature: 42.8,
    spindleSpeed: 1100,
    feedRate: 140,
    spindleLoad: 72.3,
    jobProgress: 45.2,
    efficiency: 91.8,
    partsProduced: 32,
    rejections: 2,
    rejectionRate: 6.25,
    uptime: 94.2,
    cycleTime: 3.8,
    idleTime: 2.1,
    mttr: 38,
    mtbf: 520,
    oee: 85.7,
    availability: 94.2,
    performance: 91.8,
    quality: 93.8,
    toolNumber: 2,
    programNumber: 'P002',
    programName: 'Part_C_Production',
    executionTime: 98,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 98.3, y: 67.1, z: 32.4 },
    toolPosition: { x: 98.3, y: 67.1, z: 32.4 },
    alarms: [],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 90,
      airPressure: 6.0,
      hydraulicPressure: 118
    }
  },
  {
    id: 'M-003',
    name: 'CNC Machine 003',
    status: MACHINE_STATUS.RUNNING,
    operator: 'Mike Davis',
    cell: 'A',
    temperature: 48.1,
    spindleSpeed: 1350,
    feedRate: 160,
    spindleLoad: 85.2,
    jobProgress: 88.7,
    efficiency: 96.5,
    partsProduced: 25,
    rejections: 0,
    rejectionRate: 0,
    uptime: 98.1,
    cycleTime: 3.5,
    idleTime: 1.2,
    mttr: 35,
    mtbf: 600,
    oee: 94.8,
    availability: 98.1,
    performance: 96.5,
    quality: 100,
    toolNumber: 1,
    programNumber: 'P003',
    programName: 'Part_D_Production',
    executionTime: 145,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 156.7, y: 92.8, z: 58.3 },
    toolPosition: { x: 156.7, y: 92.8, z: 58.3 },
    alarms: [],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 88,
      airPressure: 6.5,
      hydraulicPressure: 125
    }
  },
  {
    id: 'M-004',
    name: 'CNC Machine 004',
    status: MACHINE_STATUS.RUNNING,
    operator: 'Lisa Wilson',
    cell: 'B',
    temperature: 43.5,
    spindleSpeed: 1250,
    feedRate: 155,
    spindleLoad: 79.8,
    jobProgress: 62.3,
    efficiency: 89.4,
    partsProduced: 30,
    rejections: 3,
    rejectionRate: 10.0,
    uptime: 92.8,
    cycleTime: 4.8,
    idleTime: 2.5,
    mttr: 55,
    mtbf: 420,
    oee: 78.9,
    availability: 92.8,
    performance: 89.4,
    quality: 90.0,
    toolNumber: 4,
    programNumber: 'P004',
    programName: 'Part_E_Production',
    executionTime: 112,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 134.2, y: 78.9, z: 41.6 },
    toolPosition: { x: 134.2, y: 78.9, z: 41.6 },
    alarms: [
      {
        id: 2,
        type: 'error',
        code: 'REJECTION_HIGH',
        message: 'High rejection rate detected',
        time: '1 hour ago',
        alarmType: ALARM_TYPES.PROGRAM
      }
    ],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 82,
      airPressure: 5.8,
      hydraulicPressure: 115
    }
  },
  {
    id: 'M-005',
    name: 'CNC Machine 005',
    status: MACHINE_STATUS.MAINTENANCE,
    operator: 'Tom Brown',
    cell: 'B',
    temperature: 39.2,
    spindleSpeed: 0,
    feedRate: 0,
    spindleLoad: 0,
    jobProgress: 0,
    efficiency: 0,
    partsProduced: 0,
    rejections: 0,
    rejectionRate: 0,
    uptime: 85.5,
    cycleTime: 0,
    idleTime: 0,
    mttr: 120,
    mtbf: 380,
    oee: 0,
    availability: 85.5,
    performance: 0,
    quality: 0,
    toolNumber: 0,
    programNumber: '',
    programName: '',
    executionTime: 0,
    connectedTime: 480,
    coolantStatus: 'OFF',
    doorStatus: 'OPEN',
    axisPosition: { x: 0, y: 0, z: 0 },
    toolPosition: { x: 0, y: 0, z: 0 },
    alarms: [
      {
        id: 3,
        type: 'info',
        code: 'MAINTENANCE',
        message: 'Machine paused for maintenance',
        time: '30 minutes ago',
        alarmType: ALARM_TYPES.MAINTENANCE
      }
    ],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 0,
      airPressure: 0,
      hydraulicPressure: 0
    }
  },
  {
    id: 'M-006',
    name: 'CNC Machine 006',
    status: MACHINE_STATUS.RUNNING,
    operator: 'Emma Garcia',
    cell: 'B',
    temperature: 46.7,
    spindleSpeed: 1300,
    feedRate: 165,
    spindleLoad: 82.1,
    jobProgress: 33.8,
    efficiency: 87.2,
    partsProduced: 18,
    rejections: 2,
    rejectionRate: 11.11,
    uptime: 90.3,
    cycleTime: 5.2,
    idleTime: 3.1,
    mttr: 65,
    mtbf: 350,
    oee: 72.4,
    availability: 90.3,
    performance: 87.2,
    quality: 88.9,
    toolNumber: 2,
    programNumber: 'P006',
    programName: 'Part_F_Production',
    executionTime: 78,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 112.5, y: 65.3, z: 28.7 },
    toolPosition: { x: 112.5, y: 65.3, z: 28.7 },
    alarms: [],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 87,
      airPressure: 6.1,
      hydraulicPressure: 122
    }
  },
  {
    id: 'M-007',
    name: 'CNC Machine 007',
    status: MACHINE_STATUS.RUNNING,
    operator: 'David Lee',
    cell: 'C',
    temperature: 41.9,
    spindleSpeed: 1150,
    feedRate: 145,
    spindleLoad: 75.6,
    jobProgress: 91.2,
    efficiency: 97.8,
    partsProduced: 22,
    rejections: 0,
    rejectionRate: 0,
    uptime: 99.2,
    cycleTime: 3.2,
    idleTime: 0.8,
    mttr: 28,
    mtbf: 650,
    oee: 97.1,
    availability: 99.2,
    performance: 97.8,
    quality: 100,
    toolNumber: 1,
    programNumber: 'P007',
    programName: 'Part_G_Production',
    executionTime: 156,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 89.4, y: 52.1, z: 23.8 },
    toolPosition: { x: 89.4, y: 52.1, z: 23.8 },
    alarms: [],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 92,
      airPressure: 6.3,
      hydraulicPressure: 128
    }
  },
  {
    id: 'M-008',
    name: 'CNC Machine 008',
    status: MACHINE_STATUS.RUNNING,
    operator: 'David Lee',
    cell: 'C',
    temperature: 44.3,
    spindleSpeed: 1200,
    feedRate: 150,
    spindleLoad: 78.9,
    jobProgress: 78.9,
    efficiency: 95.1,
    partsProduced: 23,
    rejections: 1,
    rejectionRate: 4.35,
    uptime: 97.8,
    cycleTime: 3.6,
    idleTime: 1.5,
    mttr: 32,
    mtbf: 580,
    oee: 92.3,
    availability: 97.8,
    performance: 95.1,
    quality: 95.7,
    toolNumber: 3,
    programNumber: 'P008',
    programName: 'Part_H_Production',
    executionTime: 134,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 145.8, y: 88.2, z: 51.3 },
    toolPosition: { x: 145.8, y: 88.2, z: 51.3 },
    alarms: [],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 89,
      airPressure: 6.0,
      hydraulicPressure: 124
    }
  },
  {
    id: 'M-009',
    name: 'CNC Machine 009',
    status: MACHINE_STATUS.ERROR,
    operator: 'Alex Chen',
    cell: 'D',
    temperature: 38.5,
    spindleSpeed: 0,
    feedRate: 0,
    spindleLoad: 0,
    jobProgress: 0,
    efficiency: 0,
    partsProduced: 0,
    rejections: 0,
    rejectionRate: 0,
    uptime: 82.1,
    cycleTime: 0,
    idleTime: 0,
    mttr: 180,
    mtbf: 320,
    oee: 0,
    availability: 82.1,
    performance: 0,
    quality: 0,
    toolNumber: 0,
    programNumber: '',
    programName: '',
    executionTime: 0,
    connectedTime: 480,
    coolantStatus: 'OFF',
    doorStatus: 'OPEN',
    axisPosition: { x: 0, y: 0, z: 0 },
    toolPosition: { x: 0, y: 0, z: 0 },
    alarms: [
      {
        id: 4,
        type: 'error',
        code: 'SYSTEM_ERROR',
        message: 'Machine stopped due to error',
        time: '2 hours ago',
        alarmType: ALARM_TYPES.POWER
      }
    ],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'OFF',
    sensorInputs: {
      coolantFlow: 0,
      airPressure: 0,
      hydraulicPressure: 0
    }
  },
  {
    id: 'M-010',
    name: 'CNC Machine 010',
    status: MACHINE_STATUS.RUNNING,
    operator: 'Alex Chen',
    cell: 'D',
    temperature: 47.2,
    spindleSpeed: 1280,
    feedRate: 158,
    spindleLoad: 81.3,
    jobProgress: 55.6,
    efficiency: 86.3,
    partsProduced: 19,
    rejections: 2,
    rejectionRate: 10.53,
    uptime: 88.9,
    cycleTime: 4.5,
    idleTime: 2.8,
    mttr: 75,
    mtbf: 400,
    oee: 76.8,
    availability: 88.9,
    performance: 86.3,
    quality: 89.5,
    toolNumber: 2,
    programNumber: 'P010',
    programName: 'Part_I_Production',
    executionTime: 98,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 167.3, y: 95.6, z: 62.1 },
    toolPosition: { x: 167.3, y: 95.6, z: 62.1 },
    alarms: [],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 85,
      airPressure: 5.9,
      hydraulicPressure: 120
    }
  },
  {
    id: 'M-011',
    name: 'CNC Machine 011',
    status: MACHINE_STATUS.RUNNING,
    operator: 'Maria Rodriguez',
    cell: 'D',
    temperature: 42.1,
    spindleSpeed: 1180,
    feedRate: 148,
    spindleLoad: 76.8,
    jobProgress: 42.1,
    efficiency: 84.7,
    partsProduced: 18,
    rejections: 1,
    rejectionRate: 5.56,
    uptime: 86.4,
    cycleTime: 4.8,
    idleTime: 3.2,
    mttr: 85,
    mtbf: 380,
    oee: 71.2,
    availability: 86.4,
    performance: 84.7,
    quality: 94.4,
    toolNumber: 1,
    programNumber: 'P011',
    programName: 'Part_J_Production',
    executionTime: 76,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 123.7, y: 71.4, z: 38.9 },
    toolPosition: { x: 123.7, y: 71.4, z: 38.9 },
    alarms: [],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 88,
      airPressure: 6.2,
      hydraulicPressure: 125
    }
  },
  {
    id: 'M-012',
    name: 'CNC Machine 012',
    status: MACHINE_STATUS.RUNNING,
    operator: 'James Wilson',
    cell: 'B',
    temperature: 45.8,
    spindleSpeed: 1320,
    feedRate: 162,
    spindleLoad: 83.7,
    jobProgress: 67.3,
    efficiency: 88.9,
    partsProduced: 26,
    rejections: 2,
    rejectionRate: 7.69,
    uptime: 91.7,
    cycleTime: 4.1,
    idleTime: 2.3,
    mttr: 48,
    mtbf: 450,
    oee: 82.1,
    availability: 91.7,
    performance: 88.9,
    quality: 92.3,
    toolNumber: 3,
    programNumber: 'P012',
    programName: 'Part_K_Production',
    executionTime: 108,
    connectedTime: 480,
    coolantStatus: 'ON',
    doorStatus: 'CLOSED',
    axisPosition: { x: 178.9, y: 102.3, z: 67.5 },
    toolPosition: { x: 178.9, y: 102.3, z: 67.5 },
    alarms: [],
    date: getDateString(0),
    shift: 'Day',
    powerStatus: 'ON',
    sensorInputs: {
      coolantFlow: 90,
      airPressure: 6.4,
      hydraulicPressure: 126
    }
  }
];

// Cells Data with CNC-specific metrics
export const cellsData = [
  {
    id: 'A',
    name: 'Cell A',
    machines: 3,
    operators: 2,
    efficiency: 92.5,
    production: 85,
    rejections: 2,
    rejectionRate: 2.35,
    status: 'running',
    date: getDateString(0),
    oee: 89.8,
    availability: 96.3,
    performance: 92.5,
    quality: 97.6,
    averageCycleTime: 3.8,
    averageIdleTime: 1.5,
    averageMTTR: 38,
    averageMTBF: 535,
    bottleneckMachine: 'M-001',
    coordinationStatus: 'optimal',
    changeoverTime: 12.5
  },
  {
    id: 'B',
    name: 'Cell B',
    machines: 4,
    operators: 3,
    efficiency: 88.2,
    production: 78,
    rejections: 5,
    rejectionRate: 6.41,
    status: 'running',
    date: getDateString(0),
    oee: 78.9,
    availability: 89.7,
    performance: 88.2,
    quality: 93.6,
    averageCycleTime: 4.4,
    averageIdleTime: 2.4,
    averageMTTR: 62,
    averageMTBF: 400,
    bottleneckMachine: 'M-004',
    coordinationStatus: 'suboptimal',
    changeoverTime: 18.2
  },
  {
    id: 'C',
    name: 'Cell C',
    machines: 2,
    operators: 1,
    efficiency: 95.1,
    production: 45,
    rejections: 1,
    rejectionRate: 2.22,
    status: 'running',
    date: getDateString(0),
    oee: 94.7,
    availability: 98.5,
    performance: 95.1,
    quality: 97.8,
    averageCycleTime: 3.4,
    averageIdleTime: 1.0,
    averageMTTR: 30,
    averageMTBF: 615,
    bottleneckMachine: 'M-007',
    coordinationStatus: 'optimal',
    changeoverTime: 8.5
  },
  {
    id: 'D',
    name: 'Cell D',
    machines: 3,
    operators: 2,
    efficiency: 85.7,
    production: 37,
    rejections: 3,
    rejectionRate: 8.11,
    status: 'paused',
    date: getDateString(0),
    oee: 74.2,
    availability: 87.3,
    performance: 85.7,
    quality: 91.8,
    averageCycleTime: 4.7,
    averageIdleTime: 3.0,
    averageMTTR: 93,
    averageMTBF: 367,
    bottleneckMachine: 'M-009',
    coordinationStatus: 'poor',
    changeoverTime: 25.8
  }
];

// Operators Data with CNC-specific metrics
export const operatorsData = [
  {
    id: 'OP-001',
    name: 'John Smith',
    status: 'active',
    efficiency: 94.2,
    hoursWorked: 8.5,
    partsProduced: 28,
    qualityScore: 98.5,
    assignedMachines: 1,
    activeJobs: 2,
    rejections: 1,
    rejectionRate: 3.57,
    date: getDateString(0),
    shift: 'Day',
    fpy: 96.4, // First Pass Yield
    toolChangeFrequency: 2.3, // per shift
    errorFrequency: 0.5, // per shift
    overloadEvents: 1,
    spindleLoadDeviations: 2,
    processDrift: 0.8, // percentage
    currentTasks: [
      { machine: 'M-001', task: 'Production run - Part A', progress: 75 },
      { machine: 'M-001', task: 'Setup for Part B', progress: 0 }
    ],
    cncMetrics: {
      averageCycleTime: 4.2,
      averageIdleTime: 1.8,
      spindleUtilization: 78.5,
      toolWearRate: 0.15,
      programEfficiency: 94.2
    }
  },
  {
    id: 'OP-002',
    name: 'Sarah Johnson',
    status: 'active',
    efficiency: 91.8,
    hoursWorked: 8.0,
    partsProduced: 32,
    qualityScore: 96.8,
    assignedMachines: 1,
    activeJobs: 1,
    rejections: 2,
    rejectionRate: 6.25,
    date: getDateString(0),
    shift: 'Day',
    fpy: 93.8,
    toolChangeFrequency: 1.8,
    errorFrequency: 0.8,
    overloadEvents: 2,
    spindleLoadDeviations: 3,
    processDrift: 1.2,
    currentTasks: [
      { machine: 'M-002', task: 'Production run - Part C', progress: 45 }
    ],
    cncMetrics: {
      averageCycleTime: 3.8,
      averageIdleTime: 2.1,
      spindleUtilization: 72.3,
      toolWearRate: 0.12,
      programEfficiency: 91.8
    }
  },
  {
    id: 'OP-003',
    name: 'Mike Davis',
    status: 'active',
    efficiency: 96.5,
    hoursWorked: 7.5,
    partsProduced: 25,
    qualityScore: 99.2,
    assignedMachines: 1,
    activeJobs: 1,
    rejections: 0,
    rejectionRate: 0,
    date: getDateString(0),
    shift: 'Day',
    fpy: 100.0,
    toolChangeFrequency: 1.5,
    errorFrequency: 0.2,
    overloadEvents: 0,
    spindleLoadDeviations: 1,
    processDrift: 0.3,
    currentTasks: [
      { machine: 'M-003', task: 'Production run - Part D', progress: 89 }
    ],
    cncMetrics: {
      averageCycleTime: 3.5,
      averageIdleTime: 1.2,
      spindleUtilization: 85.2,
      toolWearRate: 0.08,
      programEfficiency: 96.5
    }
  },
  {
    id: 'OP-004',
    name: 'Lisa Wilson',
    status: 'break',
    efficiency: 89.4,
    hoursWorked: 6.0,
    partsProduced: 30,
    qualityScore: 94.1,
    assignedMachines: 1,
    activeJobs: 0,
    rejections: 3,
    rejectionRate: 10.0,
    date: getDateString(0),
    shift: 'Day',
    fpy: 90.0,
    toolChangeFrequency: 3.2,
    errorFrequency: 1.5,
    overloadEvents: 4,
    spindleLoadDeviations: 5,
    processDrift: 2.1,
    currentTasks: [],
    cncMetrics: {
      averageCycleTime: 4.8,
      averageIdleTime: 2.5,
      spindleUtilization: 79.8,
      toolWearRate: 0.25,
      programEfficiency: 89.4
    }
  },
  {
    id: 'OP-005',
    name: 'Tom Brown',
    status: 'active',
    efficiency: 87.2,
    hoursWorked: 8.0,
    partsProduced: 18,
    qualityScore: 92.3,
    assignedMachines: 1,
    activeJobs: 1,
    rejections: 2,
    rejectionRate: 11.11,
    date: getDateString(0),
    shift: 'Day',
    fpy: 88.9,
    toolChangeFrequency: 2.8,
    errorFrequency: 1.2,
    overloadEvents: 3,
    spindleLoadDeviations: 4,
    processDrift: 1.8,
    currentTasks: [
      { machine: 'M-006', task: 'Production run - Part E', progress: 34 }
    ],
    cncMetrics: {
      averageCycleTime: 5.2,
      averageIdleTime: 3.1,
      spindleUtilization: 82.1,
      toolWearRate: 0.22,
      programEfficiency: 87.2
    }
  },
  {
    id: 'OP-006',
    name: 'Emma Garcia',
    status: 'active',
    efficiency: 97.8,
    hoursWorked: 8.5,
    partsProduced: 22,
    qualityScore: 99.8,
    assignedMachines: 1,
    activeJobs: 1,
    rejections: 0,
    rejectionRate: 0,
    date: getDateString(0),
    shift: 'Day',
    fpy: 100.0,
    toolChangeFrequency: 1.2,
    errorFrequency: 0.1,
    overloadEvents: 0,
    spindleLoadDeviations: 0,
    processDrift: 0.2,
    currentTasks: [
      { machine: 'M-007', task: 'Production run - Part F', progress: 91 }
    ],
    cncMetrics: {
      averageCycleTime: 3.2,
      averageIdleTime: 0.8,
      spindleUtilization: 75.6,
      toolWearRate: 0.06,
      programEfficiency: 97.8
    }
  },
  {
    id: 'OP-007',
    name: 'David Lee',
    status: 'active',
    efficiency: 95.1,
    hoursWorked: 8.0,
    partsProduced: 23,
    qualityScore: 98.9,
    assignedMachines: 2,
    activeJobs: 2,
    rejections: 1,
    rejectionRate: 4.35,
    date: getDateString(0),
    shift: 'Day',
    fpy: 95.7,
    toolChangeFrequency: 1.9,
    errorFrequency: 0.6,
    overloadEvents: 1,
    spindleLoadDeviations: 2,
    processDrift: 0.9,
    currentTasks: [
      { machine: 'M-008', task: 'Production run - Part G', progress: 79 },
      { machine: 'M-007', task: 'Quality check', progress: 100 }
    ],
    cncMetrics: {
      averageCycleTime: 3.6,
      averageIdleTime: 1.5,
      spindleUtilization: 78.9,
      toolWearRate: 0.11,
      programEfficiency: 95.1
    }
  },
  {
    id: 'OP-008',
    name: 'Alex Chen',
    status: 'active',
    efficiency: 84.7,
    hoursWorked: 7.0,
    partsProduced: 18,
    qualityScore: 90.5,
    assignedMachines: 2,
    activeJobs: 1,
    rejections: 2,
    rejectionRate: 11.11,
    date: getDateString(0),
    shift: 'Day',
    fpy: 88.9,
    toolChangeFrequency: 3.5,
    errorFrequency: 1.8,
    overloadEvents: 5,
    spindleLoadDeviations: 6,
    processDrift: 2.5,
    currentTasks: [
      { machine: 'M-010', task: 'Production run - Part H', progress: 56 }
    ],
    cncMetrics: {
      averageCycleTime: 4.5,
      averageIdleTime: 2.8,
      spindleUtilization: 81.3,
      toolWearRate: 0.28,
      programEfficiency: 84.7
    }
  },
  {
    id: 'OP-009',
    name: 'Maria Rodriguez',
    status: 'active',
    efficiency: 86.3,
    hoursWorked: 8.0,
    partsProduced: 18,
    qualityScore: 93.2,
    assignedMachines: 1,
    activeJobs: 1,
    rejections: 1,
    rejectionRate: 5.56,
    date: getDateString(0),
    shift: 'Day',
    fpy: 94.4,
    toolChangeFrequency: 2.1,
    errorFrequency: 0.9,
    overloadEvents: 2,
    spindleLoadDeviations: 3,
    processDrift: 1.1,
    currentTasks: [
      { machine: 'M-011', task: 'Production run - Part I', progress: 42 }
    ],
    cncMetrics: {
      averageCycleTime: 4.8,
      averageIdleTime: 3.2,
      spindleUtilization: 76.8,
      toolWearRate: 0.18,
      programEfficiency: 86.3
    }
  },
  {
    id: 'OP-010',
    name: 'James Wilson',
    status: 'active',
    efficiency: 88.9,
    hoursWorked: 8.5,
    partsProduced: 26,
    qualityScore: 95.7,
    assignedMachines: 1,
    activeJobs: 1,
    rejections: 2,
    rejectionRate: 7.69,
    date: getDateString(0),
    shift: 'Day',
    fpy: 92.3,
    toolChangeFrequency: 2.0,
    errorFrequency: 0.7,
    overloadEvents: 2,
    spindleLoadDeviations: 3,
    processDrift: 1.0,
    currentTasks: [
      { machine: 'M-012', task: 'Production run - Part J', progress: 67 }
    ],
    cncMetrics: {
      averageCycleTime: 4.1,
      averageIdleTime: 2.3,
      spindleUtilization: 83.7,
      toolWearRate: 0.14,
      programEfficiency: 88.9
    }
  }
];

// Operator Performance for Charts
export const operatorPerformance = [
  { name: 'John Smith', efficiency: 94.2, rejections: 1 },
  { name: 'Sarah Johnson', efficiency: 91.8, rejections: 2 },
  { name: 'Mike Davis', efficiency: 96.5, rejections: 0 },
  { name: 'Lisa Wilson', efficiency: 89.4, rejections: 3 },
  { name: 'Tom Brown', efficiency: 87.2, rejections: 2 },
  { name: 'Emma Garcia', efficiency: 97.8, rejections: 0 },
  { name: 'David Lee', efficiency: 95.1, rejections: 1 },
  { name: 'Alex Chen', efficiency: 84.7, rejections: 2 },
  { name: 'Maria Rodriguez', efficiency: 86.3, rejections: 1 },
  { name: 'James Wilson', efficiency: 88.9, rejections: 2 }
];

// Dropdown options
export const cellOptions = [
  { value: '', label: 'All Cells' },
  ...cellsData.map(cell => ({ value: cell.id, label: cell.name }))
];

export const machineOptions = [
  { value: '', label: 'All Machines' },
  ...machinesData.map(machine => ({ value: machine.id, label: machine.name }))
];

export const operatorOptions = [
  { value: '', label: 'All Operators' },
  ...operatorsData.map(operator => ({ value: operator.id, label: operator.name }))
]; 