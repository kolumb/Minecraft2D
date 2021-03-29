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
let currentChunk;
let playerCoord;
const playerHalfWidth = 4 / 2;
const gravity = 1;

updateSize();

const chunkSize = new Vector(64, 64)
const chunks = [new Chunk(0, new Vector(), chunkSize)];
const player = new Vector(width / 2, cellSize * chunkSize.y / 2-0.001);
playerCoord = player.shrink(cellSize).floor();
currentChunk = mod(Math.floor(playerCoord.x / chunkSize.x), Chunk.capacity);
playerCoord.x %= chunkSize.x;
for (let y = 0; y < chunkSize.y; y++) {
    const isWall = chunks[currentChunk].map[y][mod(playerCoord.x, chunkSize.x)];
    if (isWall) {
        player.y = y * cellSize - 1.001;
        break;
    }
}
const camera = player.sub(centerOfScreen);

frame(0);
