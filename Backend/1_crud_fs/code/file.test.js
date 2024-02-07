const request = require("supertest");
const app = require("./app");

let server;

beforeAll(async () => {
  // Start the server
  const PORT = process.env.PORT || 3000;
  server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});

afterAll(async () => {
  // Close the server
  await server.close();
});

describe("Get File using sync", () => {
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

  it("responds with empty data", async () => {
    const response = await request("http://localhost:3000").get("/api/user");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("successfull");
    expect(response.body.message).toBe("no users found");
  });
});
