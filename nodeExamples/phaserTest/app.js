var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '\\public'));

io.on('connection', socket => {
    console.log('User connected');

    socket.on('position', pos => {
        console.log("My position is x: " + pos.x + "\ny: " + pos.y);
    });
});

http.listen(3000, function() {
    console.log("listening on *:3000");
});