class Game {
    constructor(canvasId) {
        this.player = "Player1";
        this.score = 400;
        this.lives = 9;
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
        this.writeTextCanvas("Asteroids", this.canvas.width / 2, this.canvas.height / 2 - 100, 100, "White", "center");
        this.writeTextCanvas("Press Play to start", this.canvas.width / 2, this.canvas.height / 2 - 50, 30, "White", "center");
        this.drawImageCanvas("./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png", this.canvas.width / 2, this.canvas.height / 2 + 90, 3);
        this.writeTextCanvas("PLAY", this.canvas.width / 2, this.canvas.height / 2 + 100, 30, "#777", "center");
        this.drawImageCanvas("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png", this.canvas.width / 2, this.canvas.height / 2 + 10, 3);
    }
    level_screen() {
        this.loadLives();
        let txt1 = `Your Score: ${this.score}`;
        this.writeTextCanvas(txt1, this.canvas.width - this.ctx.measureText(txt1).width - 10, 0 + 20);
        this.drawRAsteroid();
        this.drawImageCanvas(`./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png`, this.canvas.width / 2, this.canvas.height / 2, 1);
    }
    title_screen() {
        this.writeTextCanvas(`Your Score: ${this.score}, \nCongrats ${this.player}`, this.canvas.width / 2, this.canvas.height / 4 - 40, 40, "#fff", "center");
        let y = this.canvas.height / 4 + 40;
        let id = 0;
        this.highscores.forEach(element => {
            id++;
            this.writeTextCanvas(`${id}. ${element.playerName}, Score: ${element.score}`, this.canvas.width / 2, y, 40, "#fff", "center");
            y = y + 40;
        });
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
    writeStartButton() {
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2 + 90);
        };
        img.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
    }
    loadLives() {
        let i = this.lives;
        let x = 10;
        while (i > 0) {
            this.drawImageCanvas("./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_red.png", x, 10);
            x += 40;
            i--;
        }
        this.drawImageCanvas(`./assets/images/SpaceShooterRedux/PNG/UI/numeral${this.lives}.png`, x + 10, 10);
    }
    drawRAsteroid() {
        setInterval(() => {
            let n = this.randomNumber(1, 4);
            let x = this.randomNumber(0, this.canvas.width);
            let y = -10;
            let img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, x - 15, y - 15);
            };
            img.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big${n}.png`;
        }, 1000);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map