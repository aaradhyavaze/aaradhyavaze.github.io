function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

// some random smooth color changing vezz

// let xoff = 1
// let change = 1
// function draw() {
//   loadPixels();
//   for (let y = 0; y < height; y ++){
//     for (let x = 0; x < width; x++) {
//       let index = (x + y*width)*4
//       pixels[index] = 200;
//       // for smooth gradient transition
//       pixels[index+1] = xoff
//       // pixels[index+2] = 0;
//       pixels[index+3] = 255;
//     }
//
// }
//   updatePixels();
//   if (xoff > 255 || xoff < 0) {
//     change = -change
//   }
//
//   xoff += change
//   // noLoop();
//   // console.log(xoff)
//
//
// }

let str = `Perlin 2D sim, mouse position calculates noise real time`
function draw() {
  background('black')
  fill(200)
  textSize(20);
  textAlign(CENTER, CENTER)
  text(str, width/2, height/6)
  loadPixels();
  // initiate the pixel thingy
  // x + y*width goes to the number of pixel as drawn on a grid
  // but each pixel is actually 4, like in dimensions
  // R, G, B, A
  // so the mult by 4 factor takes care of that,
  // giving the ACTUAL index of the pixel, cus it's
  // stored in 1D array in js for some weird reason
  // let xoff = 1

  //proper instantiation is important
  // in a way set xoff, yoff for each pixel
  // to get a 2D function (thing dark = height)

  let inc = 0.1
  let yoff = -0.05*Math.floor(mouseY)
  for (let y = height/3; y < 2*height/3; y+= 5) {
    let xoff = -0.05*Math.floor(mouseX)
    for (let x = width/3; x < 2*width/3;  x+= 5) {
      let index = (x + y*width)*4;
      let r = noise(xoff, yoff)*300 //noise is between [0,1)
      pixels[index] = r
      pixels[index + 1] = r
      pixels[index + 2] = r
      pixels[index + 3] = 255
      xoff += inc
    }
    // xoff += 0.01
    yoff += inc
  }
  updatePixels();
  // noLoop()

}
