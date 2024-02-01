

/***********************new content********************************/
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
// including env variables
const app = express();
dotenv.config();
const { PORT, DB_PASSWORD, DB_USER } = process.env;
/**********************connection to our DB********************************/
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority`;
// once 
mongoose.connect(dbURL)
    .then(function (connection) {
        console.log("connected to db");
    }).catch(err => console.log(err))
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
const userSchema = new mongoose.Schema(schemaObject);
// module
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
app.post("/api/users", createUser);

const port = process.env.PORT;
app.listen(port, () => { console.log(`server is listening at PORT ${port}`) })

