class mainScene extends Phaser.Scene {
    constructor(){
        super({key: "mainScene"});
    }

    preload(){
        this.load.image('player', 'assets/player.png');
    }

    create() {
        this.socket = io();

        this.socket.emit("getInitialPlayers");
        this.socket.on("receivePlayers", players => {
            Object.keys(players).forEach(id => {
                if (id === this.socket.id) {
                    if (!players[id].isActive) {
                        this.player = this.physics.add.image(100, players[id].y, "player");
                        this.player.body.collideWorldBounds = true;
                        this.player.isActive = true
                    }
                }
            })
        });


        this.key_space = this.input.keyboard.on('keydown_SPACE', event => {
            this.player.setVelocity(0, -420);
        });

    }

    update(dt) {
        if (this.player) {
            if (!this.player.isActive) {
                this.socket.emit("updateY", this.player.body.y);
            }
        }
    }
}
