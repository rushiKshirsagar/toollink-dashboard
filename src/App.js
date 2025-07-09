import React, { useState } from 'react';
import { FaRocket } from 'react-icons/fa';

// Components
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';

// Views
import ShopFloorView from './views/ShopFloorView';
import CellsView from './views/CellsView';
import MachineView from './views/MachineView';
import OperatorsView from './views/OperatorsView';

// Hooks
import { useParticles } from './hooks/useParticles';

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
  
  const particles = useParticles();

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

  return (
    <div className="App">
      <ParticleBackground particles={particles} />

      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <FaRocket className="logo-icon" />
            <h1 style={{color: 'white'}}>ToolLink Dashboard</h1>
          </div>
          <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        </div>
      </header>

      <main className="dashboard-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
