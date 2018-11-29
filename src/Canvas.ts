class Canvas {
    private readonly d_canvas: HTMLCanvasElement
    private readonly d_context: CanvasRenderingContext2D

    public constructor(canvas: HTMLCanvasElement) {
        this.d_canvas = canvas
        this.d_canvas.height = window.innerHeight
        this.d_canvas.width = window.innerWidth
        this.d_context = this.d_canvas.getContext("2d")

        window.addEventListener("resize", () => {
            this.d_canvas.height = window.innerHeight
            this.d_canvas.width = window.innerWidth
        })
    }

    public Clear(): void {
        // clear the screen
        this.d_context.clearRect(0, 0, this.GetWidth(), this.GetHeight());
    }

    public GetCanvas(): HTMLCanvasElement {
        return this.d_canvas;
    }

    public GetCenter(): { X: number, Y: number } {
        // return the center as a valid return
        return { X: this.GetWidth() / 2, Y: this.GetHeight() / 2 };
    }

    public GetHeight(): number {
        // return the height of the canvas
        return this.d_canvas.height;
    }

    public GetWidth(): number {
        // return the width of the canvas
        return this.d_canvas.width;
    }

    public writeTextToCanvas(aText: string,
        aFontSize: number,
        aXpos: number,
        aYpos: number,
        aColor: string = "white",
        aAlignment: CanvasTextAlign = "center") {

        this.d_context.font = `${aFontSize}px Minecraft`;
        this.d_context.fillStyle = aColor;
        this.d_context.textAlign = aAlignment;
        this.d_context.fillText(aText, aXpos, aYpos);
    }
    public writeImageToCanvas(image: CanvasImageSource,
        aXpos: number,
        aYpos: number): CanvasImageSource {
        // save the current state
        this.d_context.save();
        // move the origin to the desired location
        this.d_context.translate(aXpos, aYpos);
        // draw
        this.d_context.drawImage(image, -image.width / 2, -image.height / 2);
        // reset to saved state
        this.d_context.restore();
        return image;
    }
    public writeButtonToCanvas(aCaption: string, fnName: string, fn: () => void, aXpos: number = -1, aYpos: number = -1) {
        let buttonImage = new Image();
        buttonImage.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
        // Make sure the image is loaded first otherwise nothing will draw.

        buttonImage.addEventListener('load', (): void => {
            let dx = aXpos;
            let dy = aYpos;
            // if x axis is not set, lets center the button horizontally
            if (dx < 0) dx = (this.GetWidth() - buttonImage.width) / 2;
            // if y axis is not set, lets center the button vertically
            if (dy < 0) dy = this.GetHeight() / 2 + buttonImage.height;

            // center the text based upon the font
            let fontX = dx + ((buttonImage.width + aCaption.length - 18) / 2); // - 1/2 fontsize + buttonBorder
            let fontY = dy + (buttonImage.height - 12); // - 1/2 fontsize + buttonBorder
            this.d_context.drawImage(buttonImage, dx, dy);
            this.writeTextToCanvas(aCaption, 20, fontX, fontY, '#000');
        });
    }

}