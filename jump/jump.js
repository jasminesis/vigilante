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
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 10;
canvas.height = 250;
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

function Obstacle() {
	this.x = 600;
	this.y = 0;
	this.speed = 8;
	this.render = function() {
		ctx.drawImage(rock, 0, 0, 40, 40, 0, 0, 40, 40);
		// ctx.fillRect((this.x -= this.speed), 200, 150, 100);
	};
}

// ctx.drawImage(bg, 0, 0, 600, 600, 0, 0, 600, 600)
var obstacle = new Obstacle();

function drawFrame(frameX, frameY, canvasX, canvasY) {
	background.render();
	obstacle.render();
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
	window.requestAnimationFrame(step);
}
