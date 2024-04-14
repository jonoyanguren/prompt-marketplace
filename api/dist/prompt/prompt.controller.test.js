"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const newPrompt = {
    title: "title",
    description: "description",
    prompt: "prompt",
    platforms: ["platform 1", "platform 2"],
    tags: ["tag 1", "tag 2"],
};
describe("PROMPT CONTROLLER", () => {
    afterAll((done) => { });
    it("should get all prompts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get("/prompt");
        expect(response.status).toBe(200);
    }));
    it("should get a 400 if no title is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        delete newPrompt.title;
        const response = yield (0, supertest_1.default)(app_1.app).post("/prompt").send(newPrompt);
        expect(response.status).toBe(400);
        newPrompt.title = "title";
    }));
    it("should create a new prompt", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post("/prompt").send(newPrompt);
        expect(response.status).toBe(201);
    }));
});
