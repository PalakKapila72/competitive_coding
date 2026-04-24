import React from 'react';
import { ALGORITHM_COMPLEXITIES } from '../utils/constants.js';
import '../styles/stats.css';

/**
 * Statistics panel showing algorithm results
 */
function StatsPanel({ currentAlgo, pathFound, pathLength, visitedCount, isAnimating }) {
  if (!currentAlgo) return null;

  const stats = ALGORITHM_COMPLEXITIES[currentAlgo];
  const pathLenDisplay = pathFound ? pathLength : 'No path';

  return (
    <div className="stats-panel">
      <h4>{currentAlgo.toUpperCase()} Results</h4>
      <div className="stats-grid">
        <div className="stat-item">
          <span>Path Found:</span>
          <span className={pathFound ? 'success' : 'error'}>
            {pathFound ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="stat-item">
          <span>Path Length:</span>
          <span>{pathLenDisplay}</span>
        </div>
        <div className="stat-item">
          <span>Visited Nodes:</span>
          <span>{visitedCount}</span>
        </div>
        <div className="stat-item">
          <span>Time Complexity:</span>
          <span>{stats.time}</span>
        </div>
        <div className="stat-item">
          <span>Space Complexity:</span>
          <span>{stats.space}</span>
        </div>
      </div>
      {pathFound && (
        <div className="go-button">
          <button disabled={isAnimating}>
            Go → Animate Pointer
          </button>
        </div>
      )}
    </div>
  );
}

export default StatsPanel;

