var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('ball', 'assets/ball.png');
    this.load.image('paddle', 'assets/paddle.png');
    this.load.image('wall', 'assets/wall.png');
}

function create() {
    this.ball = this.physics.add.image(400, 300, 'ball');
    this.ball.setVelocity(250,10);
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.set(1.03);

    this.playerOne = this.physics.add.image(780, 300, 'paddle').setTint(0x0000ff);
    this.playerOne.body.collideWorldBounds = true;
    this.playerOne.body.bounce.set(1);
    this.playerOne.body.immovable = true;

    this.playerTwo = this.physics.add.image(20, 300, 'paddle').setTint(0xff0000);
    this.playerTwo.body.collideWorldBounds = true;
    this.playerTwo.body.bounce.set(1);
    this.playerTwo.body.immovable = true;

    this.paddles = this.add.group();
    this.paddles.add(this.playerOne);
    this.paddles.add(this.playerTwo);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursors.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.walls = this.add.group();

    var leftWall = this.physics.add.image(1,300, 'wall');
    this.walls.add(leftWall);
    var rightWall = this.physics.add.image(799,300, 'wall');
    this.walls.add(rightWall);

    this.playerOneScore = 0;
    this.playerTwoScore = 0;

    this.physics.add.collider(this.ball, this.paddles, handleHit, null, this);

    this.labelScore = this.add.text(20, 20, "Player 1: " + this.playerOneScore + "\nPlayer 2: " + this.playerTwoScore,
        { font: "30px Arial", fill: "#ffffff" });

}

function update() {
    if (this.cursors.up.isDown) {
        this.playerOne.setVelocity(0, -250)
    } else if (this.cursors.down.isDown) {
        this.playerOne.setVelocity(0, 250)
    } else {
        this.playerOne.setVelocity(0, 0)
    }

    if (this.cursors.w.isDown) {
        this.playerTwo.setVelocity(0, -250)
    } else if (this.cursors.s.isDown) {
        this.playerTwo.setVelocity(0, 250)
    } else {
        this.playerTwo.setVelocity(0, 0)
    }

    this.physics.overlap(this.ball, this.walls, scorePoint, null, this);
    // this.physics.overlap(this.ball, this.paddles, testing, null, this)
}

function scorePoint() {
    console.log(this.playerTwoScore);
    if (this.ball.x > 400) {
        this.playerTwoScore++;
    } else {
        this.playerOneScore++;
    }

    this.ball.x = 400;
    this.ball.y = 300;
    this.ball.setVelocity(250, 10);
    this.labelScore.setText("Player 1: " + this.playerOneScore + "\nPlayer 2: " + this.playerTwoScore);

}

function handleHit(ball, paddles) {
    ball.body.velocity.y += Math.round(Math.random()) * 30 - 15;
}