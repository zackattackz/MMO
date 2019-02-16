var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/chat.js", function(req, res) {
    res.sendFile(__dirname + "/chat.js");
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    //When a client sends a message, emit that message to all connected clients
    socket.on("client_emit", function(msg) {
        io.emit("server_emit", msg)
    })

});

http.listen(3000, function() {
    console.log("listening on *:3000");
});
