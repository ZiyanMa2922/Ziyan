// press 'r' for new random seed
// press 's' to save

let seed = 1299;
let doExport = false;

function setup() {
    createCanvas(576, 384); 
}

function keyPressed() {

    if (key == "r") {
        seed = floor(random(13001));
    }

    if (key == "s") {
        doExport = true;
    }
}
 
function drawline(x, y, rot) {
    push();
    translate(x, y);
    rotate(rot);
       let colorChoice = random();

    if (colorChoice < 0.5) {
        stroke(255, 0, 0);     
    } else {
        stroke(0);            
    }
   arc(-20, -20, 80, 80, -HALF_PI, HALF_PI);
arc(20, 20, 80, 80, HALF_PI, PI + HALF_PI);
    pop();
}

function draw() {

    if (doExport) {
        beginRecordSvg("myPlot" + seed + ".svg");
    }

    noiseSeed(seed);
    randomSeed(seed);

    background(240);

    noFill();

    let step = 52;   
    let inc = .01;    
    let noiseVal = random();
   
//    mouse_xy
    let moveX = map(mouseX, 0, width, -10, 10);
    let moveY = map(mouseY, 0, height, -10, 10);

    rectMode(CENTER);

    for (let x = step; x < width - step; x += step) {

        for (let y = step; y < height - step; y += step) {

            let rot = TWO_PI * noise(noiseVal);

           drawline(x + moveX, y + moveY, rot);

            noiseVal += inc;
        }
    }

    if (doExport) {

        endRecordSvg();

        doExport = false;
    }
}