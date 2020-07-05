//something to keep in mind, the project folder should contain the filepaths to libs ofc but easy miss
//(for the live server thingy github works just fine (i hope))


//right now, get the heart sound to load


let mic;

function setup() {
  createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  let vol = mic.getLevel();
  stroke(255);
  fill(175);
  ellipse(100, 100, 200, 1 + vol * 200);
}

// i don need some kind of sound synthesis
// emphasise the bass
// or cancel
