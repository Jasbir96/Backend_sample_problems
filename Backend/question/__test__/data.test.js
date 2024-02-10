const request = require("supertest");
const fs = require("fs");
const app = require("../src/api");

jest.mock("fs"); // Mocking fs module

describe("GET /api/user", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return user data", async () => {
    // Mocking fs.readFileSync to return mock user data
    fs.readFileSync.mockReturnValueOnce(
      JSON.stringify([{ id: 1, name: "User1" }]),
    );

    const response = await request(app).get("/api/user");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("successful");
    expect(response.body.message).toEqual([{ id: 1, name: "User1" }]);
    console.log("I passed");
  });
});
