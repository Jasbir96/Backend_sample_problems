const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// including env variables
dotenv.config();
const { PORT, DB_PASSWORD, DB_USER, JWT_SECRET } = process.env;

// /**********************connection to our DB********************************/

// const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority`;
// // only done once
// mongoose.connect(dbURL)
//     .then(function (connection) {
//         console.log("connected to db");
//     }).catch(err => console.log(err))
const UserModel = require("./model/UserModel");

/***********************cookies and JWT**************************/

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);

const app = express();

app.use(express.json());
app.use(cookieParser());

const signupController = async function (req, res) {
  try {
    let newUser = await UserModel.create(req.body);
    res.status(201).json({
      message: "user created successfully",
      user: newUser,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "success",
    });
  }
};
const loginController = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      // password
      let areEqual = password == user.password;

      if (areEqual) {
        let token = await promisifiedJWTSign({ id: user["_id"] }, JWT_SECRET);
        console.log("sendning token");
        res.cookie("JWT", token, {
          maxAge: 90000000,
          httpOnly: true,
          path: "/",
        });
        res.status(200).json({
          status: "success",
          message: "user logged In",
        });
      } else {
        res.status(404).json({
          status: "failure",
          message: "email or password is incorrect",
        });
      }
    } else {
      res.status(404).json({
        status: "failure",
        message: "user not found with creds",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};
const protectRouteMiddleWare = async function (req, res, next) {
  try {
    let decryptedToken = await promisifiedJWTVerify(
      req.cookies.JWT,
      JWT_SECRET,
    );
    if (decryptedToken) {
      let userId = decryptedToken.id;
      req.userId = userId;
      next();
    } else {
      res.send("kindly login to access this resource ");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};
const getUserData = async function (req, res) {
  try {
    const user = await UserModel.findById(req.userId);
    res.status(200).json({
      message: "user data retrieved  successfully",
      user: user,
    });
  } catch (err) {
    res.status(200).json({
      message: err.message,
    });
  }
};

app.post("/signup", signupController);
app.post("/login", loginController);
app.get("/allowIfLoggedIn", protectRouteMiddleWare, getUserData);

// server -> run on a port
// const server = app.listen(PORT, function () {
//   console.log(` server is listening to port ${PORT}`);
// });

module.exports = app;
