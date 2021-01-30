"use strict";
System.register("generator", [], function (exports_1, context_1) {
    "use strict";
    var Cell, createEmtpyRow, generateEllers;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Cell = /** @class */ (function () {
                function Cell(set) {
                    this.walls = [true, true, true, true];
                    this.set = set;
                }
                return Cell;
            }());
            createEmtpyRow = function (width) {
                var row = [];
                for (var x = 0; x < width; x++) {
                    row.push(new Cell(-1));
                }
                return row;
            };
            generateEllers = function (width, height) {
                console.log("GENERATE");
                var setIndex = 0;
                var sets = [];
                var maze = [];
                var row = [];
                for (var x = 0; x < width; x++) {
                    row.push(new Cell(setIndex));
                    setIndex += 1;
                }
                for (var y = 0; y < height; y++) {
                    for (var x = 1; x < width; x++) {
                        if (Math.random() < 0.5) {
                            row[x].set = row[x - 1].set;
                            row[x].walls[3] = false;
                            row[x - 1].walls[1] = false;
                        }
                    }
                    row.forEach(function (cell) {
                        if (!(cell.set in sets)) {
                            sets.push(cell.set);
                        }
                    });
                    var nextRow = createEmtpyRow(width);
                    if (y == height) {
                        sets = [];
                    }
                    while (sets.length != 0) {
                        for (var x = 0; x < width; x++) {
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
                    nextRow = nextRow.map(function (cell) {
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
            exports_1("generateEllers", generateEllers);
        }
    };
});
// import generateEllers from "./generator";
/// <reference path="./generator.ts" />
var canvas = document.getElementsByTagName("canvas")[0];
var nullAbleCTX = canvas.getContext("2d");
if (!(nullAbleCTX = canvas.getContext("2d"))) {
    throw new Error("2d context not supported");
}
var ctx = nullAbleCTX;
var gameFrame = 0;
var keys = {};
var Player = /** @class */ (function () {
    function Player() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = (0.01 * (canvas.width + canvas.height)) / 2;
        this.height = (0.01 * (canvas.width + canvas.height)) / 2;
    }
    Player.prototype.update = function () { };
    Player.prototype.draw = function () {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, 30, 30);
    };
    return Player;
}());
var Maze = /** @class */ (function () {
    function Maze() {
        this.height = 2 * Math.floor(canvas.height / 32 / 2) - 1;
        this.width = 2 * Math.floor(canvas.width / 32 / 2) - 1;
        this.maze = generateEllers(this.width, this.height);
    }
    Maze.prototype.update = function () { };
    Maze.prototype.draw = function () { };
    return Maze;
}());
var entities = [];
var animate = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(function (entity) {
        entity.update();
        entity.draw();
    });
    gameFrame += 1;
    requestAnimationFrame(animate);
};
var start = function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    entities = [new Player(), new Maze()];
    animate();
};
start();
window.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});
