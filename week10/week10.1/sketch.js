
let handPose, video, synth;
let hands = [];
let drums = [];
let drumMode = 0;
let wasFist = false;
let started = false;
let currentLine = -1;
let particles = [];
let music;

let notes = [
    "C3", "D3", "E3", "G3", "A3",
    "C4", "D4", "E4", "G4", "A4",
    "C5", "D5", "E5", "G5", "A5"
];

let drumNames = ["Shaker", "Kick Drum", "Hi-hat", "Snare"];

async function setup() {
    createCanvas(windowWidth, windowHeight);

    handPose = await ml5.handPose({ maxHands: 2 });
    video = createCapture(VIDEO, { flipped: true });
    video.size(640, 480);
    video.hide();
    handPose.detectStart(video, gotHands);

    synth = new Tone.Synth().toDestination();
    synth.volume.value = -18;
    music = new Tone.Player("../assets/music.wav").toDestination();
music.volume.value = -15;

drums = [
    new Tone.Player("../assets/Shaker.wav").toDestination(),
    new Tone.Player("../assets/KickDrum.wav").toDestination(),
    new Tone.Player("../assets/Hi-hat.mp3").toDestination(),
    new Tone.Player("../assets/Snare.wav").toDestination()
];
}

function gotHands(results) {
    hands = results;
}

function draw() {
    background(15);

    let activeLine = -1;
    let fist = false;

    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        let p = hand.keypoints;

        // Right hand: pinch to play melody
        if (hand.handedness === "Left") {
            let x = map(p[8].x, 0, video.width, width, 0);
            let y = map(p[8].y, 0, video.height, 0, height);

            if (isPinch(hand)) {
                activeLine = constrain(
                    floor(x / width * notes.length),
                    0,
                    notes.length - 1
                );
            }

            // Particle trail
            noStroke();

            if (isPinch(hand)) {
                particles.push(createVector(x, y));

                if (particles.length > 29) {
                    particles.shift();
                }

                for (let i = 0; i < particles.length; i++) {
                    let alpha = map(i, 0, particles.length, 0, 255);

         fill(255, alpha);
            circle(
                particles[i].x,
                particles[i].y,
                random(12, 23)
                    );
                }

            } else {
                particles = [];
                fill(255);
                circle(x, y, 5);
            }
        }

        // Left hand: fist to play drums
        if (hand.handedness === "Right") {
            fist = isFist(hand);

            let x = map(p[9].x, 0, video.width, width, 0);
            let y = map(p[9].y, 0, video.height, 0, height);

            // Select drums using the left hand position
            drumMode = constrain(floor(y / height * 4), 0, 3);

            if (fist) {
                noFill();
                stroke(255, 150, 200);
                strokeWeight(30);
                circle(x, y, 100);

            } else {
                noStroke();
                fill(255, 150, 200);
                circle(x, y, 30);
            }
        }
    }

    // Play melody
    if (started && activeLine !== -1 && activeLine !== currentLine) {
        synth.triggerAttackRelease(notes[activeLine], "8n");
    }

    if (started && activeLine === -1 && currentLine !== -1) {
        synth.triggerRelease();
    }

    currentLine = activeLine;

    // Play drums
    if (started && fist && !wasFist) {
        if (drums[drumMode] && drums[drumMode].loaded) {
            drums[drumMode].start();
        }
    }

    wasFist = fist;

    // Four percussion regions
    for (let i = 0; i < 4; i++) {
        let y = i * height / 4;

        noStroke();

        if (i === drumMode) {
            fill(255, 220, 74, 100);
        } else {
            fill(255, 220, 74, 0);
        }

        rect(0, y, width, height / 4);

        fill(255);
        textSize(16);
        text(drumNames[i], 25, y + 30);

        stroke(40);
        strokeWeight(1);
        line(0, y, width, y);
    }

    // Vertical lines
    for (let i = 0; i < notes.length; i++) {
        let x = (i + 0.5) * width / notes.length;

        stroke(
            lerpColor(
                color(100, 220, 255),
                color(255, 150, 200),
                i / (notes.length - 1)
            )
        );

        if (i === currentLine) {
            strokeWeight(20);
        } else {
            strokeWeight(3);
        }

        line(x, 0, x, height);
    }

    // Camera preview
    image(video, width - 220, 20, 200, 150);
}

// Right hand: detect pinch
function isPinch(hand) {
    let p = hand.keypoints;

    let d = dist(p[4].x, p[4].y, p[8].x, p[8].y);
    let palmSize = dist(p[0].x, p[0].y, p[9].x, p[9].y);

    return d < palmSize * 0.35;
}

// Left hand: detect fist
function isFist(hand) {
    let p = hand.keypoints;
    let palmSize = dist(p[0].x, p[0].y, p[9].x, p[9].y);

    for (let i = 8; i <= 20; i += 4) {
        let d = dist(p[i].x, p[i].y, p[9].x, p[9].y);

        if (d > palmSize * 0.9) {
            return false;
        }
    }

    return true;
}

// Enable sound
async function mousePressed() {
    await Tone.start();
    started = true;
    currentLine = -1;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

async function keyPressed() {
    if (key === " ") {
        await Tone.start();
        started = true;

        if (music.state === "started") {
            music.stop();
        } else {
            music.start();
        }
    }
}