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
    ctx.fillStyle = "#463";
    const x = player.x-5 - camera.x;
    const y = player.y-5 - camera.y;
    ctx.fillRect(x, y, 10, 10);
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
