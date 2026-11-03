let cam;

let oldFrames = [];
let mirrored = true;

let W = 640;
let H = 480;

let step = 3;

let cyan = [110, 225, 235];
let pink = [245, 160, 205];

let lastCaptureTime = 0;
let captureInterval = 100;
let delayTime = 1200;

// Mouse effect
let mouseRadius = 100;
let zoomAmount = 1.6;



async function setup() {
  createCanvas(W, H);

  pixelDensity(1);
  frameRate(60);

  cam = await createCapture(VIDEO);
  cam.size(W, H);
  cam.hide();

  noStroke();
}



function draw() {
  background(0);

  if (!cam || cam.width === 0) {
    return;
  }

  let img = cam.get();

  if (!img || img.width === 0) {
    return;
  }

  img.loadPixels();

  // Save previous frames
  if (millis() - lastCaptureTime > captureInterval) {

    oldFrames.push({
      image: img,
      time: millis()
    });

    lastCaptureTime = millis();
  }

  // Remove older frames
  while (
    oldFrames.length > 0 &&
    millis() - oldFrames[0].time > delayTime + 500
  ) {
    oldFrames.shift();
  }

  // Find delayed frame
  let oldImg = img;

  for (let i = oldFrames.length - 1; i >= 0; i--) {

    if (millis() - oldFrames[i].time >= delayTime) {
      oldImg = oldFrames[i].image;
      break;
    }
  }

  oldImg.loadPixels();

  // Mouse X controls separation
  let distortion = map(
    constrain(mouseX, 0, width),
    0,
    width,
    0,
    35
  );

  // Mouse Y controls brightness threshold
  let threshold = map(
    constrain(mouseY, 0, height),
    0,
    height,
    60,
    190
  );

  // Time-based color transition
  let seconds = frameCount / 60;
  let wave = sin(seconds * TWO_PI / 6);

  let cyanAlpha = map(wave, -1, 1, 135, 190);
  let pinkAlpha = map(wave, -1, 1, 190, 135);

  let breathing = sin(frameCount * 0.025) * 4;

  // Cyan: current frame
  drawPortrait(
    img,
    cyan,
    cyanAlpha,
    -distortion + breathing,
    threshold
  );

  // Pink: delayed frame
  drawPortrait(
    oldImg,
    pink,
    pinkAlpha,
    distortion - breathing,
    threshold
  );

  // White contour dots
  drawDetails(img, threshold);

  // Current yellow areas become white
  drawYellow(img);

  // Original RGB colors in mouse area
  drawMouseZoom(img);
}



// YELLOW DETECTION

function isYellow(r, g, b) {
  return (
    r > 135 &&
    g > 110 &&
    b > 55 &&
    b < 195 &&
    r > g * 1.05 &&
    g > b * 1.15 &&
    r - g < 55
  );
}

// BLUE / PINK PORTRAIT
function drawPortrait(img, col, alpha, offsetX, threshold) {

  noStroke();

  for (let y = 0; y < H; y += step) {

    for (let x = 0; x < W; x += step) {

      let index = (y * W + x) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      // Yellow will be drawn separately
      if (isYellow(r, g, b)) {
        continue;
      }

      let brightness =
        r * 0.299 +
        g * 0.587 +
        b * 0.114;

      // Only draw bright pixels
      if (brightness > threshold) {

        let lightness = brightness / 255;

        let size = map(
          lightness,
          0,
          1,
          0.8,
          step + 1
        );

        let pixelAlpha =
          alpha * pow(lightness, 0.65);

        let drawX = mirrored ? W - 1 - x : x;

        fill(
          col[0],
          col[1],
          col[2],
          pixelAlpha
        );

        rect(
          drawX + offsetX - size / 2,
          y - size / 2,
          size,
          size
        );
      }
    }
  }
}


// DRAW YELLOW AS WHITE
function drawYellow(img) {

  noStroke();

  for (let y = 0; y < H; y += step) {

    for (let x = 0; x < W; x += step) {

      let index = (y * W + x) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      if (isYellow(r, g, b)) {

        let drawX = mirrored ? W - 1 - x : x;

        fill(255, 255, 255, 255);

        rect(
          drawX - step / 2,
          y - step / 2,
          step + 1,
          step + 1
        );
      }
    }
  }
}

//MOUSE ZOOM
function drawMouseZoom(img) {

  noStroke();

  for (let y = 0; y < H; y += step) {

    for (let x = 0; x < W; x += step) {

      let drawX = x;
      let drawY = y;

      let d = dist(
        mouseX,
        mouseY,
        drawX,
        drawY
      );

      if (d < mouseRadius) {

        // 1 at center, 0 at edge
        let strength = map(
          d,
          0,
          mouseRadius,
          1,
          0
        );

        // Smooth transition
        strength =
          strength * strength *
          (3 - 2 * strength);

        // Zoom more near the center
        let zoom =
          1 + (zoomAmount - 1) * strength;

        // Sample current camera image
        let sampleX =
          mouseX + (drawX - mouseX) / zoom;

        let sampleY =
          mouseY + (drawY - mouseY) / zoom;

        // Mirror camera coordinates
        if (mirrored) {
          sampleX = W - 1 - sampleX;
        }

        sampleX = floor(
          constrain(sampleX, 0, W - 1)
        );

        sampleY = floor(
          constrain(sampleY, 0, H - 1)
        );

        let index =
          (sampleY * W + sampleX) * 4;

        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];

        // Keep original RGB colors
        let alpha = 255 * strength;

        fill(r, g, b, alpha);

        rect(
          drawX,
          drawY,
          step + 1,
          step + 1
        );
      }
    }
  }
}

// WHITE DETAIL DOTS


function drawDetails(img, threshold) {

  let detailStep = 5;

  noStroke();

  for (
    let y = detailStep;
    y < H - detailStep;
    y += detailStep
  ) {

    for (
      let x = detailStep;
      x < W - detailStep;
      x += detailStep
    ) {

      let index = (y * W + x) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let brightness =
        r * 0.299 +
        g * 0.587 +
        b * 0.114;

      let nextX = min(x + detailStep, W - 1);
      let nextIndex = (y * W + nextX) * 4;

      let nr = img.pixels[nextIndex];
      let ng = img.pixels[nextIndex + 1];
      let nb = img.pixels[nextIndex + 2];

      let nextBrightness =
        nr * 0.299 +
        ng * 0.587 +
        nb * 0.114;

      let difference = abs(
        brightness - nextBrightness
      );

      if (
        difference > 28 &&
        brightness < threshold + 45
      ) {

        let drawX = mirrored ? W - 1 - x : x;

        let dotSize = map(
          difference,
          28,
          140,
          0.5,
          1.8,
          true
        );

        fill(250, 250, 255, 160);

        circle(drawX, y, dotSize);
      }
    }
  }
}


// KEYBOARD


function keyPressed() {

  if (key === "s" || key === "S") {
    saveCanvas("temporal-distortion", "png");
  }

  if (key === "m" || key === "M") {
    mirrored = !mirrored;
  }
}