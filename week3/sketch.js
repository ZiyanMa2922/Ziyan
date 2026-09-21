let x = 0;
let incX = 0.1;

let y = 0;
let incY = 0.025;

function setup(){
    createCanvas(800, 600);
    colorMode(HSB);
    strokeWeight(2);
    noFill();
}

function draw(){
    background(190,10,200);
    let xPos = ((sin(x)+1)/2)*width;
    let yPos = ((cos(y)+1)/2)*height;
    ellipse(xPos, yPos, 50);

    x+=incX
    y+=incY

}