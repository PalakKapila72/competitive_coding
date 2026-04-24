 import React, { useState, useCallback, useEffect } from 'react';
import ControlPanel from './components/ControlPanel.jsx';
import GridBoard from './components/GridBoard.jsx';
import Legend from './components/Legend.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import { 
  createGrid, setCell, getCell, findCell
} from './utils/createGrid.js';
import { CELL_STATES, EDIT_MODES } from './utils/constants.js';
import { getNeighbors } from './utils/neighbors.js';
import { bfs } from './algorithms/bfs.js';
import { dfs } from './algorithms/dfs.js';
import { dijkstra } from './algorithms/dijkstra.js';
import { animateVisited, animatePath, animatePointer } from './utils/animation.js';
import './styles/app.css';

function App() {
  // Main state
  const [n, setN] = useState(20);
  const [grid, setGrid] = useState(null);
  const [editMode, setEditMode] = useState(EDIT_MODES.WALL);
  const [currentAlgo, setCurrentAlgo] = useState(null);
  const [results, setResults] = useState({ path: [], visited: [], pathFound: false, pathLength: 0, visitedCount: 0 });
const [isAnimating, setIsAnimating] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);

  // Create new grid
  const handleCreateGrid = useCallback(() => {
    setGrid(createGrid(n));
    setResults({ path: [], visited: [], pathFound: false, pathLength: 0, visitedCount: 0 });
    setCurrentAlgo(null);
  }, [n]);

  // Reset grid to empty
  const handleReset = useCallback(() => {
    if (grid) {
      setGrid(createGrid(n));
      setResults({ path: [], visited: [], pathFound: false, pathLength: 0, visitedCount: 0 });
      setCurrentAlgo(null);
    }
  }, [grid, n]);

  // Clear path visualization
  const handleClearPath = useCallback(() => {
    if (!grid) return;
    
    const newGrid = grid.map(row => [...row]);
    
    // Reset path and visited to open (preserve walls, start, end)
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        if ([CELL_STATES.VISITED, CELL_STATES.PATH, CELL_STATES.POINTER].includes(newGrid[i][j])) {
          newGrid[i][j] = CELL_STATES.OPEN;
        }
      }
    }
    
    setGrid(newGrid);
    setResults({ path: [], visited: [], pathFound: false, pathLength: 0, visitedCount: 0 });
  }, [grid]);

// Handle cell change for click and drag based on edit mode
  const handleCellChange = useCallback((pos) => {
    if (!grid || isAnimating) return;
    
    const newGrid = grid.map(row => [...row]);
    const currentState = getCell(newGrid, pos);
    
    let newState;
    switch (editMode) {
      case EDIT_MODES.WALL:
        newState = currentState === CELL_STATES.WALL ? CELL_STATES.OPEN : CELL_STATES.WALL;
        break;
      case EDIT_MODES.START:
        // Clear existing start
        const oldStart = findCell(newGrid, CELL_STATES.START);
        if (oldStart) setCell(newGrid, oldStart, CELL_STATES.OPEN);
        newState = CELL_STATES.START;
        break;
      case EDIT_MODES.END:
        // Clear existing end
        const oldEnd = findCell(newGrid, CELL_STATES.END);
        if (oldEnd) setCell(newGrid, oldEnd, CELL_STATES.OPEN);
        newState = CELL_STATES.END;
        break;
      default:
        return;
    }
    
    setCell(newGrid, pos, newState);
    setGrid(newGrid);
  }, [grid, editMode, isAnimating]);

  // Run selected algorithm
  const handleRunAlgo = useCallback(async (algo) => {
    if (!grid || isAnimating) return;
    
    const startPos = findCell(grid, CELL_STATES.START);
    const endPos = findCell(grid, CELL_STATES.END);
    
    if (!startPos || !endPos) {
      alert('Please set Start and End cells first!');
      return;
    }
    
    setIsAnimating(true);
    setCurrentAlgo(algo);
    
    // Run algorithm
    let algoResult;
    try {
      switch (algo) {
        case 'bfs': algoResult = bfs(grid, startPos, endPos); break;
        case 'dfs': algoResult = dfs(grid, startPos, endPos); break;
        case 'dijkstra': algoResult = dijkstra(grid, startPos, endPos); break;
        default: return;
      }
      
      const pathFound = algoResult.path.length > 0;
      setResults({
        ...algoResult,
        pathFound,
        pathLength: pathFound ? algoResult.path.length : 0,
        visitedCount: algoResult.visited.length
      });
      
      // Animate visited
      await new Promise(resolve => {
        animateVisited(grid, algoResult.visited, 5, resolve);
      });
      
      // Animate path
      if (pathFound) {
        await new Promise(resolve => {
          animatePath(grid, algoResult.path, 20, resolve);
        });
      }
    } catch (error) {
      console.error('Algorithm error:', error);
    }
    
    setIsAnimating(false);
  }, [grid, isAnimating]);

  // Animate pointer along path (Moving Pointer button)
  const handleStepForward = useCallback(() => {
    if (!results.pathFound || isAnimating || results.path.length === 0) return;
    
    setIsAnimating(true);
    animatePointer(grid, results.path.map(p => p.split(',').map(Number)), 150, () => {
      setIsAnimating(false);
    });
  }, [results, grid, isAnimating]);

  const hasGrid = !!grid && grid.length > 0;

  return (
    <div className="app-container">
      <div className="main-content">
        <h1>🌀 Maze Pathfinding Visualizer</h1>
        <p style={{textAlign: 'center', color: '#6b7280', marginBottom: '30px'}}>
          Design & Analysis of Algorithms (DAA) Project - Interactive Grid Pathfinding
        </p>
        
        <ControlPanel
          n={n}
          setN={setN}
          onCreateGrid={handleCreateGrid}
          onReset={handleReset}
          onClearPath={handleClearPath}
          editMode={editMode}
          setEditMode={setEditMode}
          currentAlgo={currentAlgo}
          onRunAlgo={handleRunAlgo}
          hasGrid={hasGrid}
          isAnimating={isAnimating}
          onStepForward={handleStepForward}
        />
        
        <div className="grid-container">
          {hasGrid && (
          <GridBoard
              grid={grid}
              handleCellChange={handleCellChange}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              isAnimating={isAnimating}
              n={n}
            />
          )}
        </div>
        
        {results.pathFound && (
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            <button onClick={handleStepForward} disabled={isAnimating} className="go-button-large">
              🚀 Animate Pointer Movement
            </button>
          </div>
        )}
      </div>
      
      <div className="sidebar">
        <Legend />
        <StatsPanel
          currentAlgo={currentAlgo}
          pathFound={results.pathFound}
          pathLength={results.pathLength}
          visitedCount={results.visitedCount}
          isAnimating={isAnimating}
        />
      </div>
    </div>
  );
}

export default App;

