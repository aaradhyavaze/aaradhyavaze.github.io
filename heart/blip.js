//supa globu
//defs amt 2; steps -1
let amt = 2;
let steps = -1;
class Point {
  constructor(x, y) {
    this.pos = createVector(x, y)
  }
  be() {
    stroke(255)
    strokeWeight(1)
    loadPixels();
    point(this.pos.x, this.pos.y)
  }
}

setup = () => {
  createCanvas(windowWidth, windowHeight)
  background(0)
  p = createVector(20, 20)
}

let ver = []
mousePressed = () => ver.push(new Point(mouseX, mouseY))
let sw = 0
keyPressed = () => sw = keyCode === ENTER ? 1 : 0


//some more globals:
let r = 1
//declare an r now, rpr becomes this r, then i check (one point mistake doesn't matter in the long run)
//

// let zo = (lo) => ((createVector((p.x + lo.x)/2, (p.y + lo.y)/2)))
let zo = (lo) => (p5.Vector.lerp(p, lo, 1/amt))
function draw() {
  stroke(150, 150, 200, 170)
  point(p.x, p.y)
  stroke(255)
  ver.map(x => x.be())
  //the array could be numbers in order
  //and just make ver[r]! cus now r is in the same range lolyeah
  r0 = [...Array(ver.length).keys()]
  rpr = (r + steps) % r0.length;
  // console.log(rpr)
  r = random(r0)
  //this is the version where you don't take prev value:
  //i like golf, with a capital g
  p = (sw === 1) ? (steps != -1) ? (rpr != r) ? (zo(ver[r].pos)) : p : zo(ver[r].pos) : p
  //normal version:
  // p = sw === 1 ? zo(ver[r].pos) : p

  //actually ig i'll generalise this to (new vertex cannot be n steps from current vertex)
  //so steps -1 i can put for the normal case xool

}
