
let seed = 1299;
let doExport = false;

function setup() {
    createCanvas(1009, 680);
}

function keyPressed() {

    if (key == "r") {
        seed = floor(random(13001));
    }

    if (key == "s") {
        doExport = true;
    }
}
function drawParallelLines(x, y, rot) {
    push();

    translate(x, y);
    rotate(rot);

    stroke(0);

    for (let i = 0; i < 5; i++) {
        line(-50, i * 8, 50, i * 8);
    }

    pop();
}

function drawline(x, y, rot) {
    push();
    translate(x, y);
    // push();
    rotate(rot);
       let colorChoice = random();

    if (colorChoice < 0.5) {
        stroke(255, 0, 0);
    } else {
        stroke(0);
    }

    for (let angle = 0; angle < 360; angle += 30) {

        push();

        rotate(radians(angle));
   arc(-20, -20, 80, 80, -HALF_PI, HALF_PI);
arc(20, 20, 80, 80, HALF_PI, PI + HALF_PI);
       pop();}
    // let lineX1 = random(-40, 40);
    // let lineY1 = random(-40, 40);

    // drawParallelLines(lineX1, lineY1, 0);

    // let lineX2 = random(-40, 40);
    // let lineY2 = random(-40, 40);

    // drawParallelLines(lineX2, lineY2, HALF_PI);
    // let lineX3 = random(-40, 40);
    // let lineY3 = random(-40, 40);

    // drawParallelLines(lineX2, lineY2, HALF_PI);
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

    let step = 100;
    let inc = .1;
    let noiseVal = random();
//    mouse_xy
    // let moveX = map(mouseX, 0, width, -10, 10);
    // let moveY = map(mouseY, 0, height, -10, 10);

    rectMode(CENTER);

    for (let x = step; x < width - step; x += step) {

        for (let y = step; y < height - step; y += step) {

            let rot = TWO_PI * noise(noiseVal);

           drawline(x, y, rot);

            noiseVal += inc;
        }
    }

    if (doExport) {

        endRecordSvg();

        doExport = false;
    }
}