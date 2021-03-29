"use strict";
function tick(dt) {
    if (Input.right) {
        player.addMut(new Vector(10 * dt, 0));
    }
    if (Input.left) {
        player.addMut(new Vector(-10 * dt, 0));
    }
    player.y += gravity;
    const distFromCameraToPlayer = player.sub(camera.add(centerOfScreen));
    const cameraSpring = 0.05;
    camera.addMut(distFromCameraToPlayer.scale(cameraSpring * dt));
    leftChunkIndex = Math.floor(camera.x / chunkSize.x / cellSize);
    rightChunkIndex = Math.floor((camera.x + width) / chunkSize.x / cellSize);
    range(leftChunkIndex, rightChunkIndex).forEach(i => {
        const index = mod(i, Chunk.capacity);
        if (!chunks[index] || chunks[index].id !== i) {
            chunks[index] = new Chunk(i, new Vector(chunkSize.x * cellSize * i, 0), chunkSize);
        }
    })
    const pixelSize = cellSize * 1.8 / 32;
    playerCoord = player.add(new Vector(0, -playerHalfWidth * pixelSize)).shrink(cellSize).floor();
    currentChunk = mod(Math.floor(playerCoord.x / chunkSize.x), Chunk.capacity);
    playerCoord.x %= chunkSize.x;
    const bottomBlock = new Vector(mod(playerCoord.x, chunkSize.x) + 1, playerCoord.y + 1);
    playerCoord = player.add(new Vector(0, -16 * pixelSize)).shrink(cellSize).floor();
    playerCoord.x %= chunkSize.x;
    playerCoord = player.add(new Vector(0, -(32 - playerHalfWidth) * pixelSize)).shrink(cellSize).floor();
    playerCoord.x %= chunkSize.x;
    const topBlock = new Vector(mod(playerCoord.x, chunkSize.x) - 1, playerCoord.y - 1);
    for (let y = topBlock.y; y <= bottomBlock.y; y++) {
        for (let x = topBlock.x; x <= bottomBlock.x; x++) {
            if (y < 0 || y >= chunkSize.y) continue;
            let fixChunk = 0;
            if (x < 0) {
                fixChunk = -1;
            } else if (x >= chunkSize.x) {
                fixChunk = 1;
            }
            chunks[mod(currentChunk + fixChunk, Chunk.capacity)].map[y][mod(x, chunkSize.x)] = false;
        }
    }

}
function render() {
    ctx.fillStyle = pause ? "rgb(200,200,200)" : "rgb(240,240,240)";
    ctx.fillRect(0, 0, width, height);
    range(leftChunkIndex, rightChunkIndex).forEach(i => chunks[mod(i, Chunk.capacity)].draw());
    const x = player.x - camera.x;
    const y = player.y - camera.y;
    const px = cellSize * 1.8 / 32;
    ctx.fillStyle = "#6b6b6b"; // feet
    ctx.fillRect(x - 2*px, y - 2*px, 4*px, 2*px);
    ctx.fillStyle = "#463aa5"; // pants
    ctx.fillRect(x - 2*px, y - 12*px, 4*px, 10*px);
    ctx.fillStyle = "#b58b6f"; // hands
    ctx.fillRect(x - 2*px, y - 20*px, 4*px, 8*px);
    ctx.fillStyle = "#00bdbd"; // shirt
    ctx.fillRect(x - 2*px, y - 24*px, 4*px, 4*px);
    ctx.fillStyle = "#b87b63"; // face
    ctx.fillRect(x - 4*px, y - 28*px, 8*px, 4*px);
    ctx.fillStyle = "#281c0d"; // hair
    ctx.fillRect(x - 4*px, y - 32*px, 8*px, 4*px);
    new Vector(0, -28 * cellSize * 1.8 / 32).drawFrom(player.sub(camera));
}

function frame(timestamp) {
    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (dt < 1000) tick(dt * 60 / 1000);
    render();
    if (pause === false) {
        requestAnimationFrame(frame);
    }
}
