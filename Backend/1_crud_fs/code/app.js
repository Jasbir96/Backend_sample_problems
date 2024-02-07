const express = require("express");
const fs = require("fs");
const app = express();
/*********platform should handle this******/ 
const strusersData = fs.readFileSync("./dev-data.json", "utf-8");
const userDataStore = JSON.parse(strusersData);
/*************************/



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
/****this is also provided by platform***/ 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listening at PORT ${port}`);
});
/****this is also provided by platform***/ 

module.exports = app;
