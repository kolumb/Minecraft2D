"use strict";
function tick(dt) {
    playerVel.x *= 0.9;
    if (Input.right) {
        if (playerVel.x < 10) {
            playerVel.x = clamp(playerVel.x + 1 * dt, 10);
        }
    }
    if (Input.left) {
        if (playerVel.x > -10) {
            playerVel.x = clamp(playerVel.x - 1 * dt, -10);
        }
    }
    if (Input.up) {
        playerVel.y -= 0.1 * dt;
    }
    if (Input.down) {
        playerVel.y += 0.1 * dt;
    }
    // playerVel.y += gravity * dt * 0.01;
    player.addMut(playerVel);
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
    playerCoord = player.shrink(cellSize).floor();
    currentChunk = mod(Math.floor(playerCoord.x / chunkSize.x), Chunk.capacity);
    playerCoord.x %= chunkSize.x;
    let playerLeft = player.x - playerHalfWidth;
    let playerRight = player.x + playerHalfWidth;
    let playerBottom = player.y;
    let playerTop = player.y - 1.8 * cellSize;

    const bottomBlock = new Vector(mod(playerCoord.x, chunkSize.x) + 1, playerCoord.y + 1);
    const topBlock = new Vector(mod(playerCoord.x, chunkSize.x) - 1, playerCoord.y - 3);
    const candidatesForFixX = [];
    const candidatesForFixY = [];
    for (let y = topBlock.y; y <= bottomBlock.y; y++) {
        for (let x = topBlock.x; x <= bottomBlock.x; x++) {
            if (y < 0 || y >= chunkSize.y) continue;
            let fixChunk = 0;
            if (x < 0) {
                fixChunk = -1;
            } else if (x >= chunkSize.x) {
                fixChunk = 1;
            }
            const chunk = currentChunk + fixChunk;
            if (chunks[mod(chunk, Chunk.capacity)].map[y][mod(x, chunkSize.x)]) {
                let blockLeft = (chunk * chunkSize.x + x) * cellSize;
                let blockRight = (chunk * chunkSize.x + x + 1) * cellSize;
                let blockTop = y * cellSize;
                let blockBottom = (y + 1) * cellSize;
                if (blockLeft < playerRight && blockRight > playerLeft && blockTop < playerBottom && blockBottom > playerTop) {
                    if (playerVel.x < 0 && !chunks[mod(chunk, Chunk.capacity)].map[y][mod(x + 1, chunkSize.x)]) {
                        candidatesForFixX.push(blockRight + playerHalfWidth - player.x);
                    }
                    if (playerVel.x > 0 && !chunks[mod(chunk, Chunk.capacity)].map[y][mod(x - 1, chunkSize.x)]) {
                        candidatesForFixX.push(blockLeft - playerHalfWidth - player.x);
                    }
                    if (playerVel.y < 0 && !chunks[mod(chunk, Chunk.capacity)].map[y + 1][mod(x, chunkSize.x)]) {
                        candidatesForFixY.push(blockBottom + 1.8 * cellSize - player.y);
                    }
                    if (playerVel.y > 0 && !chunks[mod(chunk, Chunk.capacity)].map[y - 1][mod(x, chunkSize.x)]) {
                        candidatesForFixY.push(blockTop - player.y);
                    }
                }
            }
        }
    }
    if (candidatesForFixX.length) {
        player.x += candidatesForFixX.reduce((min, fix) => Math.abs(fix) < Math.abs(min) ? fix : min, Infinity);
        playerVel.x = 0;
    }
    if (candidatesForFixY.length) {
        player.y += candidatesForFixY.reduce((min, fix) => Math.abs(fix) < Math.abs(min) ? fix : min, Infinity);
        playerVel.y = 0;
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
