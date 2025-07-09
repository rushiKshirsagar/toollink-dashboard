import React from 'react';
import '../styles/CellCard.css';

const CellCard = ({ cell, onClick }) => (
  <div className="cell-card" onClick={() => onClick(cell)}>
    <div className="cell-header">
      <h3>{cell.name}</h3>
      <div className={`cell-status ${cell.active === cell.machines ? 'active' : 'partial'}`}>
        {cell.active}/{cell.machines} Active
      </div>
    </div>
    <div className="cell-stats">
      <div className="cell-stat">
        <span className="stat-label">Efficiency</span>
        <span className="stat-value">{cell.efficiency}%</span>
      </div>
      <div className="cell-stat">
        <span className="stat-label">Production</span>
        <span className="stat-value">{cell.production} parts</span>
      </div>
    </div>
    <div className="cell-glow"></div>
  </div>
);

export default CellCard; 