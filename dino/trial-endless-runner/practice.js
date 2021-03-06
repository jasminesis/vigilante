console.log("baaaaa")

minHeight = 20;
maxHeight = 100;
minWidth = 10;
maxWidth = 20;
minGap = 200;
maxGap = 500;
gap = randomGap();
var myObstacles = [];
var colors = ["black", "red", "blue", "green", "yellow", "gray", "indigo", "Chocolate"];

function startGame() {
    gameArea.start();
}

function everyInterval(n) {
    if (gameArea.frame % n == 0) return true;
    return false;
}

function jump() {
    player.speedY = -2;
}

function randomGap() {
    return Math.floor(minGap + Math.random() * (maxGap - minGap + 1));
}
var scoreText = {
    x: 900,
    y: 50,
    update: function (text) {
        gameArea.context.fillStyle = "grey";
        gameArea.context.font = "15px Arial";
        gameArea.context.fillText(text, this.x, this.y);
    }
}
var player = {
    x: 20,
    y: 470,
    speedY: 0,
    update: function () {
        gameArea.context.fillStyle = "black";
        gameArea.context.fillRect(this.x, this.y, 30, 30)
    },
    newPos: function () {
        if (this.y < 280) {
            this.speedY = 2;
        }
        this.y = this.y + this.speedY;
        if (this.speedY == 2 && this.y == 470) {
            this.speedY = 0;
        }
    },
    crashWith: function (obs) {
        if (this.x + 30 > obs.x && this.x < obs.x + obs.width && this.y + 30 > obs.y) {
            return true;
        }
        return false;
    }

}

function obstacle() {
    this.height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight + 1));
    this.width = Math.floor(minWidth + Math.random() * (maxWidth - minWidth + 1));
    this.x = 1200;
    this.y = gameArea.canvas.height - this.height;
    this.index = Math.floor(Math.random() * colors.length);
    this.color = colors[this.index];
    this.draw = function () {
        gameArea.context.fillStyle = this.color;
        gameArea.context.fillRect(this.x, this.y, this.width, this.height);
    }
}
var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.height = 500;
        this.canvas.width = 1200;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context = this.canvas.getContext("2d");
        this.frame = 0;
        this.score = 0;
        scoreText.update("Score: 0");
        this.interval = setInterval(this.updateGameArea, 5);
        window.addEventListener("keydown", jump);
    },
    updateGameArea: function () {
        for (i = 0; i < myObstacles.length; i++) {
            if (player.crashWith(myObstacles[i])) {
                gameArea.stop();
                return;
            }
        }
        gameArea.clear();
        if (everyInterval(gap)) {
            myObstacles.push(new obstacle());
            gap = randomGap();
            gameArea.frame = 0;
        }
        for (i = 0; i < myObstacles.length; i++) {
            myObstacles[i].x -= 1;
            myObstacles[i].draw();
        }
        player.newPos();
        player.update();
        gameArea.frame += 1;
        gameArea.score += 0.01;
        scoreText.update("Score: " + Math.floor(gameArea.score));
    },
    clear: function () {
        gameArea.context.clearRect(0, 0, this.canvas.width, this.canvas.width);
    },
    stop: function () {
        clearInterval(this.interval);
        // alert("Game over (*_*)!!");
    }
}

startGame()