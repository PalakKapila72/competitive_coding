import React from 'react';
import { CELL_STATES, CELL_COLORS } from '../utils/constants.js';
import '../styles/controls.css';

/**
 * Color legend for grid states
 */
function Legend() {
  const legendItems = [
    { state: CELL_STATES.OPEN, label: 'Open' },
    { state: CELL_STATES.WALL, label: 'Wall/Obstacle' },
    { state: CELL_STATES.START, label: 'Start' },
    { state: CELL_STATES.END, label: 'End' },
    { state: CELL_STATES.VISITED, label: 'Visited' },
    { state: CELL_STATES.PATH, label: 'Shortest Path' },
    { state: CELL_STATES.POINTER, label: 'Moving Pointer' }
  ];

  return (
    <div className="legend">
      <h4>Legend</h4>
      <div className="legend-items">
        {legendItems.map(({ state, label }) => (
          <div key={state} className="legend-item">
            <div 
              className="legend-color"
              style={{ backgroundColor: CELL_COLORS[state] }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Legend;

