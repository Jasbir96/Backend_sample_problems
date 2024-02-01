# Problem Description
**User Authentication and Authorization API**

You are tasked with building an authentication and authorization API using Node.js, Express, and MongoDB. 
You have to create a Mongodb Schema that should follow these rules 
```js
const userSchemaRules = {
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
        // validate property 
        validate: function () {
            return this.password == this.confirmPassword
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}
```
After this implement the below functionalities
### Requirements:

1. **User Signup (`/signup`):**
    
    - Create a route to handle POST requests at "/signup" for user registration.
    - Implement the `signupController` to create a new user based on the provided request body.
    - Ensure that user data adheres to the validation rules specified in the `userSchemaRules`.
    - Respond with a success message and the newly created user if registration is successful.
    - Handle errors and respond with an appropriate error message and a 500 status code if registration fails.
2. **User Login (`/login`):**
    
    - Create a route to handle POST requests at "/login" for user login.
    - Implement the `loginController` to verify user credentials and issue a JWT token upon successful login.
    - Validate the provided email and password against the stored user data.
    - Set a secure HTTP-only cookie containing the JWT token upon successful login.
    - Respond with a success message if login is successful.
    - Handle errors and respond with appropriate error messages and status codes if login fails.
3. **Protected Route (`/allowIfLoggedIn`):**
    
    - Create a route at "/allowIfLoggedIn" that requires a user to be logged in.
    - Implement the `protectRouteMiddleWare` middleware to verify the presence and validity of the JWT token in the request cookie.
    - If the token is valid, extract the user ID from the token and set it in the request object (`req.userId`).
    - If the token is invalid or missing, respond with a message indicating that the user needs to log in.
4. **Get User Data (`/allowIfLoggedIn`):**
    
    - Create a route at "/allowIfLoggedIn" that allows logged-in users to access their own user data.
    - Implement the `getUserData` function to retrieve and respond with the user data associated with the authenticated user ID (`req.userId`).
    - Handle errors and respond with appropriate error messages and status codes if user data retrieval fails.

### Example Usage:

1. **User Signup:**
    
    - Send a POST request to "/signup" with a JSON body containing valid user data.
    - Example:
        
    ```js
        {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "strongpass",
        "confirmPassword": "strongpass"
        }```
        
        
- The server should respond with a success message and the newly created user.

2. **User Login:**
    
    - Send a POST request to "/login" with a JSON body containing valid login credentials.
    - Example:
        
```js
        {
  "email": "john.doe@example.com",
  "password": "strongpass"
}

```

 - Upon successful login, the server should respond with a success message and set a JWT token in the HTTP-only cookie.
3. **Get User Data:**
    
    - Send a GET request to "/allowIfLoggedIn" with the HTTP-only cookie containing the JWT token.
    - The server should respond with the user data associated with the authenticated user ID.

### Evaluation Criteria:

- Correct implementation of user signup, login, and protected route logic.
- Proper handling of success and error responses with appropriate status codes.
- Effective use of Mongoose to interact with the MongoDB database.
- Implementation of secure authentication using JWT tokens.