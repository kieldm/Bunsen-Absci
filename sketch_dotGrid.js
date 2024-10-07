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
      if(dist(xRan[counter], yRan[counter], xRan[i], yRan[i]) < 10){
        makeIt = false;
      }
    }

    if(makeIt){
      var thisM = yRan[counter];
      var thisN = xRan[counter]

      var rs0 = random(9);

      dots[thisM][thisN].redDetect = true;

      if(rs0 < 3){               //////////////////////// SMALL Y
        var rad = 4;
        for(var x = -rad; x <= rad; x ++){
          var xAng = map(x, -rad, rad, 0, PI);
          var yWin = round(sin(xAng) * rad);
          for(var y = -yWin; y <= yWin; y++){
            dots[thisM + y][thisN + x].greyGradient = true;
            dots[thisM + y][thisN + x].greyValue = map(dist(0, 0, x, y), 0, rad, 100, 50);
          }

        }

        dots[thisM - 1][thisN - 1].redDetect = true;
        dots[thisM - 1][thisN + 1].redDetect = true;
        dots[thisM + 1][thisN].redDetect = true;

      } else if(rs0 < 6){        //////////////////////// MED Y
        var rad = 5;
        for(var x = -rad; x <= rad; x ++){
          var xAng = map(x, -rad, rad, 0, PI);
          var yWin = round(sin(xAng) * rad);
          for(var y = -yWin; y <= yWin; y++){
            dots[thisM + y][thisN + x].greyGradient = true;
            dots[thisM + y][thisN + x].greyValue = map(dist(0, 0, x, y), 0, rad, 100, 50);
          }

        }


        dots[thisM - 2][thisN - 2].redDetect = true;
        dots[thisM - 1][thisN - 1].redDetect = true;
        dots[thisM - 1][thisN + 1].redDetect = true;
        dots[thisM - 2][thisN + 2].redDetect = true;
        dots[thisM + 1][thisN].redDetect = true;
        dots[thisM + 2][thisN].redDetect = true;

        dots[thisM - 1][thisN].greyDetect = true;
        dots[thisM - 2][thisN + 1].greyDetect = true;
        dots[thisM - 3][thisN + 2].greyDetect = true;
        dots[thisM - 2][thisN + 3].greyDetect = true;
        dots[thisM - 1][thisN + 2].greyDetect = true;
        dots[thisM][thisN + 1].greyDetect = true;
        dots[thisM + 1][thisN + 1].greyDetect = true;
        dots[thisM + 2][thisN + 1].greyDetect = true;
        dots[thisM + 3][thisN].greyDetect = true;
        dots[thisM + 2][thisN - 1].greyDetect = true;
        dots[thisM + 1][thisN - 1].greyDetect = true;
        dots[thisM][thisN - 1].greyDetect = true;
        dots[thisM - 1][thisN - 2].greyDetect = true;
        dots[thisM - 2][thisN - 3].greyDetect = true;
        dots[thisM - 3][thisN - 2].greyDetect = true;
        dots[thisM - 2][thisN - 1].greyDetect = true;

      } else {                    //////////////////////// LARGE Y
        var rad = 8;
        for(var x = -rad; x <= rad; x ++){
          var xAng = map(x, -rad, rad, 0, PI);
          var yWin = round(sin(xAng) * rad);
          for(var y = -yWin; y <= yWin; y++){
            dots[thisM + y][thisN + x].greyGradient = true;
            dots[thisM + y][thisN + x].greyValue = map(dist(0, 0, x, y), 0, rad, 100, 50);
          }

        }

        dots[thisM - 1][thisN + 1].redDetect = true;
        dots[thisM - 2][thisN + 2].redDetect = true;
        dots[thisM - 3][thisN + 3].redDetect = true;
        dots[thisM - 3][thisN + 4].redDetect = true;
        dots[thisM - 2][thisN + 3].redDetect = true;
        dots[thisM - 1][thisN + 2].redDetect = true;
        dots[thisM][thisN + 1].redDetect = true;
        dots[thisM + 1][thisN + 1].redDetect = true;
        dots[thisM + 2][thisN + 1].redDetect = true;
        dots[thisM + 3][thisN + 1].redDetect = true;
        dots[thisM + 3][thisN].redDetect = true;
        dots[thisM + 2][thisN].redDetect = true;
        dots[thisM + 1][thisN].redDetect = true;
        dots[thisM - 1][thisN - 1].redDetect = true;
        dots[thisM - 2][thisN - 2].redDetect = true;
        dots[thisM - 3][thisN - 3].redDetect = true;
        dots[thisM - 3][thisN - 2].redDetect = true;
        dots[thisM - 2][thisN - 1].redDetect = true;
        dots[thisM - 1][thisN].redDetect = true;

        dots[thisM - 2][thisN + 1].greyDetect = true;
        dots[thisM - 3][thisN + 2].greyDetect = true;
        dots[thisM - 4][thisN + 3].greyDetect = true;
        dots[thisM - 4][thisN + 4].greyDetect = true;
        dots[thisM - 3][thisN + 5].greyDetect = true;
        dots[thisM - 2][thisN + 4].greyDetect = true;
        dots[thisM - 1][thisN + 3].greyDetect = true;
        dots[thisM][thisN + 2].greyDetect = true;
        dots[thisM + 1][thisN + 2].greyDetect = true;
        dots[thisM + 2][thisN + 2].greyDetect = true;
        dots[thisM + 3][thisN + 2].greyDetect = true;
        dots[thisM + 4][thisN + 1].greyDetect = true;
        dots[thisM + 4][thisN].greyDetect = true;
        dots[thisM + 3][thisN - 1].greyDetect = true;
        dots[thisM + 2][thisN - 1].greyDetect = true;
        dots[thisM + 1][thisN - 1].greyDetect = true;
        dots[thisM][thisN - 1].greyDetect = true;
        dots[thisM - 1][thisN - 2].greyDetect = true;
        dots[thisM - 2][thisN - 3].greyDetect = true;
        dots[thisM - 3][thisN - 4].greyDetect = true;
        dots[thisM - 4][thisN - 3].greyDetect = true;
        dots[thisM - 4][thisN - 2].greyDetect = true;
        dots[thisM - 3][thisN - 1].greyDetect = true;
        dots[thisM - 2][thisN].greyDetect = true;

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
      dots[m][n].greyDetect = false;
    }
  }

  generateRandom();
}