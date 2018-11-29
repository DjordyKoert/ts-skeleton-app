class KeyHandler {
    private right: boolean
    private left: boolean
    private up: boolean
    private down: boolean
    private player: Player

    public constructor() {
        this.down = false
        this.up = false
        this.right = false
        this.left = false
        window.addEventListener("keydown", this.KeyDown)
        window.addEventListener("keyup", this.KeyUp)
    }

    private KeyDown = (event: KeyboardEvent) => {
        if (event.code == 'KeyW') {
            this.up = true
        }
        if (event.code == 'KeyA') {
            this.left = true
        }
        if (event.code == 'KeyS') {
            this.down = true
        }
        if (event.code == 'KeyD') {
            this.right = true
        }
    }
    private KeyUp = (event: KeyboardEvent) => {
        if (event.code == 'KeyW') {
            this.up = false
        }
        if (event.code == 'KeyA') {
            this.left = false
        }
        if (event.code == 'KeyS') {
            this.down = false
        }
        if (event.code == 'KeyD') {
            this.right = false
        }
    }

    public GetRight(): boolean {
        return this.right
    }
    public GetLeft(): boolean {
        return this.left
    }
    public GetUp(): boolean {
        return this.up
    }
    public GetDown(): boolean {
        return this.down
    }
}