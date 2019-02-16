var socket = io();

//When a message is received from the server, add it to the list of messages
socket.on("server_emit", function(msg){
    var chatBox = document.getElementById("chatbox");
    chatBox.innerHTML += "<li>" + msg + "</li>"
});

//When button is pressed, get input value and emit it to the server
function sendMessage() {
    var msg = document.getElementById("msg");
    socket.emit("client_emit", msg.value);
    msg.value = "";
}