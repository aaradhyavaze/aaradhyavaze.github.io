class Snail {
  constructor(x, y, tox, toy) {
    this.pos = createVector(x, y)
    this.targetx = tox
    this.targety = toy
  }
  update() {
    this.target = createVector(this.targetx, this.targety)
    this.vel = p5.Vector.sub(this.target, this.pos)
    this.vel.setMag(1)
    this.pos.add(this.vel)
  }
  show() {
    stroke(255, 255, 255, 200)
    strokeWeight(1)
    point(this.pos.x, this.pos.y)
  }
}


let snail1, snail2, snail3
function setup() {
  createCanvas(windowWidth, windowHeight)
  background('black')
  fill('white')
  textAlign(CENTER)
  textFont('Monospace')
  textSize(15)
  text('select three points with mouse; enter to stop drawing (and also reset counter)', width/2, height-50)
  fill(100, 255, 255, 155)
  textSize(5)
  text(`'three vezy funky snails'`, width/2, height-20)

}

snailCounter = 0
function mousePressed() {
  switch (snailCounter) {
    case 0:
      snail1 = new Snail(mouseX, mouseY, 500, 100)
      snailCounter += 1
      break;
    case 1:
      snail2 = new Snail(mouseX, mouseY, 500, 100)
      snailCounter += 1
      break;
    case 2:
      snail3 = new Snail(mouseX, mouseY, 500, 100)
      snailCounter += 1
      break;
    default:

  }
}

function keyPressed() {
  if (keyCode == ENTER) {
    snailCounter = 0
  }
}


function draw() {
  if (snailCounter == 3) {
  snail1.update()
  snail1.show();
  snail2.update();
  snail2.show();
  snail3.update();
  snail3.show();
  // for (let i = 1; i <= 3; i++) {
  //   eval(snail)
  // }
  snail1.targetx = snail2.pos.x
  snail1.targety = snail2.pos.y
  snail2.targetx = snail3.pos.x
  snail2.targety = snail3.pos.y
  snail3.targetx = snail1.pos.x
  snail3.targety = snail1.pos.y
  noFill();
  stroke(100, 255, 255, 20)
  triangle(snail1.pos.x, snail1.pos.y, snail2.pos.x, snail2.pos.y, snail3.pos.x, snail3.pos.y)
  }

}
