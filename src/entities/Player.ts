/// <reference path="../base/EntityBase.ts"/>
/// <reference path="../helpers/KeyHandler.ts"/>
class Player extends EntityBase {
    private _keyHandler: KeyHandler

    public constructor(canvasElem: Canvas, imgSrc: string, xPos: number, yPos: number, speed: number, lives: number) {
        super(canvasElem, imgSrc, xPos, yPos, speed, lives)
        this._keyHandler = new KeyHandler
        window.addEventListener("mousemove", e => {
            this.Xpos = e.clientX
            this.Ypos = e.clientY
        })
    }

    public draw(): void {
        this._canvas.writeImageToCanvas(this.image, this.Xpos, this.Ypos)
    }
    public move() {
        if (this._keyHandler.GetRight()) {
            this.Xpos += this.speed
        }
        if (this._keyHandler.GetLeft()) {
            this.Xpos -= this.speed
        }
        if (this._keyHandler.GetUp()) {
            this.Ypos -= this.speed
        }
        if (this._keyHandler.GetDown()) {
            this.Ypos += this.speed
        }
        //Border Collision
        if(this.Xpos <= 0) {
            this.Xpos = 0
        }
        if (this.Xpos >= this._canvas.GetWidth()){
            this.Xpos = this._canvas.GetWidth()
        }
        if(this.Ypos <= 0) {
            this.Ypos = 0
        }
        if (this.Ypos >= this._canvas.GetHeight()){
            this.Ypos = this._canvas.GetHeight()
        }
    }
    public isColliding(enemy: EntityBase): boolean {
        if (
            // Check if player.x is within borders of zombie.x
            this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            // Check if player.y is within borders of zombie.y
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()
        ) {
            return true;
        }
        return false;
    }

    public getX(): number {
        return this.Xpos
    }

    public getY(): number {
        return this.Ypos
    }
    public getHeight(): number {
        return this._height
    }
    public getWidth(): number {
        return this._width
    }
}