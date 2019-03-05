let socket = io();
let playerList = document.getElementById('players');

socket.on('connect', function () {
    let yourId = document.getElementById("your-id");
    yourId.innerHTML = "Your socket id is " + socket.id;
});


socket.on('receivePlayers', players => {
    console.log(playerList);
    let result = "";
    for (let id of Object.keys(players)) {
        let y = players[id].y;
        let isActive = players[id].isActive;
        result += "<div style='border: black solid 1px'>player id: " + id + "<br>y: " + y + "<br>isActive: " + isActive +"<br></div>";
    }
    playerList.innerHTML = result;

});

function getPlayers() {
    socket.emit('getPlayers');
}

function updatePlayers() {
    let y = document.getElementById("y").value;
    socket.emit('updatePlayers', {id: socket.id, y: y});
    y = "";
}