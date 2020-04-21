let canvas = document.getElementById('disCanvas');
let ctx = canvas.getContext('2d')
let x = canvas.width/2
let y = canvas.height - 30
let dx = 10
//let ratio = 1 - Math.floor(Math.random()*2);
let dy = -11
let ballRadius = 5;
let randomColor = Math.floor(Math.random()*16777215).toString(16);
let majig = (Math.random())
let paddleHeight = 10;
let paddleWidth = 300;
let paddleX = (canvas.width - paddleWidth)/2;
let rightPressed = false
let leftPressed = false
let i = 1
let t = 0

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.body.onkeyup = function(e){
  if(e.keyCode == 32){
    t = t == 1 ? 0 : 1
  }
}

function keyDownHandler(e) {
  if (e.key == "ArrowRight") rightPressed = true;
  else if (e.key == "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key == "ArrowRight") rightPressed = false;
  else if (e.key == "ArrowLeft") leftPressed = false;
}

// function alerter() {
//   alert("yos")
//   return 1
// }

function toggle(button){
  button.value = (button.value == "ON") ? "OFF" : "ON";
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  // ctx.fillStyle = "#"+Math.floor(Math.random()*16777215).toString(16)
  // if (document.getElementById("butt").value == "ON" || ) {
  //   ctx.fillStyle = Math.random() > 0.5 ? "white" : "black";
  // }
  ctx.fillStyle = t == 1 ? ( Math.random() > 0.5 ? "white" : "black" ):
  "#"+Math.floor(Math.random()*16777215).toString(16)

  ctx.fill()
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black"//+ Math.floor(Math.random()*16777215).toString(16);
  ctx.fill()
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, canvas.height - paddleHeight, canvas.width, paddleHeight)
  if (i % 1000 == 0) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height - paddleHeight)
    //
    // dy -= 2
    // ballRadius += 0.5
  }
  drawBall();
  drawPaddle();
  if (y - ballRadius < 0 ) dy = -dy
  if (y + ballRadius > canvas.height) {
     alert("yeash")
     clearInterval(interval)
     document.location.reload();
  }
  if (x - ballRadius < 0 || x + ballRadius > canvas.width) dx = -dx
  if (x > paddleX && x < paddleX + paddleWidth && y + ballRadius > canvas.height - paddleHeight) {
    dy = -dy
  }
  if (rightPressed) {
    paddleX += 20
    if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth
  }

  else if (leftPressed) {
    paddleX -= 20
    if (paddleX < 0) paddleX = 0
  }

  x += dx
  y += dy
  i += 1
}



let interval = setInterval(draw, 20)
