abstract class EntityBase {
    protected readonly _canvas: Canvas
    protected readonly _src: string
    protected image: CanvasImageSource;
    protected Xpos: number
    protected Ypos: number
    protected speed: number
    protected lives: number
    protected _height: number
    protected _width: number

    public constructor(canvasElem: Canvas, imgSrc: string, xPos: number, yPos: number, speed: number, lives: number) {
        let image = new Image();
        image.src = imgSrc;
        this.image = image;
        this._canvas = canvasElem
        this._src = imgSrc
        this.Xpos = xPos
        this.Ypos = yPos
        this.speed = speed
        this.lives = lives
        this._height = this.image.height
        this._width = this.image.width
    }

    protected abstract draw(): void;
    
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