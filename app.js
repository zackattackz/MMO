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
    console.log(gameState.state);

    socket.on('disconnect', function () {
        console.log('user disconnected');
        gameState.removePlayer(socket.id)
    });

    //DEMO ONLY
    socket.on('getPlayers', () => {
        //send gamestate players only to the user that requested them
       io.to(socket.id).emit('receivePlayers', gameState.state.players);
    });

    socket.on('updatePlayer', (info) => {
        gameState.updatePlayer(info.id, info.y, false);
    })


});

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});


