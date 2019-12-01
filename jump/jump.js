console.log('pangolin rollin');
let img = new Image();
img.src = 'swan.png';
let bg = new Image();
bg.src = 'bg-2.png';
let rock = new Image();
rock.src = 'blackrock.png';
img.onload = function() {
	window.requestAnimationFrame(step);
};

// Utility functions
var gravity = 0.1;

// friction has to be a fraction so that is lowers the speed in general
// higher friction means more bounce because less speed is being "rubbed off"
var friction = 0.1;

function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
/////////////////////

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 10;
canvas.height = 500;
let ctx = canvas.getContext('2d');

let scale = 1;
let width = 162;
let height = 150;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

const cycleLoop = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = 0;

function Background() {
	this.x = 0;
	this.y = 0;
	this.speed = 8;
	this.render = function() {
		ctx.drawImage(bg, 0, 260, 4080, 250, (this.x -= this.speed), 0, 4080, 250);
		// 625px is where the background repeats
		if (this.x <= -625) {
			this.x = 0;
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

	this.update = function() {
		this.dy += gravity;
		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	};

	this.draw = function() {
		ctx.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	};
}
var rockArray = [];

function createRocks() {
	rockArray = [];
	console.log('rockArray', rockArray);
	for (let i = 0; i < 12; i++) {
		var x = randomIntFromRange(0, canvas.width);
		// rocks fall from the top half of the screen
		var y = randomIntFromRange(0, canvas.height / 2);
		var dx = randomIntFromRange(0, 0);
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
function drawFrame(frameX, frameY, canvasX, canvasY) {
	// background.render();
	this.x = 0;
	ctx.drawImage(
		img,
		frameX * width,
		frameY * height,
		width,
		height,
		canvas.width / 8,
		canvasY + 50,
		scaledWidth,
		scaledHeight
	);
	// void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

function step() {
	frameCount++;
	if (frameCount < 2) {
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
	animateRocks();
	window.requestAnimationFrame(step);
}
