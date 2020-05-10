// TODO: class Ecoli, class Rcoli, class Antibiotic shapes

let borks = []
let numEcoli = 0
let numAntibiotics = 0
let numRobusts = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
  // borks[0] = new Ecoli(100, 100)
  // borks.push(new Ecoli(100, 100))
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    borks.push(new Ecoli(mouseX, mouseY))
    numEcoli += 1
  }
  if (keyCode == DOWN_ARROW) {
    borks.push(new Antibiotic(mouseX, mouseY))
    numAntibiotics += 1
  }
  if (keyCode == LEFT_ARROW) {
    borks.push(new Robust(mouseX, mouseY))
    numRobusts += 1
  }
  //remove this bit later ig
  if (keyCode == RIGHT_ARROW) {
    borks.push(new TopSecret(mouseX, mouseY))
  }
}

function mousePressed() {
  let selected = []
  for (let i =0; i<borks.length; i++){
    if (borks[i].rollover) {
      selected.push(borks[i])
      selected[0].pressed();
      //that actually worked!!! woohoo!
    }
    // borks[i].pressed()
  }
  // bork.pressed()
}

function mouseReleased() {
  for (let i = 0; i< borks.length; i++) {
    borks[i].released()
  }
}

//IMPIMPIMPIMPIMP
//VERY CAREFULLY do sudoku
//else everything will break again XD

function sudoku() {
  // i need to check all pairwise (too heavy of a comp?)

  for (let i = 0; i< borks.length-1; i++) {
    for (let j = i; j < borks.length - 1; j++) {
      let diffmag = p5.Vector.sub(borks[i].pos, borks[j+1].pos).mag()
      if (diffmag < 10) {
        // console.log('close!')
        // console.log(borks[i].identity(), borks[j+1].identity())
        if ((borks[i].identity() == 1 && borks[j+1].identity() == 0)
          || (borks[i].identity() == 1 && borks[j+1].secretCode == true))
           {
          //remove borks[i] and reduce antibiotic count.
          borks.splice(i, 1)
          numAntibiotics -= 1
          // whew! that worked!
          //insert capture sound
        }
        else if ((borks[i].identity() == 0 && borks[j+1].identity() == 1)
               || borks[i].secretCode == true && borks[j+1].identity() == 1) {
          borks.splice(j+1, 1)
          numAntibiotics -= 1
          //insert capture sound
        }
        //conjugation starts here:
        //but checks happen before!

        // ecoli conjugates with borkteria
        // borkteria conju babys with borkteria
        // ecoli conjugates with ecoli

        else if (borks[i].identity() == 0 && borks[j+1].identity() == 2) {
            // conjugation happened: borteria got top secret and is now resistant
            // change color to full red
            borks[j+1].secretCode = true;
            console.log('bonju baby')

        }

        else if (borks[i].identity() == 2 && borks[j+1].identity() == 0) {
            console.log('baby bonju')
            borks[i].secretCode = true;



        }

        else if (borks[i].secretCode == true && borks[j+1].identity() == 2 &&
      borks[j+1].secretCode == false) {
          console.log('bonju bonju')
          borks[j+1].secretCode = true;

        }

        else if (borks[i].identity() == 2 && borks[j+1].secretCode == true &&
      borks[i].secretCode == false) {
        borks[i].secretCode == true;


      }

      }
    }
  }
  // i should probably put this in sudoku, instead of executing another function
  // also yay this seems to work!
  if (numEcoli > 25) {
    for (let i = 0 ; i < borks.length; i ++) {
      if (borks[i].identity() == 0) {
        borks.splice(i, 1)
        numEcoli -= 1
        break
      }
      console.log('not an ecoli yet.')
    }
  }
  if (numRobusts > 25) {
    for (let i = 0; i < borks.length; i ++) {
      if (borks[i].identity() == 2) {
        borks.splice(i, 1)
        numRobusts -= 1;
        break;
      }
    }
  }
}



    // console.log(borks[i].pos.sub(borks[i+1].pos).mag())
  //   if (mouseX>this.pos.x - this.offset
  //      && mouseX < this.pos.x + this.offset
  //   && mouseY > this.pos.y - this.offset &&
  // mouseY < this.pos.y + this.offset


let sides = 50
let radius;
function draw() {
  background(0)
  stroke(255)
  strokeWeight(1)
  // createP(` E.Coli: ${numEcoli}`, 100, 100)
    for (let i = 0; i< borks.length; i++){
    borks[i].hajimefy();
    borks[i].over();
    borks[i].update();
    borks[i].walk();
    borks[i].replicate();
    borks[i].die();
  }
  sudoku();
  // bork.hajimefy()
  // bork.over();
  let numResistant = 0
  for (let i of borks) {
    if (i.secretCode == true) {
      numResistant += 1
    }
  }

  fill(255)
  textFont('monospace')
  strokeWeight(0.3)
  stroke(0)
  textAlign(CENTER)
  text(` E.Coli: ${numEcoli}`, width/2, height-70)
  text(` Antibiotics: ${numAntibiotics}`, width/2, height-50)
  text(` Random borkteria: ${numRobusts}`, width/2, height - 30)
  fill(255, 100, 50, 200)
  text(` Resistant: ${Math.round(numResistant/numRobusts*100)}%`, width/2, height - 10)
}
