"use strict";
const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d", { alpha: false });
let width, height, lesser, bigger;
let pause = false;
let lastFrameTime = 0;
const centerOfScreen = new Vector();
const cellSize = 20;

updateSize();

const camera = centerOfScreen.copy().scale(0);
const player = new Vector(width / 2, height / 2);
const chunk =
    { size: new Vector( Math.ceil(width / cellSize), Math.ceil(height / cellSize))
    , map: []
    }

for (let y = 0; y < chunk.size.y; y++) {
    chunk.map[y] = [];
    for (let x = 0; x < chunk.size.x; x++) {
        chunk.map[y][x] = Math.random() < 0.5;
    }
}

frame();
