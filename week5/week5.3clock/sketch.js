
let drops = [];         //
let lastSecond;         //
let lastHour;           //
let waveShift = 0;      // wave
let waterY;             // water surface
let draining = false;  //
let backgroundHue;
let lastMinute;

function setup() {
  createCanvas(600, 600);

  lastSecond = second();
  lastHour = hour();
colorMode(HSL, 360, 100, 100);

backgroundHue = random(360); // randon color for background
lastMinute = minute();      //
  // The water rises by 1/60 of the canvas height every minute.
  waterY = height - minute() * (height / 60);
}

function draw() {
  let s = second();
  let m = minute();
  let h = hour();

if (m !== lastMinute) {
  backgroundHue = random(360); // change the background colour for next min
  lastMinute = m;
}

let lightness = map(s, 0, 59, 25, 96);
// Map seconds from 0–59 to lightness from 25–96.

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

  // when second change, create a drop
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

  // wave move
  waveShift += 0.04;

  // draw the drop
  for (let i = drops.length - 1; i >= 0; i--) {
    let drop = drops[i];

    // Simulate gravity: the water drop accelerates as it falls.
    drop.speed += 0.18;
    drop.y += drop.speed;

    // The wave height at the water drop’s position.
    let surfaceY =
      waterY + sin(drop.x * 0.025 - waveShift) * 6;

    // Remove the water drop when it reach the water surface.
    if (drop.y + 11 >= surfaceY) {
      drops.splice(i, 1);
    } else {
      drawDrop(drop.x, drop.y);
    }
  }

  // water
  if (waterY < height) {
    noStroke();
   fill(205, 60, 55);

    beginShape();

    let surfaceBase = waterY;

    if (waterY <= 0) {
      surfaceBase = -6;
    }

    // wave
    for (let x = 0; x <= width; x += 1) {
      let y =
        surfaceBase + sin(x * 0.04 - waveShift) * 6;
  // draw wave
      vertex(x, y);
    }
    vertex(width, height);
    vertex(0, height);

    endShape(CLOSE);
  }
}

// draw Drop
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