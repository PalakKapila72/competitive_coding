// Cell state constants
export const CELL_STATES = {
  OPEN: 'open',
  WALL: 'wall',
  START: 'start',
  END: 'end',
  VISITED: 'visited',
  PATH: 'path',
  POINTER: 'pointer'
};

// Colors for pink bg theme - black/white + high contrast
export const CELL_COLORS = {
  [CELL_STATES.OPEN]: '#ffffff',
  [CELL_STATES.WALL]: '#000000',
  [CELL_STATES.START]: '#00ff00',
  [CELL_STATES.END]: '#ff0000',
  [CELL_STATES.VISITED]: '#0000ff',
  [CELL_STATES.PATH]: '#ffff00',
  [CELL_STATES.POINTER]: '#ff00ff'
};

// Editing modes
export const EDIT_MODES = {
  WALL: 'wall',
  START: 'start',
  END: 'end'
};

// Algorithm complexities (displayed in StatsPanel)
export const ALGORITHM_COMPLEXITIES = {
  bfs: {
    time: 'O(V + E)',
    space: 'O(V)',
    description: 'Shortest path in unweighted graph'
  },
  dfs: {
    time: 'O(V + E)',
    space: 'O(V)',
    description: 'Valid path (not necessarily shortest)'
  },
  dijkstra: {
    time: 'O((V + E) log V)',
    space: 'O(V)',
    description: 'Shortest path with priority queue'
  }
};

// Directions: up, down, left, right (no diagonals)
export const DIRECTIONS = [
  [-1, 0], // up
  [1, 0],  // down
  [0, -1], // left
  [0, 1]   // right
];

