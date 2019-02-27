class Example1 extends Phaser.Scene {
    constructor(){
        super({key: "Example1"});
    }

    preload(){
        this.load.image('test', 'assets/yellow.png')
    }

    create() {
        this.image = this.add.image(100, 300, 'test');

        this.key_P = this.input.keyboard.on('keyup_P', event => {
           socket.emit('position', {x: this.image.x, y: this.image.y})
        });

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(delta) {
        if(this.key_A.isDown) {
            this.image.x--;
        }
        if(this.key_D.isDown) {
            this.image.x++;
        }

    }
}
