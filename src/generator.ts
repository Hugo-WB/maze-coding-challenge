class Cell {
  walls = [true, true, true, true];
  set: number;
  constructor(set: number) {
    this.set = set;
  }
}
const createEmtpyRow = (width: number): Cell[] => {
  let row: Cell[] = [];
  for (let x = 0; x < width; x++) {
    row.push(new Cell(-1));
  }
  return row;
};
const generateEllers = (width: number, height: number): Cell[][] => {
  let setIndex = 0;
  let sets: number[] = [];
  let maze = [];
  let row: Cell[] = [];
  for (let x = 0; x < width; x++) {
    row.push(new Cell(setIndex));
    setIndex += 1;
  }
  for (let y = 0; y < height; y++) {
    if (y == height - 1) {
      for (let x = 1; x < width; x++) {
        if (row[x].set != row[x - 1].set) {
          row[x].walls[3] = false;
          row[x - 1].walls[1] = false;
        }
      }
      maze.push(row);
      break;
    }
    for (let x = 1; x < width; x++) {
      if (Math.random() < 0.5) {
        row[x].set = row[x - 1].set;
        row[x].walls[3] = false;
        row[x - 1].walls[1] = false;
      }
    }
    row.forEach((cell) => {
      if (!sets.includes(cell.set)) {
        sets.push(cell.set);
      }
    });

    let nextRow: Cell[] = createEmtpyRow(width);
    if (y == height) {
      sets = [];
    }

    while (sets.length > 0) {
      for (let x = 0; x < width; x++) {
        if (sets.includes(row[x].set)) {
          if (Math.random() < 0.3) {
            row[x].walls[2] = false;
            nextRow[x].walls[0] = false;
            nextRow[x].set = row[x].set;
            sets.splice(sets.indexOf(row[x].set), 1);
          }
        }
      }
    }
    nextRow = nextRow.map((cell) => {
      if (cell.set == -1) {
        setIndex += 1;
        cell.set = setIndex;
      }
      return cell;
    });

    maze.push(row);
    row = nextRow;
  }
  return maze;
};

export { generateEllers, Cell };
