
let pMapper;
let myQuad;
let myQuad2;
let myQuad3;
let myQuad4;

// Square colors
let colors = [
  "#FFFF00",
  "#FF9FA0",
  "#52DDF2",
  "#6BFA91"
];

let squares = [];

// Square settings
let squareSize = 70;
let gap = 8;

let rows = 5;
let cols = 10;

let moveX = [];
let direction = [];

let speed = 0.7;
let visible = [];
let disappearChance = 0.3;

// Original ball settings
let spheres = [];
let numspheres = 80;

// Original Ball Class
class Ball {

  constructor(mySize) {

    this.diam = mySize;

    // Random color and transparency
    this.col = color(
      random(255),
      random(255),
      random(255),
      random(255)
    );

    // Random position inside Quad 3
    this.xpos = random(
      this.diam / 2,
      myQuad3.width - this.diam / 2
    );

    this.ypos = random(
      this.diam / 2,
      myQuad3.height - this.diam / 2
    );

    // Random speed
    this.xspeed = random(-5, 5);
    this.yspeed = random(-5, 5);
  }

  // Update ball position
  update() {
    this.xpos += this.xspeed;
    this.ypos += this.yspeed;
  }

  // Check wall collisions
  wallCheck() {

    // Left and right walls
    if (
      this.xpos >= myQuad3.width - this.diam / 2 ||
      this.xpos <= this.diam / 2
    ) {
      this.xspeed *= -1;

      this.xpos = constrain(
        this.xpos,
        this.diam / 2,
        myQuad3.width - this.diam / 2
      );
    }

    // Top and bottom walls
    if (
      this.ypos >= myQuad3.height - this.diam / 2 ||
      this.ypos <= this.diam / 2
    ) {
      this.yspeed *= -1;

      this.ypos = constrain(
        this.ypos,
        this.diam / 2,
        myQuad3.height - this.diam / 2
      );
    }
  }

  // Draw ball
  render(mySketch) {

    mySketch.noStroke();
    mySketch.fill(this.col);

    mySketch.ellipse(
      this.xpos,
      this.ypos,
      this.diam
    );
  }
}

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  pMapper = createProjectionMapper(this);

  // Create three Quads
  myQuad = pMapper.createQuadMap(400, 400);
  myQuad2 = pMapper.createQuadMap(400, 400);
  myQuad3 = pMapper.createQuadMap(400, 400);
    myQuad4 = pMapper.createQuadMap(400, 400);

  // Set up square movement
  for (let row = 0; row < rows; row++) {

    moveX.push(0);

    // Even rows move right, odd rows move left
    if (row % 2 === 0) {
      direction.push(1);
    } else {
      direction.push(-1);
    }
  }

  // Create random square colors
  for (let i = 0; i < rows * cols; i++) {

    squares.push(random(colors));

    visible.push(random() > disappearChance);
  }

  // Create original 80 balls
  for (let i = 0; i < numspheres; i++) {

    spheres.push(new Ball(1 + i));
  }
}

function draw() {

  background(0);

  // Update square movement and colors
  updateAnimation();

  // Update balls once per frame
  for (let i = 0; i < spheres.length; i++) {

    spheres[i].update();
    spheres[i].wallCheck();
  }

  // Display three Quads
  myQuad.displaySketch(ZiyanDrawSquares);
  myQuad2.displaySketch(ZiyanDrawSquares2);
  myQuad3.displaySketch(ZiyanDraw);
  myQuad4.displaySketch(ZiyanDraw);
}

// Quad 1: Original moving squares
function ZiyanDrawSquares(sketch) {

  sketch.background(0);
  sketch.noStroke();

  for (let row = 0; row < rows; row++) {

    for (let col = 0; col < cols; col++) {

      let index = row * cols + col;

      sketch.fill(squares[index]);

      let x = col * (squareSize + gap)
              + moveX[row] - 400;

      let y = row * (squareSize + gap) + gap;

      sketch.rect(x, y, squareSize, squareSize);
    }
  }
}

// Quad 2: Moving and disappearing squares
function ZiyanDrawSquares2(pg) {

  pg.background(0);
  pg.noStroke();

  for (let row = 0; row < rows; row++) {

    for (let col = 0; col < cols; col++) {

      let index = row * cols + col;

      if (visible[index]) {

        pg.fill(squares[index]);

        let x = col * (squareSize + gap)
                + moveX[row] - 400;

        let y = row * (squareSize + gap) + gap;

        pg.rect(x, y, squareSize, squareSize);
      }
    }
  }
}

// Quad 3: Original ZiyanDraw with gradient and balls
function ZiyanDraw(mySketch) {

  // Pink to blue gradient
  let pink = mySketch.color(255, 182, 210);
  let blue = mySketch.color(150, 200, 255);

  // Draw gradient background
  for (let y = 0; y < myQuad3.height; y++) {

    let t = y / myQuad3.height;

    let c = mySketch.lerpColor(pink, blue, t);

    mySketch.stroke(c);

    mySketch.line(
      0,
      y,
      myQuad3.width,
      y
    );
  }

  // Draw original transparent balls
  for (let i = 0; i < spheres.length; i++) {

    spheres[i].render(mySketch);
  }
}

// Update square animation
function updateAnimation() {

  // Move each row
  for (let row = 0; row < rows; row++) {

    moveX[row] += speed * direction[row];

    // Bounce when reaching the limits
    if (
      moveX[row] > 400 ||
      moveX[row] < -400
    ) {
      direction[row] *= -1;
    }
  }

  // Change square colors and visibility
  if (frameCount % 30 === 0) {

    for (let i = 0; i < squares.length; i++) {

      squares[i] = random(colors);

      visible[i] = random() > disappearChance;
    }
  }
}

// Projection Mapping controls
function keyPressed() {

  if (key === "c") {
    pMapper.toggleCalibration();
  }

  if (key === "f") {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  if (key === "s") {
    pMapper.save("map.json");
  }

  if (key === "l") {
    pMapper.load("maps/map.json");
  }
}
