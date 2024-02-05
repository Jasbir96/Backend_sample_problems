const { server, io } = require("./socketserver"); // Adjust the path to your server file
const socketIOClient = require("socket.io-client");
const http = require("http");

let httpServer, clientSocket;

beforeAll((done) => {
  const PORT = 3001;
  httpServer = http.Server(server);
  io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Test server listening on port ${PORT}`);
    done();
  });
});

afterAll((done) => {
  if (io) io.close();
  if (httpServer) httpServer.close(done);
});

beforeEach((done) => {
  // Ensure connection to the server is established for each test
  clientSocket = socketIOClient(`http://localhost:3001`, {
    "reconnection delay": 0,
    "reopen delay": 0,
    "force new connection": true,
    transports: ["websocket"],
  });

  clientSocket.on("connect", () => {
    console.log("Connected to server for testing");
    done();
  });
});

afterEach((done) => {
  // Disconnect the client after each test
  if (clientSocket.connected) {
    clientSocket.disconnect();
  }
  done();
});

test("should connect to chat server", (done) => {
  // Test if the client is connected
  expect(clientSocket.connected).toBeTruthy();
  done();
});
