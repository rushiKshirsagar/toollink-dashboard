import React from 'react';
import { 
  FaIndustry, FaUsers, FaChartBar, FaCogs, 
  FaEye, FaUser, FaFileAlt, FaPlay
} from 'react-icons/fa';
import '../styles/Navigation.css';

const Navigation = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'shop-floor', label: 'Shop Floor', icon: <FaIndustry /> },
    { id: 'floor-manager', label: 'Floor Manager', icon: <FaCogs /> },
    { id: 'cell-manager', label: 'Cell Manager', icon: <FaEye /> },
    { id: 'qa-manager', label: 'QA Manager', icon: <FaChartBar /> },
    { id: 'cells', label: 'Cells', icon: <FaIndustry /> },
    { id: 'machines', label: 'Machines', icon: <FaCogs /> },
    { id: 'operators', label: 'Operators', icon: <FaUsers /> },
    { id: 'data-entry', label: 'Data Entry', icon: <FaFileAlt /> },
    { id: 'demo', label: 'Demo', icon: <FaPlay /> }
  ];

  return (
    <nav className="dashboard-navigation">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-button ${currentView === item.id ? 'active' : ''}`}
          onClick={() => setCurrentView(item.id)}
        >
          <div className="nav-icon">{item.icon}</div>
          <div className="nav-label">{item.label}</div>
        </button>
      ))}
    </nav>
  );
};

export default Navigation; 