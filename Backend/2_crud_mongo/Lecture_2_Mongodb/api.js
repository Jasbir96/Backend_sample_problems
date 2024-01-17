const express = require("express");
const app = express();

/***********************new content********************************/
const dotenv = require("dotenv");
dotenv.config();
// mongoose 
const mongoose = require("mongoose");
mongoose.connect().then(
    function (connection) {
        console.log(connection);
    }
)
const userSchema = new mongoose.Schema(schemaObject);
const schemaObject = {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
    ,
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function () {
            return this.password == this.confirmPassword
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}
// modelue
let UserModel = mongoose.model("UserModel", userSchema);
/***********************new content********************************/


async function createUser(req, res) {
    try {
        let user = await UserModel.create(req.body);
        res.status(200).json({
            user: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}










app.use(express.json());
app.get("/api/user", function (req, res) {
    try {
        console.log("I am inside  get method");

        if (userDataStore.length == 0) {
            throw new Error("No users are present")
        }
        res.status(200).json({
            status: "success",
            message: userDataStore
        })
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        })
    }

})
// you need to express.json
app.use(express.json());
// add a middlewarep
// middle ware -> validates the input 
app.use(function (req, res, next) {
    // console.log("36",req.method);
    if (req.method == "POST") {
        // check if the body is empty or not 
        const userDetails = req.body;
        const isEmpty = Object.keys(userDetails).length == 0;
        if (isEmpty) {
            res.status(400).json({
                status: "failure",
                message: "userDetails are empty"
            })
        } else {
            next();
        }
    } else {
        next();
    }
})
/******************create user ***************/
app.post("/api/user", function (req, res) {
    const id = short.generate();
    const userDetails = req.body;
    userDetails.id = id;
    userDataStore.push(userDetails);
    // adding user to the file 
    const struserStore = JSON.stringify(userDataStore);
    fs.writeFileSync("./dev-data.json", struserStore);

    res.status(200).json({
        status: "successfull",
        message: `update the user with ${id}`
    })
})
app.get("/api/user/:userId", function (req, res) {
    try {
        const userId = req.params.userId;
        const userDetails = getUserByid(userId);
        if (userDetails == "no user found") {
            throw new Error(`user with ${userId} not found`);
        } else {
            res.status(200).json({
                status: "successfull",
                message: userDetails
            })
        }
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        })
    }


})

function getUserByid(id) {
    const user = userDataStore.find((user) => {
        return user.id == id;
    })
    if (user == undefined) {
        return "no user found";
    } else {
        return user;
    }
}
// 404 route not found
app.use(function cb(req, res) {
    // console.log("");
    // response 
    res.status(404).json({
        status: "failure",
        message: " route not found"
    })
})

const port = process.env.PORT;
app.listen(port, () => { console.log(`server is listening at PORT ${port}`) })

