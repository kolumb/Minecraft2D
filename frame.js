"use strict";
function tick(dt) {
    if (Input.right) {
        player.addMut(new Vector(10 * dt, 0));
    }
    if (Input.left) {
        player.addMut(new Vector(-10 * dt, 0));
    }
    const distFromCameraToPlayer = player.sub(camera.add(centerOfScreen));
    const cameraSpring = 0.05;
    camera.addMut(distFromCameraToPlayer.scale(cameraSpring * dt));
    leftChunkIndex = Math.floor(camera.x / chunkSize.x / cellSize);
    rightChunkIndex = Math.floor((camera.x + width) / chunkSize.x / cellSize);
    range(leftChunkIndex, rightChunkIndex).forEach(i => {
        const index = mod(i, Chunk.capacity);
        if (!chunks[index] || chunks[index].id !== i) {
            chunks[index] = new Chunk(i, new Vector(chunkSize.x * cellSize * i, 0), chunkSize)
        }
    })
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
