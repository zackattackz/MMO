let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y : 200}
        }
    },
    scene: [mainScene]
};

let game = new Phaser.Game(config);