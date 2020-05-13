// TODO: class Ecoli, class Rcoli, class Antibiotic shapes


//F+ being made with 50% probabilily


//ques:
//borkteria will make it's fellows F+, and ecoli too
//then all will become F+??
//attach probabilty to event ig /shrug

let borks = []
let numEcoli, numRobusts, numAntibiotics
let populationCap = 25
let interactive = true;

function preload() {
  logo = loadImage("logo.png")
  //when uploading to github:
  // logo = loadImage("https://user-images.githubusercontent.com/48019866/81642071-2652cd80-9440-11ea-883f-80b55f2507d3.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  // createCanvas(300, 300)
  // borks[0] = new Ecoli(100, 100)
  // borks.push(new Ecoli(100, 100))
}


//all keybindings
function keyPressed() {
  if (keyCode === UP_ARROW) {
    borks.push(new Ecoli(mouseX, mouseY))
    // numEcoli += 1
  }
  if (keyCode === DOWN_ARROW) {
    borks.push(new Antibiotic(mouseX, mouseY))
    // numAntibiotics += 1
  }
  if (keyCode === LEFT_ARROW) {
    let borkteria = new Robust(mouseX, mouseY)
    if (Math.random() < 0.5) {
      borkteria.conjubaby = true;
    }
    borks.push(borkteria)
    // numRobusts += 1
  }
  //remove this bit later ig
  if (keyCode === RIGHT_ARROW) {
    borks.push(new TopSecret(mouseX, mouseY))
    if (currentPage == 1) {
    alert("thou hath unlocked creation of floating genetic material")
  }

  }
  if (keyCode === ALT) {
    borks = []
    randomInit();
  }
  if (keyCode === RETURN) {
    if (currentPage !== 5) {
    currentPage += 1
    //dont call this afterbhords!
  }
  }
  if (keyCode == TAB) {
    currentPage = 5
  }
  //
  // for resetting the sim:
  // if (keyCode === ESCAPE) {
  //   borks = []
  // }

}

let cheat = ""
function keyTyped() {
  if (key === 'v') {
    cheat += "v"
  }
  if (key === 'e') {
    cheat += "e"
  }
  if (key === 'd') {
    cheat += "d"
  }
  if (cheat == "ved") {
    borks = []
  }
  if (cheat.length > 2) {
    cheat = ""
  }
  // console.log(cheat)
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
        if ((borks[i].identity() === 1 && borks[j+1].identity() === 0)
          || (borks[i].identity() === 1 && borks[j+1].secretCode === true))
           {
          //remove borks[i] and reduce antibiotic count.
          borks.splice(i, 1)
          // numAntibiotics -= 1
          // whew! that worked!
          //insert capture sound
        }
        else if (borks[i].identity() === 1 && borks[j+1].identity() === 2
      && borks[j+1].secretCode === false) {
        borks.splice(j+1, 1)
        borks.splice(i, 1)
        console.log('antibiotic kills borkteria')
        // numRobusts -= 1
        // numAntibiotics -= 1
      }
        //amogh update: yellow and anti both should die.
        else if (borks[i].identity() === 2 && borks[j+1].identity() === 1
      && borks[i].secretCode === false) {
        borks.splice(j+1, 1)
        borks.splice(i, 1)
        console.log('antibooty frooti borky')
        // numRobusts -= 1
        // numAntibiotics -= 1
      }

        else if ((borks[i].identity() === 0 && borks[j+1].identity() === 1)
               || borks[i].secretCode === true && borks[j+1].identity() === 1) {
          borks.splice(j+1, 1)
          // numAntibiotics -= 1
          //insert capture sound
        }
        //conjugation starts here:
        //but checks happen before!

        // ecoli conjugates with borkteria
        // borkteria conju babys with borkteria
        // ecoli conjugates with ecoli

        // only if one of the conjubaby is true, then conj will happen
        //this acc to my 6 state chart:
        //checks for opposite conj states

        //i'll try putting same case first, for some reason yellow is not becoming red

        //okay! the error was one = miswritten as ==
        // replaced all == with === XD
        // okay shiet shiet shiet
        // i didn't put identity() LMAO 1 hour wasted
        //next time find all identity and replace with () first thing..


        else if (borks[i].conjubaby === false && borks[j+1].conjubaby === true) {
          if (borks[i].identity() === 2 && borks[i].secretCode === false &&
        borks[j+1].identity() === 0) {
            borks[i].secretCode = true;
            borks[i].conjubaby = true
          }
          else if (borks[i].identity() === 2 && borks[j+1].identity() === 2 &&
        borks[j+1].secretCode === true) {
          console.log('res making f- res')
          borks[i].secretCode = true;
          borks[i].conjubaby = true;
        }
          borks[i].conjubaby = true
        }

        else if (borks[i].conjubaby === true && borks[j+1].conjubaby === false) {
          if (borks[i].identity() === 0 && borks[j+1].identity() === 2 &&
        borks[i].conjubaby === true) {
          borks[j+1].secretCode = true;
          borks[j+1].conjubaby = true;
          }
          else if (borks[i].identity() === 2 && borks[j+1].identity() ===2 &&
        borks[i].secretCode === true) {
          console.log('res making f- ressysy')
          borks[j+1].secretCode = true;
          borks[j+1].conjubaby = true;
          }
          borks[j+1].conjubaby = true
        }

        //amogh update: genetic material should vanish after transf
        //transformation => resistance 1% of the time
        else if (borks[i].identity() === 3 && borks[j+1].identity() == 2) {
          if (Math.random() < 0.01) {
          console.log('gene snatchu')
          borks[j+1].secretCode = true;
          borks.splice(i, 1)
          }

        }

        else if (borks[i].identity() === 2 && borks[j+1].identity() === 3) {
          if (Math.random() < 0.01) {
            console.log('snatchu gene')
            borks[i].secretCode = true;
            borks.splice(j+1, 1)
          }

        }





// legacy code:

    //     else if (borks[i].identity() === 0 && borks[j+1].identity() === 2
    //         && borks[j+1].conjubaby === true && borks[i].conjubaby === false) {
    //         // conjugation happened: borteria got top secret and is now resistant
    //         // change color to full red
    //         // borks[j+1].secretCode = true;
    //         borks[i].conjubaby = true;
    //         console.log('ecoli is now orange (hopefully)')
    //
    //     }
    //
    //     else if (borks[i].identity() === 2 && borks[j+1].identity() === 0
    //         && borks[i].conjubaby === true && borks[j+1].conjubaby === false) {
    //         console.log('coli orangensaft')
    //         borks[j+1].conjubaby = true;
    //     }
    //
    //
    //     else if (borks[i].secretCode === true && borks[j+1].identity() === 2 &&
    //   borks[j+1].secretCode === false && borks[j+1].conjubaby === false) {
    //       console.log('bonju bonju')
    //       borks[j+1].secretCode = true;
    //       borks[j+1].conjubaby = true;
    //       //becomes f+ and resistant
    //     }
    //
    //
    //    else if (borks[i].identity() === 2 && borks[j+1].secretCode === true &&
    //   borks[i].secretCode === false && borks[i].conjubaby === false) {
    //     borks[i].secretCode = true;
    //     borks[i].conjubaby = true
    //   }
    //   //now make them red:
    //   //conj'd ecoi makes f- bork resistant
    //   else if (borks[i].identity() === 0 && borks[i].conjubaby === true &&
    // borks[j+1].identity() === 2 && borks[j+1].conjubaby === false) {
    //   borks[j+1].secretCode = true;
    //   borks[j+1].conjubaby = true;
    // }
    //
    // else if (borks[i].identity() === 2 && borks[i].conjubaby === false &&
    // borks[j+1].identity() === 0 && borks[j+1].conjubaby === true) {
    //   borks[i].secretCode = true;
    //   borks[j].conjubaby = true;
    // }
    //
    // //ecoli to ecoli:
    // else if (borks[i].identity() === 0 && borks[i].conjubaby === true &&
    // borks[j+1].identity() === 0 && borks[j+1].conjubaby === false) {
    //   borks[j+1].conjubaby = true
    // }
    //
    // else if (borks[i].identity() === 0 && borks[i].conjubaby === false &&
    // borks[j+1].identity() === 0 && borks[j+1].conjubaby === true) {
    //   borks[i].conjubaby = true;
    // }



  }//if end
}
}//for end.
  // i should probably put this in sudoku, instead of executing another function
  // also yay this seems to work!
  // if (numEcoli > populationCap) {
  //   for (let i = 0 ; i < borks.length; i ++) {
  //     if (borks[i].identity() === 0) {
  //       borks.splice(i, 1)
  //       // numEcoli -= 1
  //       break
  //     }
  //     console.log('not an ecoli yet.')
  //   }
  // }
  // if (numRobusts > populationCap) {
  //   for (let i = 0; i < borks.length; i ++) {
  //     if (borks[i].identity() === 2) {
  //       borks.splice(i, 1)
  //       // numRobusts -= 1;
  //       break;
  //     }
  //   }
  // }
}


function bhijubhalize() {
  console.log(numEcoli)
}


function randomInit() {
  let ec = Math.floor(Math.random()*5 + 5)
  for (let i = 0; i< ec; i++) {
    // let ranx = random(-width/3, 2*width/3)
    // let rany = random(height/3, 2*height/3)
    borks.push(new Ecoli(random(width/4, 3*width/4), random(height/4, 3*height/4)))
    borks.push(new Antibiotic(random(width/4, 3*width/4), random(height/4, 3*height/4)))
    borks.push(new Antibiotic(random(width/4, 3*width/4), random(height/4, 3*height/4)))
    //fix needed: alt also makes F+ bacteria
    let randrobu = new Robust(random(width/4, 3*width/4), random(height/4, 3*height/4))
    if (Math.random() < 0.5) {
      randrobu.conjubaby = true
    }
    borks.push(randrobu)
    // numEcoli += 1
    // numAntibiotics += 2
    // numRobusts += 1
  }
}


function populationControl() {
  // if (numEcoli > populationCap) {
  //   console.log('bahasdfk')
  //   for (let i = 0 ; i < borks.length; i ++) {
  //     if (borks[i].identity() === 0) {
  //       borks.splice(i, 1)
  //       // numEcoli -= 1
  //       break
  //     }
  //     console.log('not an ecoli yet.')
  //   }
  // }
  // if (numRobusts > populationCap) {
  //   for (let i = 0; i < borks.length; i ++) {
  //     if (borks[i].identity() === 2) {
  //       borks.splice(i, 1)
  //       // numRobusts -= 1;
  //       break;
  //     }
  //   }
  // }
}

let currentPage = 0;
//DRAW  IS  HERE  FOR  location  SAKE



graphColi = [0]
graphAnti = [0]
graphRobust = [0]
updateCounter = 0

function draw() {
  background(0)
  stroke(255)
  strokeWeight(1)
  if (currentPage == 0) {
    background(255)
    fill(0)
    textFont('monospace')
    strokeWeight(0.1)
    stroke(0)
    textAlign(CENTER)
    textSize(25)
    text("combating anti microbial resistance", width/2, height/2)
    textSize(15)
    text("enter to continue", width/2, height/2 + 200)
    text("tab to skip intro", width/2, height/2 + 230)
    imageMode(CENTER)
    image(logo, width/2, height/2 - 150)

  }

  if (currentPage == 1) {
    stroke(255)
    strokeWeight(0.1)
    fill(255)
    textFont('monospace')
    textAlign(CENTER)
    text(`Up arrow creates motile F- E-Coli (Blue)` , width/2, 70)
    text(`Down arrow creates Antibiotic doing brownian dance`, width/2, 90)
    text( `Left arrow creates some other random Bacteria (orange => F+, yellow => F-)`, width/2, 110)
    text(`drag stuff around!`, width/2, 900)
    text(`Enter to continue`, width/2, 930)

    strokeWeight(1)
    for (let i = 0; i< borks.length; i++){
    borks[i].hajimefy();
    borks[i].over();
    borks[i].update();
    borks[i].walk();
    borks[i].replicate();
    borks[i].die();
  }
}

  if (currentPage == 2) {
    textStyle(NORMAL)
    textSize(15)
    stroke(255)
    strokeWeight(0.1)
    fill(255)
    textFont('monospace')
    textAlign(CENTER)
    text(`random bacteria can gain resistance to antibiotic by natural selction.` , width/2, 70)
    text(`so we made an E-Coli that kills the antibiotic! (bring them very close)`, width/2, 100)
    textStyle(ITALIC)
    text( `there's a bit of a problem though - conjugation: `, width/2, 130)
    textStyle(NORMAL)
    text( `1. Our F- E-Coli can become F+ by conjugating with an F+ bacteria (orange)`, width/2, 160)
    textSize(13)
    text( `Bring E-Coli close to an orange bacteria. if EColi becomes orange, it is now F+`, width/2, 180)
    textSize(15)
    text( `2. And then it can conjugate with an F- bacteria (yellow) and give IT the code that kills antibiotic`, width/2, 220)
    textSize(13)
    text( `Bring F+ E-Coli close to yellow bacteria. If it becomes red, it is now Resistant`, width/2, 240)
    textSize(15)
    text(`Enter to continue`, width/2, 930)

    strokeWeight(1)
    for (let i = 0; i< borks.length; i++){
    borks[i].hajimefy();
    borks[i].over();
    borks[i].update();
    borks[i].walk();
    borks[i].replicate();
    borks[i].die();
    sudoku();
  }
}

if (currentPage == 3) {
  textStyle(NORMAL)
  textSize(15)
  stroke(255)
  strokeWeight(0.1)
  fill(255)
  textFont('monospace')
  textAlign(CENTER)
  text(`one more problem: sometimes when E-Coli dies, it releases its genetic code in the environment! ` , width/2, 70)
  textSize(13)
  text( `wait for it to die or create one with left arrow`, width/2, 90)
  textSize(15)
  text(`this genetic material can be taken up by random bacteria, and can gain Resistance`, width/2, 120)
  textSize(13)
  text( `drag the released genetic code over any random bacteria and hold for a bit`, width/2, 140)
  textSize(15)
  text(`Enter to continue`, width/2, 930)
  // text(`Alt to initialise random population, Esc to clear the sim`, width/2, 950)


  strokeWeight(1)
  for (let i = 0; i< borks.length; i++){
  borks[i].hajimefy();
  borks[i].over();
  borks[i].update();
  borks[i].walk();
  borks[i].replicate();
  borks[i].die();
  sudoku();
}
}

if (currentPage === 4) {
  textStyle(NORMAL)
  textSize(15)
  stroke(255)
  strokeWeight(0.1)
  fill(255)
  textFont('monospace')
  textAlign(CENTER)
  text(`Solution part 1: we split the secret code that kills antibiotics in two different plasmids ` , width/2, 70)
  textSize(13)
  text( `massively reducing the probabilty that conjugation leads to resistance`, width/2, 90)
  textSize(15)
  text(`Solution part 2: a sugar based kill switch incorporated only in our E-coli`, width/2, 120)
  textSize(13)
  text( `it degrades the DNA and kills the bacteria`, width/2, 140)
  textSize(15)
  text(`Enter to run the simulation!`, width/2, 930)
  text(`Alt to initialise random population, cheat code to clear the sim`, width/2, 950)


  strokeWeight(1)
  for (let i = 0; i< borks.length; i++){
  borks[i].hajimefy();
  borks[i].over();
  borks[i].update();
  borks[i].walk();
  borks[i].replicate();
  borks[i].die();
  sudoku();
}
}

    if (currentPage === 5) {
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
    let coliconju = 0
    let borkconju = 0
    let numEcoli = 0
    let numRobusts = 0
    let numAntibiotics = 0
    for (let i of borks) {
      if (i.identity() === 0) {
        numEcoli += 1
        if (i.conjubaby === true) {
          coliconju += 1
        }
      }
      if (i.identity() === 1) {
        numAntibiotics += 1
      }
      if (i.identity() === 2) {
        numRobusts += 1
        if (i.conjubaby === true) {
          borkconju += 1
        }
        if (i.secretCode == true) {
          numResistant += 1
        }
      }
    }

    //had to add it in draw()
    //dayum
    if (numEcoli > populationCap) {
      for (let i = 0 ; i < borks.length; i ++) {
        if (borks[i].identity() === 0) {
          borks.splice(i, 1)
          // numEcoli -= 1
          break
        }
        // console.log('not an ecoli yet.')
      }
    }
    if (numRobusts > populationCap) {
      for (let i = 0; i < borks.length; i ++) {
        if (borks[i].identity() === 2) {
          borks.splice(i, 1)
          // numRobusts -= 1;
          break;
        }
      }
    }

    //i guess i should cap the number of antibiotics as well
    if (numAntibiotics > populationCap*3) {
      for (let i = 0; i < borks.length; i++) {
        if (borks[i].identity() === 1) {
          borks.splice(i, 1)
          break;
        }
      }
    }

    if (updateCounter % 5 === 0) {
      if (graphColi.length != 1 || numEcoli != 0) {
      graphColi.push(numEcoli)
      }
      if (graphAnti.length != 1 || numAntibiotics != 0) {
      graphAnti.push(numAntibiotics)
      }
      if (graphRobust.length != 1 || numRobusts != 0) {
        graphRobust.push(numRobusts)
      }
    }

    updateCounter += 1
    // graphColi.push(numEcoli)
    //ved update: add line graph (live updating graph)
    //graphing starts here:
    let colix = []
    let antix = []
    let robux = []
    for (let i = 0; i<= 300; i+= 300/((graphColi.length - 1))) {
      colix.push(i)
    }
    for (let i = 0; i<= 300; i+= 300/((graphAnti.length - 1))) {
      antix.push(i)
    }
    for (let i = 0; i <= 300; i+= 300/((graphRobust.length - 1))) {
      robux.push(i)
    }

    beginShape();//ecoli
    noFill()
    strokeWeight(2)
    stroke(50, 255, 255, 200)
    for (let i = 0; i < colix.length; i++) {
      vertex(colix[i], 255 - graphColi[i]*10)
    }
    endShape();

    beginShape();//antibiotic
    noFill()
    strokeWeight(2)
    stroke(255, 50, 50, 200)
    for (let i = 0; i < antix.length; i++) {
      vertex(antix[i], 765 - graphAnti[i]*10)
    }
    endShape();

    beginShape()//borkteria
    noFill()
    strokeWeight(2)
    stroke(255,255, 0, 150)
    for (let i = 0; i < robux.length; i++) {
      vertex(robux[i], 510 - graphRobust[i]*10)
    }
    endShape();








    fill(255)
    textFont('monospace')
    strokeWeight(0.3)
    textSize(14)
    stroke(0)
    textAlign(CENTER)
    text(` E.Coli: ${numEcoli}, F+ : ${Math.round(coliconju/numEcoli*100)}%`, width/2, height-70)
    text(` Antibiotics: ${numAntibiotics}`, width/2, height-50)
    text(` Random borkteria: ${numRobusts}, F+ : ${Math.round(borkconju/numRobusts*100)} %`, width/2, height - 30)
    fill(255, 100, 50, 200)
    text(` Resistant: ${Math.round(numResistant/numRobusts*100)}%`, width/2, height - 10)
    // bhijubhalize();
  }
}
