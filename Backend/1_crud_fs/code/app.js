const express = require("express");
const fs = require("fs");
const app = express();

const strusersData = fs.readFileSync("./dev-data.json", "utf-8");
const userDataStore = JSON.parse(strusersData);

app.get("/api/user", (req, res) => {
  console.log("Thank you for making get request");
  let message = "";
  if (userDataStore.length == 0) {
    message = "no users found";
  } else {
    message = userDataStore;
  }
  res.status(200).json({
    status: "successfull",
    message: message,
  });
});

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`server is listening at PORT ${port}`);
// });

module.exports = app;
