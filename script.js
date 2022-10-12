class Rect {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "green";
    this.img = img;
  }

drawRect() {
    fill(this.color);
    image(this.img, this.x, this.y, this.w, this.h);
    this.x += -3;
  }
  
  checkCollision() {
    if (width / 2 + 50 > this.x && (width / 2) < this.x + this.w) {
      if (yVal + mass - 10 > this.y && yVal < this.y + this.h) {
        gameState = 2;
        this.color = "yellow";
        gameoversound.play();
        backgroundsong.stop();
      }
    }
    else {
      this.color = "green";
    }
  }
}

function preload(){
  backgroundIMG = loadImage("plaatjes/bgmain.png");
  floppy = loadImage("plaatjes/mario.png");
  pressStart = loadImage("plaatjes/press start.gif");
  endBackground = loadImage("plaatjes/gameover1.gif");
  ding = loadSound('mp3/ding.mp3');
  jump = loadSound('mp3/jumpsound.mp3');
  gameoversound = loadSound('mp3/gameover.mp3');
  backgroundsong = loadSound('mp3/background.mp3');
  scoreletters = loadFont('BACKTO1982.ttf');
  herewego = loadSound('mp3/herewego.mp3');
  pipetop = loadImage("plaatjes/pipetop.png");
  pipebot = loadImage("plaatjes/pipebot.png");
}

var gif_createImg;
var yVal;
var acceleration;
var snelheid;
var mass;
var rects = [];
var score = 0;
var highscore = 0;

let gameState = 0

function setup() {
  createCanvas(640, 360);
  yVal = 0;
  snelheid = 0;
  mass = 50;
  acceleration = mass * 0.01;
  textAlign(CENTER);
  
}

function draw(){

  if (gameState == 0) {
    startGame();
    gameoversound.stop();
  } else if (gameState == 1) {
    playGame();
  } 
  else if (gameState == 2) {
    finishGame();
  }
}

function game() {
  background(backgroundIMG)
  snelheid += acceleration;
  yVal += snelheid;
  image(floppy, width / 2, yVal, mass + 20, mass - 10);


  if (yVal > height - mass / 2) {
    snelheid *= -0.6;
    yVal = height - mass / 2;
  }
  if (frameCount % 85 == 0) {


    randomHeight = random(height - 150);

    rect1 = new Rect(700, 0, 50, randomHeight, pipebot)
    rect2 = new Rect(700, randomHeight + 150, 50, 300, pipetop)

    rects.push(rect1);
    rects.push(rect2);

    // remove unnessecary pipes
    if (rects.length > 6) {
      rects.splice(0, 2);
    }
  }

  if (frameCount % 85 == 0 && rects.length > 3.0) {
    score = score + 1;
    ding.play();
    if (score > highscore){
      highscore = score;
    }
  } 
  
  rects.forEach((p) => {
    p.drawRect()
    p.checkCollision()
  });

  fill('blue');
  textSize(20);
  textFont(scoreletters);
  text('Score:', 70, 40);
  text('Highscore:', 105, 70);
  text(score, 145, 40);
  text(highscore, 210, 70);

}

// 3 gamestate functions
function startGame() {
  background(pressStart);
  fill('red');
  textSize(23);
  textFont(scoreletters);
  text('Welcome to Flappy Mario!', 310, 35)
  text('Mouse',240,302)
  text('To',40,330)
  
}

function playGame() {
  game();
}

function finishGame(){
  background(endBackground);
    fill('blue');
    textSize(23);
    textFont(scoreletters);
    text('Click Mouse To Play Again', 310, 35)
}

function keyPressed(){
  if (key == ' '){
  yVal + 40;
  // - mass delen door 6 om een passend stuiter te krijgen
  snelheid = -mass / 6;
  jump.play();
  }
}

function mousePressed() {
  console.log(gameState);
  herewego.play();
  if (gameState == 0) {
    gameState += 1;
    backgroundsong.play();

  } else if (gameState == 2) {
    rects = [];
    score = 0;
    gameState = 0;
  }  
}


