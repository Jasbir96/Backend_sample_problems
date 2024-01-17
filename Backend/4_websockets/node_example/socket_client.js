// require =>socket -client
const client = require("socket.io-client");
// first httop request
const socket = client.connect("http://localhost:3000");
const readline = require("readline");
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "enter something"
});

// cli=> client(question)
let userName = "";
reader.question("Enter Your Name ", function (name) {
    console.log(`Hello ${name}`);
    // client=> server(joined)
    userName = name;
    // steve
    var message = {};
    message.type = "joining";
    message.data = name + " has joined";
    message.userName = name;
    socket.emit("Joined", message);
});
// client
//CLi=> input(client)

reader.on("line", function (data) {
    // client=> server(message)
    //private recieverName message nhcfnbc nhgvnhg
    //jhdgbfjsdbbsfjhf
    var type = data.split(" ")[0];
    var message = {};
    if (type == "private") {
        message.type = "private";
        message.receiver = data.split(" ")[1];
        message.data = userName + " : " + data.split(" ").slice(2).join(" ");
    
    } else {
        message.type = "public";

        message.data = userName + " : " + data;
    }

    socket.emit("message", message);
});

// server(notice)=>client
socket.on("notice", function (message) {
    console.log(message);
});

reader.on("close", function () {
    console.log("Thank you for using");
});