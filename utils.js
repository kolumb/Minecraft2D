"use strict";
const mod = (n, modulus) => (n % modulus + modulus) % modulus;

function range(start, end) {
    console.assert(start <= end, `Range start smaller than range end. (${start} < ${end})`)
    return Array.from(new Array(end - start + 1), (_, i) => start + i);
}

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

const determinant = (p, l1, l2) => (l2.x - l1.x) * (p.y - l1.y) - (l2.y - l1.y) * (p.x - l1.x);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

const getNoise = (pos, amplitude) => amplitude * noise.simplex2(pos.x, pos.y);
