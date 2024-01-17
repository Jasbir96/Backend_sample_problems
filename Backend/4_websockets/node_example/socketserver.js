// socket .io=> server side
const socket = require("socket.io");
// https server
const http = require("http");
// http server
const db = {};
const server = http.createServer();
// socket => socket enabled
// socket.io
const socketServer = socket(server);
socketServer.on("connect", function (socket) {
    console.log(socket.id);
    // (joined)client->server
    socket.on("Joined", function (message) {
        // name=> socket.id
        db[message.userName] = socket.id;
        // broadcast
        socket.broadcast.emit("notice", message.data);
    });
    socket.on("message", function (message) {
        // type=> private => private message
        if (message.type == "private") {
            socketServer.to(`${db[message.receiver]}`).emit("notice", message.data);
        } else {
            socket.broadcast.emit("notice", message.data);
        }

        // type=> public => broadcast
    });
});


server.listen(3000, function () {
    console.log("Server is listening at port 3000");
});