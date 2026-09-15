let x;
let y;
let rotateSpeed = 0.01
let rotationVal = 0.0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220, 240, 255);
    x = 100;
    y = 100;
    console.log("x: " + x +",y: "+ y);
}

function draw() {
  background(220, 240, 255);
  rectMode(CENTER);

  push();
  translate(x, y);
  rotate(rotationVal);
  noStroke();
  fill(10, 25, 47);
  rect(0, 0, 300);
  pop();

  push();
  translate(x + 100, y + 100);
  rotate(rotationVal);
    noStroke();
  fill(20, 45, 85);
  rect(0, 0, 300);
  pop();

  push();
  translate(x + 200, y + 200);
    noStroke();
  fill(30, 65, 120);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

push();
  translate(x + 300, y + 300);
    noStroke();
  fill(40, 85, 150);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

  push();
  translate(x + 400, y + 400);
    noStroke();
  fill(50, 105, 180);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

   push();
  translate(x + 500, y + 500);
     noStroke();
  fill(65, 125, 200);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

   push();
  translate(x + 600, y + 600);
     noStroke();
  fill(85, 145, 215);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

   push();
  translate(x + 700, y + 500);
      noStroke();
  fill(110, 165, 225);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

     push();
  translate(x + 800, y + 400);
      noStroke();
  fill(135, 185, 235);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

     push();
  translate(x + 900, y + 300);
      noStroke();
  fill(160, 205, 242);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

     push();
  translate(x + 1000, y + 200);
     noStroke();
  fill(190, 225, 250);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();

       push();
  translate(x + 1000, y + 200);
     noStroke();
  fill(220, 240, 255);
  rotate(rotationVal);
  rect(0, 0, 300);
  pop();
rotationVal = rotationVal+rotateSpeed

}