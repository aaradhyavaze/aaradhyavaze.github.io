function setup() {
  createCanvas(windowWidth, windowHeight);
  // background('black')
  frameRate(60)
}



// perlin drawing with dots/ellipses

// let xoff = 3
// let yoff = 9
// function draw() {
//   // if (mouseIsPressed) {
//   //   stroke(25, 200, 240)
//   //   strokeWeight(0.2);
//   //   fill(252, 210, 247, 50)
//   //   ellipse(mouseX, mouseY, 80, 80);
//   //   // ellipse(windowWidth-mouseX, mouseY, 40, 40)
//   //   // ellipse(mouseX, windowHeight-mouseY, 40, 40)
//   //   // ellipse(windowWidth-mouseX, windowHeight - mouseY, 40, 40)
//   // }
//
//   let x = map(noise(xoff), 0, 1, 0, width, true)
//   let y = map(noise(yoff), 0, 1, 0, height, true)
//   stroke(25, 200, 240)
//   strokeWeight(0.2);
//   fill(252, 210, 247)
//   // ellipse(x, y, 10, 10);
//   point(x, y)
//
//   for (let x = 0; x < width; x++) {
//     beginShape();
//     // point(x, 100)
//     vertex(x, 10)
//     endShape();
//   }
//
//   xoff += 0.01
//   yoff += 0.01
//   // stop the loop :
//   // noLoop()
//
//
//   // line(mouseX, mouseY, 1800- mouseY, 900 - mouseX)
//
//
//
// }


// perlin black and white terrain generator
// the problem with it drawing to the canvas repeatedly was that the background was declared in the setup and not in draw()

let start = 0
let increment = 0.02
function draw() {
  background('black');
  beginShape();
  vertex(0, windowHeight);
  noFill();
  let xoff = start
  for (let x = 100; x < windowWidth - 100; x+= 10) {
    stroke(255);
    let y1 =  map(noise(xoff), 0, 1, 0, windowHeight) + map(sin(xoff), 0, 1, -50, 50)
    let y2 = noise(xoff)*windowHeight
    // vertex(x, y2)
    vertex(x, y1)
    xoff += increment
  }
  vertex(windowWidth, windowHeight)
  // noLoop();
  endShape();
  start += 0.01

}
