class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "green";
  }

drawRect() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    this.x += -3;
  }
  
  checkCollision() {
    if (width / 2 + 50 > this.x && (width / 2) < this.x + this.w) {
      if (yVal + mass - 10 > this.y && yVal < this.y + this.h) {
        this.color = "yellow";
      }
    }
    else {
      this.color = "green";
    }
  }
}

var yVal;
var acceleration;
var snelheid;
var mass;
var rects = [];



function setup() {
  createCanvas(640, 360);
  backgroundIMG = loadImage("bg.jpg");
  yVal = 0;
  snelheid = 0;
  mass = 50;
  floppy = loadImage("mario.png");
  acceleration = mass * 0.01;
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

    rect1 = new Rect(700, 0, 50, randomHeight)
    rect2 = new Rect(700, randomHeight + 150, 50, 300)

    rects.push(rect1);
    rects.push(rect2);

    // remove unnessecary pipes
    if (rects.length > 6) {
      rects.splice(0, 2);
    }
  }
  rects.forEach((p) => {
    p.drawRect()
    p.checkCollision()
  });
}

function keyPressed(){
  if (key == ' '){
  yVal + 40;
  // - mass gedeeld door 6 om bij elke mass een proportionele stuiter te krijgen
  snelheid = -mass / 6;
  }
}

function draw() {
  game()
}