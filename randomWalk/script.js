function setup() {
  createCanvas(windowWidth, windowHeight)
  background('black')
}


let a = window.innerWidth/2 + 15
let b = 890
let x = window.innerWidth/2
let y = window.innerHeight/2
function draw() {
  let k = 5;
  let r1 = (random(-k, k))
  let r2 = (random(-k, k))
  // background('black')
  // have some object move
  stroke(10, 255, 150, 35)
  strokeWeight(7)
  point(a, b)
  a += r1
  b += r2
  // noLoop();
  if (mouseIsPressed) {
    // a += (mouseX - a)/32
    // b += (mouseY -b)/32
    // x = mouseX
    // y = mouseY
    a += (x - a)/32
    b += (y - b)/32

  }

  stroke(100, 250, 255, 70)
  strokeWeight(10)
  point(x, y)

  let direction = Math.floor(random(4))
  switch (direction) {
    case 0:
      y -= 10
      break;
    case 1:
      y += 10
      break;
    case 2:
      x -= 10
      break;
    case 3:
      x += 10
      break;
  }

  textAlign(CENTER)
  textFont('monospace')
  fill(100, 250, 255, 150)
  stroke(0)
  textSize(30)
  text('click to make a high .a tumble towards .z', windowWidth/2, 900)

}
