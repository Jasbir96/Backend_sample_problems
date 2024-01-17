# Problem Statement:

**Real-Time Chat Application with Socket.IO for Terminal Communication**

Your objective is to develop a simple real-time chat application that facilitates communication between clients using `socket.io-client` and `socket.io` within a terminal environment. The goal is to create a chat system that allows multiple terminal instances to connect to a central server and broadcast messages to all connected terminals in real-time.
### Requirements:
1. **Server Setup:**
    - Set up a Node.js server using Express.
    - Integrate `socket.io` to enable real-time communication.
    - The server should listen for connections on a specified port.
2. **Client Connection (Terminal):**
    - Implement a terminal-based client application using `socket.io-client`.
    - Clients should be able to establish a connection with the server by providing a unique username.
3. **Message Broadcasting:**
    - Clients can send messages to the server from their terminals.
    - The server should broadcast these messages to all connected clients in real-time.
    - Each message should include the sender's username and the message content.
4. **Disconnect Handling:**
    - Implement proper handling for client disconnections.
    - Broadcast a message when a client joins or leaves the chat.
    - Display a notification in the terminals when a user joins or leaves.
### Evaluation Criteria:
- Correct implementation of the server using Express and `socket.io`.
- Successful integration of `socket.io-client` for terminal-based connections.
- Proper handling of message broadcasting and user disconnections.

