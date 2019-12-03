console.log('pangolin rollin');

// INITIALISING IMAGES 
let img = new Image();
img.src = 'swan.png';
let bg = new Image();
bg.src = 'dark-bg.png';
let rock = new Image();
rock.src = 'blackrock.png';

img.onload = function () {
    window.requestAnimationFrame(step);
};

// Utility functions
let gravity = 0.1;
let friction = 0.1;
let gameCount = 0;
let movementSpeed = 5;

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/////////////////////

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 10;
canvas.height = 250;
let ctx = canvas.getContext('2d');

// DRAWING SWAN
let scale = 1;
let width = 162;
let height = 150;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

const cycleLoop = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let currentLoopIndex = 0;
let frameCount = 0;



function Background() {
    this.x = 0;
    this.y = 0;
    this.speed = 10;
    this.render = function () {
        ctx.drawImage(bg, 1040, 0, 1315, 250, (this.x -= this.speed), 0, 1325, canvas.height);
        // 625px is where the background repeats
        if (this.x <= -1320) {
            this.x = canvas.width;
        }
    };
}
var background = new Background();

function Rock(x, y, dx, dy) {
    this.img = rock;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = 32;
    this.height = 27;

    this.update = function () {
        this.dy += gravity;
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };

    this.draw = function () {
        ctx.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    };
}
var rockArray = [];

function createRocks() {
    rockArray = [];
    console.log('rockArray', rockArray);

    let numberOfRocks = randomIntFromRange(1, 7)

    for (let i = 0; i < numberOfRocks; i++) {
        // rocks fall from the right half of the screen
        var x = randomIntFromRange(canvas.width * 3 / 4, canvas.width);
        // rocks fall from the top half of the screen
        var y = -20; //randomIntFromRange(0, canvas.height / 2);
        var dx = randomIntFromRange(-8, -20);
        var dy = randomIntFromRange(0, 8);
        rockArray.push(new Rock(x, y, dx, dy));
    }
    // dwayne.draw();
    // console.log('Drawing dwayne the rock');
}

function animateRocks() {
    for (let i = 0; i < rockArray.length; i++) {
        rockArray[i].update();
    }
}

let keyPresses = {};

window.addEventListener('keydown', keyDownListener, false);

function keyDownListener(event) {
    keyPresses[event.key] = true;
}
window.addEventListener('keyup', keyUpListener, false);

function keyUpListener(event) {
    keyPresses[event.key] = false;
}

// draws the swan
function drawFrame(frameX, frameY, canvasX, canvasY) {
    this.x = 0;
    ctx.drawImage(
        img,
        frameX * width,
        frameY * height,
        width,
        height,
        canvas.width / 8,
        canvasY,
        scaledWidth,
        scaledHeight
    );
    // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}
let swanY = canvas.height / 2;
let swanX = canvas.width / 2;

function step() {
    gameCount += 1;
    console.log(gameCount)
    frameCount++;
    if (frameCount < 2) {
        window.requestAnimationFrame(step);
        return;
    }

    if (gameCount % 120 == 0) {
        createRocks();
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.render();

    // swanY += gravity;
    // click to make swan move up
    if (keyPresses.w) {
        if (swanY < 0 - height / 3) {
            console.log("k")
        } else {
            swanY -= movementSpeed;
        }
    } else if (keyPresses.s) {
        if (swanY > canvas.height - height) {
            console.log("w")
        } else {
            swanY += movementSpeed
        }
    }

    drawFrame(cycleLoop[currentLoopIndex], 0, swanX, swanY);
    // commented out to stop swan flapping
    // currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }

    animateRocks();

    ctx.font = "20px Arial"
    ctx.fillText(Math.floor(gameCount / 5), 10, 30)
    window.requestAnimationFrame(step);
}

function gameOver() {
    alert("hi")
}

window.addEventListener('mousemove', getMousePosition)

let mouseX;
let mouseY;

function getMousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY
}