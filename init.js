"use strict";
const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d", { alpha: false });
let width, height, lesser, bigger;
let pause = true;
let lastFrameTime = 0;
const centerOfScreen = new Vector();
const cellSize = 20;
noise.seed(Math.random());

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
        chunk.map[y][x] = 0.0 < noise.simplex2(x*0.15, y*0.15) * noise.simplex2(x*0.01 + 100, y*0.01) + y / chunk.size.y / 0.4 - 1.5;
    }
}

frame();
