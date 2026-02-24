let obstacles = [];
let symbols = [];

function initObstacles() {
  // 1. RANDOMIZED SOLID BLOCKS
  for (let i = 0; i < 60; i++) {
    let obsW = random(40, 200); // Random width between 40 and 200
    let obsH = random(40, 150); // Random height between 40 and 150
    let obsX = random(0, 3000 - obsW); // Keep within WORLD_W
    let obsY = random(0, 2000 - obsH); // Keep within WORLD_H

    // Prevent obstacles from spawning on the player's start (1000, 1000)
    let dToStart = dist(obsX + obsW / 2, obsY + obsH / 2, 1000, 1000);

    if (dToStart > 150) {
      obstacles.push({
        x: obsX,
        y: obsY,
        w: obsW,
        h: obsH,
        round: random(5, 20), // Randomly rounded corners
      });
    } else {
      i--; // Try again if it spawned on the player
    }
  }

  // 2. RANDOMIZED HIDDEN SYMBOLS
  for (let i = 0; i < 15; i++) {
    symbols.push({
      x: random(100, 2900),
      y: random(100, 1900),
      alpha: 0,
      discovered: false,
      rotation: random(TWO_PI),
    });
  }
}

function isColliding(px, py) {
  for (let obs of obstacles) {
    // Check if the player circle (radius ~12) overlaps the rectangle
    // Adding a small buffer (5px) for smoother collision
    if (
      px + 10 > obs.x &&
      px - 10 < obs.x + obs.w &&
      py + 10 > obs.y &&
      py - 10 < obs.y + obs.h
    ) {
      return true;
    }
  }
  return false;
}

function drawObstacles() {
  fill(32, 15, 15);
  noStroke();
  for (let obs of obstacles) {
    rect(obs.x, obs.y, obs.w, obs.h, obs.round);
  }
}

function drawAndCheckSymbols(px, py) {
  for (let s of symbols) {
    let d = dist(px, py, s.x, s.y);
    if (d < 150) s.discovered = true;

    if (s.discovered) {
      s.alpha = lerp(s.alpha, 200, 0.03);
      push();
      translate(s.x, s.y);
      rotate(frameCount * 0.01 + s.rotation);
      stroke(0, 150, 255, s.alpha);
      strokeWeight(2);
      noFill();
      rectMode(CENTER);
      rect(0, 0, 20, 20);
      ellipse(0, 0, 30, 30);
      pop();
    }
  }
}
