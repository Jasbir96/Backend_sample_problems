// user.test.js
const request = require("supertest");

describe("GET /api/user", () => {
  it("responds with user data", async () => {
    const response = await request("http://localhost:3000").get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("successfull");
    expect(response.body.message).toBe("no users found");
  });
});
