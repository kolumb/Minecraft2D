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
const chunks = []
chunks.push(new Chunk(new Vector(0, 0), new Vector( Math.ceil(width / cellSize), Math.ceil(height / cellSize))));
chunks.push(new Chunk(new Vector(Math.floor(Math.ceil(width / cellSize) * cellSize), 0), new Vector( Math.ceil(width / cellSize), Math.ceil(height / cellSize))));
chunks.push(new Chunk(new Vector(Math.floor(Math.ceil(width / cellSize) * cellSize * 2), 0), new Vector( Math.ceil(width / cellSize), Math.ceil(height / cellSize))));



frame();
