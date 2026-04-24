import { CELL_STATES } from './constants.js';
import { getCell } from './createGrid.js';

/**
 * Get valid 4-directional neighbors for a cell
 * @param {Array<Array<string>>} grid
 * @param {number[]} pos - [row, col]
 * @returns {number[][]} array of valid neighbor positions
 */
export function getNeighbors(grid, pos) {
  const [row, col] = pos;
  const neighbors = [];

  // Check 4 directions: up, down, left, right
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  
  for (const [dr, dc] of directions) {
    const nr = row + dr;
    const nc = col + dc;
    
    // Bounds check
    if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
      // Not a wall
      if (getCell(grid, [nr, nc]) !== CELL_STATES.WALL) {
        neighbors.push([nr, nc]);
      }
    }
  }

  return neighbors;
}

