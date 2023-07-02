import { detectCollision } from "./collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("image_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = {
      x: 0,
      y: 400
    };
    this.speed = {
      x: 4,
      y: -2
    };
    this.size = 25;
    this.game = game;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    //console.log(this.game.paddle.position.x);
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // checks if the ball is hitting the left/right walls
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    //checks if the ball is hitting the top/bottom walls
    if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // check if the ball hits the paddle

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
