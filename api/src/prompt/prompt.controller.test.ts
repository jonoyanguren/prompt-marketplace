import request from "supertest";
import app from "../index";

describe("PROMPT CONTROLLER", () => {
  it("should get all prompts", async () => {
    const response = await request(app).get("/prompt");
    expect(response.status).toBe(200);
    expect(response.text).toBe("PROMPT GET ROUTE!");
  });
});
