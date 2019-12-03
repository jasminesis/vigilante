let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function () {
        this.draw()
    }
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

let circle1 = new Circle(canvas.width / 2, canvas.height / 2, 60, 'pink');
circle1.draw();

let mouseX, mouseY;

function getMousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY
    // console.log(getDistance(circle1.x, circle1.y, mouseX, mouseY))
    if (getDistance(circle1.x, circle1.y, mouseX, mouseY) < circle1.radius) {
        circle1.color = 'red'
        circle1.draw();
    } else {
        circle1.color = 'pink';
        circle1.draw()
    }

    // if mouse touches the bee, console.log("BZZ")
    if (mouseX < canvas.width / 2) {
        console.log("BZZZZ")
        dee.scale >= 2 ? dee.scale = 2 : dee.scale += 0.01
    } else {
        dee.scale -= 0.01;
    }
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

////////////////// bee ////////////////////////////////
let bee = new Image();
bee.src = 'bee.png'

let dee;
bee.onload = function () {
    // dee = new Bee(40, 40);
    // runAnimation()
}

function Bee() {
    this.scale = 1;
    this.width = 26;
    this.height = 24;

    this.draw = function (x, y) {
        ctx.drawImage(bee, 0, 0, this.width, this.height, x, y, this.width * this.scale, this.height * this.scale)
    }
    this.update = function (x, y) {
        this.draw(x - 26, y - 24);

    }
}
////////////////////////////////////////////////
let swan = new Image();
swan.src = 'swan.png'
let jupiter;
swan.onload = function () {
    jupiter = new Swan(40, 40);
}

function Swan() {
    this.width = 162;
    this.height = 150;
    this.scale = 1;
    this.draw = function () {
        ctx.drawImage(swan, 0, 0, this.width, this.height, x, y, this.width * this.scale, this.height * this.scale)
    }
    this.update = function () {
        this.draw()
    }
}


function runAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dee.update(mouseX, mouseY);
    requestAnimationFrame(runAnimation)
}

window.addEventListener('mousemove', getMousePosition)