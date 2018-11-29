/// <reference path="../base/EntityBase.ts"/>
class Zombie extends EntityBase {

    public constructor(canvasElem: Canvas, imgSrc: string, xPos: number, yPos: number, speed: number, lives: number) {
        super(canvasElem, imgSrc, xPos, yPos, speed, lives)
    }

    public draw(): void {
        this._canvas.writeImageToCanvas(this.image, this.Xpos, this.Ypos)
    }
    public move() {
        let direction: number = MathHelper.randomNumber(0, 3)

        if (direction == 0) {
            this.Xpos += this.speed
        }
        if (direction == 1) {
            this.Xpos -= this.speed
        }
        if (direction == 2) {
            this.Ypos -= this.speed
        }
        if (direction == 3) {
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

    protected collision() {

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