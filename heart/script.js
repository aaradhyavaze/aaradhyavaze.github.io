//something to keep in mind, the project folder should contain the filepaths to libs ofc but easy miss
//(for the live server thingy github works just fine (i hope))


//right now, get the heart sound to load

function preload() {
  h1 = loadSound('hea1.mp3')
}

function setup() {
  createCanvas(500, 500)
  button = createButton('play')
  // amp = new p5.Amplitude(0.7);
  mic = new p5.AudioIn(() => console.log('audio error'));
  // mic.start();
  button.mousePressed(() => {
    if (!h1.isPlaying()) {
      h1.play()
      button.html('pos')
    }
    else {
      h1.pause()
      button.html("play")
    }
  })

}

function draw() {
  noFill()
  background(255, 255, 255)
  stroke(mic.getLevel()*1000, 0, 75)
  ellipse(width/2, height/2, 450, (50 + (mic.getLevel()*2000)))
  // strokeWeight(40 + (amp.getLevel()*50))
  // tval = mic.getLevel();
}


// i don need some kind of sound synthesis
// emphasise the bass
// or cancel
