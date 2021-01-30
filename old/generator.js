class Cell {
    constructor(set) {
        this.walls = [true, true, true, true];
        this.set = set;
    }
}
const createEmtpyRow = (width) => {
    let row = [];
    for (let x = 0; x < width; x++) {
        row.push(new Cell(-1));
    }
    return row;
};
const generateEllers = (width, height) => {
    console.log("GENERATE");
    let setIndex = 0;
    let sets = [];
    let maze = [];
    let row = [];
    for (let x = 0; x < width; x++) {
        row.push(new Cell(setIndex));
        setIndex += 1;
    }
    for (let y = 0; y < height; y++) {
        for (let x = 1; x < width; x++) {
            if (Math.random() < 0.5) {
                row[x].set = row[x - 1].set;
                row[x].walls[3] = false;
                row[x - 1].walls[1] = false;
            }
        }
        row.forEach((cell) => {
            if (!(cell.set in sets)) {
                sets.push(cell.set);
            }
        });
        let nextRow = createEmtpyRow(width);
        if (y == height) {
            sets = [];
        }
        while (sets.length != 0) {
            for (let x = 0; x < width; x++) {
                if (Math.random() < 0.6) {
                    if (row[x].set in sets || Math.random() < 0.3) {
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
    console.log(maze);
};
export { generateEllers };
