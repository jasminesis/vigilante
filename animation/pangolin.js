let img = new Image();
img.src = 'pangolins.png';
img.onload = function () {
    window.requestAnimationFrame(gameLoop);
};
console.log("meow")

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight / 2;
let ctx = canvas.getContext('2d');


const scale = 1;
const width = 147;
const height = 140;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const gravity = 0.05;
const gravitySpeed = 0;


function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
        frameX * width, frameY * height + 120, width, height,
        canvasX, canvasY, scaledWidth, scaledHeight);
    // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}



const CYCLE_LOOP = [0, 1, 2, 1];
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = 0;

// function step() {
//     frameCount++;
//     if (frameCount < 15) {
//         window.requestAnimationFrame(step);
//         return;
//     }
//     frameCount = 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
//     currentLoopIndex++;
//     if (currentLoopIndex >= cycleLoop.length) {
//         currentLoopIndex = 0;
//     }
//     window.requestAnimationFrame(step);
// }

let keyPresses = {};

window.addEventListener('keydown', keyDownListener, false)

function keyDownListener(event) {
    keyPresses[event.key] = true;
}
window.addEventListener('keyup', keyUpListener, false)

function keyUpListener(event) {
    keyPresses[event.key] = false;
}

const MOVEMENT_SPEED = 5;
let positionX = 0;
let positionY = 0;

let frameLimit = 15;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let hasMoved = false;

    if (keyPresses.w) {
        moveCharacter(0, -MOVEMENT_SPEED, 0);
        hasMoved = true;
    } else if (keyPresses.s) {
        moveCharacter(0, MOVEMENT_SPEED, 0);
        hasMoved = true;
    }
    if (keyPresses.a) {
        moveCharacter(-MOVEMENT_SPEED, 0, 0);
        hasMoved = true;
    } else if (keyPresses.d) {
        moveCharacter(MOVEMENT_SPEED, 0, 0);
        hasMoved = true;
    }
    if (hasMoved) {
        frameCount++;
        if (frameCount >= frameLimit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= CYCLE_LOOP.length) {
                currentLoopIndex = 0;
            }
        }
    } else {
        currentLoopIndex = 0;
    }

    // drawFrame(0, 0, positionX, positionY);
    drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
    ctx.font = "20px Helvetica"
    ctx.fillStyle = "white"
    ctx.fillText("Hello Pangolin", positionX, positionY)

    window.requestAnimationFrame(gameLoop); // drawFrame(0, 0, 0, 0);
    // drawFrame(1, 0, scaledWidth, 0);
    // drawFrame(0, 0, scaledWidth * 2, 0);
    // drawFrame(2, 0, scaledWidth * 3, 0);

}

function moveCharacter(deltaX, deltaY, direction) {
    gravitySpeed == gravity;
    if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {
        positionX += deltaX;
    }
    if (positionY + deltaY > 0 && positionY + scaledHeight + deltaY < canvas.height) {
        positionY += deltaY + gravitySpeed;
    }
    currentDirection = direction;
}