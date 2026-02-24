let player = { x: 1000, y: 1000, s: 18 };
let cam = { x: 0, y: 0 };
const WORLD_W = 3000;
const WORLD_H = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initObstacles();
}

function draw() {
  // ---------- 1) UPDATE PLAYER + COLLISION + BOUNDS ----------
  const dx =
    (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
    (keyIsDown(LEFT_ARROW) || keyIsDown(65));
  const dy =
    (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
    (keyIsDown(UP_ARROW) || keyIsDown(87));
  const len = max(2, abs(dx) + abs(dy));

  let nextX = player.x + (dx / len) * player.s;
  let nextY = player.y + (dy / len) * player.s;

  // World Boundaries
  nextX = constrain(nextX, 0, WORLD_W);
  nextY = constrain(nextY, 0, WORLD_H);

  // Obstacle Collisions (Separate axis check for "sliding" feel)
  if (!isColliding(nextX, player.y)) {
    player.x = nextX;
  }
  if (!isColliding(player.x, nextY)) {
    player.y = nextY;
  }

  // ---------- 2) CAMERA (The Pacing Engine) ----------
  // 0.05 lerp creates a "heavy" camera that follows you with a slight lag
  cam.x = lerp(cam.x, player.x - width / 2, 0.05);
  cam.y = lerp(cam.y, player.y - height / 2, 0.05);

  // ---------- 3) DRAW ----------
  background(255);

  push();
  translate(-cam.x, -cam.y);

  // World Background
  fill(252);
  noStroke();
  rect(0, 0, WORLD_W, WORLD_H);

  // Grid lines
  stroke(150);
  strokeWeight(5);
  for (let x = 0; x <= WORLD_W; x += 160) line(x, 0, x, WORLD_H);
  for (let y = 0; y <= WORLD_H; y += 160) line(0, y, WORLD_W, y);

  drawObstacles();
  drawAndCheckSymbols(player.x, player.y);

  // Player (Pulsing "Spirit" Orb)
  let pulse = sin(frameCount * 0.03) * 4;
  noStroke();
  fill(50, 110, 255, 50); // Outer glow
  circle(player.x, player.y, 30 + pulse);
  fill(50, 110, 255); // Inner core
  circle(player.x, player.y, 15);

  pop();

  drawVignette();
  drawUI();
}

function drawVignette() {
  // Creates a soft shadow around the screen edges to focus the eye
  noFill();
  for (let i = 0; i < 150; i += 10) {
    stroke(0, map(i, 0, 150, 50, 0));
    strokeWeight(0);
    rect(width / 2, height / 2, width - i, height - i);
  }
}

function drawUI() {
  fill(0);
  textAlign(CENTER);
  noStroke();
  textSize(20);
  text(
    "WASD or Arrows to wander • Seek the hidden geometry",
    width / 2,
    height - 30,
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
