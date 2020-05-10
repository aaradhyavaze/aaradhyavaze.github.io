// TODO: ecoli, random, Antibiotic
// TODO: genetic material, conjugation.

// Borkar is the parent of all E-coli, antibiotics and random bacteria
// and also compromised genetic material

//glitches in the matrix (fix them later)
//1. when secret carrying robust replicates, it's child does not have secret
// fixed! lol this cascades quickly

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
      borks.push(new Ecoli(this.pos.x + random(-30, 30) , this.pos.y + random(-30, 30)))
      // this causes quite a bit of overhead
      numEcoli += 1
    }
  }
  die() {
    //not every ecoli gets to replicate
    // say 30% die before they get to replicate?
    if (this.walkCounter % (this.lifespan - 100) == 0 ){
      if (Math.random() < 0.1) {
        console.log('top secret compromised')
        borks.push(new TopSecret(this.pos.x, this.pos.y))
        //releasy thy genes and die
        // TODO: release genetic material
        for (let i = 0; i < borks.length; i++) {
          if (borks[i].identity() == 0) {
            borks.splice(i, 1)
            numEcoli -= 1
            break;
            // hopefully less overhead..

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
    // you're just here for the alibi, kiddo
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
      if (this.secretCode){
        fill(255, 0, 0, 200)
      }
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
    if (this.walkCounter % this.lifespan == 0) {
      //also make the replicate a little far apart..
      let child = new Robust(this.pos.x+ random(-30, 30), this.pos.y+ random(-30, 30))
      if (this.secretCode == true){
      child.secretCode = true;
    }
      // borks.push(new Robust(this.pos.x+ random(-30, 30), this.pos.y+ random(-30, 30)))
      borks.push(child)
      // this causes quite a bit of overhead
      numRobusts += 1
    }
  }

  die() {
    //
    if (this.walkCounter % (this.lifespan - 100) == 0 ){
      if (Math.random() < 0.1) {
        for (let i = 0; i < borks.length; i++) {
          if (borks[i].identity() == 2) {
            borks.splice(i, 1)
            numRobusts -= 1
            break;
            // hopefully less overhead..

          }
        }
      }
    }
  }
}


class TopSecret extends Borkar {
  identity() {
    return 3
  }

  hajimefy() {
    //like a dna strand
    // beginShape();
    // noFill();
    // for (let i = 0; i < 1.5*PI; i+= 0.1){
    //   this.radius = 30
    //   vertex(this.pos.x + 7*cos(2*i - 50), this.pos.y + 10*i - 20)
    //   vertex(this.pos.x - 7*cos(2*i - 50), this.pos.y + 10*i - 20)
    //
    // }
    // // vertex(0, 0)
    // // vertex(100, 0)
    // endShape();
    // beginShape();
    // fill(0, 200, 100, 100)
    // if (this.rollover){
    //   fill(0, 200, 100, 200)
    // }
    // ellipse(this.pos.x, this.pos.y, 20, 20)
    // endShape();

    push();
    stroke(0)
    fill(0, 200, 50, 0)
    if (this.rollover){
      fill(0, 200, 50, 200)
    }
    // wrap translations and rotations inside push/pop
    // translate, then rotate! it was getting offset lmao
    // also translate origin to center of rect each time
    ellipseMode(CENTER)
    translate(this.pos.x, this.pos.y)
    rotate(this.tilt)
    // for (let i = 0; i < 1.5*PI; i+= 0.1){
    //   vertex(10*i, 10*i)
    //   // vertex(7*cos(2*i - 50), 10*i - 20)
    //
    // }
    ellipse(0, 0, 20, 20)
    beginShape();
    stroke(255)
    noFill();
    for (let i = 0; i < 1.5*PI; i+= 0.3){
      vertex(7*cos(2*i - 50), 10*i - 20)
      // vertex(-7*cos(2*i - 50),10*i - 20)

    }
    endShape();
    pop();
  }

  walk() {
    //same as antibiotic
    if (this.walkCounter % this.antibiostep == 0) {
    let direction = p5.Vector.random2D()
    direction.mult(1)
    this.pos.add(direction)
    }
    this.walkCounter += 1
  }

  replicate() {
    //don't.
  }

  die() {
    //uhm
  }

}
