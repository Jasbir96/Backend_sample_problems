# Problem Description:

Your task is to create a simple Express server that exposes a GET route to retrieve user data from a JSON file. The provided data is structured as an array of user objects, each following a specific format:
```json
{
  "id": 1,
  "name": "Steve Harvey",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}

```
### Instructions:

1. **Express Server Setup:**
    
    - Initialize a new Node.js project and install the Express library using npm.
    - Create an Express server instance.
2. **GET Route Implementation:**
    
    - Implement a GET route at "/api/user" that reads the content of the provided `data.json` file.
    - Parse the JSON data and respond with the array of user objects.
3. **Run the Server:**
    
    - Start the Express server on a specified port (e.g., 3000).
4. **Test the Implementation:**
    
    - Use tools like Postman, curl, or your web browser to send a GET request to "http://localhost:3000/api/user" and ensure it returns the array of user objects.

### Constraints:

- You can assume that the structure of the `data.json` file adheres to the provided user object format.
- For the purpose of this problem description, error handling and extensive testing are not required. Focus on the basic implementation of the Express server and the GET route.

Feel free to adapt the provided structure and instructions to suit your coding preferences and project organization.