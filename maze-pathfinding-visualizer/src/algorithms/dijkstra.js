import { getNeighbors } from '../utils/neighbors.js';
import { posToStr, strToPos, reconstructPath } from '../utils/reconstructPath.js';

/**
 * Dijkstra's algorithm with simple priority queue (array + sort)
 * Weight = 1 for all edges (unweighted currently)
 * @param {Array<Array<string>>} grid
 * @param {number[]} start
 * @param {number[]} end
 * @returns {{path: string[], visited: string[]}}
 */
export function dijkstra(grid, start, end) {
  const distances = new Map();
  const parents = new Map();
  const visited = new Set();
  
  distances.set(posToStr(start), 0);
  parents.set(posToStr(start), null);
  
  // Priority queue: [distance, posStr]
  const pq = [[0, posToStr(start)]];
  
  while (pq.length > 0) {
    // Simple extract-min: sort and pop first
    pq.sort((a, b) => a[0] - b[0]);
    const [dist, currentStr] = pq.shift();
    const current = strToPos(currentStr);
    
    if (visited.has(currentStr)) continue;
    visited.add(currentStr);
    
    if (current[0] === end[0] && current[1] === end[1]) {
      break;
    }
    
    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const nStr = posToStr(neighbor);
      const newDist = dist + 1; // weight = 1
      
      const currentDist = distances.get(nStr) ?? Infinity;
      if (newDist < currentDist) {
        distances.set(nStr, newDist);
        parents.set(nStr, currentStr);
        pq.push([newDist, nStr]);
      }
    }
  }
  
  return {
    path: reconstructPath(parents, posToStr(end)),
    visited: Array.from(visited)
  };
}

