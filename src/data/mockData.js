// Mock data for CNC Dashboard
import { 
  FaCogs, FaIndustry, FaUsers, FaChartLine, FaChartBar, 
  FaIndustry as FaIndustryIcon, FaEye, FaUser, FaFileAlt,
  FaExclamationTriangle, FaCheckCircle, FaClock, FaThermometerHalf,
  FaTachometerAlt, FaShieldAlt, FaTimesCircle
} from 'react-icons/fa';

// Colors for charts
export const COLORS = ['#1b85b8', '#2d3748', '#718096', '#f6ad55', '#68d391'];

// Helper function to get current date and past dates
const getDateString = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
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
  alerts: [
    {
      id: 1,
      type: 'warning',
      message: 'Machine M-001 temperature exceeding normal range',
      time: '2 minutes ago',
      icon: <FaThermometerHalf />
    },
    {
      id: 2,
      type: 'success',
      message: 'Cell A completed production target for today',
      time: '15 minutes ago',
      icon: <FaCheckCircle />
    },
    {
      id: 3,
      type: 'error',
      message: 'High rejection rate detected in Cell B',
      time: '1 hour ago',
      icon: <FaTimesCircle />
    },
    {
      id: 4,
      type: 'info',
      message: 'Operator John Smith started shift on Machine M-003',
      time: '2 hours ago',
      icon: <FaUser />
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

// Cells Data
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
    date: getDateString(0)
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
    date: getDateString(0)
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
    date: getDateString(0)
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
    date: getDateString(0)
  }
];

// Machines Data
export const machinesData = [
  {
    id: 'M-001',
    name: 'CNC Machine 001',
    status: 'running',
    operator: 'John Smith',
    cell: 'A',
    temperature: 45.2,
    spindleSpeed: 1200,
    feedRate: 150,
    jobProgress: 75.5,
    efficiency: 94.2,
    partsProduced: 28,
    rejections: 1,
    rejectionRate: 3.57,
    uptime: 96.5,
    date: getDateString(0),
    alerts: [
      {
        id: 1,
        type: 'warning',
        message: 'Temperature approaching limit',
        time: '5 minutes ago'
      }
    ]
  },
  {
    id: 'M-002',
    name: 'CNC Machine 002',
    status: 'running',
    operator: 'Sarah Johnson',
    cell: 'A',
    temperature: 42.8,
    spindleSpeed: 1100,
    feedRate: 140,
    jobProgress: 45.2,
    efficiency: 91.8,
    partsProduced: 32,
    rejections: 2,
    rejectionRate: 6.25,
    uptime: 94.2,
    date: getDateString(0),
    alerts: []
  },
  {
    id: 'M-003',
    name: 'CNC Machine 003',
    status: 'running',
    operator: 'Mike Davis',
    cell: 'A',
    temperature: 48.1,
    spindleSpeed: 1350,
    feedRate: 160,
    jobProgress: 88.7,
    efficiency: 96.5,
    partsProduced: 25,
    rejections: 0,
    rejectionRate: 0,
    uptime: 98.1,
    date: getDateString(0),
    alerts: []
  },
  {
    id: 'M-004',
    name: 'CNC Machine 004',
    status: 'running',
    operator: 'Lisa Wilson',
    cell: 'B',
    temperature: 43.5,
    spindleSpeed: 1250,
    feedRate: 155,
    jobProgress: 62.3,
    efficiency: 89.4,
    partsProduced: 30,
    rejections: 3,
    rejectionRate: 10.0,
    uptime: 92.8,
    date: getDateString(0),
    alerts: [
      {
        id: 2,
        type: 'error',
        message: 'High rejection rate detected',
        time: '1 hour ago'
      }
    ]
  },
  {
    id: 'M-005',
    name: 'CNC Machine 005',
    status: 'paused',
    operator: 'Tom Brown',
    cell: 'B',
    temperature: 39.2,
    spindleSpeed: 0,
    feedRate: 0,
    jobProgress: 0,
    efficiency: 0,
    partsProduced: 0,
    rejections: 0,
    rejectionRate: 0,
    uptime: 85.5,
    date: getDateString(0),
    alerts: [
      {
        id: 3,
        type: 'info',
        message: 'Machine paused for maintenance',
        time: '30 minutes ago'
      }
    ]
  },
  {
    id: 'M-006',
    name: 'CNC Machine 006',
    status: 'running',
    operator: 'Emma Garcia',
    cell: 'B',
    temperature: 46.7,
    spindleSpeed: 1300,
    feedRate: 165,
    jobProgress: 33.8,
    efficiency: 87.2,
    partsProduced: 18,
    rejections: 2,
    rejectionRate: 11.11,
    uptime: 90.3,
    date: getDateString(0),
    alerts: []
  },
  {
    id: 'M-007',
    name: 'CNC Machine 007',
    status: 'running',
    operator: 'David Lee',
    cell: 'C',
    temperature: 41.9,
    spindleSpeed: 1150,
    feedRate: 145,
    jobProgress: 91.2,
    efficiency: 97.8,
    partsProduced: 22,
    rejections: 0,
    rejectionRate: 0,
    uptime: 99.2,
    date: getDateString(0),
    alerts: []
  },
  {
    id: 'M-008',
    name: 'CNC Machine 008',
    status: 'running',
    operator: 'David Lee',
    cell: 'C',
    temperature: 44.3,
    spindleSpeed: 1200,
    feedRate: 150,
    jobProgress: 78.9,
    efficiency: 95.1,
    partsProduced: 23,
    rejections: 1,
    rejectionRate: 4.35,
    uptime: 97.8,
    date: getDateString(0),
    alerts: []
  },
  {
    id: 'M-009',
    name: 'CNC Machine 009',
    status: 'stopped',
    operator: 'Alex Chen',
    cell: 'D',
    temperature: 38.5,
    spindleSpeed: 0,
    feedRate: 0,
    jobProgress: 0,
    efficiency: 0,
    partsProduced: 0,
    rejections: 0,
    rejectionRate: 0,
    uptime: 82.1,
    date: getDateString(0),
    alerts: [
      {
        id: 4,
        type: 'error',
        message: 'Machine stopped due to error',
        time: '2 hours ago'
      }
    ]
  },
  {
    id: 'M-010',
    name: 'CNC Machine 010',
    status: 'running',
    operator: 'Alex Chen',
    cell: 'D',
    temperature: 47.2,
    spindleSpeed: 1280,
    feedRate: 158,
    jobProgress: 55.6,
    efficiency: 86.3,
    partsProduced: 19,
    rejections: 2,
    rejectionRate: 10.53,
    uptime: 88.9,
    date: getDateString(0),
    alerts: []
  },
  {
    id: 'M-011',
    name: 'CNC Machine 011',
    status: 'running',
    operator: 'Maria Rodriguez',
    cell: 'D',
    temperature: 42.1,
    spindleSpeed: 1180,
    feedRate: 148,
    jobProgress: 42.1,
    efficiency: 84.7,
    partsProduced: 18,
    rejections: 1,
    rejectionRate: 5.56,
    uptime: 86.4,
    date: getDateString(0),
    alerts: []
  },
  {
    id: 'M-012',
    name: 'CNC Machine 012',
    status: 'running',
    operator: 'James Wilson',
    cell: 'B',
    temperature: 45.8,
    spindleSpeed: 1320,
    feedRate: 162,
    jobProgress: 67.3,
    efficiency: 88.9,
    partsProduced: 26,
    rejections: 2,
    rejectionRate: 7.69,
    uptime: 91.7,
    date: getDateString(0),
    alerts: []
  }
];

// Operators Data
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
    currentTasks: [
      { machine: 'M-001', task: 'Production run - Part A', progress: 75 },
      { machine: 'M-001', task: 'Setup for Part B', progress: 0 }
    ]
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
    currentTasks: [
      { machine: 'M-002', task: 'Production run - Part C', progress: 45 }
    ]
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
    currentTasks: [
      { machine: 'M-003', task: 'Production run - Part D', progress: 89 }
    ]
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
    currentTasks: []
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
    currentTasks: [
      { machine: 'M-006', task: 'Production run - Part E', progress: 34 }
    ]
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
    currentTasks: [
      { machine: 'M-007', task: 'Production run - Part F', progress: 91 }
    ]
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
    currentTasks: [
      { machine: 'M-008', task: 'Production run - Part G', progress: 79 },
      { machine: 'M-007', task: 'Quality check', progress: 100 }
    ]
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
    currentTasks: [
      { machine: 'M-010', task: 'Production run - Part H', progress: 56 }
    ]
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
    currentTasks: [
      { machine: 'M-011', task: 'Production run - Part I', progress: 42 }
    ]
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
    currentTasks: [
      { machine: 'M-012', task: 'Production run - Part J', progress: 67 }
    ]
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