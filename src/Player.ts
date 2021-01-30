import {
  canvas,
  CELL_WIDTH,
  OFFSET,
  LINE_WIDTH,
  ctx,
  entities,
  keys,
  showMenu,
  SPEED,
  coordinatesToOffset,
  checkForWall,
} from "./index";
import Maze from "./Maze";

export default class Player {
  phasing = false;
  x = Math.round(canvas.width / 2);
  y = Math.round(canvas.height / 2);
  width = CELL_WIDTH / 2;
  height = CELL_WIDTH / 2;
  getCurrentCoordinates(): { x: number; y: number } {
    return {
      x: Math.ceil(
        (-OFFSET.x - LINE_WIDTH) / (LINE_WIDTH + CELL_WIDTH) +
          Math.floor(canvas.width / (CELL_WIDTH + LINE_WIDTH) / 2)
      ),
      y:
        Math.round((-OFFSET.y - LINE_WIDTH) / (LINE_WIDTH + CELL_WIDTH)) +
        Math.floor(canvas.height / (CELL_WIDTH + LINE_WIDTH) / 2),
    };
  }
  checkForColour(colour: string) {
    let directions = [
      ctx.getImageData(this.x + CELL_WIDTH / 2, this.y - (SPEED + 1), 1, 1),
      ctx.getImageData(
        this.x + CELL_WIDTH + SPEED + 1,
        this.y + CELL_WIDTH / 2,
        1,
        1
      ),
      ctx.getImageData(
        this.x + CELL_WIDTH / 2,
        this.y + CELL_WIDTH + SPEED + 1,
        1,
        1
      ),
      ctx.getImageData(this.x - (SPEED + 1), this.y + CELL_WIDTH / 2, 1, 1),
    ];

    for (let i = 0; i < directions.length; i++) {
      if (directions[i].data.toString() === colour) {
        return true;
      }
    }
    return false;
  }
  update() {
    if (keys["w"] || keys["ArrowUp"]) {
      if (!checkForWall(this.x, this.y, this.width, -SPEED) || this.phasing) {
        OFFSET.y += SPEED;
      }
    }
    if (keys["a"] || keys["ArrowLeft"]) {
      if (!checkForWall(this.x, this.y, -SPEED, this.width) || this.phasing) {
        OFFSET.x += SPEED;
      }
    }
    if (keys["s"] || keys["ArrowDown"]) {
      if (
        !checkForWall(this.x, this.y + this.width, this.width, SPEED) ||
        this.phasing
      ) {
        OFFSET.y -= SPEED;
      }
    }
    if (keys["d"] || keys["ArrowRight"]) {
      if (
        !checkForWall(this.x + this.width, this.y, SPEED, this.width) ||
        this.phasing
      ) {
        OFFSET.x -= SPEED;
      }
    }

    // check if reached goal
    if (this.checkForColour("255,0,0,255")) {
      showMenu();
    }
    // check if blue square
    if (this.checkForColour("0,0,255,255")) {
      let maze = entities[1];
      let coords = this.getCurrentCoordinates();
      if (maze instanceof Maze) {
        for (let i = 0; i < maze.phazors.length; i++) {
          if (
            Math.abs(maze.phazors[i][0] - coords.x) +
              Math.abs(maze.phazors[i][1] - coords.y) <
            4
          ) {
            maze.phazors.splice(i, 1);
            // get screen offset for a random set of coordinates
            let offset = coordinatesToOffset(
              Math.round(Math.random() * (entities[1].width - 1)),
              Math.round(Math.random() * (entities[1].height - 1))
            );
            OFFSET.x = offset.x;
            OFFSET.y = offset.y;
            break;
          }
        }
      }
    }

    if (keys[" "]) {
      this.phasing = true;
    }

    if (!keys[" "]) {
      this.phasing = false;
    }
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }
}
