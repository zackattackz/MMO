var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var gameState = require("./gameState");

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {

    //Init, increase player count, player is active only if he is player 1 or 2. Add key: id - val: player info to state
    gameState.playerCount++;
    const active = gameState.playerCount < 3;
    gameState.players[socket.id] = {
        isActive: active,
        playerNum: gameState.playerCount
    };

    socket.emit('currentState', gameState);
    socket.broadcast.emit('currentState', gameState);


    //On disconnect, delete player from state, shift all players numbers down by one and set active if necessary
    socket.on('disconnect', () => {
        let  disconnectedPlayerNum = gameState.players[socket.id].playerNum;
        delete gameState.players[socket.id];
        gameState.playerCount--;
        for(let key of Object.keys(gameState.players)) {
            let player = gameState.players[key];
            if(player.playerNum > 2) {
                player.playerNum--;
            } else if (disconnectedPlayerNum === 1 && player.playerNum === 2) {
                player.playerNum--;
            }
            player.isActive = player.playerNum < 3
        }
        socket.broadcast.emit('currentState', gameState);
    });

    console.log(gameState);
});


server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});