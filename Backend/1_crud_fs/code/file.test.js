const request = require("supertest");
const app = require("./app");

describe("Get File using sync", () => {
  it("responds with user data", async () => {
    const response = await request(app).get("/api/user");

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

  it("responds with empty data", async () => {
    const response = await request(app).get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("successfull");
    expect(response.body.message).toBe("no users found");
  });
});
