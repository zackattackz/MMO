let config = {
    type: Phaser.AUTO,
    backgroundColor: "#4488AA",
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y : 1500}
        }
    },
    scene: [mainScene]
};

let game = new Phaser.Game(config);