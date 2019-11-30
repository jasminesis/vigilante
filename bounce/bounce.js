console.log('Swans');

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
let ctx = canvas.getContext('2d');

function Ball(x, y, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		this.draw();
		if (this.y + this.radius > canvas.height) {
			this.dy = -this.dy;
		}
	};
	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill;
		ctx.closePath;
	};
}
var ball;
function init() {
	ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
}
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball.update();
}
init();
animate();
