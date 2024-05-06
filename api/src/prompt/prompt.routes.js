"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var prompt_controller_1 = require("./prompt.controller");
var jwtVerify_1 = require("../middleware/jwtVerify");
var router = express_1.default.Router();
router.get("/", prompt_controller_1.getAll);
router.post("/", jwtVerify_1.jwtVerify, prompt_controller_1.create);
router.get("/category/:id", prompt_controller_1.getPromptsByCategory);
router.get("/search", prompt_controller_1.getAll);
router.get("/search/:text", prompt_controller_1.getPromptsByText);
router.post("/:id/upvote", prompt_controller_1.upvotePrompt);
router.post("/:id/downvote", prompt_controller_1.downvotePrompt);
router.get("/:id", prompt_controller_1.getOneById);
router.put("/:id", prompt_controller_1.update);
exports.default = router;
