"use strict";
const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d", { alpha: false });
let width, height, lesser, bigger;
let pause = true;
let lastFrameTime = 0;

updateSize();

frame();
