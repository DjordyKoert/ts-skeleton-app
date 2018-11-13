class Game {
    //global attr for canvas
    //readonly attributes must be initialized in the constructor
    private readonly canvas: HTMLCanvasElement; // find the right type
    private readonly ctx: CanvasRenderingContext2D; // find the right type

    //some global player attributes
    private readonly player: string = "Player1";
    private readonly score: number = 400;
    private readonly lives: number = 9;
    private readonly highscores: Array<any>; //TODO: do not use 'any': write an interface!

    public constructor(canvasId: HTMLCanvasElement) {
        //construct all canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //set the context of the canvas
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
        ]
        // all screens: uncomment to activate 
        this.start_screen();
        //this.level_screen();
        //this.title_screen();

    }

    //-------- Splash screen methods ------------------------------------
    /**
     * Function to initialize the splash screen
     */
    public start_screen() {
        this.writeTextCanvas("Asteroids", this.canvas.width / 2, this.canvas.height / 2 - 100, 100, "White", "center")
        this.writeTextCanvas("Press Play to start", this.canvas.width / 2, this.canvas.height / 2 - 50, 30, "White", "center")
        this.drawImageCanvas("./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png", this.canvas.width / 2, this.canvas.height / 2 + 90, 3)
        this.writeTextCanvas("PLAY", this.canvas.width / 2, this.canvas.height / 2 + 100, 30, "#777", "center")
        //this.writeStartButton()
        
        this.drawImageCanvas("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png", this.canvas.width / 2, this.canvas.height / 2 + 10, 3)
        //1. add 'Asteroids' text DONE

        //2. add 'Press to play' text
        //3. add button with 'start' text
        //4. add Asteroid image
    }

    //-------- level screen methods -------------------------------------
    /**
     * Function to initialize the level screen
     */
    public level_screen() {
        this.loadLives()
        let txt1 = `Your Score: ${this.score}`
        this.writeTextCanvas(txt1, this.canvas.width - this.ctx.measureText(txt1).width - 10, 0 + 20)
        this.drawRAsteroid()
        //this.drawShip()
        this.drawImageCanvas(`./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png`, this.canvas.width / 2, this.canvas.height / 2, 1)
        //1. load life images
        //2. draw current score
        //3. draw random asteroids
        //4. draw player spaceship
    }

    //-------- Title screen methods -------------------------------------

    /**
    * Function to initialize the title screen   
    */
    public title_screen() {
        //Your score
        this.writeTextCanvas(`Your Score: ${this.score}, \nCongrats ${this.player}`, this.canvas.width / 2, this.canvas.height / 4 - 40, 40, "#fff", "center")
        //Highscore
        let y = this.canvas.height / 4 + 40
        let id = 0
        this.highscores.forEach(element => {
            id++
            this.writeTextCanvas(`${id}. ${element.playerName}, Score: ${element.score}`, this.canvas.width / 2, y, 40, "#fff", "center")
            y = y + 40
        });
        //1. draw your score
        //2. draw all highscores
    }

    //-------Generic canvas functions ----------------------------------

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
    public writeTextCanvas(txt: string, x: number, y: number, fontsize: number = 20, color: string = "White", alignment: CanvasTextAlign = "center") {
        this.ctx.font = `${fontsize}px Minecraft`
        this.ctx.fillStyle = color
        this.ctx.textAlign = alignment
        this.ctx.fillText(txt, x, y)
    }
    public drawImageCanvas(src: string, x: number, y: number, centerMode: number = 0) {
        let img = new Image();
        img.onload = () => {
            if (centerMode == 0) this.ctx.drawImage(img, x, y)
            else if (centerMode == 1) this.ctx.drawImage(img, x - img.height / 2, y)
            else if (centerMode == 2) this.ctx.drawImage(img, x, y - img.height / 2)
            else if (centerMode == 3) this.ctx.drawImage(img, x - img.height / 2, y - img.height / 2)
        }
        img.src = src
    }
    //Start menu
    public writeStartButton() {
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2 + 90)
        }
        img.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
    }
    //level_screen
    public loadLives() {
        let i = this.lives
        let x = 10
        while (i > 0) {
            this.drawImageCanvas("./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_red.png", x, 10)
            x += 40
            i--
        }

        this.drawImageCanvas(`./assets/images/SpaceShooterRedux/PNG/UI/numeral${this.lives}.png`, x + 10, 10)
    }
    public drawRAsteroid() {
        setInterval(() => {
            let n = this.randomNumber(1, 4)
            let x = this.randomNumber(0, this.canvas.width)
            let y = -10
            let img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, x - 15, y - 15)
            }
            img.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big${n}.png`;
        }, 1000)
    }
    //title_screen
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};
//add loadlistener for custom font types
window.addEventListener('load', init);
