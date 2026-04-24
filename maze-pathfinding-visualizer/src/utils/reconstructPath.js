/**
 * Reconstructs path from start to end using parent map
 * @param {Map<string, string>} parents - parent[posStr] = parentPosStr
 * @param {string} endPosStr - "row,col"
 * @returns {string[]} array of posStr in path order
 */
export function reconstructPath(parents, endPosStr) {
  const path = [];
  let current = endPosStr;
  
  while (current !== null) {
    path.unshift(current);
    current = parents.get(current);
  }
  
  // Remove start if it's the first (path should include start)
  if (path.length > 0) {
    return path;
  }
  return [];
}

/**
 * Pos to string converter: [row,col] -> "row,col"
 * @param {number[]} pos
 * @returns {string}
 */
export function posToStr(pos) {
  return pos.join(',');
}

/**
 * String to pos converter: "row,col" -> [row,col]
 * @param {string} posStr
 * @returns {number[]}
 */
export function strToPos(posStr) {
  return posStr.split(',').map(Number);
}

