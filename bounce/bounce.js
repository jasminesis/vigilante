console.log('rocks falling from the sky!');

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
let ctx = canvas.getContext('2d');

let rock = new Image();
rock.src = 'blackrock.png';
rock.onload = function() {
	init();
	animate();
};

var gravity = 0.1;
var friction = 0.98;

function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function Rock(x, y, dx, dy) {
	this.img = rock;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.width = 32;
	this.height = 27;

	this.update = function() {
		if (this.y + this.height / 2 + this.dy > canvas.height) {
			// this.dy = -this.dy; //makes rocks bounce back up
			this.dy = this.dy * friction;
			this.dx = this.dx * friction;
		} else {
			this.dy += gravity;
		}
		if (this.x > canvas.width || this.x < canvas.width) {
			this.dx = -this.dx * friction;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	};

	this.draw = function() {
		ctx.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
	};
}

// var dwayne = new Rock(0, canvas.height / 2, 1, 2);

var rockArray = [];

function init() {
	rockArray = [];
	console.log('rockArray', rockArray);
	for (let i = 0; i < 15; i++) {
		var x = randomIntFromRange(0, canvas.width);
		var y = randomIntFromRange(0, canvas.height);
		var dx = randomIntFromRange(-3, 3);
		var dy = randomIntFromRange(-2, 2);
		rockArray.push(new Rock(x, y, dx, dy));
	}
	// dwayne.draw();
	// console.log('Drawing dwayne the rock');
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// dwayne.update();
	// dwayne.y++;
	for (let i = 0; i < rockArray.length; i++) {
		rockArray[i].update();
	}
	requestAnimationFrame(animate);
}
