import React from 'react';
import { FaIndustry, FaCogs, FaUsers, FaChartLine, FaUserTie, FaCog, FaShieldAlt } from 'react-icons/fa';
import '../styles/Navigation.css';

const Navigation = ({ currentView, setCurrentView }) => {
  const navItems = [
    {
      id: 'shop-floor',
      label: 'Shop Floor',
      icon: <FaIndustry />,
      description: 'Overall shop floor overview'
    },
    {
      id: 'floor-manager',
      label: 'Floor Manager',
      icon: <FaUserTie />,
      description: 'Live status and production monitoring'
    },
    {
      id: 'cell-manager',
      label: 'Cell Manager',
      icon: <FaCog />,
      description: 'Cell-wide performance and coordination'
    },
    {
      id: 'qa-manager',
      label: 'QA Manager',
      icon: <FaShieldAlt />,
      description: 'Quality control and process stability'
    },
    {
      id: 'machines',
      label: 'Machines',
      icon: <FaCogs />,
      description: 'Individual machine monitoring'
    },
    {
      id: 'operators',
      label: 'Operators',
      icon: <FaUsers />,
      description: 'Operator performance tracking'
    }
  ];

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <button
              className={`nav-button ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
              title={item.description}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation; 