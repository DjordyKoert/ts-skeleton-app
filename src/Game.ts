class Game {
    private readonly _canvas: Canvas
    private readonly _player: Player
    private _zombies: Array<Zombie>
    private Score: number = 1
    private i: number = 0

    public constructor(canvasElem: HTMLCanvasElement) {
        this._canvas = new Canvas(canvasElem)
        this._player = new Player(this._canvas, "./assets/images/player.png", this._canvas.GetCenter().X, this._canvas.GetCenter().Y, 10, 3)
        this._zombies = []
        this._zombies.push(new Zombie(this._canvas, "./assets/images/zombies/4ZombieFrontSPAWN.png", MathHelper.randomNumber(0, this._canvas.GetWidth()), MathHelper.randomNumber(0, this._canvas.GetHeight()), MathHelper.randomNumber(1, 10), 5))

    }

    public gameLoop(): void {
        this._canvas.Clear()
        this._canvas.writeTextToCanvas(`Score: ${this.Score}`, 23, this._canvas.GetCenter().X, 90)
        this._player.move()
        this._player.draw()
        //console.log(this._zombies)
        for (let i = 0; i < this._zombies.length; i++) {
            if (this._player.isColliding(this._zombies[i])) {
                this._zombies.splice(i, 1)
                this.Score += 1
                if (!this._zombies[0]) {
                    this.i = 0
                    for (this.i; this.i < this.Score; this.i++) {
                        this._zombies.push(new Zombie(this._canvas, "./assets/images/zombies/4ZombieFrontSPAWN.png", MathHelper.randomNumber(0, this._canvas.GetWidth()), MathHelper.randomNumber(0, this._canvas.GetHeight()), MathHelper.randomNumber(1, 10), 5))
                    }
                }
            } else {

                this._zombies[i].move()
                this._zombies[i].draw()

            }
        }
    }
}






let init = function () {
    const ZombieGame = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
    window.setInterval(() => ZombieGame.gameLoop(), 1000 / 60)
};
window.addEventListener('load', init);