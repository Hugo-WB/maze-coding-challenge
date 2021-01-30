import Maze from "./Maze";
import Player from "./Player";

console.log("Cheat: Press = to phase through walls");

const CELL_WIDTH = 40;
const LINE_WIDTH = 1;

let OFFSET = {
  x: 0,
  y: 0,
};

let SPEED: number = 4;
if (navigator.userAgent.indexOf("Firefox") > -1) {
  SPEED = 8;
}

let playing: boolean = true;

// HTML ELements:
const canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
let nullAbleCTX = canvas.getContext("2d");
if (!(nullAbleCTX = canvas.getContext("2d"))) {
  throw new Error(`2d context not supported`);
}
let ctx = nullAbleCTX;

let tempButton = document.getElementById("start");
if (tempButton == null) {
  throw new Error("Render button first");
}
let button = tempButton;

let tempMenu = document.getElementById("afterMenu");
if (tempMenu == null) {
  throw new Error("Render");
}
let menu = tempMenu;

// dictionary of keys pressed, when pressed the key's value will be true
let keys: { [key: string]: boolean } = {};

let entities: (Player | Maze)[] = [];

// helper functions:

let checkForWall = (x: number, y: number, width: number, height: number) => {
  // checks in defined area if there are non-white pixels in the area
  let pixels = ctx.getImageData(x, y, width, height).data;
  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i] != 0) {
      return true;
    }
  }
  return false;
};

let coordinatesToOffset = (x: number, y: number): { x: number; y: number } => {
  // converts maze coordinates to the offset needed to center that maze cell
  // E.g. Used for teleporting, so that the screen centers on a random cell
  return {
    x: canvas.width / 2 - (x * (LINE_WIDTH + CELL_WIDTH) + LINE_WIDTH),
    y:
      canvas.height / 2 -
      (y * (LINE_WIDTH + CELL_WIDTH) + LINE_WIDTH) +
      CELL_WIDTH / 3,
  };
};

const animate = () => {
  // main animation loop
  entities.forEach((entity) => {
    entity.update();
  });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  entities.forEach((entity) => {
    entity.draw();
  });
  if (playing) {
    requestAnimationFrame(animate);
  }
};

button.addEventListener("click", () => {
  // check for game start
  button.style.visibility = "hidden";
  animate();
});

let showMenu = () => {
  playing = false;
  menu.style.visibility = "visible";
};
menu.addEventListener("click", () => {
  // continue game with a slightly larger maze
  OFFSET = { x: 0, y: 0 };
  entities = [
    new Player(),
    new Maze(
      Math.round(entities[1].width * 1.3),
      Math.round(entities[1].height * 1.3)
    ),
  ];
  menu.style.visibility = "hidden";
  playing = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  animate();
});

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

const start = () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  entities = [new Player(), new Maze()];
  OFFSET = { x: 0, y: 0 };
};
start();
let background = new Maze();
background.draw();

export {
  CELL_WIDTH,
  LINE_WIDTH,
  ctx,
  canvas,
  OFFSET,
  SPEED,
  keys,
  showMenu,
  entities,
  checkForWall,
  playing,
  coordinatesToOffset,
};
