import React from 'react';
import { EDIT_MODES } from '../utils/constants.js';
import '../styles/controls.css';

/**
 * Control buttons and grid size input
 */
function ControlPanel({ 
  n, 
  setN, 
  onCreateGrid, 
  onReset, 
  onClearPath, 
  editMode, 
  setEditMode, 
  currentAlgo, 
  onRunAlgo, 
  hasGrid,
  isAnimating,
  onStepForward 
}) {
  return (
    <div className="control-panel">
      <div className="grid-setup">
        <label>
          Grid Size (n): 
          <input
            type="number"
            min="5"
            max="60"
            value={n}
            onChange={(e) => setN(Math.max(5, Math.min(60, parseInt(e.target.value) || 20)))}
            disabled={hasGrid}
          />
        </label>
        <button onClick={onCreateGrid} disabled={hasGrid || isAnimating}>
          {hasGrid ? 'New Grid' : 'Create Grid'}
        </button>
      </div>

      {hasGrid && (
        <>
          <div className="edit-mode">
            <h4>Edit Mode:</h4>
            {Object.values(EDIT_MODES).map(mode => (
              <button
                key={mode}
                className={editMode === mode ? 'active' : ''}
                onClick={() => setEditMode(mode)}
                disabled={isAnimating}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="algo-controls">
            <h4>Run Algorithm:</h4>
            {['bfs', 'dfs', 'dijkstra'].map(algo => (
              <button
                key={algo}
                className={currentAlgo === algo ? 'active' : ''}
                onClick={() => onRunAlgo(algo)}
                disabled={isAnimating}
              >
                {algo.toUpperCase()}
              </button>
            ))}
            <button 
              onClick={onStepForward} 
              disabled={!currentAlgo || isAnimating || !hasGrid}
              className="step-btn"
            >
              ▶️ Step Forward (Moving Pointer)
            </button>
          </div>

          <div className="action-buttons">
            <button onClick={onReset} disabled={isAnimating}>Reset Grid</button>
            <button onClick={onClearPath} disabled={isAnimating || !hasGrid}>Clear Path</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ControlPanel;
