import { getNeighbors } from '../utils/neighbors.js';
import { reconstructPath, posToStr, strToPos } from '../utils/reconstructPath.js';

/**
 * Breadth-First Search - finds shortest path in unweighted grid
 * @param {Array<Array<string>>} grid
 * @param {number[]} start - [row, col]
 * @param {number[]} end - [row, col]
 * @returns {{path: string[], visited: string[]}} path and visited order
 */
export function bfs(grid, start, end) {
  const queue = [start];
  const visited = new Set();
  const parents = new Map();
  
  visited.add(posToStr(start));
  parents.set(posToStr(start), null);
  
  while (queue.length > 0) {
    const current = queue.shift();
    const currentStr = posToStr(current);
    
    if (current[0] === end[0] && current[1] === end[1]) {
      return {
        path: reconstructPath(parents, posToStr(end)),
        visited: Array.from(visited).sort((a, b) => {
          const [ar, ac] = strToPos(a);
          const [br, bc] = strToPos(b);
          return ar * 1000 + ac - (br * 1000 + bc);
        })
      };
    }
    
    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const nStr = posToStr(neighbor);
      if (!visited.has(nStr)) {
        visited.add(nStr);
        parents.set(nStr, currentStr);
        queue.push(neighbor);
      }
    }
  }
  
  return { path: [], visited: Array.from(visited) };
}
