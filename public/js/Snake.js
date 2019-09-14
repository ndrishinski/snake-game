export default class Snake extends Phaser.Scene {
    constructor(scene) {
        super()
        this.scene = scene
        this.moveInternal = 500
        this.lastMoveTime = 0
        this.direction = Phaser.Math.Vector2.DOWN
        this.body = [];
        this.body.push(this.scene.add.rectangle(100, 100, 16, 16, 0xff0000).setOrigin(0))

        this.body.push(this.scene.add.rectangle(0, 0, 16, 16, 0x0000ff).setOrigin(0))

        this.body.push(this.scene.add.rectangle(0, 0, 16, 16, 0xffffff).setOrigin(0))

        scene.input.keyboard.on('keydown', (e) => {
            this.keydown(e)
        })
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

        for (let i = this.body.length -1; i > 0; i--) {
            console.log(i)
            this.body[i].x = this.body[i -1].x;
            this.body[i].y = this.body[i -1].y;
        }
        this.body[0].x += this.direction.x * 16;
        this.body[0].y += this.direction.y * 16;
    }
}