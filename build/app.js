class Game {
    constructor(canvasId) {
        this.player = "Player1";
        this.score = 400;
        this.lives = 6;
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
        this.level_screen();
    }
    start_screen() {
        this.writeAsteroidHeading();
        this.writeIntroText();
        this.writeStartButton();
        this.drawAsteroid();
    }
    level_screen() {
        this.loadLives();
        this.drawCurScore();
        this.drawRAsteroid();
        this.drawShip();
    }
    title_screen() {
        this.yourScore();
        this.writeHighscore();
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    writeAsteroidHeading() {
        this.ctx.font = "100px Minecraft";
        let color = 1;
        this.ctx.fillStyle = `#${color}`;
        this.ctx.textAlign = "center";
        this.ctx.fillText("Asteroids", this.canvas.width / 2, this.canvas.height / 2 - 100);
        setInterval(() => {
            if (color > 999)
                color = 1;
            this.ctx.font = "100px Minecraft";
            this.canvas.style.backgroundColor = `#${color}`;
            this.canvas.style.backgroundImage = "";
            color++;
            this.ctx.fillStyle = `#${color}`;
            this.ctx.textAlign = "center";
            this.ctx.fillText("Asteroids", this.canvas.width / 2, this.canvas.height / 2 - 100);
        }, 100);
    }
    writeIntroText() {
        this.ctx.font = "30px Minecraft";
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Press Play to start", this.canvas.width / 2, this.canvas.height / 2 - 50);
    }
    writeStartButton() {
        this.ctx.font = "30px Minecraft";
        this.ctx.fillStyle = "#777";
        this.ctx.textAlign = "center";
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2 + 90);
            this.ctx.fillText("PLAY", this.canvas.width / 2, this.canvas.height / 2 + 100);
        };
        img.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
    }
    drawAsteroid() {
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2 + 10);
        };
        img.src = "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png";
    }
    loadLives() {
        let i = this.lives;
        let x = 10;
        while (i > 0) {
            let Lives = new Image();
            Lives.onload = () => {
                this.ctx.drawImage(Lives, x, 10);
                x += 40;
            };
            Lives.src = "./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_red.png";
            i--;
        }
        let LivesN = new Image();
        LivesN.onload = () => {
            this.ctx.drawImage(LivesN, x + 10, 10);
        };
        LivesN.src = `./assets/images/SpaceShooterRedux/PNG/UI/numeral${this.lives}.png`;
    }
    drawCurScore() {
        this.ctx.font = `20px Minecraft`;
        this.ctx.fillStyle = "#fff";
        this.ctx.textAlign = "left";
        let txt = `Your Score: ${this.score}`;
        this.ctx.fillText(txt, this.canvas.width - this.ctx.measureText(txt).width - 10, 0 + 20);
    }
    drawRAsteroid() {
        setInterval(() => {
            let n = this.randomNumber(1, 4);
            let x = this.randomNumber(0, this.canvas.width);
            let y = this.randomNumber(0, this.canvas.height);
            let img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, x - 15, y - 15);
            };
            img.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big${n}.png`;
        }, 1000);
    }
    drawShip() {
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2);
        };
        img.src = `./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png`;
    }
    yourScore() {
        this.ctx.font = `40px Minecraft`;
        this.ctx.fillStyle = "#fff";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Your Score: ${this.score} \nCongrats ${this.player}`, this.canvas.width / 2, this.canvas.height / 4 - 40);
    }
    writeHighscore() {
        this.ctx.font = `40px Minecraft`;
        this.ctx.fillStyle = "yellow";
        this.ctx.textAlign = "center";
        let y = this.canvas.height / 4 + 40;
        let id = 0;
        this.highscores.forEach(element => {
            id++;
            this.ctx.fillText(`${id}. ${element.playerName}, Score: ${element.score}`, this.canvas.width / 2, y);
            y = y + 40;
        });
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map