 class mainScene extends Phaser.Scene {
    constructor(){
        super({key: "mainScene"});
    }

    /*
        Used to load images/sounds and give them references
     */
    preload(){
        this.load.image('player', 'assets/player.png'); //load player.png as 'player'

    }

    /*
        Used to set up socket connection, socket functions, keyboard actions, physics groups, and any variables
     */
    create() {
        //establish socket connection with server
        this.socket = io();

        //initialize a group to later be used to store every player EXCEPT the one currently playing
        this.otherPlayers = this.add.group();

        initializeSocketOnEvents(this);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.pingInterval = 0
    }

    update(dt) {
        if (this.player) {
            if (this.player.isActive) {
                if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                    this.player.setVelocity(0, -420);
                }
                if (this.pingInterval++ === 1) {
                    //sent to app.js
                    this.socket.emit("updateY", this.player.body.y + this.HALFHEIGHT);//add 20 bc its offset from center
                    this.pingInterval = 0
                }
            }
        }

    }
    //only triggered when a new player joins, make sure all properties of player match those in receivePlayers
    addOtherPlayer(playerInfo) {
        const randomColor = Math.floor(Math.random()*16777215);
        const otherPlayer = this.add.image(100, playerInfo.y, 'player').setTint(randomColor);
        otherPlayer.alpha = 0.3;
        otherPlayer.playerInfo = playerInfo;
        //add player to the group defined above
        this.otherPlayers.add(otherPlayer);
        if(this.player){
            this.player.setDepth(1)
        }

    }
}
