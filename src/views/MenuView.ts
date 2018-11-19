/// <reference path="../base/ViewBase.ts"/>

class MenuView extends ViewBase {
    /**
     * Constructor
     * Creates the object and initializes the members
     * @param {HTMLCanvasElement} aCanvas - the canvas where to render to
     * @param aChangeViewCallback -
     */
    public constructor(aCanvas: HTMLCanvasElement, aChangeViewCallback: (aNewView: ViewBase) => void) {
        super(aCanvas, aChangeViewCallback);
    }

    protected HandleClick = (aXpos: number, aYpos: number): void => {
        let centerCoordinate = this.d_canvasHelper.GetCenter()
        if (aXpos > centerCoordinate.X - 111 && aXpos < centerCoordinate.X + 111) {
            if (aYpos > centerCoordinate.Y + 219 && aYpos < centerCoordinate.Y + 259) {
                this.d_canvasHelper.Clear()
                // clear the canvas

                // change the View << is explained tomorrow
                this.d_changeViewCallback(new GameView(this.d_canvasHelper.canvas, this.d_changeViewCallback));
            }
        }
    }

    protected RenderScreen(): void {
        let centerCoord = this.d_canvasHelper.GetCenter()
        this.d_canvasHelper.writeTextToCanvas("Asteroids", centerCoord.X, centerCoord.Y - 200, 100, "White", "center")
        this.d_canvasHelper.writeTextToCanvas("Press Play to start", centerCoord.X, centerCoord.Y - 100, 30, "White", "center")
        this.d_canvasHelper.writeImageToCanvas("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png", centerCoord.X, centerCoord.Y + 10)
        // copy and modify the code from start_screen from the game.ts
    }

}