class Canvas {
    constructor(canvas) {
        this.d_canvas = canvas;
        this.d_canvas.height = window.innerHeight;
        this.d_canvas.width = window.innerWidth;
        this.d_context = this.d_canvas.getContext("2d");
        window.addEventListener("resize", () => {
            this.d_canvas.height = window.innerHeight;
            this.d_canvas.width = window.innerWidth;
        });
    }
    Clear() {
        this.d_context.clearRect(0, 0, this.GetWidth(), this.GetHeight());
    }
    GetCanvas() {
        return this.d_canvas;
    }
    GetCenter() {
        return { X: this.GetWidth() / 2, Y: this.GetHeight() / 2 };
    }
    GetHeight() {
        return this.d_canvas.height;
    }
    GetWidth() {
        return this.d_canvas.width;
    }
    writeTextToCanvas(aText, aFontSize, aXpos, aYpos, aColor = "white", aAlignment = "center") {
        this.d_context.font = `${aFontSize}px Minecraft`;
        this.d_context.fillStyle = aColor;
        this.d_context.textAlign = aAlignment;
        this.d_context.fillText(aText, aXpos, aYpos);
    }
    writeImageToCanvas(image, aXpos, aYpos) {
        this.d_context.save();
        this.d_context.translate(aXpos, aYpos);
        this.d_context.drawImage(image, -image.width / 2, -image.height / 2);
        this.d_context.restore();
        return image;
    }
    writeButtonToCanvas(aCaption, fnName, fn, aXpos = -1, aYpos = -1) {
        let buttonImage = new Image();
        buttonImage.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
        buttonImage.addEventListener('load', () => {
            let dx = aXpos;
            let dy = aYpos;
            if (dx < 0)
                dx = (this.GetWidth() - buttonImage.width) / 2;
            if (dy < 0)
                dy = this.GetHeight() / 2 + buttonImage.height;
            let fontX = dx + ((buttonImage.width + aCaption.length - 18) / 2);
            let fontY = dy + (buttonImage.height - 12);
            this.d_context.drawImage(buttonImage, dx, dy);
            this.writeTextToCanvas(aCaption, 20, fontX, fontY, '#000');
        });
    }
}
class Game {
    constructor(canvasElem) {
        this.Score = 1;
        this.i = 0;
        this._canvas = new Canvas(canvasElem);
        this._player = new Player(this._canvas, "./assets/images/player.png", this._canvas.GetCenter().X, this._canvas.GetCenter().Y, 10, 3);
        this._zombies = [];
        this._zombies.push(new Zombie(this._canvas, "./assets/images/zombies/4ZombieFrontSPAWN.png", MathHelper.randomNumber(0, this._canvas.GetWidth()), MathHelper.randomNumber(0, this._canvas.GetHeight()), MathHelper.randomNumber(1, 10), 5));
    }
    gameLoop() {
        this._canvas.Clear();
        this._canvas.writeTextToCanvas(`Score: ${this.Score}`, 23, this._canvas.GetCenter().X, 90);
        this._player.move();
        this._player.draw();
        for (let i = 0; i < this._zombies.length; i++) {
            if (this._player.isColliding(this._zombies[i])) {
                this._zombies.splice(i, 1);
                this.Score += 1;
                if (!this._zombies[0]) {
                    this.i = 0;
                    for (this.i; this.i < this.Score; this.i++) {
                        this._zombies.push(new Zombie(this._canvas, "./assets/images/zombies/4ZombieFrontSPAWN.png", MathHelper.randomNumber(0, this._canvas.GetWidth()), MathHelper.randomNumber(0, this._canvas.GetHeight()), MathHelper.randomNumber(1, 10), 5));
                    }
                }
            }
            else {
                this._zombies[i].move();
                this._zombies[i].draw();
            }
        }
    }
}
let init = function () {
    const ZombieGame = new Game(document.getElementById('canvas'));
    window.setInterval(() => ZombieGame.gameLoop(), 1000 / 60);
};
window.addEventListener('load', init);
class EntityBase {
    constructor(canvasElem, imgSrc, xPos, yPos, speed, lives) {
        let image = new Image();
        image.src = imgSrc;
        this.image = image;
        this._canvas = canvasElem;
        this._src = imgSrc;
        this.Xpos = xPos;
        this.Ypos = yPos;
        this.speed = speed;
        this.lives = lives;
        this._height = this.image.height;
        this._width = this.image.width;
    }
    getX() {
        return this.Xpos;
    }
    getY() {
        return this.Ypos;
    }
    getHeight() {
        return this._height;
    }
    getWidth() {
        return this._width;
    }
}
class KeyHandler {
    constructor() {
        this.KeyDown = (event) => {
            if (event.code == 'KeyW') {
                this.up = true;
            }
            if (event.code == 'KeyA') {
                this.left = true;
            }
            if (event.code == 'KeyS') {
                this.down = true;
            }
            if (event.code == 'KeyD') {
                this.right = true;
            }
        };
        this.KeyUp = (event) => {
            if (event.code == 'KeyW') {
                this.up = false;
            }
            if (event.code == 'KeyA') {
                this.left = false;
            }
            if (event.code == 'KeyS') {
                this.down = false;
            }
            if (event.code == 'KeyD') {
                this.right = false;
            }
        };
        this.down = false;
        this.up = false;
        this.right = false;
        this.left = false;
        window.addEventListener("keydown", this.KeyDown);
        window.addEventListener("keyup", this.KeyUp);
    }
    GetRight() {
        return this.right;
    }
    GetLeft() {
        return this.left;
    }
    GetUp() {
        return this.up;
    }
    GetDown() {
        return this.down;
    }
}
class Player extends EntityBase {
    constructor(canvasElem, imgSrc, xPos, yPos, speed, lives) {
        super(canvasElem, imgSrc, xPos, yPos, speed, lives);
        this._keyHandler = new KeyHandler;
        window.addEventListener("mousemove", e => {
            this.Xpos = e.clientX;
            this.Ypos = e.clientY;
        });
    }
    draw() {
        this._canvas.writeImageToCanvas(this.image, this.Xpos, this.Ypos);
    }
    move() {
        if (this._keyHandler.GetRight()) {
            this.Xpos += this.speed;
        }
        if (this._keyHandler.GetLeft()) {
            this.Xpos -= this.speed;
        }
        if (this._keyHandler.GetUp()) {
            this.Ypos -= this.speed;
        }
        if (this._keyHandler.GetDown()) {
            this.Ypos += this.speed;
        }
        if (this.Xpos <= 0) {
            this.Xpos = 0;
        }
        if (this.Xpos >= this._canvas.GetWidth()) {
            this.Xpos = this._canvas.GetWidth();
        }
        if (this.Ypos <= 0) {
            this.Ypos = 0;
        }
        if (this.Ypos >= this._canvas.GetHeight()) {
            this.Ypos = this._canvas.GetHeight();
        }
    }
    isColliding(enemy) {
        if (this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        return false;
    }
    getX() {
        return this.Xpos;
    }
    getY() {
        return this.Ypos;
    }
    getHeight() {
        return this._height;
    }
    getWidth() {
        return this._width;
    }
}
class Zombie extends EntityBase {
    constructor(canvasElem, imgSrc, xPos, yPos, speed, lives) {
        super(canvasElem, imgSrc, xPos, yPos, speed, lives);
    }
    draw() {
        this._canvas.writeImageToCanvas(this.image, this.Xpos, this.Ypos);
    }
    move() {
        let direction = MathHelper.randomNumber(0, 3);
        if (direction == 0) {
            this.Xpos += this.speed;
        }
        if (direction == 1) {
            this.Xpos -= this.speed;
        }
        if (direction == 2) {
            this.Ypos -= this.speed;
        }
        if (direction == 3) {
            this.Ypos += this.speed;
        }
        if (this.Xpos <= 0) {
            this.Xpos = 0;
        }
        if (this.Xpos >= this._canvas.GetWidth()) {
            this.Xpos = this._canvas.GetWidth();
        }
        if (this.Ypos <= 0) {
            this.Ypos = 0;
        }
        if (this.Ypos >= this._canvas.GetHeight()) {
            this.Ypos = this._canvas.GetHeight();
        }
    }
    collision() {
    }
    getX() {
        return this.Xpos;
    }
    getY() {
        return this.Ypos;
    }
    getHeight() {
        return this._height;
    }
    getWidth() {
        return this._width;
    }
}
class MathHelper {
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=app.js.map