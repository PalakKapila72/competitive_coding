import { CELL_STATES, CELL_COLORS } from './constants.js';

/**
 * Animate visited nodes with delay
 * @param {Array<Array<string>>} grid
 * @param {string[]} visited - array of posStr
 * @param {number} delayMs
 * @param {function} onComplete
 */
export function animateVisited(grid, visited, delayMs = 10, onComplete) {
  let index = 0;
  
  function step() {
    if (index < visited.length) {
      const pos = visited[index].split(',').map(Number);
      grid[pos[0]][pos[1]] = CELL_STATES.VISITED;
      index++;
      setTimeout(step, delayMs);
    } else {
      onComplete();
    }
  }
  
  step();
}

/**
 * Animate path after visited
 * @param {Array<Array<string>>} grid
 * @param {string[]} path - posStr array
 * @param {number} delayMs
 * @param {function} onComplete
 */
export function animatePath(grid, path, delayMs = 30, onComplete) {
  // First clear previous path
  for (let i = 1; i < path.length - 1; i++) { // skip start/end
    const pos = path[i].split(',').map(Number);
    if (grid[pos[0]][pos[1]] === CELL_STATES.POINTER) {
      grid[pos[0]][pos[1]] = CELL_STATES.VISITED;
    }
  }
  
  let index = 0;
  
  function step() {
    if (index < path.length) {
      const posStr = path[index];
      const pos = posStr.split(',').map(Number);
      
      // Don't override start/end
      if (index > 0 && index < path.length - 1) {
        grid[pos[0]][pos[1]] = CELL_STATES.PATH;
      }
      
      index++;
      setTimeout(step, delayMs);
    } else {
      onComplete();
    }
  }
  
  step();
}

/**
 * Animate moving pointer along path
 * @param {Array<Array<string>>} grid
 * @param {string[]} path
 * @param {number} speedMs
 * @param {function} onComplete
 */
export function animatePointer(grid, path, speedMs = 100, onComplete) {
  let index = 0;
  
  function step() {
    if (index < path.length) {
      const posStr = path[index];
      const pos = posStr.split(',').map(Number);
      
      // Clear previous pointer
      if (index > 0) {
        const prevPos = path[index - 1].split(',').map(Number);
        if (grid[prevPos[0]][prevPos[1]] === CELL_STATES.POINTER) {
          grid[prevPos[0]][prevPos[1]] = CELL_STATES.PATH;
        }
      }
      
      // Set current pointer
      grid[pos[0]][pos[1]] = CELL_STATES.POINTER;
      
      index++;
      setTimeout(step, speedMs);
    } else {
      // Clear final pointer position (leave as PATH)
      const endPos = path[path.length - 1].split(',').map(Number);
      grid[endPos[0]][endPos[1]] = CELL_STATES.END;
      onComplete();
    }
  }
  
  step();
}

