// TODO: ecoli, random, Antibiotic
// TODO: genetic material, conjugation.

// Borkar is the parent of all E-coli, antibiotics and random bacteria
// and also compromised genetic material


// i need an index of population size
// otherwise this thing will explode

class Borkar {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.sides = Math.floor(random(40, 100))
    this.dragging = false;
    this.rollover = false;
    this.offset = 30;
    this.pillsize = Math.floor(random(40, 60))
    this.tilt = random(-PI/2, PI/2)
    this.walkCounter = 0
    this.bacteriastep = 20
    this.antibiostep = 5
    // this.lifespan = Math.floor(Math.random()*3600 + 3600)
    //for during testing:
    this.lifespan = Math.floor(Math.random()*100 + 200)
    this.mogrify = random(1, 3)
    this.secretCode = false
  }


  over() {
    //check rollover
    if (mouseX>this.pos.x - this.offset
       && mouseX < this.pos.x + this.offset
    && mouseY > this.pos.y - this.offset &&
  mouseY < this.pos.y + this.offset) {
    this.rollover = true

  }
  else {
    this.rollover = false
  }
  }

  pressed() {
    //for when mouse is pressed
    if (mouseX>this.pos.x - this.offset
       && mouseX < this.pos.x + this.offset
    && mouseY > this.pos.y - this.offset &&
  mouseY < this.pos.y + this.offset){
      this.dragging = true

    }
  }
  released() {
    // this caused quite some trouble XD
    this.dragging = false;
    // this.rollover = false;
  }

  update() {
    // run this only when dragging is true, which
    // in turn is true when pressed and rollover is true

    if(this.dragging) {
      let mouse = createVector(mouseX, mouseY)
      let vecoff = p5.Vector.sub(mouse, this.pos)
      this.pos.add(vecoff)
    }
  }

}


class Ecoli extends Borkar {
  identity() {
    return 0
    //let 0 for ecoli, 1 for antibiotic and 2 for robust
  }
  hajimefy() {
    beginShape();
    fill(50, 100, 200, 50)
    for (let i = 0; i < this.sides+1; i++){
      this.radius = 30 + sin(i)**2*10
      vertex(this.pos.x + this.radius*sin(i*2*PI/this.sides),
       this.pos.y + this.radius*cos(2*PI*i/this.sides))

    }
    // vertex(0, 0)
    // vertex(100, 0)
    endShape();
    beginShape();
    fill(50, 200, 200, 100)

    if (this.rollover){
      fill(50, 255, 255, 150)
    }
    ellipse(this.pos.x, this.pos.y, 2*this.radius-this.offset, 2*this.radius-this.offset)
    endShape();
  }

  // add random walker

  walk() {
    // update position (either use random vector or 4 directions)
    // lets just go with random vector for now
    if (this.walkCounter % this.bacteriastep == 0) {
    let direction = p5.Vector.random2D()
    direction.mult(Math.random()*5 + 5)
    this.pos.add(direction)
    }
    this.walkCounter += 1

  }
  replicate() {
    if (this.walkCounter % this.lifespan == 0) {
      borks.push(new Ecoli(this.pos.x, this.pos.y))
      // this causes quite a bit of overhead
      numEcoli += 1
    }
  }
  die() {
    //not every ecoli gets to replicate
    // say 30% die before they get to replicate?
    if (this.walkCounter % (this.lifespan - 100) == 0 ){
      if (Math.random() < 0.3) {
        console.log('top secret compromised')
        //releasy thy genes and die
        // TODO: release genetic material
        for (let i = 0; i < borks.length; i++) {
          if (borks[i].identity() == 0) {
            borks.splice(i, 1)
            numEcoli -= 1
            break;
            // please don't add to overload

          }
        }
      }
    }
  }
}



// this will only be affected by motility factors (if they're to come in later)

class Antibiotic extends Borkar {
  identity() {
    return 1
  }
  hajimefy() {
    push();
    fill(200, 50, 50, 50)
    if (this.rollover){
      fill(255, 50, 50, 100)
    }
    // wrap translations and rotations inside push/pop
    rectMode(CENTER)
    // translate, then rotate! it was getting offset lmao
    // also translate origin to center of rect each time
    translate(this.pos.x, this.pos.y)
    rotate(this.tilt)
    rect(0, 0, this.pillsize/2.5, this.pillsize, 30, 30, 30, 30)
    pop();


  }
  walk() {
    // lets just go with random vector for now
    if (this.walkCounter % this.antibiostep == 0) {
    let direction = p5.Vector.random2D()
    direction.mult(1)
    this.pos.add(direction)
    }
    this.walkCounter += 1
  }

  replicate() {
    //dont.
  }

  die() {
    // you're just here for the alibi
  }
}

//okay now how the hell do i detect conjugation lol
//i can't separate this anymore
//maybe i can put a marker

//yep almost solved that problem.
//now conjugation simulation
//then display a scoreboard in some nice way


class Robust extends Borkar {
  identity() {
    return 2
  }
  //these guys should have lots of random size and colors
  //to indicate variety
  hajimefy() {
    beginShape();
    fill(255,255, 0, 100)
    if (this.secretCode){
      fill(255, 0, 0, 100)
    }
    for (let i = 0; i < this.sides+1; i++){
      this.radius = 30 + sin(i)**2*10
      // vertex(this.pos.x + this.radius*sin(i*2*PI/this.sides),
      //  this.pos.y + this.radius*cos(2*PI*i/this.sides))
      vertex(this.pos.x + 40*sin(this.mogrify*i), this.pos.y + 40*cos(this.mogrify*i))

    }
    // vertex(0, 0)
    // vertex(100, 0)
    endShape();
    beginShape();
    // fill(255, 255, 0, 70)
    if (this.rollover){
      fill(255, 255, 0, 200)
    }
    ellipse(this.pos.x, this.pos.y, 2*this.radius-this.offset, 2*this.radius-this.offset)
    endShape();
  }

  walk() {
    // update position (either use random vector or 4 directions)
    // lets just go with random vector for now
    if (this.walkCounter % this.bacteriastep == 0) {
    let direction = p5.Vector.random2D()
    direction.mult(Math.random()*5 + 5)
    this.pos.add(direction)
    }
    this.walkCounter += 1
  }

  replicate() {
    //
  }

  die() {
    //
  }
}
