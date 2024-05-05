"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seed_controller_1 = require("./seed.controller");
const router = express_1.default.Router();
router.get("/categories", seed_controller_1.seedCategories);
router.get("/users", seed_controller_1.seedUsers);
router.get("/prompts", seed_controller_1.seedPrompts);
exports.default = router;
