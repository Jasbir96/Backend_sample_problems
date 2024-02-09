const express = require("express");
const fs = require("fs");

// Function to read user data from file
function readUserDataFromFile(filePath) {
  const strUsersData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(strUsersData);
}

// Function to handle GET request for user data
function handleGetUserData(req, res) {
  console.log("Thank you for making a GET request");
  try {
    const userDataStore = readUserDataFromFile("./dev-data.json");
    let message = userDataStore.length === 0 ? "no users found" : userDataStore;
    res.status(200).json({
      status: "successful",
      message: message,
    });
  } catch (error) {
    console.error("Error reading user data:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

const app = express();
app.get("/api/user", handleGetUserData);

module.exports = app; // Exporting the app for testing purposes