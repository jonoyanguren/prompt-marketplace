"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prompt_controller_1 = require("./prompt.controller");
const jwtVerify_1 = require("../middleware/jwtVerify");
const router = express_1.default.Router();
router.get("/", prompt_controller_1.getAll);
router.post("/", jwtVerify_1.jwtVerify, prompt_controller_1.create);
router.post("/:id/upvote", prompt_controller_1.upvotePrompt);
router.post("/:id/downvote", prompt_controller_1.downvotePrompt);
router.get("/:id", prompt_controller_1.getOneById);
router.put("/:id", prompt_controller_1.update);
exports.default = router;
