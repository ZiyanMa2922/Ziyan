let stars = [];

let numStars = 20;
let noiseX = 0.002;
let noiseY = 0.001;

let clouds = [];

function setup() {
    createCanvas(800, 600);
    colorMode(HSB, 360, 100, 100, 100);
    noStroke();
    for (let i = 0; i < numStars; i++) {
        let oneStar = {
            x: random(width),
            y: random(height),
            alpha: random(30, 100),
            h : 50,
            diam: random(3, 20),
        }
        stars.push(oneStar);
        
    }
     for (let i = 0; i < 5; i++) {
    let oneCloud = {
      x: i * 200 + random(100),
      y: random(80, 350),
      size: random(50, 100),
      speed: random(0.3, 0.8)
    };

    clouds.push(oneCloud);
  }
}

function draw() {
   // NIGHT
  if (stars.length > 0) {
    background(230, 40, 5);
     for (let i = 0; i < stars.length; i++) {
      fill(stars[i].h, 90, 100, stars[i].alpha);
       // Draw a star
      drawStar(
        stars[i].x,
        stars[i].y,
        stars[i].diam
      );

       if (random() < 0.5) {
        stars[i].x += noise(noiseX * frameCount);
      } else {
        stars[i].y += noise(noiseY * frameCount);
      }

       if (stars[i].x > width + stars[i].diam) {
        stars[i].x = -stars[i].diam;
      }

      if (stars[i].y > height + stars[i].diam) {
        stars[i].y = -stars[i].diam;
      }
    }

 } else {
     // DAY
    background(205, 55, 95);

    for (let i = 0; i < clouds.length; i++) {
      drawCloud(
        clouds[i].x,
        clouds[i].y,
        clouds[i].size
      );
      clouds[i].x -= clouds[i].speed;

      // Reappear from the right
      if (clouds[i].x < -200) {
        clouds[i].x = width + 200;
      }
    }
  }
}

function drawStar(x, y, size) {
  let outerRadius = size;
  let innerRadius = size * 0.45;
 beginShape();

  for (let i = 0; i < 10; i++) {
    let angle = i * TWO_PI / 10 - HALF_PI;
    let radius;

    if (i % 2 === 0) {
      radius = outerRadius;
    } else {
      radius = innerRadius;
    }

    let sx = x + cos(angle) * radius;
    let sy = y + sin(angle) * radius;

    vertex(sx, sy);
  }

  endShape(CLOSE);
}

function drawCloud(x, y, size) {
  fill(0, 0, 100, 25);

  for (let i = 0; i < 20; i++) {
    let circleX = x + cos(i * 0.8) * size * 0.6;
    let circleY = y + sin(i * 1.3) * size * 0.25;
    let circleSize = size * 0.5;

    ellipse(circleX, circleY, circleSize);
  }
}

function mousePressed() {
  if (stars.length > 0) {
    stars.pop();
  }
}