import Paddle from "./paddle";
import InputHandler from "../src/input";
import Ball from "/src/ball";
import { buildLevel, level1 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  start() {
    this.gamestate = GAMESTATE.RUNNING;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    let bricks = buildLevel(this, level1);

    this.gameObjects = [this.ball, this.paddle, ...bricks];

    new InputHandler(this.paddle, this);
  }
  update(deltaTime) {
    if (this.gamestate === GAMESTATE.PAUSED) return;
    this.gameObjects.forEach((object) => {
      object.update(deltaTime);
    });

    this.gameObjects = this.gameObjects.filter(
      (object) => !object.markedForDeletion
    );
  }
  draw(ctx) {
    this.gameObjects.forEach((object) => {
      object.draw(ctx);
    });
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
