// press 'r' for new random seed
// press 's' to save

let seed = 1234;
let doExport = false;

function setup() {
    createCanvas(576, 384); // postcard size
}

function keyPressed() {

    if (key == "r") {
        seed = floor(random(13001));
    }

    if (key == "s") {
        doExport = true;
    }
}

function drawRectangle(x, y, rot) {

    push();

    translate(x, y);

    rotate(rot);

    rect(0, 0, 40);

    pop();
}

function draw() {

    // start recording SVG
    if (doExport) {
        beginRecordSvg("myPlot" + seed + ".svg");
    }

    noiseSeed(seed);
    randomSeed(seed);

    background(220);

    noFill();

    let step = 46;     // space in grid
    let inc = .01;     // amount to increment noise value
    let noiseVal = random();

    rectMode(CENTER);

    for (let x = step; x < width - step; x += step) {

        for (let y = step; y < height - step; y += step) {

            let rot = TWO_PI * noise(noiseVal);

            drawRectangle(x, y, rot);

            noiseVal += inc;
        }
    }

    // finish SVG export
    if (doExport) {

        endRecordSvg();

        doExport = false;
    }
}