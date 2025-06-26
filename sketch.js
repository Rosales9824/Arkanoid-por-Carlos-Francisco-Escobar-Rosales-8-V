let ball;
let paddle;
let bricks = [];
let w, h;
let gameStarted = false;
let gameInfo = true;
let gameOver = false;
let gameWon = false;
let score = 0;
let lives = 3;

function setup() {
  createCanvas(800, 600);

  ball = new Ball(width / 2, height - 94);
  paddle = new Paddle(width / 2, height - 80, 90, 12);
  
  createBricks(1);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    paddle.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    paddle.setDir(-1);
  }
  
  if (key == "1") {
    createBricks(1);
  } else if (key == "2") {
    createBricks(2);
  }
  
  if (keyCode === ENTER) {
    gameInfo = true;
    gameOver = false;
    gameStarted = false;
    gameWon = false;
    ball.reset();
    paddle.reset();
    createBricks(1);
    score = 0;
    lives = 3;
  }
  
  if (key === ' ') {
    gameStarted = true;
    gameInfo = false;
    gameWon = false;
    gameOver = false;
  }


}

function keyReleased() {
  paddle.setDir(0);
}

function draw() {
  const bkg = color("black");
  background(red(bkg)/1, green(bkg)/3, blue(bkg)/9);
  
  for (let i = 0; i < lives; i++) {
    fill("red");
    stroke("coral");
    strokeWeight(3);
    circle(i*45 + 30, 35, 30);
  }
  
  textSize(24);
  fill("coral");
  stroke(0);
  strokeWeight(2);
  text("MARCADOR: " + score, width - 156, height / 4 - 111);
  strokeWeight(2);
  stroke("limegreen");
  text("MARCADOR: " + score, width - 156, height / 4 - 111);
  
  textSize(40);
  fill(255);
  strokeWeight(4);
  stroke("red")
  text("ARKANOID", width / 2 - 10, height / 4 - 110);
  
  textSize(15);
  strokeWeight(2);
  fill("gold");  
  text("CFER", width - 80, height - 20);
  
  for (let brick of bricks) {
    brick.render();
  }
  ball.render();
  paddle.render();
  ball.edges();
  ball.end();
  ball.won();

  if (gameInfo && !gameStarted && !gameOver && !gameWon) {
    textAlign(CENTER, CENTER);
    textSize(20);
    fill("white");
    strokeWeight(3);
    stroke(0);
    text("BOTON PARA MOVER: FLECHAS DEL TECLADO", width / 2, height / 2);
    text("BOTONES PARA NIVELES: 1-2", width / 2, height / 2 + 25);
    fill("green");
    text("PRESIONE START PARA JUGAR", width / 2, height / 2 + 50);
    ball.pos.x = paddle.pos.x;
  }

  //ball.update();

  if (gameStarted && !gameInfo && !gameOver && !gameWon) {
    paddle.update();
    ball.update();  
    ball.bounce(paddle);
    
    let ABBrick = false;
    for (let i = bricks.length - 1; i >= 0; i--) {
      let brick = bricks[i];
      if (ball.colliding(brick)) {
        if (ABBrick === false) {
          ball.bounceOff(brick);
          ABBrick = true;
        }
        score += brick.points;
        bricks.splice(i, 1);
      }
    }
  }
 
  if (gameOver && !gameStarted && !gameInfo && !gameWon) {
    fill("darkMagenta");
    textAlign(CENTER, CENTER);
    strokeWeight(5);
    stroke("firebrick");
    textSize(50);
    text("GAME IS OVER!!", width / 2, height / 2);
    fill("Khaki");
    textSize(20);
    text("press enter to play again!", width / 2, height / 2 + 75);
  }
  
  if (gameWon && !gameOver && !gameStarted && !gameInfo) {
    textAlign(CENTER, CENTER);
    textSize(70);
    stroke("Chartreuse");
    strokeWeight(6);
    fill("MediumSpringGreen");
    text("YOU WIN!!!!!", width / 2, height / 2);
    stroke(0);
    strokeWeight(3);
    text("YOU WIN!!!!!", width / 2, height / 2);
    fill("cyan");
    stroke(0);
    textSize(20);
    text("HAS GANADO", width / 2, height / 2 - 100);
    fill("Khaki");
    text("presione ENTER para volver a jugar", width / 2, height / 2 + 50);
    
  }

}

function createBricks(level) {
  if (level === 1) {
    bricks.splice(0);
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 7; j++) {
        w = width / 11;
        h = 15;
        bricks.push(new Brick(i * w + w / 2, j * h + h / 2 + 75, w, h, 7-j));
      }
    }
  } else if (level === 2) {
    bricks.splice(0);
    for (let j = 0; j < 14; j++) {
      for (let i = 0; i < j+1; i++) {
        w = width / 11;
        h = 15;
        bricks.push(new Brick(i * w + w / 2, j * h + h / 2 + 75, w, h, (2*(14-i)-1) % 8));
      }
    }
  }
}