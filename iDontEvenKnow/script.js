class Attractor {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(0.001, 0)

  }
  update() {
    this.mouse = createVector(mouseX, mouseY)
    this.acc = p5.Vector.sub(this.mouse, this.pos)
    this.acc.setMag(0.1 - this.acc.mag()/1e5)
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    // this.vel.limit(3)
    this.vel.limit(6)
  }
  show() {
    stroke(50, 150, 255, 50)
    ellipse(this.pos.x, this.pos.y, 1, 5)
  }
}

let sing
function setup() {
  createCanvas(windowWidth, windowHeight)
  background('black')

}

let done = 0
function mousePressed() {
  sing = new Attractor(mouseX, mouseY)
  done = 1
}

function keyPressed() {
  if (keyCode == ENTER) {
    done = 0
  }
}

function draw() {
  if (done === 1) {
  stroke(255, 255, 255, 50)
  strokeWeight(4)

  sing.show()
  sing.update()
}

}
