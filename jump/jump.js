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
let currentDirection = 0;

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
    for (let i = 0; i < 5; i++) {
        // rocks fall from the right half of the screen
        var x = randomIntFromRange(canvas.width / 2, canvas.width);
        // rocks fall from the top half of the screen
        var y = randomIntFromRange(0, canvas.height / 2);
        var dx = randomIntFromRange(-5, -20);
        var dy = randomIntFromRange(0, 8);
        rockArray.push(new Rock(x, y, dx, dy));
    }
    // dwayne.draw();
    // console.log('Drawing dwayne the rock');
}
createRocks();

function animateRocks() {
    for (let i = 0; i < rockArray.length; i++) {
        rockArray[i].update();
    }
}


var controller = {

    active: false,
    state: false,

    onOff: function (event) {
        // The Event interface's preventDefault() method tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
        event.preventDefault();

        let key_state = (event.type == "mousedown" || event.type == "touchstart") ? true : false;

        // when mouse is clicked, the key_state becomes true, so controller state becomes true

        if (controller.state != key_state) controller.active = key_state;
        controller.state = key_state;
    }
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

function step() {
    // gameCount += 0.1;
    // console.log(gameCount)
    frameCount++;
    if (frameCount < 2) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // background.render();

    // click to make swan move up
    if (controller.active) {
        swanY -= 50;
        console.log("tapped")
        controller.active = false;
        controller.state = false;

    }

    drawFrame(cycleLoop[currentLoopIndex], 0, 0, swanY);
    // commented out to stop swan flapping
    // currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    animateRocks();
    window.requestAnimationFrame(step);
}

window.addEventListener("mousedown", controller.onOff);