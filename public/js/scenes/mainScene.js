class mainScene extends Phaser.Scene {
    constructor(){
        super({key: "mainScene"});
    }

    preload(){
        this.load.image('player', 'assets/player.png')
    }

    create() {
        this.socket = io();

        this.socket.emit("getPlayers");
        this.socket.on("receivePlayers", players => {
            Object.keys(players).forEach(id => {
                if (id === this.socket.id) {
                    this.player = this.physics.add.sprite(100, players[id].y, "player")
                    this.player.body.collideWorldBounds = true
                    this.player.alpha = 1
                }
            })
        });


        this.key_space = this.input.keyboard.on('keydown_SPACE', event => {
            this.player.setVelocity(0, -380)
        });
    }

    update(dt) {

    }
}
