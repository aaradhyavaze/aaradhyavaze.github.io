class Bouncy {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
    this.rad = 20
    this.mass = 1
  }
  update() {
    //this.pos.x and not this.x XD
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.set(0, 0)
  }
  show() {
    fill(this.mass, 100, 0, 255)
    ellipse(this.pos.x, this.pos.y, 2*this.rad, 2*this.rad)
  }
  force(exp) {
    let f = p5.Vector.div(exp, this.mass)
    this.acc.add(f)
  }
  edges() {
    // console.log(slope)
    if (this.pos.x - this.rad <= 0) {
      this.pos.x = this.rad
      this.vel.x *= -1
    }
    if (this.pos.x + this.rad >= width) {
      this.pos.x = width - this.rad
      this.vel.x *= -1
    }
    if (this.pos.y + this.rad >= height) {
      this.pos.y = height - this.rad
      this.vel.y *= -1
    }

    if (this.pos.y - this.rad <= 0) {
      this.pos.y = this.rad
      this.vel.y *= -1
    }
  }

  incline() {

    let slope = (350 - height)/width
    //might as well just shift the coordinate frame
    let newPos = this.pos.copy()

    push()

    translate(0, height)
    //then rotate?
    rotate((350 - height)/width)
    // console.log(this.vel.x, this.vel.y)
    stroke('red')
    strokeWeight(3)
    line(0, 0, width+25, -10)

    pop()


    // if (this.pos.y + this.rad >= slope*this.pos.x + height) {
    //   this.pos.y = slope*this.pos.x + height - this.rad
    //   console.log('crossing')
    //   //gotta find vel's component along that line and perpendicular to it
    //   // console.log(incline)
    //   // let vpar = p5.Vector.dot(this.vel, incline)
    //   // vpar.mult(incline)
    //   // console.log(vpar)
    //   let vpar = incline.mult(p5.Vector.dot(this.vel, incline))
    //   // console.log(vpar)
    //   // vector rejection
    //   let vperp = p5.Vector.sub(this.vel, vpar)
    //   //reverse this?
    //   console.log(this.vel === p5.Vector.add(vpar, vperp))
    //
    //   vperp *= -1
    //   this.vel = p5.Vector.add(vpar, vperp)
    //   // console.log(p5.Vector.add(vpar,vperp))
    //
    // }
  }

  friction() {
    // -1 * Normal * coeff * unit_vec
    let mu = 1
    let diff = height - (this.pos.y + this.rad)
    if (diff < 1) {
    let fr = createVector(this.vel.x, 0).normalize().mult(-1)
    // console.log(this.vel)
    fr.setMag(mu*this.mass)
    console.log('fri')
    this.force(fr)
  }
  }
}

let balls = []
function setup() {
  createCanvas(500, 500)
  g = createVector(0, 0.2)
  wind = createVector(10, 0)
  sIncline = createVector(0, height)
  eIncline = createVector(width, 350)
  incline = p5.Vector.sub(eIncline, sIncline).normalize()

}

massCounter = 0
function mousePressed() {
  start = millis()
  console.log(massCounter)
}

function mouseReleased() {
  end = millis()
  console.log(end - start)
  let massBall = new Bouncy(mouseX, mouseY)
  massBall.mass = (end - start) > 255 ? 255 : Math.round(end - start) + 1
  balls.push(massBall)

}

windState = 0
test1 = 0
function keyTyped() {
  if (key === 'l') {
    windState = windState === 0 ? 1 : 0
  }
}
function draw() {
  background(0)
  stroke(255)
  strokeWeight(6)
  // line(0, height, width, 350)
  stroke(255)
  strokeWeight(2)
  // translate(width/2, height/2)
  for (let i of balls) {
    i.update()
    i.show()
    mg = p5.Vector.mult(g, i.mass)
    i.friction()

    i.force(mg)
    if (windState === 1) {
      i.force(wind)

    }
    // i.incline()

    i.edges()
  }
}
