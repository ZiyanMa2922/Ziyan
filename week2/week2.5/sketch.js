let xPos
let yPos
let size
let angle = 0
let stage = 0

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220, 240, 255);
    xPos = width/2
    yPos = height/2
    size = 50;
}  

function draw(){
    background(220, 240, 255);
    if (stage == 0) {
    fill(80, 120, 200);
    noStroke();
    triangle(xPos, yPos - size, xPos - size, yPos + size, xPos + size, yPos + size);
 }

  if (stage == 1) {
    fill(80, 120, 200);
    noStroke();
    triangle(xPos, yPos - size, xPos - size, yPos + size, xPos + size, yPos + size);
    size = size + 1;
 }

 if (stage == 2) {
    fill(80, 120, 200);
    noStroke();
    circle(xPos, yPos, 100);
 }

 if (stage == 3) {
    fill(80, 120, 200);
    noStroke();
    circle(xPos, yPos, 100);
    for (let i = 0; i < 30; i = i + 1) {
        fill(random(255), random(255), random(255));

        circle(random(width),
        random(height),
        random(5, 15));
    }
 }

}

function mousePressed() {
    stage = stage + 1;
    if (stage > 3) {
        stage = 0;
        size = 50;
    }
}