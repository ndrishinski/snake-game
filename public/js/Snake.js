export default class Snake extends Phaser.Scene {
    constructor(scene) {
        super()
        this.scene = scene
        this.moveInternal = 500
        this.lastMoveTime = 0
        this.tileSize = 16;
        this.direction = Phaser.Math.Vector2.DOWN
        this.body = [];
        this.body.push(this.scene.add.rectangle(this.scene.game.config.width / 2, this.scene.game.config.height / 2, this.tileSize, this.tileSize, 0xff0000).setOrigin(0))

        this.apple = this.scene.add.rectangle(0, 0, this.tileSize, this.tileSize, 0x00ff00).setOrigin(0)

        this.positionApple()

        scene.input.keyboard.on('keydown', (e) => {
            this.keydown(e)
        })
    }

    positionApple() {
        this.apple.x = Math.floor(Math.random() * this.scene.game.config.width / this.tileSize) * this.tileSize
        this.apple.y = Math.floor(Math.random() * this.scene.game.config.height / this.tileSize) * this.tileSize
    }

    keydown(e) {
        console.log(e)
        switch (e.keyCode) {
            case 37: 
                this.direction = Phaser.Math.Vector2.LEFT
                break;
            case 38:
                    this.direction = Phaser.Math.Vector2.UP
                break
            case 39: 
                this.direction = Phaser.Math.Vector2.RIGHT
                break
            case 40: 
                this.direction = Phaser.Math.Vector2.DOWN
                break
        }
    }

    update(time) {
        if (time >= this.lastMoveTime + this.moveInternal) {
            this.lastMoveTime = time;
            this.move()
        }

    }

    move() {

        let x = this.body[0].x + this.direction.x * this.tileSize
        let y = this.body[0].y + this.direction.y * this.tileSize

        if (this.apple.x == x && this.apple.y == y) {
            this.body.push(this.scene.add.rectangle(0,0,this.tileSize, this.tileSize, 0xffffff).setOrigin(0))
            this.positionApple();
        }

        for (let i = this.body.length -1; i > 0; i--) {
            console.log(i)
            this.body[i].x = this.body[i -1].x;
            this.body[i].y = this.body[i -1].y;
        }
        this.body[0].x = x;
        this.body[0].y = y;
    }
}