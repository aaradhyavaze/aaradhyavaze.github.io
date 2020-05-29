//make the fireflies thing!!

//what are the rules again?

//each firefly has a little clock of its own
//when it sees a firefly flash, it nudges its clock forward a bit

//that's it?

//(gosh these might need to be async)

// TODO: this needs async callbacks!!!
/// FIXME: done??
let fireflies = []
let cliky
let influence, damping, frequency, nudge

class Firefly {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.clock = 5
    this.start = 0
    this.flashing = false
    this.playing = false
    this.metric = 0

  }
  draw() {
    strokeWeight(4)
    stroke(0)
    this.metric = (this.start % this.clock)
    fill('#eb6972')
    if (Math.floor(this.metric) === 0) {
        this.flashing = true
        // fill('yellow')
        stroke('white')

        ellipse()
        // this.color()
        // play only if it's not already playing?
        if (!this.playing) {
          clicky.play()
          this.playing = true
        }
        //play some clicky sound here
    }
    else {
      this.flashing = false
      this.playing = false
    }
    this.start += frequency
    ellipse(this.pos.x, this.pos.y, 70, 70)
  }
  display() {
    textSize(18)
    fill(255)
    strokeWeight(0)
    // text(`${Math.floor((this.start % this.clock))}`, this.pos.x-3, this.pos.y + 70)
    text(`${Math.floor(this.metric)}`, this.pos.x-3, this.pos.y + 70)

  }
}



function preload() {
  clicky = loadSound('clicky.wav')
  clicky.setVolume(0.05)
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  // TODO: add 4 sliders:
  // 1. nudge amount
  // 2. clock frequency
  // 3. damping
  // 4. influence distance
  off = width/9 - 50
  infslider = createSlider(0, 30, 15) //multiply by 100
  infslider.position(0 + off, height - 75)
  freqslider = createSlider(2, 10, 5) //divide val by 100
  freqslider.position(width/4 + off, height - 75)
  dampslider = createSlider(0, 25, 1)//divide by 100
  dampslider.position(2*width/4 + off, height - 75)
  nudgeslider = createSlider(0, 200, 3)//divide by 100
  nudgeslider.position(3*width/4 + off, height - 75)

  // background(0)
}

function keyPressed() {
  if (keyCode === UP_ARROW) fireflies.push(new Firefly(mouseX, mouseY))
}

function synchronize() {
  for (let i = 0; i < fireflies.length -1; i ++) {
    for (let j = i+1; j < fireflies.length; j++) {
      let diff = p5.Vector.sub(fireflies[i].pos, fireflies[j].pos).mag()
      // COMBAK: when they firetogether, they do so for a little time; because they all change
      // each other's phase.

      if (diff < influence) {
        // the greater thing becomes the damping /shrug
        if (fireflies[i].flashing === true ) {
          //damping:
          if (fireflies[j].metric < damping || fireflies[j].metric > 5 - damping) {
              // fireflies[j].metric = 0
          }
          else {
            fireflies[j].start += nudge
          }
        }

        if (fireflies[j].flashing === true ) {
          if (fireflies[i].metric < damping || fireflies[i].metric > 5 - damping) {
              // fireflies[i].metric = 0
          }

          else {
              fireflies[i].start += nudge
            }
        }
      }
    }
  }
}


// function nudge() {
//
// }



function draw() {
  //slider vals
  influence = infslider.value()*100
  frequency = freqslider.value()/100
  damping = dampslider.value()/100
  nudge = nudgeslider.value()/100
  background(0)
  for (let i = 0; i < fireflies.length; i++) {
    fireflies[i].draw()
    fireflies[i].display()
  }
  synchronize()
  //slider texts
  fill(255)
  textSize(15)
  textFont('Monospace')
  text(`influence = ${influence}`, infslider.position().x, height - 20)
  text(`frequency = ${frequency}`, freqslider.position().x, height - 20)
  text(`damping = ${damping}`, dampslider.position().x, height - 20)
  text(`nudge = ${nudge}`, nudgeslider.position().x, height - 20)

}
