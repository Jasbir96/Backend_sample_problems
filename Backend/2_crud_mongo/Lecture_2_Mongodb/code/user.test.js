const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("./app");

let mongoServer;
let server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Start the server
  const PORT = process.env.PORT || 3000;
  server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();

  // Close the server
  await server.close();
});

describe("User Registration API", () => {
  it("should create a new user successfully", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
    };

    const response = await request(app).post("/api/users").send(userData);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toHaveProperty("email", "test@example.com");
    // Add any other assertions you need here
  });

  it("should return an error for invalid registration data", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
    };

    const response = await request(app).post("/api/users").send(userData);

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty("message");
  });
});
