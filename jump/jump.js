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

    let numberOfRocks = randomIntFromRange(1, 4)

    for (let i = 0; i < numberOfRocks; i++) {
        // rocks fall from the right half of the screen
        var x = randomIntFromRange(canvas.width * 3 / 4, canvas.width);
        // rocks fall from the top half of the screen
        var y = -20; //randomIntFromRange(0, canvas.height / 2);
        var dx = randomIntFromRange(-8, -15);
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
let swanY = canvas.height / 6;
let swanX = canvas.width / 8;

function DrawTallHitBox() {
    this.x = swanX + 80 * scale;
    this.y = swanY + 50 * scale;
    this.width = width * scale / 6;
    this.height = height * scale / 2.5;
    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'blue'
        ctx.stroke();
    }
    this.update = function () {
        this.draw();
    }
}

function DrawLongHitBox() {
    this.x = swanX + 40 * scale;
    this.y = swanY + 85 * scale;
    this.width = width * scale / 2.5
    this.height = height * scale / 5
    this.draw = function () {

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'red'
        ctx.stroke();
    }
}



function step() {
    gameCount += 1;
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
        console.log("swanY", swanY)
        if (swanY < -50) {} else {
            swanY -= movementSpeed;
        }
    } else if (keyPresses.s) {
        console.log("swanY", swanY)
        if (swanY > 125) {} else {
            swanY += movementSpeed
        }
    }

    drawFrame(cycleLoop[currentLoopIndex], 0, swanX, swanY);
    // commented out to stop swan flapping
    // currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    tallHitBox = new DrawTallHitBox()
    tallHitBox.draw();
    // animateRocks();

    longHitBox = new DrawLongHitBox();
    longHitBox.draw();

    ctx.font = "20px Arial"
    ctx.fillText(Math.floor(gameCount / 5), 10, 30)
    window.requestAnimationFrame(step);
}

function gameOver() {
    alert("hi")
}

window.addEventListener('mousemove', () => {
    getMousePosition(canvas, event)
})

let mouseX;
let mouseY;

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    // console.log("Coordinate y: " + mouseY, swanY);
    // console.log(tallHitBox.y)

    detectCollisions()
}

function detectCollisions() {
    if (mouseX > tallHitBox.x && mouseX < tallHitBox.x + tallHitBox.width && mouseY > tallHitBox.y && mouseY < tallHitBox.y + tallHitBox.height) {
        console.log("HIT THE TALL HIT BOX")
    }
    if (mouseX > longHitBox.x && mouseX < longHitBox.x + longHitBox.width && mouseY > longHitBox.y && mouseY < longHitBox.y + longHitBox.height) {
        console.log("HIT THE LONG HIT BOX")
    }
}