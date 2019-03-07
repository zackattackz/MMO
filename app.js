let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io').listen(server);

let gameState = require("./js/gameState");

app.use(express.static(__dirname + '/public'));

//DEMO PURPOSES ONLY
app.use(express.static(__dirname + '/demo1'));

app.get("/demo", (req, res) => {
    res.sendFile(__dirname + "/demo1/index.html");
});

////////////////////

io.on('connection', function (socket) {
    //Add current new user to gameState
    gameState.addPlayer(socket.id);

    //broadcast new player joined event
    socket.broadcast.emit('playerJoined', gameState.state.players);

    socket.on('disconnect', function () {
        console.log('user disconnected');
        gameState.removePlayer(socket.id)
    });

    socket.on('updateY', y => {
       gameState.updateY(socket.id, y);
    });

    socket.on('updateIsActive', isActive => {
        gameState.updateIsActive(socket.id, isActive);
        socket.broadcast.emit('playerChangedActive', gameState.state.players);
    });

    socket.on('updateName', name => {
        gameState.updateName(socket.id, name);
    });


    //DEMO ONLY
    socket.on('getInitialPlayers', () => {
        //send gamestate players only to the user that requested them
       io.to(socket.id).emit('receivePlayers', gameState.state.players);
    });

    socket.on('updatePlayer', (info) => {
        gameState.updatePlayer(info.id, info.y, false);
    });

    socket.on('updateY', y => {
       gameState.updateY(socket.id, y);
       socket.broadcast.emit("playerMoved", gameState.state.players); //send updated players to all other players
    });


});

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});


