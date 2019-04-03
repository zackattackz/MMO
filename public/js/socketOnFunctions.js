function initializeSocketOnEvents(scene) {
    //First, request the players already in the server's state's player object (including the current player)
    //triggers receivePlayers for this player
    scene.socket.emit("getInitialPlayers");

    //When we receive the response from the server, fire a callback function with the received players object
    //For info on players object see MMO/js/gameState.js
    //triggered by getInitialPlayers
    scene.socket.on("receivePlayers", players => { //begin callback

        //For each id in the players object (ids are stored as keys), do the following
        Object.values(players).forEach(playerInfo => { //begin loop

            //If the id matches the id of the CURRENT PLAYER connection
            if (playerInfo.id === scene.socket.id) {
                // if the current player is active
                if (playerInfo.isActive) {
                    //Add a new physics object with the image of player.png, set it to scene.player (a variable)
                    scene.player = scene.physics.add.image(100, playerInfo.y, "player");

                    //Get half the height of player.png to be used later
                    scene.HALFHEIGHT = scene.player.body.halfHeight;

                    //Enable collisions with the edges of the world
                    scene.player.body.collideWorldBounds = true;

                    scene.physics.add.overlap(scene.player, scene.pipes, function () {
                        console.log('overlapped');
                        console.log(scene.player.isActive)
                        if(scene.player.isActive) {
                            scene.player.isActive = false;
                            scene.player.setVisible(false);
                            scene.socket.emit('updateIsActive', false);
                        }
                    }, null, scene);

                    scene.player.isActive = true;

                    // Turn on wall collision checking for your sprite
                    scene.player.setCollideWorldBounds(true);

                    scene.player.body.onWorldBounds = true;

                    scene.player.body.world.on('worldbounds', function(body) {
                        // Check if the body's game object is the sprite you are listening for
                        // Stop physics and render updates for this object
                        if(scene.player.isActive) {
                            scene.player.isActive = false;
                            scene.player.setVisible(false);
                            scene.socket.emit('updateIsActive', false);
                         }
                    });




                }
                //If the id does not match the id of the CURRENT PLAYER connection
            } else {
                // if the other player is active TODO: For now since every player is always inactive, use !... but later when isActive is implemented remove the !
                //Call scene.addOtherPlayers with an argument of the other player's info
                scene.addOtherPlayer(playerInfo);
                //scene.addOtherPlayer is defined after update method
            }
        })
    });
    scene.socket.on('playerJoined', player => {
        //Just add that new player just like how the initial players were added
        scene.addOtherPlayer(player)
    });

    scene.socket.on("playerLeft", playerWhoLeft => {
        (scene.otherPlayers.getChildren().forEach( player => {
            //Since player is destroyed they will no longer appear as an image
            if(player.playerInfo.id === playerWhoLeft.id) player.destroy()
        }));
    });

//So now the current player and all the players who are already in the server are created
    scene.socket.on('playerMoved', playerWhoMoved => {
        //Loop through the otherPlayers group, player is a playerInfo obj
        scene.otherPlayers.getChildren().forEach( player => {
            //If the playerWhoMoved's id matched the id of one of the otherPlayer's children
            if (playerWhoMoved.id === player.playerInfo.id) {
                //Set that players info to the updated info
                player.playerInfo = playerWhoMoved;
                //Set that players position to correspond with the new y value - moving the player on the client side
                player.setPosition(100 ,playerWhoMoved.y);
            }
        });
    });

    scene.socket.on('playerChangedActive', playerWhoChangedIsActive => {
        scene.otherPlayers.getChildren().forEach( player => {
            //If the playerWhoChangedIsActive's id matched the id of one of the otherPlayer's children
            if (playerWhoChangedIsActive.id === player.playerInfo.id) {
                //Set that players info to the updated info
                player.playerInfo = playerWhoChangedIsActive;
                player.alpha = 0.0;
            }
        });
    });

    scene.socket.on('createPipes', hole => {
        scene.createPipes(hole);
    })

}
