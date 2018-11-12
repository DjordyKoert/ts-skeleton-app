class Game {
    //global attr for canvas
    //readonly attributes must be initialized in the constructor
    private readonly canvas: HTMLCanvasElement; // find the right type
    private readonly ctx: CanvasRenderingContext2D; // find the right type

    //some global player attributes
    private readonly player: string = "Player1";
    private readonly score: number = 400;
    private readonly lives: number = 3;
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
        // this.level_screen();
        // this.title_screen();

    }

    //-------- Splash screen methods ------------------------------------
    /**
     * Function to initialize the splash screen
     */
    public start_screen() {
        this.writeAsteroidHeading()
        this.writeIntroText()
        this.writeStartButton()
        this.drawAsteroid()
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
    //Start menu
    public writeAsteroidHeading() {
        this.ctx.font = "100px Minecraft"
        let color = 1
        this.ctx.fillStyle = `#${color}`
        this.ctx.textAlign = "center"
        this.ctx.fillText("Asteroids", this.canvas.width / 2, this.canvas.height / 2 - 100)
        setInterval(() => {
            if (color > 999) color = 1
            this.ctx.font = "100px Minecraft"
            this.canvas.style.backgroundColor = `#${color}`
            this.canvas.style.backgroundImage = ""
            color++
            this.ctx.fillStyle = `#${color}`
            this.ctx.textAlign = "center"
            this.ctx.fillText("Asteroids", this.canvas.width / 2, this.canvas.height / 2 - 100)
        }, 100)
    }
    public writeIntroText() {
        this.ctx.font = "30px Minecraft"
        this.ctx.fillStyle = "White"
        this.ctx.textAlign = "center"
        this.ctx.fillText("Press Play to start", this.canvas.width / 2, this.canvas.height / 2 - 50)
    }
    public writeStartButton() {
        this.ctx.font = "30px Minecraft"
        this.ctx.fillStyle = "#777"
        this.ctx.textAlign = "center"
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2 + 90)
            this.ctx.fillText("PLAY", this.canvas.width / 2, this.canvas.height / 2 + 100)
        }
        img.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";

    }
    public drawAsteroid() {
        let img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2 + 10)
        }
        img.src = "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png";
        setInterval(() => {
            let n = this.randomNumber(1, 4)
            let x = this.randomNumber(0, this.canvas.width)
            let y = this.randomNumber(0, this.canvas.height)
            let img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, x - 15, y - 15)
            }
            img.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big${n}.png`;
        }, 10000)
    }
    public writeHighscore() {
        this.ctx.font = `40px Minecraft`
        this.ctx.fillStyle = "#999"
        let y = this.canvas.height / 2 + 40 * 2
        let id = 0
        this.highscores.forEach(element => {
            id++
            this.ctx.fillText(`${id}. ${element.playerName}, Score: ${element.score}`, this.canvas.width / 2, y)
            y = y + 40
        });
    }
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};
//add loadlistener for custom font types
window.addEventListener('load', init);
