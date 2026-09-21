let rot = 0;


function setup() {
    createCanvas(800, 600);
    // colorMode(HSB);
    noStroke();
}

function draw() {
    background(20,100,200);
    // rectMode(CENTER);

   for (let i = 20; i >= 0; i--) {
        push();
       
            // fill(360*(x*y)/70,100,100);
            translate(width / 2, height / 2);
           rotate(sin(frameCount * 0.01 + i) * 2);
            fill(30 + cos(frameCount * 0.02 + i) * 20,
    100 + cos(frameCount * 0.02 + i) * 30,
    180 + cos(frameCount * 0.02 + i) * 40);
             rectMode(CENTER);
            rect(0, 0, 100 + i * 30, 100 + i * 30);
            scale()

            

            // translate(x*75+25, y*75+25);
            // scale(frameCount % 100/50);
            // rotate(rot);
  
            pop();
            rot+=0.0001;

    }
// rot=0.0;
}