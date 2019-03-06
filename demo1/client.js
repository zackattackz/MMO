let socket = io();
let playerList = document.getElementById('players');

socket.on('connect', function () {
    let yourId = document.getElementById("your-id");
    yourId.innerHTML = "Your socket id is " + socket.id;
});


socket.on('receivePlayers', players => {
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
    let yInput = document.getElementById("y-input");
    socket.emit('updatePlayers', {id: socket.id, y: yInput.value});
    yInput.value = "";
}