let xPos
let yPos

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220, 240, 255);
    xPos = width/2
    yPos = width/2
}

function draw() {
    ellipse(200, 100, 50, 50);
    rectMode(CENTER);
    rect(120, 100, 30, 30);

  push();
    stroke(10, 160, 225);
    strokeWeight(4);
    quad(60, 80, 60, 260, 90, 260, 80, 80);
  pop();

  push();
    fill(176, 224, 230);
    stroke(255, 180, 230);
    strokeWeight(6);
    triangle(xPos, yPos - 100, xPos - 100, yPos + 50, xPos + 100, yPos + 50);
  pop();

  push();
  noFill();
  stroke(255, 105, 180);
  strokeWeight(4);
  arc(xPos, yPos, 300, 300, radians(45), radians(135), OPEN);
  pop();

  push();
   stroke(500);
   strokeWeight(30);
   point(xPos-110, yPos-80);
  
   stroke(500);
   strokeWeight(30);
   point(xPos+110, yPos-80);
  pop();

}