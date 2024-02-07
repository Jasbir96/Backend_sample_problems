/***********************new content********************************/
const express = require("express");
const dotenv = require("dotenv");
const UserModel = require("./model");
// including env variables
const app = express();
dotenv.config();
app.use(express.json());
// const { PORT, DB_PASSWORD, DB_USER } = process.env;
/**********************connection to our DB********************************/
// const dbURL =
//   process.env.DB_URI ??
//   `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.drcvhxp.mongodb.net/?retryWrites=true&w=majority`;
// // once
// mongoose
//   .connect(dbURL)
//   .then(function (connection) {
//     console.log("connected to db");
//   })
//   .catch((err) => console.log(err));
/***********************new content********************************/
async function createUser(req, res) {
  try {
    let user = await UserModel.create(req.body);
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
}

app.post("/api/users", createUser);

// const port = process.env.PORT;
// const server = app.listen(port, () => {
//   console.log(`server is listening at PORT ${port}`);
// });

module.exports = app;
