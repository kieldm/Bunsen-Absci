class Dot {
  constructor(n, m, x, y){
    this.n = n;
    this.m = m;

    this.x = x;
    this.y = y;

    this.c = col[0];

    this.decaySpeed = 1;
    this.colorCulm = 0;

    this.sprayDist = 250;
    this.sprayAmount = 6;

    this.drawDist = spacer * 2;
    this.drawAmount = 20;

    this.redDetect = false;
  }

  run(){
    // this.noiseAdd();
    this.update();
    this.display();
  }

  update(){
    if(this.redDetect){
      if(this.colorCulm < 1){
        this.c = col[0];
      } else if(this.colorCulm < 50){
        var tk0 = map(this.colorCulm, 1, 50, 0, 1);
        this.c = lerpColor(col[0], col[1], tk0);
      } else if(this.colorCulm < 100){
        var tk0 = map(this.colorCulm, 50, 100, 0, 1);
        this.c = lerpColor(col[1], col[2], tk0);
      } else if(this.colorCulm < 150){
        var tk0 = map(this.colorCulm, 100, 150, 0, 1);
        this.c = lerpColor(col[2], col[3], tk0);
      } else {
        this.c = col[3];
      }
  
      if(this.colorCulm > 150){
        this.colorCulm -= this.decaySpeed;
      } 
    } else {
      if(this.colorCulm < 1){
        this.c = col[0];
      } else if(this.colorCulm < 50){
        var tk0 = map(this.colorCulm, 1, 50, 0, 1);
        this.c = lerpColor(col[0], col[1], tk0);
      } else if(this.colorCulm < 100){
        var tk0 = map(this.colorCulm, 50, 100, 0, 1);
        this.c = lerpColor(col[1], col[2], tk0);
      } else {
        this.c = col[2];
      }
  
      if(this.colorCulm > 50){
        this.colorCulm -= this.decaySpeed;
      } 
    }

  }

  display(){
    push();
      translate(this.x, this.y);

      fill(this.c);

      rect(0, 0, xSpacer, ySpacer);
    pop();
  }

  noiseAdd(){
    var tk0 = noise((this.x + frameCount * 2) * 0.005, (this.y + frameCount * 2) * 0.005);
    var tk1 = map(tk0, 0, 1, 0, 2);

    if(this.colorCulm < 150){
      this.colorCulm += tk1;
    }
  }

  mouseAdd(){
    var thisDist = dist(mouseX, mouseY, this.x, this.y)
    if(thisDist < this.sprayDist){
      var tk0 = map(thisDist, 0, this.sprayDist, 0, 1);
      var tk1 = easeInOutQuad(tk0);
      var tk2 = map(tk1, 0, 1, this.sprayAmount, 0);

      if(this.colorCulm < 150){
        this.colorCulm += tk2;
      }
    }

    var thisDist = dist(mouseX, mouseY, this.x, this.y)
    if(thisDist < this.drawDist){
      var tk0 = map(thisDist, 0, this.drawDist, 0, 1);
      var tk1 = easeInOutSine(tk0);
      var tk2 = map(tk1, 0, 1, this.drawAmount, 0);

      if(this.colorCulm < 150){
        this.colorCulm += tk2;
      }
    }
  }

  mousePressedAdd(){
    var thisDist = dist(mouseX, mouseY, this.x, this.y)
    if(thisDist < this.sprayDist * 2){
      var tk0 = map(thisDist, 0, this.sprayDist * 2, 0, 1);
      var tk1 = easeInOutQuad(tk0);
      var tk2 = map(tk1, 0, 1, this.sprayAmount * 10, 0);

      if(this.colorCulm < 150){
        this.colorCulm += tk2;
      }
    }
  }

  keyPressedReset(){
    this.colorCulm = 0;
  }
}