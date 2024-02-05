// user.test.js
const request = require("supertest");

describe("GET /api/user", () => {
  it("responds with user data", async () => {
    const response = await request("http://localhost:3000").get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("successfull");
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          username: expect.any(String),
          email: expect.any(String),
        }),
      ]),
    );
  });
});
