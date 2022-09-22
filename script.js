class rechthoek {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "green";
  }

   drawrechthoek() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    this.x += -3;
  }
}

var yVal;
var acceleration;
var snelheid;
var mass;
var rechthoek = [];



function setup() {
  createCanvas(640, 360);
  yVal = 0;
  snelheid = 0;
  mass = 50;
  floppy = loadImage("mario.png");
  acceleration = mass * 0.01;
}

function game() {


  snelheid += acceleration;
  yVal += snelheid;
  image(floppy, width / 2, yVal, mass + 20, mass - 10);


  if (yVal > height - mass / 2) {
    snelheid *= -0.6;
    yVal = height - mass / 2;
  }
}

function draw() {
  game()
}