class Brick extends Paddle {
  constructor(x, y, w, h, points) {
    super(x, y ,w, h);
    this.points = points;
  }
  
  render() {
    push();
    strokeWeight(2);
    if (this.points === 1) {
      stroke("green");
      fill("green");
    } else if (this.points === 2) {
      stroke("pink");
      fill("pink");
    } else if (this.points === 3) {
      stroke("blue");
      fill("blue");
    } else if (this.points === 4) {
      stroke("yellow");
      fill("yellow");
    } else if (this.points === 5) {
      stroke("red");
      fill("red");
    } else if (this.points === 6) {
      stroke("silver");
      fill("silver");
    } else if (this.points === 7) {
      stroke("purple");
      fill("purple");
    }
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.width-2, this.height-2);
    noStroke();
    fill(0);
    text(this.points, this.pos.x, this.pos.y);
    pop();   
  }
}