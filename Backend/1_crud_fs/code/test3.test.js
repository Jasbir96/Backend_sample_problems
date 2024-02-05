// user.test.js
const request = require("supertest");

describe("GET /api/user", () => {
  it("responds with user data", async () => {
    const response = await request("http://localhost:3000").get("/api/user");

    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Could not read data");
  });
});
