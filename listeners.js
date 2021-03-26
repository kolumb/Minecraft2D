"use strict";
const updateSize = () => {
    width = innerWidth;
    height = innerHeight;
    canvas.height = height;
    canvas.width = width;
    lesser = width < height ? width : height;
    bigger = width > height ? width : height;
};
const resizeHandler = () => {
    updateSize();
    if (pause) render();
}
window.addEventListener("resize", resizeHandler);

const pointerdownHandler = function(e) {
    Input.pointer.set(e.offsetX, e.offsetY);
    Input.downState = true;
};
Canvas.addEventListener("pointerdown", pointerdownHandler);

const pointermoveHandler = function(e) {
    Input.pointer.set(e.offsetX, e.offsetY);
};
Canvas.addEventListener("pointermove", pointermoveHandler);

const pointerupHandler = function(e) {
    Input.pointer.set(e.offsetX, e.offsetY);
    Input.downState = false;
};
window.addEventListener("pointerup", pointerupHandler);

const keydownHandler = function(e) {
    switch (e.code) {
        case "Space":
            if (e.target.tagName === "BUTTON") return;
        case "KeyP":
            pause = !pause;
            if (pause === false) {
                frame();
            }
            break;
        case "ArrowUp":
        case "KeyW":
            Input.up = true;
            break;
        case "ArrowDown":
        case "KeyS":
            Input.down = true;
            break;
        case "ArrowLeft":
        case "KeyA":
            Input.left = true;
            break;
        case "ArrowRight":
        case "KeyD":
            Input.right = true;
            break;
    }
};
window.addEventListener("keydown", keydownHandler);

const keyupHandler = function(e) {
    switch (e.code) {
        case "ArrowUp":
        case "KeyW":
            Input.up = false;
            break;
        case "ArrowDown":
        case "KeyS":
            Input.down = false;
            break;
        case "ArrowLeft":
        case "KeyA":
            Input.left = false;
            break;
        case "ArrowRight":
        case "KeyD":
            Input.right = false;
            break;
    }
};
window.addEventListener("keyup", keyupHandler);
