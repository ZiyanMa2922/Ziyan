let xPos
let yPos
let size
let angle = 0

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220, 240, 255);
    xPos = width/2
    yPos = height/2
}  

function draw(){
}

function mousePressed() {
    xPos = mouseX;
    yPos = mouseY;
    let size = random(30, 150);
    let angle = random(PI);

    push();

    translate(xPos, yPos);
    rotate(angle);

    fill(random(255), random(255), random(255));
    noStroke();
    rectMode(CENTER);
    rect(0, 0, size, size);

    pop();
}