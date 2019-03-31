/*
    NOTE- YOU MUST RUN APP.JS SEPARATELY TO RUN THESE TESTS, OTHERWISE SOCKETS WILL NOT CONNECT
 */



test("connection is established, player is added, so getPlayers should have a key equal to this socket.id", () => {
    let socket = require('socket.io-client')('http://localhost:8081');
    socket.emit("getInitialPlayers");
    socket.on("receivePlayers", players => {
       expect(players[socket.id]).toBe({name: "guest", isActive: false, y:300})
    });
});

test("two connections are established, first connection receives playerJoined event and adds the new player", () => {
    let socket = require('socket.io-client')('http://localhost:8081');
    let socket1players = {};
    socket.on("playerJoined", player => {
        let playerID = player.id;
        socket1players[playerID] = player
        expect(socket1players).toBe({
            socket1id: {name:"guest", y: 300, isActive: false, id: socket.id},
            socket2id: {name:"guest", y: 300, isActive: false, id: socket2.id}
        })
    });

    let socket2 = require('socket.io-client')('http://localhost:8081'); //initialize a second player

});

test("updateY will change player's y and then send a playerMoved event", () => {
    let socket = require('socket.io-client')('http://localhost:8081');
    let socket2 = require('socket.io-client')('http://localhost:8081'); //initialize a second player

    socket.emit("updateY", 50);
    socket2.on("playerMoved", player => {
        expect(player).toBe({name: "guest", isActive: false, y:50})//expect socket1 y to have changed
    });
});

test("updateIsActive will change player's isActive and then send a playerMoved event", () => {
    let socket = require('socket.io-client')('http://localhost:8081');
    let socket2 = require('socket.io-client')('http://localhost:8081'); //initialize a second player

    socket.emit("updateIsActive", true);
    socket2.on("playerChangedActive", player => {
        expect(player).toBe({name: "guest", isActive: true, y:300, id: socket.id})//expect socket1 isActive to have changed
    });
});
