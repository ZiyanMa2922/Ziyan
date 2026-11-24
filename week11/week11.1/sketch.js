
let particles = [];
let weather;

let temperature;
let windSpeed;
let windDirection;

let coldColor;
let middleColor;
let warmColor;

let url = "https://api.open-meteo.com/v1/forecast?latitude=40.65&longitude=-73.95&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=America%2FNew_York";

async function setup() {
  createCanvas(1000, 650);
  pixelDensity(1);

  coldColor = color("#55AFF0");
  middleColor = color("#FFFFFF");
  warmColor = color("#FF9F59");

  // Get weather data
  weather = await loadJSON(url);

  temperature = weather.current.temperature_2m;
  windSpeed = weather.current.wind_speed_10m;
  windDirection = weather.current.wind_direction_10m;
}


function draw() {

  if (!weather) return;

  background(getTemperatureColor(temperature));

  drawParticles();
  drawTemperatureBar();
  drawWeatherInfo();
}


// Particle movement

function drawParticles() {

  let angle = radians(windDirection + 90);
  let speed = map(windSpeed, 0, 60, 0, 12);

  let windX = cos(angle) * speed;
  let windY = sin(angle) * speed;

  let particleNumber = floor(
    map(windSpeed, 0, 60, 4, 35)
  );

  particleNumber = constrain(particleNumber, 4, 50);

  // Create particles
  for (let i = 0; i < particleNumber; i++) {

    particles.push({
      x: width / 2 + random(-250, 250),
      y: height / 2 + random(-250, 250),
      speed: random(0.5, 1.5),
      alpha: 255,
      size: random(1, 4),
      seed: random(1000)
    });
  }

  noStroke();

  // Move particles
  for (let i = particles.length - 1; i >= 0; i--) {

    let p = particles[i];

    p.x += windX * p.speed;
    p.y += windY * p.speed;

    let mouseRadius = 60;

let d = dist(p.x, p.y, mouseX, mouseY);

if (d < mouseRadius) {

  let a = atan2(p.y - mouseY, p.x - mouseX);

  p.x = mouseX + cos(a) * mouseRadius;
  p.y = mouseY + sin(a) * mouseRadius;
}

    p.alpha -= 2;

    // Color variation
    let n = noise(p.seed, frameCount * 0.005);
    let offset = map(n, 0, 1, -15, 15);

    let c = getTemperatureColor(temperature + offset);

    // Invert color
    fill(
      255 - red(c),
      255 - green(c),
      255 - blue(c),
      p.alpha
    );

    circle(p.x, p.y, p.size);

    // Remove particles
    if (
      p.alpha <= 0 ||
      p.x < 0 || p.x > width ||
      p.y < 0 || p.y > height
    ) {
      particles.splice(i, 1);
    }
  }
}


// Temperature color

function getTemperatureColor(t) {

  let amount = map(t, -20, 45, 0, 1);
  amount = constrain(amount, 0, 1);

  if (amount < 0.5) {

    return lerpColor(
      coldColor,
      middleColor,
      map(amount, 0, 0.5, 0, 1)
    );

  } else {

    return lerpColor(
      middleColor,
      warmColor,
      map(amount, 0.5, 1, 0, 1)
    );
  }
}


// Temperature bar

function drawTemperatureBar() {

  let barX = 45;
  let barY = 150;
  let barH = 350;

  // Draw gradient
  for (let y = barY; y <= barY + barH; y++) {

    let amount = map(y, barY, barY + barH, 0, 1);

    let c;

    if (amount < 0.5) {

      c = lerpColor(
        warmColor,
        middleColor,
        map(amount, 0, 0.5, 0, 1)
      );

    } else {

      c = lerpColor(
        middleColor,
        coldColor,
        map(amount, 0.5, 1, 0, 1)
      );
    }

    stroke(c);

    line(barX, y, barX + 10, y);
  }

  // Current temperature position
  let currentY = map(
    constrain(temperature, -20, 45),
    -20, 45,
    barY + barH, barY
  );

  noStroke();
  fill(40);

  triangle(
    barX - 4, currentY,
    barX - 12, currentY - 4,
    barX - 12, currentY + 4
  );
}


// Weather information

function drawWeatherInfo() {

  let x = width - 170;
  let y = height - 100;

  noStroke();
  fill(40);
  textSize(13);
  textAlign(LEFT, BASELINE);

  let directions = [
    "N", "NE", "E", "SE",
    "S", "SW", "W", "NW"
  ];

  let index = round(windDirection / 45) % 8;

  let from = directions[index];
  let to = directions[(index + 4) % 8];

  text("Brooklyn", x, y);
  text(temperature + "°C", x, y + 20);
  text("Wind: " + windSpeed + " km/h", x, y + 40);
  text("Direction: " + from + " → " + to, x, y + 60);
}
