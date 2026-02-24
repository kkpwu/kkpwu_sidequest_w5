let player = { x: 1200, y: 800, s: 4 };
let cam = { x: 0, y: 0 };
const WORLD_W = 4000;
const WORLD_H = 3000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initObstacles();
}

function draw() {
  // ---------- 1) UPDATE PLAYER + COLLISION ----------
  const dx =
    (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
    (keyIsDown(LEFT_ARROW) || keyIsDown(65));
  const dy =
    (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
    (keyIsDown(UP_ARROW) || keyIsDown(87));
  const len = max(1, abs(dx) + abs(dy));

  // Calculate potential next position
  let nextX = player.x + (dx / len) * player.s;
  let nextY = player.y + (dy / len) * player.s;

  // Only move if the next position is NOT inside an obstacle
  if (!isColliding(nextX, player.y)) {
    player.x = nextX;
  }
  if (!isColliding(player.x, nextY)) {
    player.y = nextY;
  }

  // ---------- 2) CAMERA ----------
  cam.x = lerp(cam.x, player.x - width / 2, 0.05);
  cam.y = lerp(cam.y, player.y - height / 2, 0.05);

  // ---------- 3) DRAW ----------
  background(255);

  push();
  translate(-cam.x, -cam.y);

  // World Background
  fill(250);
  rect(0, 0, WORLD_W, WORLD_H);

  // Grid lines for reference
  stroke(128, 128, 128);
  for (let x = 0; x <= WORLD_W; x += 160) line(x, 0, x, WORLD_H);
  for (let y = 0; y <= WORLD_H; y += 160) line(0, y, WORLD_W, y);

  // Draw obstacles from objects.js
  drawObstacles();

  // Player
  fill(50, 110, 255);
  rect(player.x - 12, player.y - 12, 24, 24, 5);

  // Debug: Show player position
  fill(0);
  text(
    `Player: (${player.x.toFixed(1)}, ${player.y.toFixed(1)})`,
    player.x + 20,
    player.y - 20,
  );

  // UI Text (in world space, so it moves with camera)
  fill(150);
  textAlign(CENTER);
  textSize(20);
  text("Use WASD or Arrows to wander", width / 2, height - 30);
  textAlign(LEFT);
  textSize(14);
  text("Loc: " + floor(player.x) + ", " + floor(player.y), width / 2, 50);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
