let amt = 2;
class Point {
  constructor(x, y) {
    this.pos = createVector(x, y)
  }
  be() {
    stroke(255)
    strokeWeight(1)
    point(this.pos.x, this.pos.y)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  //so i have starting point here
  p = createVector(20, 20)
}

let ver = []
function mousePressed(){
  ver.push(new Point(mouseX, mouseY))
}

let sw = 0
function keyPressed() {
  sw = keyCode === ENTER ? 1 : 0
}

// let zo = (lo) => ((createVector((p.x + lo.x)/2, (p.y + lo.y)/2)))
let zo = (lo) => (p5.Vector.lerp(p, lo, 1/amt))
function draw() {
  // background(0)
  strokeWeight(3)
  stroke(100, 200, 100, 200)
  point(p.x, p.y)
  stroke(255)
  ver.map(x => x.be())
  //the array could be numbers in order
  r0 = [...Array(ver.length).keys()]
  r = random(r0)
  p = sw === 1 ? zo(ver[r].pos) : p
  // noLoop();
}
