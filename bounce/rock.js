console.log('rocks jumping from the ground!');

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;
let ctx = canvas.getContext('2d');

let rock = new Image();
rock.src = 'blackrock.png';
rock.onload = function () {
    init();
    // animate();
};

// higher gravity (0.9) makes it move and bounce faster
var gravity = 0.1;

// friction has to be a fraction so that is lowers the speed in general
// higher friction means more bounce because less speed is being "rubbed off"
var friction = 0.1;

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const MOVEMENT_SPEED = 5;

function Rock(x, y, dx, dy) {
    this.img = rock;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = 40;
    this.height = 35;
    let scale = 1;

    this.update = function () {
        // if it touches the bottom of the canvas - then bounce back up and get affected by friction
        // if (this.y + this.height / 1.2 + this.dy > canvas.height) {
        // this.dy = -this.dy; //makes rocks bounce back up
        // this.dy = this.dy * friction;
        // } else {
        // else, while it is falling, add gravity to make it fall faster
        this.dy += gravity;
        // }
        // if the x position of the rock is outside the canvas OR is inside the canvas
        // if (this.x > canvas.width || this.x < canvas.width) {
        // 	this.dx = -this.dx * friction;
        // }

        this.x += this.dx;
        this.y += this.dy;

        if (this.y > canvas.height) {
            this.y = canvas.height / 2;
            this.x = canvas.width / 2;
        }

        this.draw();
    };

    this.draw = function (frameX, frameY) {
        ctx.drawImage(
            this.img,
            frameX * this.width,
            frameY * this.height + 72,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width * scale,
            this.height * scale
        );
    };
}

const cycleLoop = [0, 1, 2, 3] //, 4, 5, 6, 7, 8, 9];
let currentLoopIndex = 0;
let frameCount = 0;

let dwayne = new Rock(canvas.width / 2, canvas.height / 2, 0, 0);

var rockArray = [];

function init() {
    rockArray = [];
    console.log('rockArray', rockArray);
    for (let i = 0; i < 12; i++) {
        var x = randomIntFromRange(0, canvas.width);
        // rocks fall from the top half of the screen
        var y = randomIntFromRange(0, canvas.height / 2);
        var dx = -5; //randomIntFromRange(-3, 3);
        var dy = randomIntFromRange(-2, 2);
        rockArray.push(new Rock(x, y, dx, dy));
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    frameCount++;
    if (frameCount < 15) {
        window.requestAnimationFrame(animate);
        return;
    }
    dwayne.draw();

    requestAnimationFrame(animate);
}