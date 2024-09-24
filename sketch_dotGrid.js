var bkgdColor, foreColor;
var col = [];

let spacer = 20;
let xCount, yCount;
let xSpacer, ySpacer;
let size = 8;

let shield;
let dots = [];

function preload(){
  tFont = loadFont("resources/Inter-Regular.ttf");

  shield = loadImage("resources/dotGrid_shield.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  rectMode(CENTER);

  xCount = round(width/spacer);
  yCount = round(height/spacer);

  xSpacer = width/xCount;
  ySpacer = height/yCount;

  xCount++;
  yCount++;

  // SKITTLE
  bkgdColor = color('#000000');
  foreColor = color('#ffffff');  
  col[0] = color('#000000');
  col[1] = color('#454545');
  col[2] = color('#cacaca');
  col[3] = color('#FF472E');

  for(var m = 0; m < yCount; m++){
    for(var n = 0; n < xCount; n++){
      dots[dots.length] = new Dot(n * xSpacer, m * ySpacer);
    }
  }

  console.log("THIS MANY DOTS: " + dots.length);
}

function draw() {
  background(bkgdColor);

  for(var p = 0; p < dots.length; p++){
    dots[p].run();
  }

  image(shield, 0, 0);

  fill(foreColor);
  noStroke();
  textSize(12);
  textFont(tFont)
  text("Framerate: " + round(frameRate()), 50, height - 50);
}

function mouseMoved(){
  for(var p = 0; p < dots.length; p++){
    dots[p].mouseAdd();
  }
}

function mousePressed(){
  for(var p = 0; p < dots.length; p++){
    dots[p].mousePressedAdd();
  }
}