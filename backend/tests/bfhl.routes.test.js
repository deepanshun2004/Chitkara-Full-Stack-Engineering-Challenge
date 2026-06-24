const request = require("supertest");
const app = require("../src/app");

describe("POST /bfhl", () => {
  test("returns processed hierarchy response", async () => {
    const response = await request(app)
      .post("/bfhl")
      .set("Origin", "https://chitkara-full-stack-engineering-cha.vercel.app")
      .send({ data: ["A->B", "A->C"] })
      .expect(200);

    expect(response.headers["access-control-allow-origin"]).toBe("*");
    expect(response.body.user_id).toBe("deepanshunayyar_16042004");
    expect(response.body.email_id).toBe("[deepanshu1561.be23@chitkara.edu.in](mailto:deepanshu1561.be23@chitkara.edu.in)");
    expect(response.body.college_roll_number).toBe("2310991561");
    expect(response.body.hierarchies[0].root).toBe("A");
  });

  test("handles CORS preflight requests", async () => {
    const response = await request(app)
      .options("/bfhl")
      .set("Origin", "https://chitkara-full-stack-engineering-cha.vercel.app")
      .set("Access-Control-Request-Method", "POST")
      .set("Access-Control-Request-Headers", "Content-Type")
      .expect(204);

    expect(response.headers["access-control-allow-origin"]).toBe("*");
    expect(response.headers["access-control-allow-methods"]).toContain("POST");
    expect(response.headers["access-control-allow-headers"]).toContain("Content-Type");
  });

  test("rejects payloads without data array", async () => {
    const response = await request(app)
      .post("/bfhl")
      .send({ data: "A->B" })
      .expect(400);

    expect(response.body.message).toBe("Request body must contain a data array.");
  });
});
