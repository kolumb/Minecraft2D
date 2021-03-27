"use strict";
const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d", { alpha: false });
let width, height, lesser, bigger;
let pause = true;
let lastFrameTime = 0;
const centerOfScreen = new Vector();
const cellSize = 20;
noise.seed(Math.random());
let leftChunkIndex;
let rightChunkIndex;

updateSize();

const chunks = [];
const chunkSize = new Vector(64, 64)
const player = new Vector(width / 2, cellSize * chunkSize.y / 2);
const camera = player.sub(centerOfScreen);

frame(0);
