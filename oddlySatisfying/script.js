let start;
function setup() {
  createCanvas(windowWidth, windowHeight)
  start = millis();

}

let anginc = 0.01
let xoff = 0.0085

let x = 5
let angle = 0
let j = 0

function draw() {
  background(0, 0, 30, 35)
  //first make a point accelerate

  for (let i = 0; i< 100; i++) {
    strokeWeight(1+ map(sin(i), -1, 1, 3, 5))
    stroke(255%10*j, 255 - 4*i   , 100, 255)
    x = map(tan(angle + xoff*i)*2, -1, 1, 3*width/8, 5*width/8)
    point(x, 20*i)


    strokeWeight(1+ map(sin(i), -1, 1, 3, 5))
    stroke(255 -4*i, 255%   10*j, 150, 255)
    x = map(tan(angle + xoff*i + Math.PI/2)*2, -1, 1, 3*width/8, 5*width/8)
    point(x, 20*i)

  }

  angle += anginc
  j += 0.1

  // console.log(delta)

}

function hajime(x) {
  return sin(x)
}
