let xPos
let yPos

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220, 240, 255);
    xPos = width/2
    yPos = height/2
    console.log("xPos: " + xPos +",yPos: "+ yPos);
}

function draw() {
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();
  

  push();
  translate(xPos, yPos);
  rotate(45);
  fill(random(0, 255), random(0, 255), random(0, 255));
  rect(0, 0, 300, 300);
  pop();
}

  function mousePressed() {
  xPos = mouseX;
  yPos = mouseY;
  console.log("xPos: " + xPos + ",yPos: " + yPos);
}
