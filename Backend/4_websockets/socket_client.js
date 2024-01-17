const readline = require('readline');
const io = require('socket.io-client');

const socket = io('http://localhost:3000');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let username;

// Prompt for username
rl.question('Enter your username: ', (answer) => {
    username = answer;
    socket.emit('join', username);

    // Start chat input
    rl.setPrompt(`${username}: `);
    rl.prompt();
});

// Listen for incoming chat messages
socket.on('chat', (message) => {
    console.log(message);
    rl.prompt();
});

// Handle user input and send messages
rl.on('line', (input) => {
    socket.emit('message', input);
    rl.prompt();
});

// Handle program exit
rl.on('close', () => {
    console.log('Exiting chat...');
    socket.disconnect();
    process.exit(0);
});
