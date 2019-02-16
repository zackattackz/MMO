var socket = io();

//When a message is received from the server, add it to the list of messages
socket.on("server_emit", function(msgObj){
    var chatBox = document.getElementById("chatbox");
    chatBox.innerHTML += "<li><span class='name'>" + msgObj.name + ":</span> " + msgObj.msg + "</li>"
});

//When button is pressed, get input value and emit it to the server
function sendMessage() {
    var name = document.getElementById("name");
    var msg = document.getElementById("msg");

    var msgObj = {
        "name": name.value,
        "msg": msg.value
    };
    socket.emit("client_emit", msgObj);
    msg.value = "";
}