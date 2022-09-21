var yVal;
var acceleration;
var snelheid;
var mass;



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