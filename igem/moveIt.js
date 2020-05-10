class Ecoli {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.sides = Math.floor(random(50, 120))
    this.dragging = false;
    this.rollover = false;
    this.offset = 30;
  }


  over() {
    //mouse over object?
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
    if (this.rollover){
      let mouse = createVector(mouseX, mouseY)
      let vecoff = p5.Vector.sub(mouse, this.pos)
      this.pos.add(vecoff)
    }
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
}
