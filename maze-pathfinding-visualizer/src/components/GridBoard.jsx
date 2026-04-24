import React from 'react';
import GridCell from './GridCell.jsx';
import { CELL_STATES } from '../utils/constants.js';
import '../styles/grid.css';

/**
 * Full grid board with mouse interactions
 */
function GridBoard({ grid, handleCellChange, isDragging, setIsDragging, isAnimating, n }) {
  const cellSize = Math.max(16, Math.min(900 / n, 24)); // Larger responsive size

  const handleBoardMouseDown = (e) => {
    if (isAnimating) return;
    const cell = e.target.closest('.grid-cell');
    if (cell) {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      if (!isNaN(row) && !isNaN(col)) {
        setIsDragging(true);
        handleCellChange([row, col]);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isAnimating) return;
    const cell = e.target.closest('.grid-cell');
    if (cell) {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      if (!isNaN(row) && !isNaN(col)) {
        handleCellChange([row, col]);
      }
    }
  };

  const handleBoardMouseUp = () => setIsDragging(false);

  const handleBoardMouseLeave = () => setIsDragging(false);

  return (
    <div 
      className="grid-board"
      style={{ 
        gridTemplateColumns: `repeat(${n}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${n}, ${cellSize}px)`
      }}
      onMouseDown={handleBoardMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleBoardMouseUp}
      onMouseLeave={handleBoardMouseLeave}
    >
      {grid.map((row, i) =>
        row.map((cellState, j) => (
          <GridCell
            key={`${i}-${j}`}
            row={i}
            col={j}
            state={cellState}
            onCellClick={handleCellChange}
            cellSize={cellSize}
            isAnimating={isAnimating}
          />
        ))
      )}
    </div>
  );
}

export default GridBoard;

