const request = require("supertest");
const fs = require("fs");
const app = require("../src/api");

jest.mock("fs"); // Mocking fs module

describe("GET /api/user", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return 'no users found' message if userDataStore is empty", async () => {
    // Mocking fs.readFileSync to return empty array
    fs.readFileSync.mockReturnValueOnce(JSON.stringify([]));

    const response = await request(app).get("/api/user");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("successful");
    expect(response.body.message).toBe("no users found");
  });
});
