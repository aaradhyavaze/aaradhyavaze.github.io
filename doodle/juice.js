function setup() {
  createCanvas(500, 500)
  background('white')

}
let i = 0;
let delta = 15;
let current = [0, 0]
function draw() {
  // one for loop will work for square grid
  // while loop with OR condition better for rect
  // or just put the OR in for lolol
  // i really have a thing against while

  stroke(250)
  for (let i = 0; i < width+1 || i < height +1; i+= delta) {
    line(i, 0, i, height)
    line(0, i, width, i)
  }
  fill('black')
  // rect(0, 0, 25)
  // rect(50, 25, 25)
  if (mouseIsPressed){
  rect(rounder(mouseX), rounder(mouseY), delta)
  current = [rounder(mouseX), rounder(mouseY)]
  }

  // i need to way to keep track of coloured sqaares
  // got itt yooooo


}

function rounder(n) {
  return delta*Math.floor(n/delta)
}

function keyPressed() {
  if (keyCode === ENTER) {
    saveCanvas('trial', 'png')
  }
  if (keyCode == UP_ARROW) {
    rect(current[0], current[1] - delta, delta)
    current = [current[0], current[1] - delta]

  }
  if (keyCode == DOWN_ARROW) {
    rect(current[0], current[1] + delta, delta)
    current = [current[0], current[1] + delta]

  }
  if (keyCode == LEFT_ARROW) {
    rect(current[0]-delta, current[1], delta)
    current = [current[0] - delta, current[1]]

  }
  if (keyCode == RIGHT_ARROW) {
    rect(current[0] + delta, current[1], delta)
    current = [current[0] + delta, current[1]]

  }

}
