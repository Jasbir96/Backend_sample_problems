const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running.");
});

// Store connected clients
const connectedClients = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle new user joining
  socket.on("join", (username) => {
    connectedClients[socket.id] = username;
    io.emit("chat", `${username} joined the chat.`);
  });

  // Handle incoming messages
  socket.on("message", (message) => {
    io.emit("chat", `${connectedClients[socket.id]}: ${message}`);
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    const disconnectedUser = connectedClients[socket.id];
    delete connectedClients[socket.id];
    io.emit("chat", `${disconnectedUser} left the chat.`);
  });
});

// const appserver = server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

module.exports = { app, server, io };

// This conditional ensures that the server is only started when this file is run directly
// and not when it is imported/required in a test file.
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
