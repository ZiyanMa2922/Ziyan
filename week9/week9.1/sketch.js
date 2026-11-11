
let video;
let handPose;
let hands = [];

// Canvas
const W = 640;
const H = 480;

const START_DISTANCE = 55;
const BLACK_DISTANCE = 500;
const BW_DISTANCE = 300;

// Visual
const LINE_WEIGHT = 1;
const LINE_OPACITY = 80;
const FADE_SPEED = 0.12;
const BW_THRESHOLD = 0.5;

// State
let activated = false;
let darkness = 0;
let lostHands = false;
let readyToStart = true;

let lastTwoHandsTime = 0;
const LOST_DELAY = 500;

async function setup() {
  createCanvas(W, H);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(W, H);
  video.hide();

  handPose = await ml5.handPose({ maxHands: 2 });
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(0);

  // Check if two hands are detected
  if (hands.length < 2) {

    if (
      activated &&
      millis() - lastTwoHandsTime > LOST_DELAY
    ) {
      activated = false;
      darkness = 0;
      lostHands = true;
      readyToStart = false;
    }

    // Black screen after losing hands
    if (lostHands) {
      return;
    }

    // Initially show camera
    image(video, 0, 0, width, height);
    return;
  }

  lastTwoHandsTime = millis();

  // Restore camera when hands return
  if (lostHands) {
    lostHands = false;
    readyToStart = true;
  }

  let handA = hands[0];
  let handB = hands[1];

  // Sort hands from left to right
  let centerA = getHandCenter(handA);
  let centerB = getHandCenter(handB);

  let leftHand;
  let rightHand;

  if (centerA.x < centerB.x) {
    leftHand = handA;
    rightHand = handB;
  } else {
    leftHand = handB;
    rightHand = handA;
  }

  // Index fingertips
  let fingerL = leftHand.keypoints[8];
  let fingerR = rightHand.keypoints[8];

  let fingerDistance = dist(
    fingerL.x, fingerL.y,
    fingerR.x, fingerR.y
  );

  // Start when fingertips touch
  if (
    !activated &&
    readyToStart &&
    fingerDistance < START_DISTANCE
  ) {
    activated = true;
    darkness = 0;
  }

  // Distance between hand centers
  let centerL = getHandCenter(leftHand);
  let centerR = getHandCenter(rightHand);

  let handDistance = dist(
    centerL.x, centerL.y,
    centerR.x, centerR.y
  );

  // Draw camera image
  image(video, 0, 0, width, height);

  // No effects until interaction starts
  if (!activated) {
    return;
  }

  if (handDistance > BW_DISTANCE) {
    filter(THRESHOLD, BW_THRESHOLD);
  }

  // Control darkness with distance
  let targetDarkness = map(
    handDistance,
    60,
    BLACK_DISTANCE,
    0,
    255,
    true
  );

  darkness = lerp(
    darkness,
    targetDarkness,
    FADE_SPEED
  );

  // Dark overlay
  noStroke();
  fill(0, darkness);
  rect(0, 0, width, height);

  // Draw colored connections AFTER the filter
  drawConnections(leftHand, rightHand);
}

// Calculate hand center
function getHandCenter(hand) {
  let x = 0;
  let y = 0;

  for (let i = 0; i < hand.keypoints.length; i++) {
    x += hand.keypoints[i].x;
    y += hand.keypoints[i].y;
  }

  return {
    x: x / hand.keypoints.length,
    y: y / hand.keypoints.length
  };
}

// Draw cross-connections
function drawConnections(leftHand, rightHand) {
  let pointsL = leftHand.keypoints;
  let pointsR = rightHand.keypoints;

  for (let i = 0; i < pointsL.length; i++) {
    let a = pointsL[i];

    for (let j = 0; j < pointsR.length; j++) {
      let b = pointsR[j];

      if ((i + j) % 2 === 0) {
        stroke(110, 225, 235, LINE_OPACITY);
      } else {
        stroke(245, 160, 205, LINE_OPACITY);
      }

      strokeWeight(LINE_WEIGHT);
      line(a.x, a.y, b.x, b.y);
    }
  }
}

// Receive HandPose results
function gotHands(results) {
  hands = results;
}
