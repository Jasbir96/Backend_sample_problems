/*********************code to be  written in the stub*************************/ 
const express = require('express');
const fs = require('fs');
const app = express();
/*********************code to be  written in the stub*************************/ 



/************************learner code ************************/
// Function to handle GET request for user data
function readUserDataFromFile(filePath) {
  const strUsersData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(strUsersData);
}
// Function to read user data from file
function handleGetUserData(req, res) {
  /***this functions should written the learner*/
  console.log('Thank you for making a GET request');
  try {
    const userDataStore = readUserDataFromFile('./dev-data.json');
    let message = userDataStore.length === 0 ? 'no users found' : userDataStore;
    res.status(200).json({
      status: 'successful',
      message: message,
    });
  } catch (error) {
    console.error('Error reading user data:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

/***********************code will be provided in stub*******************************/ 
app.get('/api/user', handleGetUserData);

module.exports = app; 
/***********************code will be provided in stub*******************************/ 
