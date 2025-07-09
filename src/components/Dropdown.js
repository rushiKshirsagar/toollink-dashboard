import React from 'react';
import '../styles/Dropdown.css';

const Dropdown = ({ label, options, value, onChange, placeholder = "Select an option" }) => (
  <div className="dropdown-container">
    {label && <label className="dropdown-label">{label}</label>}
    <select 
      className="dropdown-select" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown; 