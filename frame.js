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
}
function render() {
    ctx.fillStyle = pause ? "rgb(200,200,200)" : "rgb(240,240,240)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#463";
    const x = player.x-5 - camera.x;
    const y = player.y-5 - camera.y;
    ctx.fillRect(x, y, 10, 10);
    ctx.fillRect(10 - camera.x, 100 - camera.y, 10, 10);
    ctx.fillRect(100 - camera.x, 200 - camera.y, 10, 10);
}

function frame(timestamp) {
    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (dt < 1000) tick(dt * 0.06);
    render();
    if (pause === false) {
        requestAnimationFrame(frame);
    }
}
