let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io').listen(server);

let gameState = require("./js/gameState");

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    gameState.addPlayer(socket.id);
    console.log(gameState.state);

    socket.on('disconnect', function () {
        console.log('user disconnected');
        gameState.removePlayer(socket.id)
    });

});

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});