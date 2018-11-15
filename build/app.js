class Game {
    constructor(canvasId) {
        this.player = "Player1";
        this.score = 400;
        this.lives = 9;
        this.speed = 10;
        this.shipXoffset = 0;
        this.shipYoffset = 0;
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ];
        this.start_screen();
    }
    start_screen() {
        this.writeTextCanvas("Asteroids", this.canvas.width / 2, this.canvas.height / 2 - 200, 100, "White", "center");
        this.writeTextCanvas("Press Play to start", this.canvas.width / 2, this.canvas.height / 2 - 100, 30, "White", "center");
        this.writeStartButton(100);
        this.drawImageCanvas("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png", this.canvas.width / 2, this.canvas.height / 2 + 10, 3);
    }
    level_screen() {
        this.canvas.removeEventListener("mousedown", () => { }, false);
        this.loadLives();
        this.writeTextCanvas(`Your Score: ${this.score}`, this.canvas.width - this.ctx.measureText(`Your Score: ${this.score}`).width, 20);
        this.drawRAsteroid();
    }
    title_screen() {
        this.writeTextCanvas(`Your Score: ${this.score}, \nCongrats ${this.player}`, this.canvas.width / 2, this.canvas.height / 4 - 40, 40, "#fff", "center");
        let y = this.canvas.height / 4 + 40;
        let id = 0;
        this.highscores.forEach(element => {
            this.writeTextCanvas(`${id}. ${element.playerName}, Score: ${element.score}`, this.canvas.width / 2, y, 40, "#fff", "center");
            y = y + 40;
        });
        this.ctx.save();
        this.ctx.restore();
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    writeTextCanvas(txt, x, y, fontsize = 20, color = "White", alignment = "center") {
        this.ctx.font = `${fontsize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(txt, x, y);
    }
    drawImageCanvas(src, x, y, centerMode = 0) {
        let img = new Image();
        img.onload = () => {
            if (centerMode == 0)
                this.ctx.drawImage(img, x, y);
            else if (centerMode == 1)
                this.ctx.drawImage(img, x - img.height / 2, y);
            else if (centerMode == 2)
                this.ctx.drawImage(img, x, y - img.height / 2);
            else if (centerMode == 3)
                this.ctx.drawImage(img, x - img.height / 2, y - img.height / 2);
        };
        img.src = src;
    }
    keyDownHandler(event) {
        if (event.keyCode == 65 || event.keyCode == 37) {
            console.log("left");
            this.leftPressed = true;
        }
        if (event.keyCode == 87 || event.keyCode == 38) {
            this.upPressed = true;
            console.log("up");
        }
        if (event.keyCode == 68 || event.keyCode == 39) {
            this.rightPressed = true;
            console.log("right");
        }
        if (event.keyCode == 83 || event.keyCode == 40) {
            this.downPressed = true;
            console.log("down");
        }
    }
    keyUpHandler(event) {
        if (event.keyCode == 65 || event.keyCode == 37) {
            console.log("left");
            this.leftPressed = false;
        }
        if (event.keyCode == 87 || event.keyCode == 38) {
            this.upPressed = false;
            console.log("up");
        }
        if (event.keyCode == 68 || event.keyCode == 39) {
            this.rightPressed = false;
            console.log("right");
        }
        if (event.keyCode == 83 || event.keyCode == 40) {
            this.downPressed = false;
            console.log("down");
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.leftPressed)
            this.shipXoffset -= this.speed;
        if (this.rightPressed)
            this.shipXoffset += this.speed;
        if (this.upPressed)
            this.shipYoffset -= this.speed;
        if (this.downPressed)
            this.shipYoffset += this.speed;
        this.drawImageCanvas(`./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png`, this.canvas.width / 2 + this.shipXoffset, this.canvas.height / 2 + this.shipYoffset, 1);
    }
    writeStartButton(extraP) {
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2 + extraP);
            this.writeTextCanvas("PLAY", this.canvas.width / 2, this.canvas.height / 2 + extraP + 10, 30, "#777", "center");
        };
        img.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
        this.canvas.addEventListener("click", (event) => {
            let minX = this.canvas.width / 2 - img.width / 2;
            let maxX = this.canvas.width / 2 + img.width / 2;
            let minY = this.canvas.height / 2 - img.height / 2 + extraP;
            let maxY = this.canvas.height / 2 + img.height / 2 + extraP + 10;
            if ((event.x >= minX && event.x <= maxX) && (event.y >= minY && event.y <= maxY)) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.level_screen();
                window.addEventListener("keydown", (event) => this.keyDownHandler(event));
                window.addEventListener("keyup", (event) => this.keyUpHandler(event));
                window.setInterval(() => this.draw(), 1000 / 60);
            }
        });
    }
    loadLives() {
        let i = this.lives;
        let x = 10;
        while (i > 0) {
            this.drawImageCanvas("./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_red.png", x, 10);
            x += 40;
            i--;
            if (i == 0)
                this.drawImageCanvas(`./assets/images/SpaceShooterRedux/PNG/UI/numeral${this.lives}.png`, x + 10, 10);
        }
    }
    drawRAsteroid() {
        const AsteroidsBrown = [
            "meteorBrown_big1.png",
            "meteorBrown_big2.png",
            "meteorBrown_big3.png",
            "meteorBrown_big4.png",
            "meteorBrown_med1.png",
            "meteorBrown_med2.png",
            "meteorBrown_small1.png",
            "meteorBrown_small2.png",
            "meteorBrown_tiny1.png",
            "meteorBrown_tiny2.png",
        ];
        const AsteroidsGrey = [
            "meteorGrey_big1.png",
            "meteorGrey_big2.png",
            "meteorGrey_big3.png",
            "meteorGrey_big4.png",
            "meteorGrey_med1.png",
            "meteorGrey_med2.png",
            "meteorGrey_small1.png",
            "meteorGrey_small2.png",
            "meteorGrey_tiny1.png",
            "meteorGrey_tiny2.png",
        ];
        setInterval(() => {
            let n = this.randomNumber(0, AsteroidsBrown.length);
            let x = this.randomNumber(0, this.canvas.width);
            let y = -10;
            this.drawImageCanvas(`./assets/images/SpaceShooterRedux/PNG/Meteors/${AsteroidsBrown[n]}`, x - 15, y);
        }, 1000);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map