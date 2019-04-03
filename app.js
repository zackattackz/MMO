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
    console.log("user connected");
    //Add current new user to gameState, isActive set to False, name = guest
    gameState.addPlayer(socket.id);

    //broadcast new player joined event, adds player to the group in mainScene
    socket.broadcast.emit('playerJoined', gameState.state.players[socket.id]);

    socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.broadcast.emit("playerLeft", gameState.state.players[socket.id]);
        gameState.removePlayer(socket.id);
    });


    socket.on('updateIsActive', isActive => {
        gameState.updateIsActive(socket.id, isActive);
        socket.broadcast.emit('playerChangedActive', gameState.state.players[socket.id]);
    });

    socket.on('updateY', y => {
        gameState.updateY(socket.id, y);
        socket.broadcast.emit("playerMoved", gameState.state.players[socket.id]); //send updated player to all other players
    });


    socket.on('updateName', name => {
        gameState.updateName(socket.id, name);
    });

    //send gamestate players only to the user that requested them
    socket.on('getInitialPlayers', () => {
        io.to(socket.id).emit('receivePlayers', gameState.state.players);
    });

    //DEMO ONLY
    socket.on('updatePlayer', (info) => {
        gameState.updatePlayer(info.id, info.y, false);
    });


});

function sendPipeInfo(){

    io.emit('createPipes', Math.floor(Math.random() * 5))
}
setInterval(sendPipeInfo, 3000);


server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});


