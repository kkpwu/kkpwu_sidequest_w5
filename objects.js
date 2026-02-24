// Define our solid obstacles
const obstacles = [];
const numObstacles = 30;

function initObstacles() {
  for (let i = 0; i < numObstacles; i++) {
    obstacles.push({
      x: (i * 280) % 4000, // Using WORLD_W value
      y: (i * 180) % 3000, // Using WORLD_H value
      w: 80,
      h: 80,
      r: 10, // corner radius
    });
  }
}

function drawObstacles() {
  noStroke();
  fill(170, 190, 210);
  for (let obs of obstacles) {
    rect(obs.x, obs.y, obs.w, obs.h, obs.r);
  }
}

// Function to check if a point (px, py) is inside any obstacle
function isColliding(px, py) {
  for (let obs of obstacles) {
    // Check if player point is within the rectangle bounds
    if (px > obs.x && px < obs.x + obs.w && py > obs.y && py < obs.y + obs.h) {
      return true;
    }
  }
  return false;
}
