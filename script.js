class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "green";
    //this.img = img
  }

  draw() {
    fill(this.color);
    // image(x,y,w,h,img)
    Rect(this.x, this.y, this.w, this.h);
    this.x += -3;
  }
}

var yVal;
var acceleration;
var snelheid;
var mass;
var Rect = [];



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
  if (frameCount % 85 == 0) {


    randomHeight = random(height - 150);

    rect1 = new Rect(700, 0, 50, randomHeight,"imageTop")
    rect2 = new Rect(700, randomHeight + 150, 50, 300,"imageBot")

    rects.push(rect1);
    rects.push(rect2);

    // remove unnessecary pipes
    if (rects.length > 6) {
      rects.splice(0, 2);
    }
  }


  if (frameCount % 95 == 0 && rects.length > 3.6) {
    score = score + 1;
  }

  rects.forEach((p) => {
    p.drawRect()
  });




 