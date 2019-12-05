console.log('pangolin rollin');

// INITIALISING IMAGES 
var myReq;
let alive = true;

let vulnerable = true;

let squak = new Audio('swan.m4a')
let squak2 = new Audio('swan2.m4a')
let squak3 = new Audio('swan3.m4a')
let squakArray = [squak, squak2, squak3]

let img = new Image();
img.src = 'swan.png';
let bg = new Image();
bg.src = 'dark-bg.png';
let rock = new Image();
rock.src = 'blackrock.png';

let heart = new Image();
heart.src = 'pixel-heart.png'

img.onload = function () {
    window.requestAnimationFrame(animate);
};


// Global variables
let numberOfLives = 3;
let gravity = 0.1;
let friction = 0.1;
let gameCount = 0;
let movementSpeed = 10;

// Utility functions
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

function Heart(x) {
    // console.log('creating new heart')
    this.x = x;
    this.width = 254;
    this.height = 254;
    this.scale = 0.1;
    this.render = function () {
        ctx.drawImage(heart, 0, 0, this.width, this.height, this.x, 5, this.width * this.scale, this.height * this.scale)
    }
}
var heartArray = [];

function createHearts() {
    if (heartArray.length != numberOfLives) {
        heartArray = [];
        for (let i = 0; i < numberOfLives; i++) {
            heartArray.push(new Heart(canvas.width - i * 27 - 27))
        }
    }
}

function animateHearts() {
    for (let i = 0; i < heartArray.length; i++) {
        heartArray[i].render()
    }
}


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
    this.gradient = function () {
        gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, 'rgb(46, 126, 172)');
        gradient.addColorStop(0.3, '#4F4F47');
        gradient.addColorStop(0.6, '#C5752D');
        gradient.addColorStop(0.8, '#B7490F');
        gradient.addColorStop(1, '#2F1107');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

}

// .sky-gradient-18 { background: linear-gradient(to bottom, #154277 0%,#576e71 30%,#e1c45e 70%,#b26339 100%); }
// .sky-gradient-19 { background: linear-gradient(to bottom, #163C52 0%,#4F4F47 30%,#C5752D 60%,#B7490F 80%, #2F1107 100%); }

var background = new Background();

function Rock(x, y, dx, dy) {
    this.img = rock;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = 32;
    this.height = 27;

    this.cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.currentLoopIndex = 0;

    this.update = function () {
        this.dy += gravity;
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };

    this.draw = function () {
        ctx.drawImage(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);

        ctx.beginPath();
        ctx.rect(this.x + 6, this.y + 4, this.width - 6, this.height - 10);
        ctx.strokeStyle = "transparent"
        ctx.stroke();
    };
    this.explode = function (frameX) {
        this.currentLoopIndex++;
        ctx.drawImage(this.img, frameX * 40, 72, 40, 35, this.x, this.y, 40, 35)
    }

}
var rockArray = [];
var numberOfRocks;

function createRocks() {
    rockArray = [];
    // console.log('rockArray', rockArray);
    console.log(numberOfRocks)
    if (gameCount / 3 < 200) {
        numberOfRocks = randomIntFromRange(1, 2)
    } else if (gameCount / 3 < 536) {
        numberOfRocks = randomIntFromRange(2, 4);
    } else {
        numberOfRocks = randomIntFromRange(3, 7)
    }

    for (let i = 0; i < numberOfRocks; i++) {
        var x = randomIntFromRange(canvas.width / 4, canvas.width);
        var y = -20;
        var dx = randomIntFromRange(0, -12);
        var dy = randomIntFromRange(2, 12);
        rockArray.push(new Rock(x, y, dx, dy));
    }
}

function animateRocks() {
    for (let i = 0; i < rockArray.length; i++) {
        rockArray[i].update();
    }
}

// draws the swan
function drawSwan(frameX, frameY, canvasX, canvasY) {
    if (vulnerable) {
        ctx.drawImage(
            img,
            frameX * width,
            frameY * height,
            width,
            height,
            canvasX,
            canvasY,
            scaledWidth,
            scaledHeight
        );

    } else {
        if (gameCount / 3 % 2) {
            ctx.drawImage(
                img,
                frameX * width,
                frameY * height,
                width,
                height,
                canvasX,
                canvasY,
                scaledWidth,
                scaledHeight
            );
        }
    }
    // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}
let swanY = canvas.height / 6;
let swanX = canvas.width / 11;

function DrawTallHitBox() {
    this.x = swanX + 80 * scale;
    this.y = swanY + 50 * scale;
    this.width = width * scale / 6;
    this.height = height * scale / 2.5;
    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x + 4, this.y, this.width - 5, this.height);
        ctx.strokeStyle = 'transparent'
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
        ctx.strokeStyle = 'transparent'
        ctx.stroke();
    }
}


function animate() {
    gameCount += 1;
    frameCount++;
    // checkIfDead()

    if ((gameCount / 3) % 536 == 0) {
        numberOfLives += 1;
    }

    if (frameCount < 2 && alive) {
        myReq = window.requestAnimationFrame(animate);
        return;
    }


    if (gameCount % 120 == 0) {

        createRocks();
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.render();
    moveSwan();

    drawSwan(cycleLoop[currentLoopIndex], 0, swanX, swanY);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    tallHitBox = new DrawTallHitBox()
    tallHitBox.draw();

    longHitBox = new DrawLongHitBox();
    longHitBox.draw();

    animateRocks();
    detectCollisions();

    createHearts();

    animateHearts();

    ctx.font = "20px Arial"
    ctx.fillText(String(Math.floor(gameCount / 3) + " / " + Math.floor(gameCount / 3)), 10, 30)
    if (alive) {
        window.requestAnimationFrame(animate);
    } else {

        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black"
        ctx.fill();
        ctx.font = "60px Courier New";
        ctx.fillStyle = 'white';
        ctx.textAlign = "center";

        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

    }
}

function checkIfDead() {
    if (numberOfLives == 0) {
        alive = false;
    }
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
}

function moveSwan() {
    if (keyPresses.ArrowUp) {
        if (swanY < 0 - height / 2) {} else {
            swanY -= movementSpeed;
        }
    } else if (keyPresses.ArrowDown) {
        if (swanY > canvas.height - height) {} else {
            swanY += movementSpeed
        }
    } else if (keyPresses.ArrowLeft) {
        if (swanX < 0 - width / 5) {} else {
            swanX -= movementSpeed;
        }
    } else if (keyPresses.ArrowRight) {
        if (swanX > canvas.width - width) {} else {
            swanX += movementSpeed;
        }
    }
    if (swanX > -29) {
        swanX -= 2;
    }
}

function detectCollisions() {
    // if (mouseX > tallHitBox.x && mouseX < tallHitBox.x + tallHitBox.width && mouseY > tallHitBox.y && mouseY < tallHitBox.y + tallHitBox.height) {
    //     console.log("TOUCHED THE TALL HIT BOX")
    // }
    // if (mouseX > longHitBox.x && mouseX < longHitBox.x + longHitBox.width && mouseY > longHitBox.y && mouseY < longHitBox.y + longHitBox.height) {
    //     console.log("TOUCHED THE LONG HIT BOX")
    // }

    rockArray.forEach(rock => {
        let bottom = rock.y + 4 + rock.height - 10;
        let left = rock.x + 6;
        let right = rock.x + 6 + rock.width - 6;
        let top = rock.y + 4;

        // measurements of rock hit box
        // (this.x + 6, this.y + 4, this.width - 6, this.height - 10);
        if (vulnerable) {

            if (left < tallHitBox.x + tallHitBox.width && right > tallHitBox.x && bottom > tallHitBox.y && top < tallHitBox.y + tallHitBox.height || left < longHitBox.x + longHitBox.width && right > longHitBox.x && bottom > longHitBox.y && top < longHitBox.y + longHitBox.height) {
                // rock.explode(rock.cycleLoop[currentLoopIndex]);

                numberOfLives -= 1;
                let audioRandom = randomIntFromRange(0, squakArray.length - 1)
                squakArray[audioRandom].play()
                swanY += 30;
                swanX -= 30;
                vulnerable = false;
                setTimeout(() => vulnerable = true, 1000)
                //    collision is true if 
                //    rockleft < swanRight
                //    rockRight > swanLeft
                //    rockBottom > swanTop
                //    rockTop < swanBottom

                console.log('HIT', rock.x, swanX)
            }
        }

    })
}

function resize() {
    canvas.width = document.documentElement.clientWidth - 32;
    if (canvas.width > document.documentElement.clientHeight) {
        canvas.width = document.documentElement.clientHeight;
    }
    canvas.height = canvas.width * 0.5;
    canvas.imageSmoothingEnabled = false;
};
window.addEventListener("resize", resize);

let keyPresses = {};

window.addEventListener('keydown', keyDownListener, false);

function keyDownListener(event) {
    keyPresses[event.key] = true;
}
window.addEventListener('keyup', keyUpListener, false);

function keyUpListener(event) {
    keyPresses[event.key] = false;
}

resize();