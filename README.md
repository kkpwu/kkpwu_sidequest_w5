# 2D Wanderer

A top-down exploration game built with **p5.js**. This project features a procedural world, smooth camera tracking, and axis-aligned collision detection.

## 🚀 Features
* **Dynamic Camera**: Uses `lerp()` for smooth player-follow movement.
* **Procedural Obstacles**: Objects are randomized on every load with a safety buffer to prevent spawning on the player.
* **Layered Rendering**: Separates **World Space** (game objects) from **Screen Space** (UI/HUD).
* **Responsive Design**: Automatically handles window resizing.

---

## 🎮 Controls
| Key | Action |
| :--- | :--- |
| **WASD / Arrows** | Move Player |
| **F5 / Refresh** | Generate New Map |

---

## 🛠️ Technical Overview

### Collision Logic
The game uses **AABB (Axis-Aligned Bounding Box)** logic. To allow the player to "slide" along walls, the collision check is performed twice per frame: once for the X-axis and once for the Y-axis.

### Coordinate Systems
* **World Coordinates**: The $4000 \times 3000$ arena where the player lives.
* **Screen Coordinates**: The static overlay where the "Use WASD" instructions are displayed.

---

## 📁 Project Structure
* `sketch.js` - Core logic: input handling, camera, and the main draw loop.
* `objects.js` - Environment: obstacle generation and collision functions.
* `style.css` - Basic styling to center the canvas and remove scrollbars.
