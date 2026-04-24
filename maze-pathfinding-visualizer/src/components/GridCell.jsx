import React from 'react';
import { CELL_STATES, CELL_COLORS } from '../utils/constants.js';
import '../styles/grid.css';

/**
 * Single grid cell component
 */
function GridCell({ row, col, state, onCellClick, cellSize, isAnimating }) {
  const handleClick = () => {
    if (!isAnimating) {
      onCellClick([row, col]);
    }
  };

  const bgColor = CELL_COLORS[state] || CELL_COLORS.open;
  
  return (
    <div
      data-row={row}
      data-col={col}
      className={`grid-cell ${state}`}
      style={{
        width: cellSize,
        height: cellSize,
        backgroundColor: bgColor,
        border: state === CELL_STATES.POINTER ? '3px solid #fbbf24' : '1px solid #94a3b8'
      }}
      onClick={handleClick}
      title={`${state} cell at [${row},${col}]`}
    />
  );
}

export default GridCell;

