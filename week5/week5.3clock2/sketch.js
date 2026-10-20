
let drops = [];
let lastSecond;
let lastHour;
let waveShift = 0;      // wave
let waterY;             // water surface
let draining = false;
let backgroundHue;
let lastMinute;

function setup() {
  createCanvas(600, 600);

  lastSecond = second();
  lastHour = hour();

  colorMode(HSL, 360, 100, 100);

  backgroundHue = random(360);
  lastMinute = minute();

  // The water rises by 1/60 of the canvas height every minute.
  waterY = height - minute() * (height / 60);
}

function draw() {
  let s = second();
  let m = minute();
  let h = hour();

  // Change background color every minute.
  if (m !== lastMinute) {
    backgroundHue = random(360);
    lastMinute = m;
  }

  // Map seconds from 0-59 to lightness from 25-96.
  let lightness = map(s, 0, 59, 25, 96);

  background(backgroundHue, 35, lightness);

  // When the hour changes, the water level drops.
  if (h !== lastHour) {
    waterY = 0;
    draining = true;
    drops = [];
    lastHour = h;
  }

  if (draining) {
    waterY += 6;

    if (waterY >= height) {
      waterY = height;
      draining = false;
    }
  } else {
    waterY = height - m * (height / 60);
  }

  // When second changes, create a drop.
  if (s !== lastSecond) {
    if (!draining) {
      drops.push({
        x: width / 2,
        y: -20,
        speed: 2
      });
    }

    lastSecond = s;
  }

  // Wave move
  waveShift += 0.04;

  // Draw the drops.
  for (let i = drops.length - 1; i >= 0; i--) {
    let drop = drops[i];

    // Simulate gravity.
    drop.speed += 0.18;
    drop.y += drop.speed;

    // The wave height at the water drop's position.
    let surfaceY =
      waterY + sin(drop.x * 0.04 - waveShift) * 6;

    // Remove the drop when it reaches the water.
    if (drop.y + 11 >= surfaceY) {
      drops.splice(i, 1);
    } else {
      drawDrop(drop.x, drop.y);
    }
  }

  // Water gradient
  if (waterY < height) {

    strokeWeight(1);

    let surfaceBase = waterY;

    if (waterY <= 0) {
      surfaceBase = -6;
    }

    // Draw horizontal gradient lines.
    for (let y = max(0, surfaceBase - 6); y < height; y += 1) {

      // Light blue at the top, dark blue at the bottom.
      let waterLightness = map(
        y,
        waterY,
        height,
        75,
        30
      );

      stroke(205, 60, waterLightness);

      // Draw short lines below the wave surface.
      for (let x = 0; x < width; x += 5) {

        let surfaceY =
          surfaceBase + sin(x * 0.04 - waveShift) * 6;

        if (y >= surfaceY) {
          line(x, y, min(x + 5, width), y);
        }
      }
    }

    // Draw the moving wave outline.
    noFill();
    stroke(205, 60, 85);
    strokeWeight(2);

    beginShape();

    for (let x = 0; x <= width; x += 1) {
      let y =
        surfaceBase + sin(x * 0.04 - waveShift) * 6;

      vertex(x, y);
    }

    endShape();
  }
}

// Draw drop
function drawDrop(x, y) {
  noStroke();
  fill(0, 0, 100);

  triangle(
    x, y - 14,
    x - 7, y,
    x + 7, y
  );

  ellipse(x, y + 2, 14, 18);
}
