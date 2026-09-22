let rot = 0;
let sqSize, sqX, sqY;

function setup() {
    createCanvas(800, 600);
    // colorMode(HSB);
    sqX = width / 2;
    sqY = height / 2;
    sqSize = 100;
    noStroke();
}

function draw() {
    background(20, 100, 200);

    for (let i = 20; i >= 0; i--) {

        let number = 21 - i;

        if (
            (mouseY < height / 2 && number % 2 == 1) ||
            (mouseY >= height / 2 && number % 2 == 0)
        ) {

            push();

            translate(width / 2, height / 2);

            rotate(sin(frameCount * 0.01 + i) * 2);
            
            let r = 30 + cos(frameCount * 0.02 + i) * 20;
            let g = 100 + cos(frameCount * 0.02 + i) * 30;
            let b = 180 + cos(frameCount * 0.02 + i) * 40;

            if (mouseX < width / 2) {
                fill(255 - r, 255 - g, 255 - b);
            }

            if (mouseX >= width / 2) {
                fill(r, g, b);
            }

            rectMode(CENTER);
            rect(0, 0, 100 + i * 30, 100 + i * 30);

            pop();
        }
    }

    rot += 0.0001;
}