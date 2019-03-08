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
        
        //First, request the players already in the server's state's player object (including the current player)
        this.socket.emit("getInitialPlayers");

        //When we receive the response from the server, fire a callback function with the received players object
        //For info on players object see MMO/js/gameState.js
        this.socket.on("receivePlayers", players => { //begin callback

            //For each id in the players object (ids are stored as keys), do the following
            Object.values(players).forEach(playerInfo => { //begin loop

                //If the id matches the id of the CURRENT PLAYER connection
                if (playerInfo.id === this.socket.id) {
                    // if the current player is active TODO: For now since every player is always inactive, use !... but later when isActive is implemented remove the !
                    if (!playerInfo.isActive) {
                        //Add a new physics object with the image of player.png, set it to this.player (a variable)
                        this.player = this.physics.add.image(100, playerInfo.y, "player");

                        //Get half the height of player.png to be used later
                        this.HALFHEIGHT = this.player.body.halfHeight;

                        //Enable collisions with the edges of the world
                        this.player.body.collideWorldBounds = true;

                        //TODO: Set isActive to true for now, remove this later when isActive is properly implemented
                        this.player.isActive = true
                    }
                //If the id does not match the id of the CURRENT PLAYER connection
                } else {
                    // if the other player is active TODO: For now since every player is always inactive, use !... but later when isActive is implemented remove the !
                    if(!playerInfo.isActive) {
                        //Call this.addOtherPlayers with an argument of the other player's info
                        this.addOtherPlayer(playerInfo);
                        //this.addOtherPlayer is defined after update method
                    }
                }
            })
        });
        //So now the current player and all the players who are already in the server are created

        //If a new player joins the server, this event will be sent to client
        this.socket.on('playerJoined', player => {
            //Just add that new player just like how the initial players were added
            //if(player.isActive) {}
            this.addOtherPlayer(player)

        });

        //If another player moves, their move is updated on server, then server sends this event to client
        //playerWhoMoved is a playerInfo object, defined in gameState.js
        this.socket.on('playerMoved', playerWhoMoved => {

            //Loop through the otherPlayers group, player is a playerInfo obj
           this.otherPlayers.getChildren().forEach( player => {
               //If the playerWhoMoved's id matched the id of one of the otherPlayer's children
              if (playerWhoMoved.id === player.playerInfo.id) {
                  //Set that players info to the updated info
                  player.playerInfo = playerWhoMoved;
                  //Set that players position to correspond with the new y value - moving the player on the client side
                  player.setPosition(100 ,playerWhoMoved.y);
              }
           });
        });

        this.socket.on("playerLeft", playerWhoLeft => {
           (this.otherPlayers.getChildren().forEach( player => {
               if(player.playerInfo.id === playerWhoLeft.id) player.destroy()
           }));
        });

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
                    this.socket.emit("updateY", this.player.body.y + this.HALFHEIGHT);//add 20 bc its offset from center
                    this.pingInterval = 0
                }
            }
        }
    }

    addOtherPlayer(playerInfo) {
        const randomColor = Math.floor(Math.random()*16777215);
        const otherPlayer = this.add.image(100, playerInfo.y, 'player').setTint(randomColor);
        otherPlayer.alpha = 0.3;
        otherPlayer.playerInfo = playerInfo;
        this.otherPlayers.add(otherPlayer);
        if(this.player){
            this.player.setDepth(1)
        }

    }
}
