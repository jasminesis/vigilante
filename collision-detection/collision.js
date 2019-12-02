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

window.addEventListener('mousemove', getMousePosition)

function getMousePosition(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY
    // console.log(getDistance(circle1.x, circle1.y, mouseX, mouseY))
    if (getDistance(circle1.x, circle1.y, mouseX, mouseY) < circle1.radius) {
        circle1.color = 'red'
        circle1.draw();
    } else {
        circle1.color = 'pink';
        circle1.draw()
    }
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}