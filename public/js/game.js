let config = {
    type: Phaser.AUTO,
    backgroundColor: "#4488aa",
    width: 900,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y : 1500}
        }
    },
    scene: [mainScene],
    parent: "game-container"
};

let game = new Phaser.Game(config);

if (game.device.desktop === false) {
    // Set the scaling mode to SHOW_ALL to show all the game
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Set a minimum and maximum size for the game
    // Here the minimum is half the game size
    // And the maximum is the original game size
    game.scale.setMinMax(game.width/2, game.height/2,
        game.width, game.height);

    // Center the game horizontally and vertically
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
}
