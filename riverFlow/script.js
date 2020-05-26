let xs = []
let ys = []
let m, b, a, c, d
function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  // frameRate(1)
  m = tf.scalar(Math.random()).variable()
  b = tf.scalar(Math.random()).variable()
  a = tf.scalar(Math.random()).variable()
  c = tf.scalar(Math.random()).variable()
  d = tf.scalar(Math.random()).variable()

// i dont even know anymore
}

function mousePressed() {
  //works beter from 0 to 1?
  //its bounded nicely and ig the derivatives work out properly
  // HACK: putting -1 to 1 to exploit more space
  let x = map(mouseX, 0, width, -1, 1)
  //get y pointing up
  let y = map(mouseY, 0, height, 1, -1)
  xs.push(x)
  ys.push(y)
  stroke(255)
  strokeWeight(6)
  point(mouseX, mouseY)
}

function keyPressed() {
  if (keyCode === ENTER) {
    xs = []
    ys = []
  }
}

function regress() {
  tf.tidy(() => {
    if (xs.length > 0) {
    // y = m*x + b
    const f = x => m.mul(x).add(b)
    const loss = (pred, label) => (pred.sub(label).square().mean())
    const learningRate = 0.1;
    const optimizer = tf.train.sgd(learningRate);

    //train:
    for (let i = 0; i< 3; i++) {
      optimizer.minimize(() => loss(f(xs), ys))
    }
    //make prediction
    // HACK: just need endpts lol
    // const preds = f(xs).dataSync()
    // console.log(preds)
    //draw?
    //dude just use two points to draw the line wtf
    const endpts = [0, 1]
    const preds = f(endpts).dataSync()
    strokeWeight(2)
    line(0, map(preds[0], 0, 1, height, 0), width, map(preds[1], 0, 1, height, 0))
    tf.dispose(optimizer)

    //ooh had to call dispose on optimiser separately for some reason?
    //i think because it was a separate function call
  }
  })
}

  function polyRegress() {
    tf.tidy(() => {
      //for this i'll have to use vertex ig
      // HACK: glitch fixed but around endpoints it's going to spasm
      if (xs.length > 2) {

        //y = a*x**2 + b*x + c
        //y = a*x**3 + b*x**2 + c*x + d?
        //quad
        // const f = x => tf.mul(a, tf.square(x)).add(tf.mul(b, x)).add(c)
        //cubic
        // const f = x => tf.mul(
        //   a, tf.pow(x, 3)
        // ).add(tf.mul(
        //   b, tf.square(x)
        // )).add(tf.mul(
        //   c, x
        // )).add(d)
        //maybe squaring x first doesnt need tf namespacing
        //yea this more conveboo
        const f = x => tf.pow(x, 3).mul(a).add(tf.square(x).mul(b)).add(tf.mul(x, c)).add(d)
        const loss = (pred, label) => (pred.sub(label).square().mean())

        const learningRate = 0.05
        const optimizer = tf.train.sgd(learningRate)
        for (let i = 0; i< 10; i++) {
        optimizer.minimize(() => loss(f(xs), ys))
      }
        // console.log(f(xs).dataSync())
        // const preds = f(xs).dataSync()
        // console.log(preds)
        lossval = round((loss(f(xs), ys).dataSync()), 5)
        xpoints = []
        for (let i = -1; i < 1; i += 0.07) {xpoints.push(i)}
        preds = f(xpoints).dataSync()
        beginShape()
          noFill()
          strokeWeight(3)

          for (let i = 0; i< xpoints.length; i++) {
            //gotta remap lol
            ydash = map(preds[i], -1, 1, height, 0)
            ex = map(xpoints[i], -1, 1, 0, width)
            // console.log(ex, ydash)

            vertex(ex, ydash)
          }
        endShape()
        tf.dispose(optimizer)
        strokeWeight(1)
        textAlign(CENTER)
        text(`loss = ${lossval}`, width/2, height - 50)


      }

    })
  }


  //
  //     vertex(ex, ydash)
  // beginShape()
  //   strokeWeight(3)
  //   for (let i = 0; i< preds.length; i++) {
  //     //gotta remap lol
  //     ydash = map(preds[i], 0, 1, height, 0)
  //     ex = map(xs[i], 0, 1, 0, width)
  //     // console.log(ex, ydash)
  //
  //     vertex(ex, ydash)
  //   }
  // endShape()

function draw() {
  background(75, 100, 160, 255)
  stroke(255)
  strokeWeight(6)
  for (let i = 0; i < xs.length; i++) {
    //remap to draw
    px = map(xs[i], -1, 1, 0, width)
    py = map(ys[i], -1, 1, height, 0)
    point(px, py)

  }
  //line:
  //get the points from optimise
  polyRegress()
  // tf.tidy(regress)
  // console.log(tf.memory().numTensors)


}
