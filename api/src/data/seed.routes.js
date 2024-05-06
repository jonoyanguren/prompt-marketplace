"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var seed_controller_1 = require("./seed.controller");
var router = express_1.default.Router();
router.get("/categories", seed_controller_1.seedCategories);
router.get("/users", seed_controller_1.seedUsers);
router.get("/prompts", seed_controller_1.seedPrompts);
exports.default = router;
