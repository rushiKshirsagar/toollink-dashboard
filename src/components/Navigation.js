import React from 'react';
import { FaHome, FaLayerGroup, FaCogs, FaUsers } from 'react-icons/fa';
import '../styles/Navigation.css';

const Navigation = ({ currentView, setCurrentView }) => (
  <nav className="dashboard-nav">
    <button 
      className={`nav-btn ${currentView === 'shop-floor' ? 'active' : ''}`}
      onClick={() => setCurrentView('shop-floor')}
    >
      <FaHome />
      <span>Shop Floor</span>
    </button>
    <button 
      className={`nav-btn ${currentView === 'cells' ? 'active' : ''}`}
      onClick={() => setCurrentView('cells')}
    >
      <FaLayerGroup />
      <span>Cells</span>
    </button>
    <button 
      className={`nav-btn ${currentView === 'machines' ? 'active' : ''}`}
      onClick={() => setCurrentView('machines')}
    >
      <FaCogs />
      <span>Machines</span>
    </button>
    <button 
      className={`nav-btn ${currentView === 'operators' ? 'active' : ''}`}
      onClick={() => setCurrentView('operators')}
    >
      <FaUsers />
      <span>Operators</span>
    </button>
  </nav>
);

export default Navigation; 