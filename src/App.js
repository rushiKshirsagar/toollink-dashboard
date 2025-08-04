import React, { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import { SiSololearn } from "react-icons/si";


// Components
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import LiveNotification from './components/LiveNotification';
import NotificationBell from './components/NotificationBell';

// Views
import ShopFloorView from './views/ShopFloorView';
import FloorManagerView from './views/FloorManagerView';
import CellManagerView from './views/CellManagerView';
import QAManagerView from './views/QAManagerView';
import CellsView from './views/CellsView';
import MachineView from './views/MachineView';
import OperatorsView from './views/OperatorsView';
import DataEntryView from './views/DataEntryView';
import DemoView from './views/DemoView';

// Hooks
import { useParticles } from './hooks/useParticles';
import useScrollHeader from './hooks/useScrollHeader';

// Services
import notificationService from './services/notificationService';

// Data
import {
  shopFloorData,
  cellsData,
  machinesData,
  operatorsData,
  productionTrends,
  qualityMetrics,
  operatorPerformance,
  COLORS,
  cellOptions,
  machineOptions,
  operatorOptions
} from './data/mockData';

// Styles
import './styles/global.css';
import './styles/Header.css';

function App() {
  const [currentView, setCurrentView] = useState('shop-floor');
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const particles = useParticles();
  const isHeaderVisible = useScrollHeader();

  // Create dropdown options from data
  const cellOptions = [
    { value: '', label: 'All Cells' },
    ...cellsData.map(cell => ({ value: cell.id, label: `Cell ${cell.id}` }))
  ];

  const operatorOptions = [
    { value: '', label: 'All Operators' },
    ...operatorsData.map(operator => ({ value: operator.id, label: operator.name }))
  ];

  const machineOptions = [
    { value: '', label: 'All Machines' },
    ...machinesData.map(machine => ({ value: machine.id, label: machine.name }))
  ];

  // Initialize notification service
  useEffect(() => {
    // Subscribe to notification updates
    const unsubscribe = notificationService.subscribe((newNotifications) => {
      setNotifications(newNotifications);
    });

    // Start simulation
    notificationService.startSimulation(machinesData, operatorsData);

    return unsubscribe;
  }, []);

  // Get notifications for current page
  const getCurrentPageNotifications = () => {
    if (currentView === 'shop-floor') {
      return notifications; // All notifications for main page
    }
    return notificationService.getNotificationsForPage(currentView);
  };

  const handleNotificationDismiss = (id) => {
    notificationService.removeNotification(id);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const renderView = () => {
    switch (currentView) {
      case 'shop-floor':
        return (
          <ShopFloorView 
            shopFloorData={shopFloorData}
            productionTrends={productionTrends}
            qualityMetrics={qualityMetrics}
            COLORS={COLORS}
            cellOptions={cellOptions}
            operatorOptions={operatorOptions}
          />
        );
      case 'floor-manager':
        return (
          <FloorManagerView 
            machinesData={machinesData}
            shopFloorData={shopFloorData}
            productionTrends={productionTrends}
            COLORS={COLORS}
          />
        );
      case 'cell-manager':
        return (
          <CellManagerView 
            cellsData={cellsData}
            machinesData={machinesData}
            COLORS={COLORS}
          />
        );
      case 'qa-manager':
        return (
          <QAManagerView 
            machinesData={machinesData}
            operatorsData={operatorsData}
            shopFloorData={shopFloorData}
            COLORS={COLORS}
          />
        );
      case 'cells':
        return (
          <CellsView 
            cellsData={cellsData}
            setSelectedCell={setSelectedCell}
          />
        );
      case 'machines':
        return (
          <MachineView 
            machinesData={machinesData}
            machineOptions={machineOptions}
          />
        );
      case 'operators':
        return (
          <OperatorsView 
            operatorsData={operatorsData}
            operatorPerformance={operatorPerformance}
            operatorOptions={operatorOptions}
          />
        );
      case 'data-entry':
        return (
          <DataEntryView 
            cellOptions={cellOptions}
            machineOptions={machineOptions}
            operatorOptions={operatorOptions}
          />
        );
      case 'demo':
        return (
          <DemoView />
        );
      default:
        return (
          <ShopFloorView 
            shopFloorData={shopFloorData}
            productionTrends={productionTrends}
            qualityMetrics={qualityMetrics}
            COLORS={COLORS}
            cellOptions={cellOptions}
            operatorOptions={operatorOptions}
          />
        );
    }
  };

  const currentPageNotifications = getCurrentPageNotifications();
  const hasNotifications = currentPageNotifications.length > 0;

  return (
    <div className="App">
      <ParticleBackground particles={particles} />

      <header className={`dashboard-header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
        <div className="header-content">
          <div className="logo-section">
            <SiSololearn className="logo-icon" />
            <h1 style={{color: 'white', fontFamily:"monospace"}}>ToolLink</h1>
          </div>
          <Navigation currentView={currentView} setCurrentView={setCurrentView} />
          <div className="header-actions">
            <NotificationBell 
              notificationCount={currentPageNotifications.length}
              hasNotifications={hasNotifications}
              onClick={toggleNotifications}
            />
          </div>
        </div>
      </header>

      {/* Live Notifications */}
      {showNotifications && (
        <LiveNotification 
          notifications={currentPageNotifications}
          onDismiss={handleNotificationDismiss}
        />
      )}

      <main className="dashboard-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
