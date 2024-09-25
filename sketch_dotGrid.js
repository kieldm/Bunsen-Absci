var bkgdColor, foreColor;
var col = [];

let spacer = 20;
let xCount, yCount;
let xSpacer, ySpacer;
let size = 8;

let shield;
let dots = [];

let randomCount = 5;

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
    dots[m] = [];
    for(var n = 0; n < xCount; n++){
      dots[m][n] = new Dot(n, m, n * xSpacer, m * ySpacer);
    }
  }

  /// SELECT RANDOM
  generateRandom();

  console.log("THIS MANY DOTS: " + dots.length);
}

function draw() {
  background(bkgdColor);

  for(var m = 0; m < yCount; m++){
    for(var n = 0; n < xCount; n++){
      dots[m][n].run();
    }
  }

  image(shield, 0, 0);

  fill(foreColor);
  noStroke();
  textSize(12);
  textFont(tFont)
  text("Framerate: " + round(frameRate()), 50, height - 50);
}

function generateRandom(){
  var counter = 0;
  var xRan = [];
  var yRan = [];
  while(counter < randomCount){
    var makeIt = true;
    xRan[counter] = int(random(5, xCount - 5));
    yRan[counter] = int(random(5, yCount - 5));

    for(var i = 0; i < counter; i++){
      if(dist(xRan[counter], yRan[counter], xRan[i], yRan[i]) < 6){
        makeIt = false;
      }
    }

    if(makeIt){
      var thisM = yRan[counter];
      var thisN = xRan[counter]
      dots[thisM][thisN].redDetect = true;

      dots[thisM - 1][thisN - 1].redDetect = true;
      dots[thisM - 1][thisN + 1].redDetect = true;
      dots[thisM + 1][thisN].redDetect = true;

      if(random(10) < 5){
        dots[thisM - 2][thisN - 2].redDetect = true;
        dots[thisM - 2][thisN + 2].redDetect = true;
        dots[thisM + 2][thisN].redDetect = true;
      }

      counter ++;
    }
  }
}

function mouseMoved(){
  for(var m = 0; m < yCount; m++){
    for(var n = 0; n < xCount; n++){
      dots[m][n].mouseAdd();
    }
  }
}

function mousePressed(){
  for(var m = 0; m < yCount; m++){
    for(var n = 0; n < xCount; n++){
      dots[m][n].mousePressedAdd();
    }
  }
}

function keyPressed(){
  for(var m = 0; m < yCount; m++){
    for(var n = 0; n < xCount; n++){
      dots[m][n].keyPressedReset();
      dots[m][n].redDetect = false;
    }
  }

  generateRandom();
}