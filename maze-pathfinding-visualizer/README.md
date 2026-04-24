# 🌀 Maze Pathfinding Visualizer

## 🎯 Design & Analysis of Algorithms (DAA) Project

Interactive **React + Vite** application demonstrating **BFS**, **DFS**, and **Dijkstra's** pathfinding algorithms on a customizable maze grid.

### ✨ Features
- **Customizable Grid**: Size 1x1 to 100x100
- **Interactive Maze Building**: Click to add walls, set start/end
- **3 Algorithms**: BFS (shortest), DFS (any path), Dijkstra (priority queue)
- **Smooth Animations**: Visited nodes → Path → Moving pointer
- **Real-time Stats**: Path length, visited count, time/space complexity
- **Modern UI**: Responsive, colorful, hover effects
- **Beginner-friendly**: Modular, well-commented code

### 🚀 Quick Start

1. **Navigate to project:**
   ```bash
   cd maze-pathfinding-visualizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser**: `http://localhost:5173`

### 🎮 How to Use

1. **Set Grid Size** (1-100) → Click **Create Grid**
2. **Build Maze**: 
   - Select **WALL** mode → Click cells to toggle obstacles
   - Select **START** → Click entry cell (green)
   - Select **END** → Click exit cell (red)
3. **Run Algorithm**: Click **BFS**, **DFS**, or **DIJKSTRA**
4. **Watch**: 
   - Blue cells = visited nodes
   - Orange cells = shortest path  
   - Purple pointer = animated movement
5. **Controls**: Reset, Clear Path, New Grid

### 📊 Algorithm Details

| Algorithm | Time Complexity | Space Complexity | Guarantees |
|-----------|----------------|------------------|------------|
| **BFS** | O(V + E) | O(V) | Shortest path |
| **DFS** | O(V + E) | O(V) | Any valid path |
| **Dijkstra** | O((V+E) log V) | O(V) | Shortest path |

### 🏗️ Project Structure
```
src/
├── components/     # UI components
├── algorithms/     # BFS, DFS, Dijkstra
├── utils/          # Grid logic, animations
├── styles/         # Modular CSS
├── App.jsx         # Main app state/logic
└── main.jsx        # Entry point
```

### 🔧 Scripts
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
```

### 🎨 Color Legend
- 🟩 **Green** = Start
- 🔴 **Red** = End  
- ⬜ **White** = Open
- ⚫ **Gray** = Wall
- 🔵 **Blue** = Visited
- 🟠 **Orange** = Path
- 🟣 **Purple** = Pointer

### 📱 Responsive
Works on desktop, tablet, mobile with optimized grid sizing.

---

**Built with ❤️ for DAA learning** | **React 18 + Vite + Vanilla CSS**

