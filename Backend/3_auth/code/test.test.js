const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { app, server } = require("./api"); // Adjust the path as necessary to import your Express app

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await server.close();
});

describe("Authentication and Authorization API", () => {
  it("should sign up a new user successfully", async () => {
    const userData = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password123",
      confirmPassword: "password123",
    };

    const response = await request(app).post("/signup").send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "user created successfully",
    );
    expect(response.body.user).toHaveProperty("email", userData.email);
  });

  it("should login the user successfully and return a JWT token", async () => {
    const loginData = {
      email: "jane.doe@example.com",
      password: "password123",
    };

    const response = await request(app).post("/login").send(loginData);

    expect(response.statusCode).toBe(200);
    const cookies = response.headers["set-cookie"];
    token = cookies
      .find((cookie) => cookie.startsWith("JWT="))
      .split(";")[0]
      .replace("JWT=", "");
    expect(token).toBeDefined();
    // expect(response.headers["set-cookie"]).toBeDefined();
  });

  it("should access protected route with valid JWT token", async () => {
    // Assuming you have a way to get a valid token, perhaps from the login test
    // const token = process.env.JWT_SECRET;

    const response = await request(app)
      .get("/allowIfLoggedIn")
      .set("Cookie", [`JWT=${token}`]);

    expect(response.statusCode).toBe(200);
  });
});
