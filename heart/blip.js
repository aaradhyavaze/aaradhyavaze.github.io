//supa globu
// let amt = 2;
// let steps = 0;
// let r = 1
let amt = 2, steps = -1, r = 1
let delta = 50
//imma do a gui
class St {
  constructor() {
    this.amt = 2
    this.steps = -1
  }
}
class Point {
  constructor(x, y) {
    this.pos = createVector(x, y)
  }
  be() {
    stroke(0)
    strokeWeight(7)
    loadPixels();
    point(this.pos.x, this.pos.y)
  }
}

let ver = []
let cols = [[238, 66, 102], [96, 211, 148], [252, 171, 16], [84, 19, 136], [35, 100, 170]]
let sw = 0
keyPressed = () => {
  sw = keyCode === DOWN_ARROW ? 1 : 0

  if (keyCode === UP_ARROW && sw != 1) ver.push(new Point(rounder(mouseX), rounder(mouseY)))
}

function rounder(n) {
  return delta*Math.ceil(n/delta)
}

setup = () => {
  createCanvas(windowWidth, windowHeight)
  background(250)
  p = createVector(20, 20)
  gui = new dat.GUI();
  st = new St();
  gui.add(st, 'amt')
  gui.add(st, 'steps')
  stroke(0, 100, 0, 150)
  for (let i = 0; i < width+1 || i < height +1; i+= 50) {
    line(i, 0, i, height)
    line(0, i, width, i)
  }
}

// let zo = (lo) => ((createVector((p.x + lo.x)/2, (p.y + lo.y)/2)))
let zo = (lo) => (p5.Vector.lerp(p, lo, 1/st.amt))
function draw() {
  ver.map(x => x.be())
  //the array could be numbers in order
  r0 = [...Array(ver.length).keys()]
  rpr = (r + st.steps) % r0.length;
  // console.log(rpr)
  r = random(r0)
  //this is the version where you don't take prev value:
  p = (sw === 1) ? (st.steps != -1) ? (rpr != r) ? (zo(ver[r].pos)) : p : zo(ver[r].pos) : p

  //draw p with cols
  // c = (cols.length < r0.length) ?  : (
  if (r0.length != 0) {
    strokeWeight(6)
    stroke(cols[r%5])
    point(p.x, p.y)
  }

  //actually ig i'll generalise this to (new vertex cannot be n steps from current vertex)
  //so steps -1 i can put for the normal case xool


}
