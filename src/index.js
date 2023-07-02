import Game from "./game";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

const GAME_HEIGHT = 600;
const GAME_WIDTH = 800;

let lastTime = 0;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.start();

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw(ctx);
  game.update(deltaTime);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
