import { CELL_STATES } from './constants.js';

/**
 * Creates an n x n grid filled with OPEN cells
 * @param {number} n - Grid size (1 <= n <= 100)
 * @returns {Array<Array<string>>} 2D grid array
 */
export function createGrid(n) {
  const grid = [];
  for (let i = 0; i < n; i++) {
    grid[i] = [];
    for (let j = 0; j < n; j++) {
      grid[i][j] = CELL_STATES.OPEN;
    }
  }
  return grid;
}

/**
 * Sets a cell state at position [row, col]
 * @param {Array<Array<string>>} grid
 * @param {number[]} pos - [row, col]
 * @param {string} state
 */
export function setCell(grid, pos, state) {
  const [row, col] = pos;
  if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
    grid[row][col] = state;
  }
}

/**
 * Gets cell state at position
 * @param {Array<Array<string>>} grid
 * @param {number[]} pos
 * @returns {string} cell state
 */
export function getCell(grid, pos) {
  const [row, col] = pos;
  return grid[row]?.[col] || null;
}

/**
 * Finds position of start or end cell
 * @param {Array<Array<string>>} grid
 * @param {string} state
 * @returns {number[]|null} [row, col] or null
 */
export function findCell(grid, state) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === state) {
        return [i, j];
      }
    }
  }
  return null;
}

