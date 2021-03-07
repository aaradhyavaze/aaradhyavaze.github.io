let x = 0;
let y = 0;
let x2 = 0;
let y2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(5)
  // stroke(255);
}

function draw() {
  for (let i = 0; i < 200; i++) {

    drawPoint2();
    nextPoint2();
  }
  for (let j = 0; j < 100; j++){
    drawPoint();
    nextPoint();
  }

}

function drawPoint() {
  stroke(255)
  strokeWeight(2);
  let px = map(x, -2.1820, 2.6558, width/2+200, width-100);
  // let px = map(x, -2.1820, 2.6558, width - 100, width - 600);
  let py = map(y, 0, 9.9983, height-200, 50);

  point(px, py);
}

function drawPoint2() {
  stroke(255)
  strokeWeight(2);
  let px2 = map(x2, -2, 2, 50, width/2);
  // let px = map(x, -2.1820, 2.6558, width - 100, width - 600);
  let py2 = map(y2, 0, 7, height-200, 0);

  point(px2, py2);
}

function nextPoint() {
  let nextX;
  let nextY;
  let r = random(1);

  if (r < 0.01) {
    nextY = 0.16 * y;
    nextX = 0;
  } else if (r < 0.86) {
    nextX = 0.85 * x + 0.04 * y;
    nextY = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {
    nextX = 0.2 * x + -0.26 * y;
    nextY = 0.23 * x + 0.22 * y + 1.6;
  } else {
    nextX = -0.15 * x + 0.28 * y;
    nextY = 0.26 * x + 0.24 * y + 0.44;
  }
  x = nextX;
  y = nextY;
}

function nextPoint2() {
  let nextX2;
  let nextY2;
  let r = random(1);

  if (r < 0.02) {
    nextY2 = 0.25 * y2 - 0.4;                                                                                                                                                                                                                        4;
    nextX2 = 0;
  } else if (r < 0.84) {
    nextX2 = 0.95 * x2 + 0.005 * y2 - 0.002;
    nextY2 = -0.005 * x2 + 0.93 * y2 + 0.5;
  } else if (r > 0.93) {
    nextX2 = 0.035 * x2 + -0.2 * y2 - 0.09;
    nextY2 = 0.16 * x2 + 0.04 * y2 + 0.02;
  } else {
    nextX2 = -0.04 * x2 + 0.2 * y2+ 0.083;
    nextY2 = 0.16 * x2 + 0.04 * y2 + 0.12;
  }
  x2 = nextX2;
  y2 = nextY2;
}                             

