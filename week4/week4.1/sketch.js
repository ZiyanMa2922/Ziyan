
let seed = 1299;
let doExport = false;


function setup() {
    createCanvas(576, 384);
}


function keyPressed() {

    if (key == "r") {
        seed = floor(random(13001));
    }

    // press s to save
    if (key == "s") {
        doExport = true;
    }
}


function drawSquare(x, y) {

    push();

    translate(x, y);

    rectMode(CENTER);
    noFill();

    for (let i = 0; i < 20; i++) {

        push();

        let rot = TWO_PI * noise(i * 0.3);

        rotate(rot);

        let colorChoice = random();

        if (colorChoice < 0.5) {
            stroke(255, 0, 0);
        } else {
            stroke(0);
        }

        let squareSize = 100 + i * 40;

        rect(0, 0, squareSize, squareSize);


        pop();
    }


    pop();
}



function draw() {

    if (doExport) {
        beginRecordSvg("myPlot" + seed + ".svg");
    }


    noiseSeed(seed);
    randomSeed(seed);

    background(255);


    let moveX = map(mouseX, 0, width, -10, 10);
    let moveY = map(mouseY, 0, height, -10, 10);


    drawSquare(
        width / 2 + moveX,
        height / 2 + moveY
    );


    if (doExport) {

        endRecordSvg();

        doExport = false;
    }
}