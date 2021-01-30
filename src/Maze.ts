import { CELL_WIDTH, LINE_WIDTH, ctx, canvas, OFFSET } from ".";
import { Cell, generateEllers } from "./generator";

export default class Maze {
  height: number;
  width: number;
  maze: Cell[][];
  start = {
    x: 0,
    y: 0,
  };
  end = { x: 0, y: 0 };
  phazors: [number, number][] = [];

  constructor(width?: number, height?: number) {
    // default maze height/width is the minimum to fill the screen
    this.height =
      height ?? Math.floor(canvas.height / (CELL_WIDTH + LINE_WIDTH));
    this.width = width ?? Math.floor(canvas.width / (CELL_WIDTH + LINE_WIDTH));
    this.maze = generateEllers(this.width, this.height);
    // the goal is a random point
    this.end = {
      x: Math.round(Math.random() * (this.width - 1)),
      y: Math.round(Math.random() * (this.height - 1)),
    };
    // randomly generate the blue squares/phazors
    for (let i = 0; i < Math.round((this.height * this.width) / 200); i++) {
      this.phazors.push([
        Math.round(Math.random() * (this.width - 1)),
        Math.round(Math.random() * (this.height - 1)),
      ]);
    }
  }

  update() {}
  draw() {
    // current location of the pen, used when drawing lines
    let pen = {
      x: LINE_WIDTH + OFFSET.x,
      y: LINE_WIDTH + OFFSET.y,
    };
    // draw the goal
    ctx.fillStyle = "red";
    ctx.fillRect(
      (this.end.x + 1) * LINE_WIDTH + this.end.x * CELL_WIDTH + OFFSET.x,
      (this.end.y + 1) * LINE_WIDTH + this.end.y * CELL_WIDTH + OFFSET.y,
      CELL_WIDTH,
      CELL_WIDTH
    );
    // draw the phazors
    ctx.fillStyle = "blue";
    this.phazors.forEach((phazor) => {
      ctx.fillRect(
        (phazor[0] + 1) * LINE_WIDTH + phazor[0] * CELL_WIDTH + OFFSET.x,
        (phazor[1] + 1) * LINE_WIDTH + phazor[1] * CELL_WIDTH + OFFSET.y,
        CELL_WIDTH,
        CELL_WIDTH
      );
    });
    ctx.fillStyle = "black";
    ctx.beginPath();
    // viewbox: used so that the maze only renders what is shown, otherwise it slows down the game a lot
    let viewBox: { [key: string]: [number, number] } = {
      x: [
        Math.max(0, Math.round(0.9 * (-OFFSET.x / CELL_WIDTH))),
        Math.min(
          this.width,
          Math.round(
            -OFFSET.x / CELL_WIDTH +
              2 * Math.floor(canvas.width / (CELL_WIDTH + LINE_WIDTH) / 2) +
              2
          )
        ),
      ],
      y: [
        Math.max(0, Math.round((0.9 * -OFFSET.y) / CELL_WIDTH)),
        Math.min(
          this.height,
          Math.round(-OFFSET.y / CELL_WIDTH) +
            2 * Math.floor(canvas.height / (CELL_WIDTH + LINE_WIDTH) / 2) +
            2
        ),
      ],
    };
    for (let y = viewBox.y[0]; y < viewBox.y[1]; y++) {
      pen.y = (y + 1) * LINE_WIDTH + y * CELL_WIDTH + OFFSET.y;
      for (let x = viewBox.x[0]; x < viewBox.x[1]; x++) {
        pen.x = (x + 1) * LINE_WIDTH + x * CELL_WIDTH + OFFSET.x;
        ctx.moveTo(pen.x, pen.y);
        pen.x += CELL_WIDTH;
        // check for walls of the cell, and if there are walls, draw them
        if (this.maze[y][x].walls[0]) {
          ctx.lineTo(pen.x, pen.y);
        } else {
          ctx.moveTo(pen.x, pen.y);
        }
        pen.y += CELL_WIDTH;
        if (this.maze[y][x].walls[1]) {
          ctx.lineTo(pen.x, pen.y);
        } else {
          ctx.moveTo(pen.x, pen.y);
        }
        pen.x -= CELL_WIDTH;
        if (this.maze[y][x].walls[2]) {
          ctx.lineTo(pen.x, pen.y);
        } else {
          ctx.moveTo(pen.x, pen.y);
        }
        pen.y -= CELL_WIDTH;
        if (this.maze[y][x].walls[3]) {
          ctx.lineTo(pen.x, pen.y);
        } else {
          ctx.moveTo(pen.x, pen.y);
        }
        pen.x += CELL_WIDTH;
      }
    }
    ctx.stroke();
  }
}
