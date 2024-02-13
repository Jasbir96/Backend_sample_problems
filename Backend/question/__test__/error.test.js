const request = require("supertest");
const fs = require("fs");
const app = require("../src/api");

jest.mock("fs"); // Mocking fs module

describe("GET /api/user", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should handle file read error", async () => {
    // Mocking fs.readFileSync to throw an error
    fs.readFileSync.mockImplementationOnce(() => {
      throw new Error("File read error");
    });

    const response = await request(app).get("/api/user");
    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Internal server error");
  });
});
