import React, { useState, useEffect } from 'react';
import { 
  FaRaspberryPi, FaCogs, FaDatabase, FaChartLine, FaDesktop, 
  FaWifi, FaUsb, FaMicrochip, FaServer, FaCloud, FaMobile,
  FaExclamationTriangle, FaCheckCircle, FaUser,
  FaArrowRight, FaArrowDown, FaSync, FaEye,
  FaThermometerHalf, FaTachometerAlt, FaCog, FaIndustry,
  FaArrowLeft, FaNetworkWired, FaShieldAlt, FaBolt,
  FaPlay, FaPause, FaUndo, FaSave, FaTablet, FaEnvelope,FaWrench
} from 'react-icons/fa';
import { 
  SiArduino, SiMqtt, SiInfluxdb, SiReact, SiJavascript,
  SiPython, SiNodedotjs, SiPostgresql, SiRedis,
  SiDocker, SiAmazonaws, SiGooglecloud, SiMicrosoftazure
} from 'react-icons/si';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid
} from 'recharts';
import '../styles/DemoView.css';

const DemoView = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [currentDataPoint, setCurrentDataPoint] = useState(0);
  const [isCollecting, setIsCollecting] = useState(false);
  const [manualEntryData, setManualEntryData] = useState({
    rejectionReason: '',
    downtimeReason: '',
    qualityScore: '',
    operatorNotes: ''
  });

  // Simulated real-time data
  const [liveData, setLiveData] = useState({
    temperature: 45.2,
    spindleSpeed: 1200,
    efficiency: 94.2,
    oee: 89.2,
    partsProduced: 28,
    rejections: 1
  });

  useEffect(() => {
    if (isCollecting) {
      const interval = setInterval(() => {
        setLiveData(prev => ({
          temperature: prev.temperature + (Math.random() - 0.5) * 2,
          spindleSpeed: prev.spindleSpeed + (Math.random() - 0.5) * 50,
          efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
          oee: Math.max(80, Math.min(95, prev.oee + (Math.random() - 0.5) * 1.5)),
          partsProduced: prev.partsProduced + Math.floor(Math.random() * 2),
          rejections: prev.rejections + Math.floor(Math.random() * 2)
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isCollecting]);

  const workflowSteps = [
    {
      id: 0,
      title: "Hardware Integration",
      subtitle: "Raspberry Pi & CNC Connection",
      icon: <FaRaspberryPi />,
      description: "Complete hardware integration with Raspberry Pi and CNC machine communication protocols",
      details: [
        "Raspberry Pi 4 Model B with 8GB RAM",
        "USB/GPIO/Ethernet connections to CNC",
        "Machine communication protocols setup",
        "Real-time data acquisition setup",
        "Network connectivity and security"
      ],
      visual: "hardware-integration",
      subSteps: [
        "Physical connection setup",
        "Communication protocol configuration",
        "Network security implementation",
        "Data validation testing",
        "Connection verification"
      ]
    },
    {
      id: 1,
      title: "Data Collection System",
      subtitle: "Real-time Machine Monitoring",
      icon: <FaMicrochip />,
      description: "Comprehensive data collection from CNC/VNC machine parameters",
      details: [
        "Modbus TCP/RTU communication",
        "OPC UA protocol support",
        "Custom serial protocols",
        "Real-time data buffering",
        "Data quality validation"
      ],
      visual: "data-collection",
      subSteps: [
        "Machine parameter monitoring",
        "Data preprocessing",
        "Quality checks",
        "Buffer management",
        "Protocol handling"
      ]
    },
    {
      id: 2,
      title: "Edge Processing",
      subtitle: "Local Data Analytics",
      icon: <FaCogs />,
      description: "Advanced edge computing for real-time data processing and analytics",
      details: [
        "OEE calculation algorithms",
        "Predictive maintenance models",
        "Anomaly detection systems",
        "Performance optimization",
        "Local decision making"
      ],
      visual: "edge-processing",
      subSteps: [
        "Raw data processing",
        "KPI calculations",
        "Trend analysis",
        "Alert generation",
        "Performance optimization"
      ]
    },
    {
      id: 3,
      title: "Data Transmission",
      subtitle: "Secure Cloud Communication",
      icon: <FaWifi />,
      description: "Secure and reliable data transmission to cloud infrastructure",
      details: [
        "MQTT protocol for real-time messaging",
        "HTTP REST APIs for batch data",
        "SSL/TLS encryption",
        "Automatic reconnection handling",
        "Data compression and optimization"
      ],
      visual: "data-transmission",
      subSteps: [
        "Protocol selection",
        "Encryption setup",
        "Connection management",
        "Data packaging",
        "Transmission monitoring"
      ]
    },
    {
      id: 4,
      title: "Manual Data Entry",
      subtitle: "Operator Interface & Quality Control",
      icon: <FaUser />,
      description: "Comprehensive manual data entry system for operators and quality control",
      details: [
        "Rejection reason documentation",
        "Downtime cause recording",
        "Quality inspection results",
        "Maintenance activity logging",
        "Operator performance tracking"
      ],
      visual: "manual-entry",
      subSteps: [
        "Quality data entry",
        "Downtime logging",
        "Maintenance records",
        "Operator feedback",
        "Data validation"
      ]
    },
    {
      id: 5,
      title: "Data Storage & Management",
      subtitle: "Multi-Database Architecture",
      icon: <FaServer />,
      description: "Scalable multi-database architecture for different types of data",
      details: [
        "InfluxDB for time-series data",
        "PostgreSQL for relational data",
        "Redis for caching",
        "Data retention policies",
        "Backup and recovery systems"
      ],
      visual: "data-storage",
      subSteps: [
        "Database setup",
        "Schema design",
        "Indexing optimization",
        "Backup configuration",
        "Performance tuning"
      ]
    },
    {
      id: 6,
      title: "Six Sigma Analytics",
      subtitle: "Quality Management & Process Improvement",
      icon: <FaChartLine />,
      description: "Advanced Six Sigma analysis for quality control and process optimization",
      details: [
        "DMAIC methodology implementation",
        "Statistical process control (SPC)",
        "Process capability analysis (Cp/Cpk)",
        "Defect rate tracking (DPMO)",
        "Root cause analysis tools"
      ],
      visual: "six-sigma",
      subSteps: [
        "Data collection for Six Sigma",
        "Statistical analysis setup",
        "Control chart generation",
        "Process capability calculation",
        "Improvement recommendations"
      ]
    },
    {
      id: 7,
      title: "Real-time Dashboard",
      subtitle: "Live Monitoring & Analytics",
      icon: <FaDesktop />,
      description: "Advanced real-time dashboard with comprehensive monitoring and analytics",
      details: [
        "Live OEE monitoring",
        "Real-time alerts and notifications",
        "Interactive charts and graphs",
        "Mobile-responsive design",
        "Multi-user access control"
      ],
      visual: "dashboard",
      subSteps: [
        "Dashboard layout",
        "Real-time updates",
        "Interactive features",
        "Mobile optimization",
        "User management"
      ]
    },
    {
      id: 8,
      title: "Daily Brief Email System",
      subtitle: "Automated Daily Reports & Insights",
      icon: <FaEnvelope />,
      description: "Automated daily brief emails with comprehensive shop floor insights and actionable intelligence",
      details: [
        "24-hour automated email generation",
        "Comprehensive shop floor summary",
        "Performance metrics and KPIs",
        "Blockers and challenges identification",
        "Actionable recommendations and insights"
      ],
      visual: "daily-brief",
      subSteps: [
        "Data aggregation and analysis",
        "Report template generation",
        "Email automation setup",
        "Recipient management",
        "Delivery scheduling"
      ]
    },
    {
      id: 9,
      title: "AI-Powered Predictive Analytics",
      subtitle: "Machine Learning & Predictive Insights",
      icon: <FaBolt />,
      description: "Advanced AI models for predictive maintenance, quality forecasting, and operational optimization",
      details: [
        "Predictive maintenance scheduling",
        "Quality defect prediction",
        "Production output forecasting",
        "Tool wear prediction",
        "Energy consumption optimization"
      ],
      visual: "ai-predictions",
      subSteps: [
        "Data preprocessing and feature engineering",
        "Model training and validation",
        "Real-time prediction deployment",
        "Alert system integration",
        "Continuous model improvement"
      ]
    }
  ];

  const nextStep = () => {
    if (activeStep < workflowSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep(activeStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep(activeStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToStep = (step) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveStep(step);
      setIsAnimating(false);
    }, 300);
  };

  const currentStep = workflowSteps[activeStep];

  // Simulated data for charts
  const oeeData = [
    { name: 'Availability', value: 96.5, target: 95 },
    { name: 'Performance', value: 92.1, target: 90 },
    { name: 'Quality', value: 96.4, target: 95 },
    { name: 'Overall OEE', value: 89.2, target: 85 }
  ];

  const performanceTrends = [
    { hour: '00:00', efficiency: 89.5, temperature: 44.2, spindleSpeed: 1150 },
    { hour: '04:00', efficiency: 91.2, temperature: 45.1, spindleSpeed: 1180 },
    { hour: '08:00', efficiency: 94.2, temperature: 45.2, spindleSpeed: 1200 },
    { hour: '12:00', efficiency: 92.8, temperature: 46.1, spindleSpeed: 1190 },
    { hour: '16:00', efficiency: 91.6, temperature: 45.8, spindleSpeed: 1170 },
    { hour: '20:00', efficiency: 89.4, temperature: 44.9, spindleSpeed: 1160 }
  ];

  const qualityMetrics = [
    { name: 'Excellent', value: 85, color: '#00ff00' },
    { name: 'Good', value: 10, color: '#ffa500' },
    { name: 'Acceptable', value: 3, color: '#ff6b6b' },
    { name: 'Rejected', value: 2, color: '#ff0000' }
  ];

  return (
    <div className="demo-view">
      <div className="demo-header">
        <h2>Complete System Workflow Demo</h2>
        <p>End-to-end illustration of CNC machine monitoring from hardware to dashboard</p>
      </div>

      {/* Step Navigation */}
      <div className="step-navigation">
        {workflowSteps.map((step, index) => (
          <button
            key={step.id}
            className={`step-dot ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
            onClick={() => goToStep(index)}
            title={step.title}
          >
            {index < activeStep ? <FaCheckCircle /> : step.icon}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className={`demo-content ${isAnimating ? 'animating' : ''}`}>
        <div className="step-display">
          <div className="step-header">
            <div className="step-icon">
              {currentStep.icon}
            </div>
            <div className="step-info">
              <h3>{currentStep.title}</h3>
              <h4>{currentStep.subtitle}</h4>
            </div>
          </div>

          <div className="step-description">
            <p>{currentStep.description}</p>
          </div>

          <div className="step-details">
            <h5>Key Features:</h5>
            <ul>
              {currentStep.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className="sub-steps">
            <h5>Implementation Steps:</h5>
            <div className="sub-steps-grid">
              {currentStep.subSteps.map((subStep, index) => (
                <div key={index} className="sub-step">
                  <span className="sub-step-number">{index + 1}</span>
                  <span className="sub-step-text">{subStep}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Visual Illustration */}
        <div className="visual-illustration">
          <div className={`illustration-container ${currentStep.visual}`}>
            
            {/* Hardware Integration */}
            {currentStep.visual === 'hardware-integration' && (
              <div className="hardware-integration">
                <div className="cnc-machine-section">
                  <div className="cnc-machine">
                    <FaIndustry />
                    <span>CNC Machine</span>
                    <div className="machine-ports">
                      <div className="port usb">
                        <FaUsb />
                        <span>USB</span>
                      </div>
                      <div className="port ethernet">
                        <FaNetworkWired />
                        <span>Ethernet</span>
                      </div>
                      <div className="port gpio">
                        <FaMicrochip />
                        <span>GPIO</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="connection-lines">
                  <div className="connection-line">
                    <FaArrowRight />
                    <span>Data Flow</span>
                  </div>
                </div>
                
                <div className="raspberry-pi-section">
                  <div className="raspberry-pi">
                    <FaRaspberryPi />
                    <span>Raspberry Pi 4</span>
                    <div className="pi-ports">
                      <div className="port wifi">
                        <FaWifi />
                        <span>WiFi</span>
                      </div>
                      <div className="port ethernet">
                        <FaNetworkWired />
                        <span>LAN</span>
                      </div>
                      <div className="port usb">
                        <FaUsb />
                        <span>USB</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="protocols-section">
                  <div className="protocols-grid">
                    <div className="protocol">
                      <SiArduino />
                      <span>Modbus</span>
                    </div>
                    <div className="protocol">
                      <FaNetworkWired />
                      <span>OPC UA</span>
                    </div>
                    <div className="protocol">
                      <FaUsb />
                      <span>Serial</span>
                    </div>
                    <div className="protocol">
                      <FaWifi />
                      <span>Ethernet</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Collection */}
            {currentStep.visual === 'data-collection' && (
              <div className="data-collection">
                <div className="data-sources">
                  <div className="data-source machine">
                    <FaIndustry />
                    <span>Machine Data</span>
                    <div className="data-stream">
                      <div className="data-point">Temperature: {liveData.temperature.toFixed(1)}°C</div>
                      <div className="data-point">Spindle Speed: {liveData.spindleSpeed} RPM</div>
                      <div className="data-point">Machine Status: Running</div>
                      <div className="data-point">Cycle Time: 2.5 min</div>
                      <div className="data-point">Parts Produced: {liveData.partsProduced}</div>
                      <div className="data-point sigma">Dimensional Accuracy: ±0.02mm</div>
                      <div className="data-point sigma">Surface Finish: Ra 0.8μm</div>
                    </div>
                  </div>
                  
                  <div className="data-source protocols">
                    <FaNetworkWired />
                    <span>Communication Protocols</span>
                    <div className="data-stream">
                      <div className="data-point">Modbus TCP: Active</div>
                      <div className="data-point">OPC UA: Connected</div>
                      <div className="data-point">Serial: Monitoring</div>
                      <div className="data-point">Data Rate: 1Hz</div>
                      <div className="data-point">Buffer Status: 75%</div>
                    </div>
                  </div>
                </div>
                
                <div className="data-processing">
                  <div className="processing-unit">
                    <FaCogs className="spinning" />
                    <span>Processing</span>
                  </div>
                  
                  <div className="protocols">
                    <div className="protocol">
                      <SiArduino />
                      <span>Modbus</span>
                    </div>
                    <div className="protocol">
                      <FaNetworkWired />
                      <span>OPC UA</span>
                    </div>
                    <div className="protocol">
                      <FaUsb />
                      <span>Serial</span>
                    </div>
                  </div>
                </div>
                
                <div className="data-buffer">
                  <FaDatabase />
                  <span>Data Buffer</span>
                  <div className="buffer-status">
                    <div className="buffer-fill" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Edge Processing */}
            {currentStep.visual === 'edge-processing' && (
              <div className="edge-processing">
                <div className="raw-data-section">
                  <h6>Raw Data Input</h6>
                  <div className="raw-data-stream">
                    <div className="data-item">Temperature: 45.2°C</div>
                    <div className="data-item">Spindle Speed: 1200 RPM</div>
                    <div className="data-item">Machine Status: Running</div>
                    <div className="data-item">Cycle Time: 2.5 min</div>
                  </div>
                </div>
                
                <div className="processing-pipeline">
                  <div className="processing-step">
                    <FaCogs className="spinning" />
                    <span>OEE Calculation</span>
                  </div>
                  <div className="processing-step">
                    <FaChartLine />
                    <span>Trend Analysis</span>
                  </div>
                  <div className="processing-step">
                    <FaExclamationTriangle />
                    <span>Anomaly Detection</span>
                  </div>
                  <div className="processing-step">
                    <FaBolt />
                    <span>Performance Optimization</span>
                  </div>
                </div>
                
                <div className="processed-output">
                  <h6>Processed Output</h6>
                  <div className="processed-metrics">
                    <div className="metric">OEE: {liveData.oee.toFixed(1)}%</div>
                    <div className="metric">Efficiency: {liveData.efficiency.toFixed(1)}%</div>
                    <div className="metric">Availability: 96.5%</div>
                    <div className="metric">Quality: 96.4%</div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Transmission */}
            {currentStep.visual === 'data-transmission' && (
              <div className="data-transmission">
                <div className="transmission-source">
                  <div className="raspberry-pi">
                    <FaRaspberryPi />
                    <span>Raspberry Pi</span>
                  </div>
                </div>
                
                <div className="transmission-network">
                  <div className="network-layer">
                    <FaWifi />
                    <span>WiFi Network</span>
                  </div>
                  <div className="network-layer">
                    <FaNetworkWired />
                    <span>Ethernet</span>
                  </div>
                  <div className="network-layer">
                    <FaShieldAlt />
                    <span>SSL/TLS</span>
                  </div>
                </div>
                
                <div className="transmission-protocols">
                  <div className="protocol mqtt">
                    <SiMqtt />
                    <span>MQTT</span>
                    <div className="protocol-status active">Active</div>
                  </div>
                  <div className="protocol http">
                    <FaNetworkWired />
                    <span>HTTP REST</span>
                    <div className="protocol-status">Standby</div>
                  </div>
                </div>
                
                <div className="transmission-destination">
                  <div className="cloud-server">
                    <FaCloud />
                    <span>Cloud Server</span>
                  </div>
                </div>
                
                <div className="data-packet">
                  <FaArrowRight />
                  <span>Encrypted Data Packet</span>
                </div>
              </div>
            )}

            {/* Manual Entry */}
            {currentStep.visual === 'manual-entry' && (
              <div className="manual-entry">
                <div className="operator-section">
                  <div className="operator">
                    <FaUser />
                    <span>Operator</span>
                  </div>
                </div>
                
                <div className="entry-interface">
                  <div className="entry-form">
                    <h6>Quality Control Entry</h6>
                    <div className="form-fields">
                      <div className="form-field">
                        <label>Rejection Reason:</label>
                        <input 
                          type="text" 
                          placeholder="Tool wear, dimensional error, etc."
                          value={manualEntryData.rejectionReason}
                          onChange={(e) => setManualEntryData({...manualEntryData, rejectionReason: e.target.value})}
                        />
                      </div>
                      <div className="form-field">
                        <label>Downtime Reason:</label>
                        <input 
                          type="text" 
                          placeholder="Maintenance, setup, etc."
                          value={manualEntryData.downtimeReason}
                          onChange={(e) => setManualEntryData({...manualEntryData, downtimeReason: e.target.value})}
                        />
                      </div>
                      <div className="form-field">
                        <label>Quality Score:</label>
                        <select 
                          value={manualEntryData.qualityScore}
                          onChange={(e) => setManualEntryData({...manualEntryData, qualityScore: e.target.value})}
                        >
                          <option value="">Select Score</option>
                          <option value="excellent">Excellent (95-100%)</option>
                          <option value="good">Good (85-94%)</option>
                          <option value="acceptable">Acceptable (75-84%)</option>
                          <option value="poor">Poor (&lt;75%)</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label>Operator Notes:</label>
                        <textarea 
                          placeholder="Additional notes..."
                          value={manualEntryData.operatorNotes}
                          onChange={(e) => setManualEntryData({...manualEntryData, operatorNotes: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button className="submit-btn">
                        <FaSave />
                        <span>Save Data</span>
                      </button>
                      <button className="clear-btn">
                        <FaUndo />
                        <span>Clear</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="data-validation">
                  <div className="validation-status">
                    <FaCheckCircle />
                    <span>Data Validated</span>
                  </div>
                </div>
              </div>
            )}

            {/* Data Storage */}
            {currentStep.visual === 'data-storage' && (
              <div className="data-storage">
                <div className="storage-architecture">
                  <div className="database influxdb">
                    <SiInfluxdb />
                    <span>InfluxDB</span>
                    <div className="db-info">Time-series Data</div>
                    <div className="db-status">
                      <div className="status-indicator active"></div>
                      <span>Active</span>
                    </div>
                  </div>
                  
                  <div className="database postgresql">
                    <SiPostgresql />
                    <span>PostgreSQL</span>
                    <div className="db-info">Relational Data</div>
                    <div className="db-status">
                      <div className="status-indicator active"></div>
                      <span>Active</span>
                    </div>
                  </div>
                  
                  <div className="database redis">
                    <SiRedis />
                    <span>Redis</span>
                    <div className="db-info">Caching</div>
                    <div className="db-status">
                      <div className="status-indicator active"></div>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="backup-system">
                  <div className="backup">
                    <FaCloud />
                    <span>Cloud Backup</span>
                    <div className="backup-status">
                      <div className="backup-progress" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="data-flow">
                  <div className="flow-arrow">
                    <FaArrowDown />
                    <span>Data Flow</span>
                  </div>
                </div>
              </div>
            )}

            {/* Six Sigma Analytics */}
            {currentStep.visual === 'six-sigma' && (
              <div className="six-sigma-analytics">
                <div className="sigma-metrics">
                  <div className="metric-section">
                    <h6>Process Capability</h6>
                    <div className="capability-metrics">
                      <div className="capability-item">
                        <span className="metric-label">Cp:</span>
                        <span className="metric-value">1.67</span>
                        <span className="metric-status excellent">Excellent</span>
                      </div>
                      <div className="capability-item">
                        <span className="metric-label">Cpk:</span>
                        <span className="metric-value">1.45</span>
                        <span className="metric-status good">Good</span>
                      </div>
                      <div className="capability-item">
                        <span className="metric-label">Sigma Level:</span>
                        <span className="metric-value">4.8σ</span>
                        <span className="metric-status excellent">Excellent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="metric-section">
                    <h6>Quality Metrics</h6>
                    <div className="quality-metrics">
                      <div className="quality-item">
                        <span className="metric-label">DPMO:</span>
                        <span className="metric-value">1,250</span>
                        <span className="metric-status good">Good</span>
                      </div>
                      <div className="quality-item">
                        <span className="metric-label">Yield:</span>
                        <span className="metric-value">99.87%</span>
                        <span className="metric-status excellent">Excellent</span>
                      </div>
                      <div className="quality-item">
                        <span className="metric-label">PPM:</span>
                        <span className="metric-value">1,250</span>
                        <span className="metric-status good">Good</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="control-charts">
                  <div className="chart-section">
                    <h6>X-Bar Control Chart</h6>
                    <div className="control-chart-display">
                      <div className="chart-line ucl">UCL: 45.8°C</div>
                      <div className="chart-line center">Center: 45.2°C</div>
                      <div className="chart-line lcl">LCL: 44.6°C</div>
                      <div className="data-points">
                        <div className="data-point in-control">45.1</div>
                        <div className="data-point in-control">45.3</div>
                        <div className="data-point in-control">45.0</div>
                        <div className="data-point warning">45.7</div>
                        <div className="data-point in-control">45.2</div>
                        <div className="data-point in-control">45.1</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="chart-section">
                    <h6>R-Chart (Range)</h6>
                    <div className="control-chart-display">
                      <div className="chart-line ucl">UCL: 2.1°C</div>
                      <div className="chart-line center">Center: 1.2°C</div>
                      <div className="chart-line lcl">LCL: 0.3°C</div>
                      <div className="data-points">
                        <div className="data-point in-control">1.1</div>
                        <div className="data-point in-control">1.3</div>
                        <div className="data-point in-control">0.9</div>
                        <div className="data-point in-control">1.4</div>
                        <div className="data-point in-control">1.0</div>
                        <div className="data-point in-control">1.2</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="dmaic-process">
                  <h6>DMAIC Methodology</h6>
                  <div className="dmaic-steps">
                    <div className="dmaic-step">
                      <span className="step-letter">D</span>
                      <span className="step-name">Define</span>
                      <span className="step-desc">Process improvement goals</span>
                    </div>
                    <div className="dmaic-step">
                      <span className="step-letter">M</span>
                      <span className="step-name">Measure</span>
                      <span className="step-desc">Current performance data</span>
                    </div>
                    <div className="dmaic-step">
                      <span className="step-letter">A</span>
                      <span className="step-name">Analyze</span>
                      <span className="step-desc">Root cause identification</span>
                    </div>
                    <div className="dmaic-step">
                      <span className="step-letter">I</span>
                      <span className="step-name">Improve</span>
                      <span className="step-desc">Process optimization</span>
                    </div>
                    <div className="dmaic-step">
                      <span className="step-letter">C</span>
                      <span className="step-name">Control</span>
                      <span className="step-desc">Sustain improvements</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dashboard */}
            {currentStep.visual === 'dashboard' && (
              <div className="dashboard-preview">
                <div className="dashboard-header">
                  <FaDesktop />
                  <span>Real-time Dashboard</span>
                  <div className="dashboard-controls">
                    <button className="control-btn">
                      <FaPlay />
                    </button>
                    <button className="control-btn">
                      <FaPause />
                    </button>
                    <button className="control-btn">
                      <FaSync />
                    </button>
                  </div>
                </div>
                
                <div className="dashboard-metrics">
                  <div className="metric-card">
                    <FaChartLine />
                    <span>OEE: {liveData.oee.toFixed(1)}%</span>
                  </div>
                  <div className="metric-card">
                    <FaThermometerHalf />
                    <span>Temp: {liveData.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="metric-card">
                    <FaTachometerAlt />
                    <span>Speed: {liveData.spindleSpeed} RPM</span>
                  </div>
                  <div className="metric-card">
                    <FaIndustry />
                    <span>Parts: {liveData.partsProduced}</span>
                  </div>
                </div>
                
                <div className="dashboard-charts">
                  <div className="chart-container">
                    <h6>OEE Breakdown</h6>
                    <ResponsiveContainer width="100%" height={150}>
                      <RadarChart data={oeeData}>
                        <PolarGrid stroke="rgba(255,255,255,0.2)" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: '#b0b0b0', fontSize: 10 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#b0b0b0', fontSize: 10 }} />
                        <Radar
                          name="Current"
                          dataKey="value"
                          stroke="#00ffff"
                          fill="#00ffff"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Radar
                          name="Target"
                          dataKey="target"
                          stroke="#ff00ff"
                          fill="transparent"
                          strokeWidth={1}
                          strokeDasharray="3 3"
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="chart-container">
                    <h6>Performance Trends</h6>
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart data={performanceTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="hour" stroke="#b0b0b0" fontSize={10} />
                        <YAxis stroke="#b0b0b0" fontSize={10} />
                        <Line 
                          type="monotone" 
                          dataKey="efficiency" 
                          stroke="#00ffff" 
                          strokeWidth={2}
                          name="Efficiency (%)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="#ff00ff" 
                          strokeWidth={2}
                          name="Temperature (°C)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="real-time-indicator">
                  <FaEye />
                  <span>Live Monitoring</span>
                  <div className="pulse-indicator"></div>
                </div>
              </div>
            )}

            {/* Daily Brief Email System */}
            {currentStep.visual === 'daily-brief' && (
              <div className="daily-brief-system">
                <div className="email-generation">
                  <div className="email-header">
                    <FaEnvelope />
                    <span>Daily Brief Email System</span>
                    <div className="email-status">
                      <div className="status-indicator active"></div>
                      <span>Automated</span>
                    </div>
                  </div>
                  
                  <div className="email-content">
                    <div className="email-subject">
                      <h6>📊 Daily Shop Floor Brief - {new Date().toLocaleDateString()}</h6>
                    </div>
                    
                    <div className="email-body">
                      <div className="section kpi-summary">
                        <h6>🎯 Key Performance Indicators</h6>
                        <div className="kpi-grid">
                          <div className="kpi-item">
                            <span className="kpi-label">Overall OEE</span>
                            <span className="kpi-value">{liveData.oee.toFixed(1)}%</span>
                            <span className="kpi-target">Target: 85%</span>
                          </div>
                          <div className="kpi-item">
                            <span className="kpi-label">Efficiency</span>
                            <span className="kpi-value">{liveData.efficiency.toFixed(1)}%</span>
                            <span className="kpi-target">Target: 90%</span>
                          </div>
                          <div className="kpi-item">
                            <span className="kpi-label">Availability</span>
                            <span className="kpi-value">96.5%</span>
                            <span className="kpi-target">Target: 95%</span>
                          </div>
                          <div className="kpi-item">
                            <span className="kpi-label">Quality</span>
                            <span className="kpi-value">96.4%</span>
                            <span className="kpi-target">Target: 95%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="section production-summary">
                        <h6>🏭 Production Summary</h6>
                        <div className="production-stats">
                          <div className="stat-item">
                            <span className="stat-label">Total Parts Produced</span>
                            <span className="stat-value">{liveData.partsProduced}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Rejections</span>
                            <span className="stat-value">{liveData.rejections}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Rejection Rate</span>
                            <span className="stat-value">{(liveData.rejections / liveData.partsProduced * 100).toFixed(2)}%</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Active Machines</span>
                            <span className="stat-value">10/12</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="section challenges">
                        <h6>⚠️ Challenges & Blockers</h6>
                        <div className="challenges-list">
                          <div className="challenge-item">
                            <span className="challenge-icon">🔧</span>
                            <div className="challenge-content">
                              <span className="challenge-title">Network Outage</span>
                              <span className="challenge-desc">Temporary network connectivity issues during afternoon shift (2:30-3:15 PM)</span>
                              <span className="challenge-status resolved">Status: Resolved</span>
                            </div>
                          </div>
                          <div className="challenge-item">
                            <span className="challenge-icon">🌡️</span>
                            <div className="challenge-content">
                              <span className="challenge-title">Temperature Fluctuation</span>
                              <span className="challenge-desc">Machine M-003 temperature exceeded normal range by 2.3°C</span>
                              <span className="challenge-status monitoring">Status: Monitoring</span>
                            </div>
                          </div>
                          <div className="challenge-item">
                            <span className="challenge-icon">⚡</span>
                            <div className="challenge-content">
                              <span className="challenge-title">Power Surge</span>
                              <span className="challenge-desc">Minor power surge detected at 11:45 AM, no damage reported</span>
                              <span className="challenge-status resolved">Status: Resolved</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="section recommendations">
                        <h6>💡 Actionable Recommendations</h6>
                        <div className="recommendations-list">
                          <div className="recommendation-item">
                            <span className="rec-priority high">High Priority</span>
                            <span className="rec-text">Schedule preventive maintenance for Machine M-003 to address temperature fluctuations</span>
                          </div>
                          <div className="recommendation-item">
                            <span className="rec-priority medium">Medium Priority</span>
                            <span className="rec-text">Review network infrastructure to prevent future connectivity issues</span>
                          </div>
                          <div className="recommendation-item">
                            <span className="rec-priority low">Low Priority</span>
                            <span className="rec-text">Consider implementing power surge protection for critical equipment</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="section trends">
                        <h6>📈 Performance Trends</h6>
                        <div className="trends-summary">
                          <div className="trend-item positive">
                            <span className="trend-icon">📈</span>
                            <span className="trend-text">OEE improved by 2.1% compared to yesterday</span>
                          </div>
                          <div className="trend-item positive">
                            <span className="trend-icon">📈</span>
                            <span className="trend-text">Efficiency increased by 1.8% this week</span>
                          </div>
                          <div className="trend-item neutral">
                            <span className="trend-icon">➡️</span>
                            <span className="trend-text">Quality metrics remained stable</span>
                          </div>
                          <div className="trend-item negative">
                            <span className="trend-icon">📉</span>
                            <span className="trend-text">Downtime increased by 0.5% due to network issues</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="email-footer">
                      <div className="footer-info">
                        <p>📧 This report was automatically generated by the CNC Monitoring System</p>
                        <p>⏰ Generated on: {new Date().toLocaleString()}</p>
                        <p>👥 Recipients: Management Team, Production Supervisors, Maintenance Staff</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="email-automation">
                    <div className="automation-status">
                      <FaSync className="spinning" />
                      <span>Automated Generation</span>
                    </div>
                    <div className="schedule-info">
                      <span>📅 Scheduled: Every 24 hours at 6:00 AM</span>
                      <span>📊 Data Source: Real-time monitoring system</span>
                      <span>📧 Delivery: Email to stakeholders</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI-Powered Predictive Analytics */}
            {currentStep.visual === 'ai-predictions' && (
              <div className="ai-predictions">
                <div className="ai-models-section">
                  <div className="model-header">
                    <FaBolt />
                    <span>AI Prediction Models</span>
                    <div className="model-status">
                      <div className="status-indicator active"></div>
                      <span>Active</span>
                    </div>
                  </div>
                  
                  <div className="prediction-models">
                    <div className="model-card maintenance">
                      <div className="model-icon">
                        <FaCog />
                      </div>
                      <div className="model-info">
                        <h6>🔧 Predictive Maintenance</h6>
                        <div className="prediction-details">
                          <div className="prediction-item">
                            <span className="prediction-label">Machine M-001:</span>
                            <span className="prediction-value">Maintenance due in 3.2 days</span>
                            <span className="prediction-confidence high">Confidence: 94%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Machine M-004:</span>
                            <span className="prediction-value">Spindle bearing wear detected</span>
                            <span className="prediction-confidence medium">Confidence: 87%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Machine M-007:</span>
                            <span className="prediction-value">Optimal performance - no maintenance needed</span>
                            <span className="prediction-confidence high">Confidence: 96%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="model-card quality">
                      <div className="model-icon">
                        <FaCheckCircle />
                      </div>
                      <div className="model-info">
                        <h6>🎯 Quality Defect Prediction</h6>
                        <div className="prediction-details">
                          <div className="prediction-item">
                            <span className="prediction-label">Cell B:</span>
                            <span className="prediction-value">Expected rejection rate: 8.2% (vs 6.4% current)</span>
                            <span className="prediction-confidence medium">Confidence: 82%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Machine M-006:</span>
                            <span className="prediction-value">Dimensional accuracy drift detected</span>
                            <span className="prediction-confidence high">Confidence: 91%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Tool T-003:</span>
                            <span className="prediction-value">Surface finish degradation predicted</span>
                            <span className="prediction-confidence medium">Confidence: 78%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="model-card production">
                      <div className="model-icon">
                        <FaIndustry />
                      </div>
                      <div className="model-info">
                        <h6>📈 Production Output Forecasting</h6>
                        <div className="prediction-details">
                          <div className="prediction-item">
                            <span className="prediction-label">Next 24 hours:</span>
                            <span className="prediction-value">Expected output: 248 parts (±5)</span>
                            <span className="prediction-confidence high">Confidence: 89%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">This week:</span>
                            <span className="prediction-value">Expected output: 1,240 parts (±15)</span>
                            <span className="prediction-confidence medium">Confidence: 85%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Bottleneck prediction:</span>
                            <span className="prediction-value">Cell B will be bottleneck by Thursday</span>
                            <span className="prediction-confidence high">Confidence: 92%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="model-card tool-wear">
                      <div className="model-icon">
                        <FaWrench />
                      </div>
                      <div className="model-info">
                        <h6>⚙️ Tool Wear Prediction</h6>
                        <div className="prediction-details">
                          <div className="prediction-item">
                            <span className="prediction-label">Tool T-001:</span>
                            <span className="prediction-value">Replace in 2.5 hours (current wear: 78%)</span>
                            <span className="prediction-confidence high">Confidence: 95%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Tool T-004:</span>
                            <span className="prediction-value">Optimal performance - 45% wear remaining</span>
                            <span className="prediction-confidence high">Confidence: 88%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Tool T-007:</span>
                            <span className="prediction-value">Accelerated wear detected - replace in 1.2 hours</span>
                            <span className="prediction-confidence medium">Confidence: 83%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="model-card energy">
                      <div className="model-icon">
                        <FaBolt />
                      </div>
                      <div className="model-info">
                        <h6>⚡ Energy Consumption Optimization</h6>
                        <div className="prediction-details">
                          <div className="prediction-item">
                            <span className="prediction-label">Peak usage prediction:</span>
                            <span className="prediction-value">2:30 PM - 4:15 PM (load balancing recommended)</span>
                            <span className="prediction-confidence high">Confidence: 87%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Energy savings opportunity:</span>
                            <span className="prediction-value">15% reduction possible with schedule optimization</span>
                            <span className="prediction-confidence medium">Confidence: 76%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Maintenance impact:</span>
                            <span className="prediction-value">M-003 maintenance will reduce energy by 8%</span>
                            <span className="prediction-confidence high">Confidence: 91%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="model-card anomaly">
                      <div className="model-icon">
                        <FaExclamationTriangle />
                      </div>
                      <div className="model-info">
                        <h6>🚨 Anomaly Detection</h6>
                        <div className="prediction-details">
                          <div className="prediction-item">
                            <span className="prediction-label">Temperature anomaly:</span>
                            <span className="prediction-value">M-002 temperature pattern deviation detected</span>
                            <span className="prediction-confidence high">Confidence: 93%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Vibration pattern:</span>
                            <span className="prediction-value">Unusual spindle vibration in M-005</span>
                            <span className="prediction-confidence medium">Confidence: 81%</span>
                          </div>
                          <div className="prediction-item">
                            <span className="prediction-label">Cycle time deviation:</span>
                            <span className="prediction-value">M-008 cycle time increased by 12%</span>
                            <span className="prediction-confidence high">Confidence: 89%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ai-insights-section">
                  <div className="insights-header">
                    <FaChartLine />
                    <span>AI-Generated Insights</span>
                  </div>
                  
                  <div className="insights-grid">
                    <div className="insight-card">
                      <h6>🎯 Optimization Recommendations</h6>
                      <div className="insight-content">
                        <div className="insight-item">
                          <span className="insight-icon">⚡</span>
                          <span className="insight-text">Schedule M-001 maintenance during low-demand period (2:00-4:00 AM)</span>
                        </div>
                        <div className="insight-item">
                          <span className="insight-icon">🔄</span>
                          <span className="insight-text">Optimize tool change schedule to reduce downtime by 23%</span>
                        </div>
                        <div className="insight-item">
                          <span className="insight-icon">📊</span>
                          <span className="insight-text">Adjust spindle speeds on M-004 to improve quality by 15%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="insight-card">
                      <h6>📈 Performance Trends</h6>
                      <div className="insight-content">
                        <div className="insight-item">
                          <span className="insight-icon">📈</span>
                          <span className="insight-text">OEE trending upward - expected to reach 92% by month-end</span>
                        </div>
                        <div className="insight-item">
                          <span className="insight-icon">📉</span>
                          <span className="insight-text">Cell B efficiency declining - intervention recommended</span>
                        </div>
                        <div className="insight-item">
                          <span className="insight-icon">➡️</span>
                          <span className="insight-text">Quality metrics stable with 0.8% improvement trend</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="insight-card">
                      <h6>🔮 Future Predictions</h6>
                      <div className="insight-content">
                        <div className="insight-item">
                          <span className="insight-icon">📅</span>
                          <span className="insight-text">Next maintenance cycle: 18 days (vs 21-day average)</span>
                        </div>
                        <div className="insight-item">
                          <span className="insight-icon">🎯</span>
                          <span className="insight-text">Quality target achievement: 98.2% (vs 95% target)</span>
                        </div>
                        <div className="insight-item">
                          <span className="insight-icon">💰</span>
                          <span className="insight-text">Cost savings potential: $12,400/month with optimizations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ai-model-performance">
                  <div className="performance-header">
                    <FaCogs />
                    <span>Model Performance Metrics</span>
                  </div>
                  
                  <div className="performance-metrics">
                    <div className="metric-row">
                      <div className="metric-item">
                        <span className="metric-label">Maintenance Prediction Accuracy:</span>
                        <span className="metric-value">94.2%</span>
                        <span className="metric-trend positive">+2.1%</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Quality Prediction Accuracy:</span>
                        <span className="metric-value">87.8%</span>
                        <span className="metric-trend positive">+1.5%</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Production Forecast Accuracy:</span>
                        <span className="metric-value">91.3%</span>
                        <span className="metric-trend positive">+3.2%</span>
                      </div>
                    </div>
                    <div className="metric-row">
                      <div className="metric-item">
                        <span className="metric-label">Tool Wear Prediction Accuracy:</span>
                        <span className="metric-value">96.7%</span>
                        <span className="metric-trend positive">+1.8%</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Anomaly Detection Rate:</span>
                        <span className="metric-value">89.4%</span>
                        <span className="metric-trend positive">+2.7%</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">False Positive Rate:</span>
                        <span className="metric-value">3.2%</span>
                        <span className="metric-trend negative">-0.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="demo-navigation">
        <button 
          className="nav-button prev" 
          onClick={prevStep}
          disabled={activeStep === 0}
        >
          <FaArrowLeft />
          Previous
        </button>
        
        <button 
          className="nav-button next" 
          onClick={nextStep}
          disabled={activeStep === workflowSteps.length - 1}
        >
          Next
          <FaArrowRight />
        </button>
      </div>

      {/* System Architecture Overview */}
      <div className="system-overview">
        <h3>Complete System Architecture</h3>
        <div className="architecture-diagram">
          <div className="layer hardware">
            <h4>Hardware Layer</h4>
            <div className="components">
              <div className="component">
                <FaIndustry />
                <span>CNC Machine</span>
              </div>
              <div className="component">
                <FaRaspberryPi />
                <span>Raspberry Pi</span>
              </div>
              <div className="component">
                <FaNetworkWired />
                <span>Communication</span>
              </div>
              <div className="component">
                <FaNetworkWired />
                <span>Network</span>
              </div>
            </div>
          </div>
          
                     <div className="layer software">
             <h4>Software Layer</h4>
             <div className="components">
               <div className="component">
                 <SiPython />
                 <span>Python Scripts</span>
               </div>
               <div className="component">
                 <SiNodedotjs />
                 <span>Node.js Server</span>
               </div>
               <div className="component">
                 <SiMqtt />
                 <span>MQTT Broker</span>
               </div>
               <div className="component">
                 <SiInfluxdb />
                 <span>InfluxDB</span>
               </div>
               <div className="component">
                 <SiPostgresql />
                 <span>PostgreSQL</span>
               </div>
               <div className="component">
                 <FaChartLine />
                 <span>Six Sigma Engine</span>
               </div>
             </div>
           </div>
          
          <div className="layer presentation">
            <h4>Presentation Layer</h4>
            <div className="components">
              <div className="component">
                <SiReact />
                <span>React Dashboard</span>
              </div>
              <div className="component">
                <FaMobile />
                <span>Mobile App</span>
              </div>
              <div className="component">
                <FaDesktop />
                <span>Web Interface</span>
              </div>
              <div className="component">
                <FaTablet />
                <span>Tablet View</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="technology-stack">
        <h3>Technology Stack</h3>
        <div className="tech-categories">
          <div className="tech-category">
            <h4>Frontend</h4>
            <div className="tech-items">
              <div className="tech-item">
                <SiReact />
                <span>React.js</span>
              </div>
              <div className="tech-item">
                <SiJavascript />
                <span>JavaScript</span>
              </div>
              <div className="tech-item">
                <FaDesktop />
                <span>HTML5/CSS3</span>
              </div>
            </div>
          </div>
          
          <div className="tech-category">
            <h4>Backend</h4>
            <div className="tech-items">
              <div className="tech-item">
                <SiPython />
                <span>Python</span>
              </div>
              <div className="tech-item">
                <SiNodedotjs />
                <span>Node.js</span>
              </div>
              <div className="tech-item">
                <FaServer />
                <span>Express.js</span>
              </div>
            </div>
          </div>
          
          <div className="tech-category">
            <h4>Database</h4>
            <div className="tech-items">
              <div className="tech-item">
                <SiInfluxdb />
                <span>InfluxDB</span>
              </div>
              <div className="tech-item">
                <SiPostgresql />
                <span>PostgreSQL</span>
              </div>
              <div className="tech-item">
                <SiRedis />
                <span>Redis</span>
              </div>
            </div>
          </div>
          
                     <div className="tech-category">
             <h4>Infrastructure</h4>
             <div className="tech-items">
               <div className="tech-item">
                 <SiDocker />
                 <span>Docker</span>
               </div>
                              <div className="tech-item">
                  <SiAmazonaws />
                  <span>AWS</span>
                </div>
               <div className="tech-item">
                 <FaCloud />
                 <span>Cloud</span>
               </div>
             </div>
           </div>
           
           <div className="tech-category">
             <h4>Quality Management</h4>
             <div className="tech-items">
               <div className="tech-item">
                 <FaChartLine />
                 <span>Six Sigma</span>
               </div>
               <div className="tech-item">
                 <FaCogs />
                 <span>SPC Charts</span>
               </div>
               <div className="tech-item">
                 <FaExclamationTriangle />
                 <span>DMAIC</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DemoView; 