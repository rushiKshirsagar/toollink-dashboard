import React, { useState } from 'react';
import { FaCalendarAlt, FaInfoCircle, FaTimes } from 'react-icons/fa';
import '../styles/DateFilter.css';

const DateFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange, label = "Date Range" }) => {
  const [filterType, setFilterType] = useState('single'); // 'single' or 'range'
  const [showDateRange, setShowDateRange] = useState(false);

  const handleSingleDateChange = (date) => {
    onStartDateChange(date);
    onEndDateChange(date);
  };

  const handleClearDates = () => {
    onStartDateChange('');
    onEndDateChange('');
  };

  const isDateSelected = startDate || endDate;

  return (
    <div className="date-filter-container">
      <label className="date-filter-label">
        {label}
        <FaInfoCircle className="info-icon" title="Select date or date range to filter data" />
      </label>
      
      <div className="date-filter-controls">
        <div className="filter-type-toggle">
          <button 
            className={`toggle-btn ${filterType === 'single' ? 'active' : ''}`}
            onClick={() => setFilterType('single')}
          >
            Single Date
          </button>
          <button 
            className={`toggle-btn ${filterType === 'range' ? 'active' : ''}`}
            onClick={() => setFilterType('range')}
          >
            Date Range
          </button>
        </div>

        {filterType === 'single' ? (
          <div className="single-date-input">
            <div className="date-input-group">
              <FaCalendarAlt className="date-icon" />
              <input
                type="date"
                className="date-input"
                value={startDate}
                onChange={(e) => handleSingleDateChange(e.target.value)}
                placeholder="Select date"
              />
            </div>
          </div>
        ) : (
          <div className="date-range-inputs">
            <div className="date-input-group">
              <FaCalendarAlt className="date-icon" />
              <input
                type="date"
                className="date-input"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                placeholder="Start date"
              />
            </div>
            <span className="date-separator">to</span>
            <div className="date-input-group">
              <FaCalendarAlt className="date-icon" />
              <input
                type="date"
                className="date-input"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                placeholder="End date"
              />
            </div>
          </div>
        )}

        {isDateSelected && (
          <button className="clear-dates-btn" onClick={handleClearDates}>
            <FaTimes />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default DateFilter; 