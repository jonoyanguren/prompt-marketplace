import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";

const newPrompt = {
  title: "title",
  description: "description",
  prompt: "prompt",
  platforms: ["platform 1", "platform 2"],
  tags: ["tag 1", "tag 2"],
};

describe("PROMPT CONTROLLER", () => {
  afterAll((done) => {});

  it("should get all prompts", async () => {
    const response = await request(app).get("/prompt");
    expect(response.status).toBe(200);
  });

  it("should get a 400 if no title is provided", async () => {
    // @ts-ignore
    delete newPrompt.title;
    const response = await request(app).post("/prompt").send(newPrompt);
    expect(response.status).toBe(400);
    newPrompt.title = "title";
  });

  it("should create a new prompt", async () => {
    const response = await request(app).post("/prompt").send(newPrompt);
    expect(response.status).toBe(201);
  });
});
