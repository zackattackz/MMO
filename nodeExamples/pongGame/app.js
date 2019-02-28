var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);


app.use(express.static(__dirname + '/public'));


server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});