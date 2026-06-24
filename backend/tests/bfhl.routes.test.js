const request = require("supertest");
const app = require("../src/app");

describe("POST /bfhl", () => {
  test("returns processed hierarchy response", async () => {
    const response = await request(app)
      .post("/bfhl")
      .send({ data: ["A->B", "A->C"] })
      .expect(200);

    expect(response.body.user_id).toBe("deepanshunayyar_16042004");
    expect(response.body.email_id).toBe("[deepanshu1561.be23@chitkara.edu.in](mailto:deepanshu1561.be23@chitkara.edu.in)");
    expect(response.body.college_roll_number).toBe("2310991561");
    expect(response.body.hierarchies[0].root).toBe("A");
  });

  test("rejects payloads without data array", async () => {
    const response = await request(app)
      .post("/bfhl")
      .send({ data: "A->B" })
      .expect(400);

    expect(response.body.message).toBe("Request body must contain a data array.");
  });
});
