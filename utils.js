"use strict";
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function clamp(n, limit) {
    let lim = Math.abs(limit);
    if (n < 0) {
        if (Math.abs(n) > lim) {
            return -lim;
        }
    } else {
        if (Math.abs(n) > lim) {
            return lim;
        }
    }
    return n;
}

const distPointToLine = (p, l1, l2) =>
    Math.abs((l2.x - l1.x) * (l1.y - p.y) - (l1.x - p.x) * (l2.y - l1.y))
    / Math.sqrt((l2.x - l1.x)**2 + (l2.y - l1.y)**2);

const determinant = (p, l1, l2) => (l2.x - l1.x) * (p.y - l1.y) - (l2.y - l1.y) * (p.x - l1.x)

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function getNoise(pos, amplitude) {
    return amplitude * noise.simplex2(pos.x, pos.y);
}
