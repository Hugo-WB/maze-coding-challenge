import { Cell, generateEllers } from "./generator";

const CELL_WIDTH = 40;
const LINE_WIDTH = 1;

let OFFSET = {
  x: 0,
  y: 0,
};

let SPEED: number = 5;
if (navigator.userAgent.indexOf("Chrome") > -1) {
  SPEED = 4;
}

let RUNNING = true;

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

let keys: { [key: string]: boolean } = {};

let entities: (Player | Maze)[] = [];

let checkForWall = (x: number, y: number, width: number, height: number) => {
  let pixels = ctx.getImageData(x, y, width, height).data;
  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i] != 0) {
      return true;
    }
  }
  return false;
};

let coordinatesToOffset = (x: number, y: number): { x: number; y: number } => {
  return {
    x: canvas.width / 2 - (x * (LINE_WIDTH + CELL_WIDTH) + LINE_WIDTH),
    y: canvas.height / 2 - (y * (LINE_WIDTH + CELL_WIDTH) + LINE_WIDTH),
  };
};

class Player {
  phasing = false;
  x = Math.round(canvas.width / 2);
  y = Math.round(canvas.height / 2);
  width = CELL_WIDTH / 2;
  height = CELL_WIDTH / 2;
  constructor() {}
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
      RUNNING = false;
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

class Maze {
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
    this.height =
      height ?? Math.floor(canvas.height / (CELL_WIDTH + LINE_WIDTH));
    this.width = width ?? Math.floor(canvas.width / (CELL_WIDTH + LINE_WIDTH));
    this.maze = generateEllers(this.width, this.height);
    this.end = {
      x: Math.round(Math.random() * (this.width - 1)),
      y: Math.round(Math.random() * (this.height - 1)),
    };
    for (let i = 0; i < Math.round((this.height * this.width) / 200); i++) {
      this.phazors.push([
        Math.round(Math.random() * (this.width - 1)),
        Math.round(Math.random() * (this.height - 1)),
      ]);
    }
  }

  update() {}
  draw() {
    let pen = {
      x: LINE_WIDTH + OFFSET.x,
      y: LINE_WIDTH + OFFSET.y,
    };
    ctx.fillStyle = "red";
    ctx.fillRect(
      (this.end.x + 1) * LINE_WIDTH + this.end.x * CELL_WIDTH + OFFSET.x,
      (this.end.y + 1) * LINE_WIDTH + this.end.y * CELL_WIDTH + OFFSET.y,
      CELL_WIDTH,
      CELL_WIDTH
    );
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

const animate = () => {
  entities.forEach((entity) => {
    entity.update();
  });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  entities.forEach((entity) => {
    entity.draw();
  });
  if (RUNNING) {
    requestAnimationFrame(animate);
  }
};

button.addEventListener("click", () => {
  button.style.visibility = "hidden";
  animate();
});

let showMenu = () => {
  menu.style.visibility = "visible";
};
menu.addEventListener("click", () => {
  OFFSET = { x: 0, y: 0 };
  entities = [
    new Player(),
    new Maze(
      Math.round(entities[1].width * 10),
      Math.round(entities[1].height * 10)
    ),
  ];
  menu.style.visibility = "hidden";
  RUNNING = true;
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
