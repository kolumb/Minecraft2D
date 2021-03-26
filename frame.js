"use strict";
function tick(dt) {}
function render() {
    ctx.fillStyle = pause ? "rgb(200,200,200)" : "rgb(240,240,240)";
    ctx.fillRect(0, 0, width, height);
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
