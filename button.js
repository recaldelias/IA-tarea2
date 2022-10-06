class Button {
  constructor(tempX, tempY, tempW, tempH, color) {
    // Button location and size
    this.x = tempX;
    this.y = tempY;
    this.w = tempW;
    this.h = tempH;
    // Is the button on or off?
    // Button always starts as off
    this.on = true;
    this.estado = 1;

    this.click = function (mx, my) {
      // Check to see if a point is inside the rectangle
      if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {

        return true;
      }
    };

    // Draw the rectangle
    this.display = function () {
      rectMode(CORNER);
      stroke(0);
      // The color changes based on the state of the button
      // if (this.estado==1) {
      //   fill(color,color/4,color/3);
      // } else {
      //   fill(255);
      // }
      fill(color, color / 4, color / 3);
      rect(this.x, this.y, this.w, this.h);
    };
  }
}