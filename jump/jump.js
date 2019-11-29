console.log("pangolin rollin")
let img = new Image();
img.src = 'swan.png';
let bg = new Image();
bg.src = 'bg.png'
img.onload = function () {
    window.requestAnimationFrame(step);

}


let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 100;
let ctx = canvas.getContext('2d');

let scale = 1;
let width = 162;
let height = 150;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

const cycleLoop = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = 0;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(bg, 0, 0, 600, 600, 0, 0, 600, 600)
    ctx.drawImage(img,
        frameX * width, frameY * height, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
    // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

function step() {
    frameCount++;
    if (frameCount < 3) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    window.requestAnimationFrame(step);
}